import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { adminProcedure, publicProcedure, router } from "../core/trpc";
import { buscarPlanoPorSlug } from "../repositories/catalogo";
import {
  atualizarPedido, buscarPedidoPorProtocolo, criarPedido,
  listarPedidos, registrarConsultaCobertura,
} from "../repositories/pedidos";
import { listarCobrancasDoPedido, sincronizarCobrancas } from "../repositories/cobrancas";
import { enviarPedidoParaIxc } from "../services/contratacao";
import { consultarViabilidade } from "../integrations/ixc";
import {
  listarDocumentosDoPedido, receberDocumento, TAMANHO_MAXIMO_BYTES,
} from "../services/documentos";

const cep = z.string().regex(/^\d{5}-?\d{3}$/, "CEP inválido");
const cpfCnpj = z.string().min(11).max(18);

export const pedidosRouter = router({
  /**
   * Consulta de cobertura no IXC (`viabilidade_tecnica`).
   *
   * Toda consulta fica registrada, com viabilidade ou sem: quem não tem
   * cobertura hoje é lista de espera, e o conjunto mostra onde vale expandir
   * a rede. Falha na integração não derruba a experiência: o endereço é
   * gravado do mesmo jeito e o visitante recebe resposta honesta.
   */
  consultarCobertura: publicProcedure
    .input(
      z.object({
        cep,
        numero: z.string().min(1),
        logradouro: z.string().min(3),
        bairro: z.string().optional(),
        cidade: z.string().default("Campo Grande"),
        estado: z.string().length(2).default("MS"),
        telefone: z.string().optional(),
        email: z.string().email().optional(),
        avisarQuandoChegar: z.boolean().default(false),
      }),
    )
    .mutation(async ({ input }) => {
      let temViabilidade: boolean | null = null;
      let respostaIxc: unknown = null;

      try {
        const consulta = await consultarViabilidade({
          endereco: input.logradouro,
          numero: input.numero,
          bairro: input.bairro,
          cidade: input.cidade,
          estado: input.estado,
          cep: input.cep,
        });
        temViabilidade = consulta.disponivel;
        respostaIxc = consulta.bruto;
      } catch (erro) {
        console.error("[viabilidade] falha ao consultar o IXC:", erro);
      }

      await registrarConsultaCobertura({
        cep: input.cep,
        logradouro: input.logradouro,
        numero: input.numero,
        bairro: input.bairro,
        temViabilidade,
        respostaIxc,
        telefone: input.telefone,
        email: input.email,
        avisarQuandoChegar: input.avisarQuandoChegar,
      });

      if (temViabilidade === true) {
        return { temViabilidade: true as const, mensagem: "Temos fibra no seu endereço." };
      }
      if (temViabilidade === false) {
        return {
          temViabilidade: false as const,
          mensagem: "Ainda não chegamos nesse endereço. Deixe seu contato que avisamos quando chegar.",
        };
      }
      // Não sabemos: não prometer prazo nem negar cobertura.
      return {
        temViabilidade: null,
        mensagem: "Vamos confirmar a disponibilidade e retornar pelo WhatsApp em seguida.",
      };
    }),

  iniciar: publicProcedure
    .input(
      z.object({
        planoSlug: z.string().min(1),
        aplicativos: z.array(z.string()).default([]),
        cep,
        logradouro: z.string().min(3),
        numero: z.string().min(1),
        complemento: z.string().optional(),
        bairro: z.string().min(2),
        origem: z.string().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const plano = await buscarPlanoPorSlug(input.planoSlug);
      if (!plano) throw new TRPCError({ code: "NOT_FOUND", message: "Plano não encontrado." });

      const pedido = await criarPedido({
        planoId: plano.id,
        aplicativos: input.aplicativos,
        cep: input.cep,
        logradouro: input.logradouro,
        numero: input.numero,
        complemento: input.complemento,
        bairro: input.bairro,
        valorMensal: plano.precoComDesconto ?? plano.precoCheio,
        origem: input.origem,
        status: "rascunho",
      });
      return { protocolo: pedido.protocolo };
    }),

  identificar: publicProcedure
    .input(
      z.object({
        protocolo: z.string().min(1),
        nome: z.string().min(3),
        cpfCnpj,
        dataNascimento: z.string().optional(),
        email: z.string().email(),
        telefone: z.string().min(10),
      }),
    )
    .mutation(async ({ input }) => {
      const pedido = await buscarPedidoPorProtocolo(input.protocolo);
      if (!pedido) throw new TRPCError({ code: "NOT_FOUND" });
      await atualizarPedido(pedido.id, {
        nome: input.nome,
        cpfCnpj: input.cpfCnpj,
        dataNascimento: input.dataNascimento,
        email: input.email,
        telefone: input.telefone,
      });
      return { ok: true };
    }),

  agendar: publicProcedure
    .input(
      z.object({
        protocolo: z.string().min(1),
        data: z.string(),
        turno: z.enum(["manha", "tarde"]),
      }),
    )
    .mutation(async ({ input }) => {
      const pedido = await buscarPedidoPorProtocolo(input.protocolo);
      if (!pedido) throw new TRPCError({ code: "NOT_FOUND" });
      await atualizarPedido(pedido.id, {
        dataInstalacao: input.data,
        turnoInstalacao: input.turno,
      });
      return { ok: true };
    }),

  acompanhar: publicProcedure
    .input(z.object({ protocolo: z.string().min(1) }))
    .query(async ({ input }) => {
      const pedido = await buscarPedidoPorProtocolo(input.protocolo);
      if (!pedido) throw new TRPCError({ code: "NOT_FOUND" });
      // Devolve só o que o cliente precisa ver, nunca o CPF completo.
      return {
        protocolo: pedido.protocolo,
        status: pedido.status,
        valorMensal: pedido.valorMensal,
        dataInstalacao: pedido.dataInstalacao,
        turnoInstalacao: pedido.turnoInstalacao,
      };
    }),

  /**
   * Fecha o pedido: registra a forma de pagamento escolhida, cria cliente,
   * contrato e ordem de serviço no IXC e devolve o link da primeira cobrança.
   *
   * O site não processa pagamento. Quem fatura é o IXC, onde a Cielo já está
   * integrada: aqui só mostramos ao cliente o link que o IXC gerou.
   */
  finalizar: publicProcedure
    .input(
      z.object({
        protocolo: z.string().min(1),
        meioPagamento: z.enum(["cartao_credito", "pix", "boleto"]),
      }),
    )
    .mutation(async ({ input }) => {
      const pedido = await buscarPedidoPorProtocolo(input.protocolo);
      if (!pedido) throw new TRPCError({ code: "NOT_FOUND" });
      if (pedido.ixcContratoId) {
        throw new TRPCError({ code: "CONFLICT", message: "Este pedido já foi enviado ao sistema." });
      }

      const atualizado = await atualizarPedido(pedido.id, { meioPagamento: input.meioPagamento });
      if (!atualizado) throw new TRPCError({ code: "NOT_FOUND" });

      try {
        const { ixcClienteId } = await enviarPedidoParaIxc(atualizado);
        // A cobrança pode ainda não existir no instante seguinte à criação do
        // contrato: quando não vier nada, o cliente recebe o link por WhatsApp.
        const cobrancas = await sincronizarCobrancas(ixcClienteId, atualizado.id).catch(() => []);
        const emAberto = cobrancas.find(c => c.status === "aberta");
        return {
          protocolo: atualizado.protocolo,
          linkPagamento: emAberto?.gatewayLink ?? null,
          linhaDigitavel: emAberto?.linhaDigitavel ?? null,
          vencimento: emAberto?.vencimento ?? null,
        };
      } catch (erro) {
        // O pedido fica gravado com o passo que falhou registrado, para o time
        // retomar sem pedir os dados de novo ao cliente.
        console.error(`[contratacao] pedido ${atualizado.protocolo}:`, erro);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message:
            "Recebemos seus dados, mas não conseguimos concluir agora. Nossa equipe vai finalizar e entrar em contato.",
        });
      }
    }),

  /**
   * Recebe um documento do checkout. O arquivo não é guardado aqui: vai para
   * o cadastro do cliente no IXC quando o pedido é finalizado.
   */
  enviarDocumento: publicProcedure
    .input(
      z.object({
        protocolo: z.string().min(1),
        tipo: z.enum(["identidade", "comprovante_residencia", "selfie_documento"]),
        nomeArquivo: z.string().min(1).max(200),
        // O limite em base64 é maior que o do arquivo: 4 caracteres por 3 bytes.
        conteudoBase64: z.string().min(1).max(Math.ceil((TAMANHO_MAXIMO_BYTES * 4) / 3) + 1024),
      }),
    )
    .mutation(async ({ input }) => {
      const pedido = await buscarPedidoPorProtocolo(input.protocolo);
      if (!pedido) throw new TRPCError({ code: "NOT_FOUND" });
      try {
        const doc = await receberDocumento({
          pedidoId: pedido.id,
          protocolo: pedido.protocolo,
          tipo: input.tipo,
          nomeArquivo: input.nomeArquivo,
          conteudoBase64: input.conteudoBase64,
        });
        return { id: doc.id, tipo: doc.tipo, tamanhoBytes: doc.tamanhoBytes };
      } catch (erro) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: erro instanceof Error ? erro.message : "Não foi possível receber o arquivo.",
        });
      }
    }),

  documentos: publicProcedure
    .input(z.object({ protocolo: z.string().min(1) }))
    .query(async ({ input }) => {
      const pedido = await buscarPedidoPorProtocolo(input.protocolo);
      if (!pedido) throw new TRPCError({ code: "NOT_FOUND" });
      return listarDocumentosDoPedido(pedido.id);
    }),

  listar: adminProcedure
    .input(z.object({ limite: z.number().min(1).max(500).default(100) }).optional())
    .query(({ input }) => listarPedidos(input?.limite ?? 100)),

  cobrancas: adminProcedure
    .input(z.object({ pedidoId: z.number() }))
    .query(({ input }) => listarCobrancasDoPedido(input.pedidoId)),
});
