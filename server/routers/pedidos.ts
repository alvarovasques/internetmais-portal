import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { adminProcedure, publicProcedure, router } from "../core/trpc";
import { buscarPlanoPorSlug } from "../repositories/catalogo";
import {
  atualizarPedido, buscarPedidoPorProtocolo, criarPedido,
  listarPagamentosDoPedido, listarPedidos, registrarConsultaCobertura,
} from "../repositories/pedidos";

const cep = z.string().regex(/^\d{5}-?\d{3}$/, "CEP inválido");
const cpfCnpj = z.string().min(11).max(18);

export const pedidosRouter = router({
  /**
   * Consulta de cobertura. Enquanto a fonte de viabilidade real não estiver
   * definida, devolve indefinido e registra a consulta como lista de espera.
   */
  consultarCobertura: publicProcedure
    .input(
      z.object({
        cep,
        numero: z.string().optional(),
        logradouro: z.string().optional(),
        bairro: z.string().optional(),
        telefone: z.string().optional(),
        email: z.string().email().optional(),
        avisarQuandoChegar: z.boolean().default(false),
      }),
    )
    .mutation(async ({ input }) => {
      // TODO: trocar por consulta real (base de caixas/portas ou API do IXC).
      const temViabilidade: boolean | null = null;
      await registrarConsultaCobertura({ ...input, temViabilidade: temViabilidade ?? undefined });
      return { temViabilidade, mensagem: "Consulta registrada. Viabilidade ainda não integrada." };
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

  listar: adminProcedure
    .input(z.object({ limite: z.number().min(1).max(500).default(100) }).optional())
    .query(({ input }) => listarPedidos(input?.limite ?? 100)),

  pagamentos: adminProcedure
    .input(z.object({ pedidoId: z.number() }))
    .query(({ input }) => listarPagamentosDoPedido(input.pedidoId)),
});
