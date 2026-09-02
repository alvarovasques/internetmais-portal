/**
 * Leva um pedido fechado no site para dentro do IXC, em três passos:
 * cliente, contrato e ordem de serviço de instalação.
 *
 * Regras que valem a pena entender antes de mexer:
 *
 * - Cada passo é registrado em `sincronizacoes_ixc` com índice único por
 *   (pedido, etapa). Reexecutar um pedido que já criou o cliente NÃO cria
 *   outro: o passo é pulado. Isso importa porque escrita no IXC é efeito real
 *   no ERP do provedor e cliente duplicado dá trabalho para desfazer à mão.
 * - Antes de criar, procuramos o CPF no IXC. Se a pessoa já é cliente, o
 *   cadastro existente é reaproveitado.
 * - O faturamento não passa por aqui. O IXC gera os títulos em `fn_areceber`
 *   com a Cielo já integrada; o site só lê e mostra o link.
 */
import { and, eq } from "drizzle-orm";
import { requireDb } from "../core/db";
import { ENV } from "../core/env";
import { pedidos, sincronizacoesIxc, type Pedido } from "../../drizzle/schema";
import { criar, listar, ErroIxc } from "../integrations/ixc";
import { buscarPlanoPorId } from "../repositories/catalogo";

type Etapa = "cliente" | "contrato" | "ordem_servico";

async function etapaConcluida(pedidoId: number, etapa: Etapa): Promise<string | null> {
  const db = requireDb();
  const [linha] = await db
    .select()
    .from(sincronizacoesIxc)
    .where(and(eq(sincronizacoesIxc.pedidoId, pedidoId), eq(sincronizacoesIxc.etapa, etapa)))
    .limit(1);
  return linha?.resultado === "sucesso" ? linha.ixcId : null;
}

async function registrar(
  pedidoId: number,
  etapa: Etapa,
  dados: {
    resultado: "sucesso" | "erro";
    ixcId?: string | null;
    requisicao?: unknown;
    resposta?: unknown;
    erro?: string;
  },
) {
  const db = requireDb();
  await db
    .insert(sincronizacoesIxc)
    .values({
      pedidoId,
      etapa,
      resultado: dados.resultado,
      ixcId: dados.ixcId ?? null,
      requisicao: dados.requisicao ?? null,
      resposta: dados.resposta ?? null,
      erro: dados.erro ?? null,
      tentativas: 1,
    })
    .onConflictDoUpdate({
      target: [sincronizacoesIxc.pedidoId, sincronizacoesIxc.etapa],
      set: {
        resultado: dados.resultado,
        ixcId: dados.ixcId ?? null,
        requisicao: dados.requisicao ?? null,
        resposta: dados.resposta ?? null,
        erro: dados.erro ?? null,
        atualizadoEm: new Date(),
      },
    });
}

function somenteDigitos(valor: string | null | undefined): string {
  return (valor ?? "").replace(/\D/g, "");
}

/** Reaproveita o cadastro quando o CPF já existe no IXC. */
async function acharClientePorCpf(cpf: string): Promise<string | null> {
  const { registros } = await listar<{ id: string }>("cliente", {
    qtype: "cliente.cnpj_cpf",
    query: cpf,
    oper: "=",
    rp: "1",
  });
  return registros[0]?.id ?? null;
}

async function passoCliente(pedido: Pedido): Promise<string> {
  const jaFeito = await etapaConcluida(pedido.id, "cliente");
  if (jaFeito) return jaFeito;

  const cpf = somenteDigitos(pedido.cpfCnpj);
  const existente = cpf ? await acharClientePorCpf(cpf) : null;
  if (existente) {
    await registrar(pedido.id, "cliente", {
      resultado: "sucesso",
      ixcId: existente,
      resposta: { reaproveitado: true },
    });
    return existente;
  }

  const payload = {
    razao: pedido.nome,
    tipo_pessoa: cpf.length > 11 ? "J" : "F",
    cnpj_cpf: pedido.cpfCnpj,
    ativo: "S",
    email: pedido.email,
    telefone_celular: pedido.telefone,
    whatsapp: pedido.telefone,
    cep: pedido.cep,
    endereco: pedido.logradouro,
    numero: pedido.numero,
    complemento: pedido.complemento,
    bairro: pedido.bairro,
    cidade: pedido.cidade,
    uf: pedido.uf,
    ...(ENV.ixc.idFilial ? { filial_id: ENV.ixc.idFilial } : {}),
  };

  try {
    const resposta = await criar("cliente", payload);
    if (!resposta.id) throw new ErroIxc("IXC não devolveu o id do cliente", resposta);
    await registrar(pedido.id, "cliente", { resultado: "sucesso", ixcId: resposta.id, requisicao: payload, resposta });
    return resposta.id;
  } catch (erro) {
    await registrar(pedido.id, "cliente", {
      resultado: "erro",
      requisicao: payload,
      erro: erro instanceof Error ? erro.message : String(erro),
    });
    throw erro;
  }
}

async function passoContrato(pedido: Pedido, idCliente: string): Promise<string> {
  const jaFeito = await etapaConcluida(pedido.id, "contrato");
  if (jaFeito) return jaFeito;

  const plano = pedido.planoId ? await buscarPlanoPorId(pedido.planoId) : null;
  if (!plano?.ixcPlanoId) {
    throw new ErroIxc(
      `Plano ${plano?.slug ?? pedido.planoId} sem ixc_plano_id. Preencha o id do contrato de venda do IXC no catálogo antes de vender online.`,
    );
  }

  const payload: Record<string, unknown> = {
    id_cliente: idCliente,
    // Modelo de contrato de venda no IXC: é ele que define plano, valor e regra
    // de faturamento, incluindo a carteira de cobrança onde a Cielo já está.
    id_vd_contrato: plano.ixcPlanoId,
    status: "P", // pré-contrato: ativa quando a instalação for concluída
    ...(ENV.ixc.idFilial ? { id_filial: ENV.ixc.idFilial } : {}),
  };

  try {
    const resposta = await criar("cliente_contrato", payload);
    if (!resposta.id) throw new ErroIxc("IXC não devolveu o id do contrato", resposta);
    await registrar(pedido.id, "contrato", { resultado: "sucesso", ixcId: resposta.id, requisicao: payload, resposta });
    return resposta.id;
  } catch (erro) {
    await registrar(pedido.id, "contrato", {
      resultado: "erro",
      requisicao: payload,
      erro: erro instanceof Error ? erro.message : String(erro),
    });
    throw erro;
  }
}

/** Manhã vira 08:00, tarde vira 13:00, no formato que o IXC espera. */
function dataAgenda(pedido: Pedido): string | undefined {
  if (!pedido.dataInstalacao) return undefined;
  const hora = pedido.turnoInstalacao === "tarde" ? "13:00:00" : "08:00:00";
  return `${pedido.dataInstalacao} ${hora}`;
}

async function passoOrdemServico(pedido: Pedido, idCliente: string): Promise<string> {
  const jaFeito = await etapaConcluida(pedido.id, "ordem_servico");
  if (jaFeito) return jaFeito;

  const payload: Record<string, unknown> = {
    tipo: "C",
    id_cliente: idCliente,
    id_assunto: ENV.ixc.idAssuntoInstalacao,
    setor: ENV.ixc.setorInstalacao,
    prioridade: "N",
    status: pedido.dataInstalacao ? "AG" : "A",
    mensagem: [
      `Instalação contratada pelo site. Protocolo ${pedido.protocolo}.`,
      pedido.aplicativos.length ? `Aplicativos escolhidos: ${pedido.aplicativos.join(", ")}.` : null,
    ]
      .filter(Boolean)
      .join(" "),
    // M = usa o endereço informado aqui, e não o da estrutura.
    origem_endereco: "M",
    endereco: pedido.logradouro,
    complemento: pedido.complemento,
    bairro: pedido.bairro,
    melhor_horario_agenda: pedido.turnoInstalacao === "tarde" ? "T" : pedido.turnoInstalacao === "manha" ? "M" : "Q",
    ...(dataAgenda(pedido) ? { data_agenda: dataAgenda(pedido) } : {}),
    ...(ENV.ixc.idFilial ? { id_filial: ENV.ixc.idFilial } : {}),
  };

  try {
    const resposta = await criar("su_oss_chamado", payload);
    if (!resposta.id) throw new ErroIxc("IXC não devolveu o id da OS", resposta);
    await registrar(pedido.id, "ordem_servico", { resultado: "sucesso", ixcId: resposta.id, requisicao: payload, resposta });
    return resposta.id;
  } catch (erro) {
    await registrar(pedido.id, "ordem_servico", {
      resultado: "erro",
      requisicao: payload,
      erro: erro instanceof Error ? erro.message : String(erro),
    });
    throw erro;
  }
}

export type ResultadoContratacao = {
  ixcClienteId: string;
  ixcContratoId: string;
  ixcOsId: string;
};

/**
 * Roda os três passos em ordem. Falha em qualquer um deixa os anteriores
 * gravados: chamar de novo continua de onde parou, sem duplicar.
 */
export async function enviarPedidoParaIxc(pedido: Pedido): Promise<ResultadoContratacao> {
  if (!pedido.nome || !pedido.cpfCnpj) {
    throw new ErroIxc("Pedido sem identificação do titular: não dá para criar cliente no IXC.");
  }
  if (!ENV.ixc.idAssuntoInstalacao || !ENV.ixc.setorInstalacao) {
    throw new ErroIxc(
      "IXC_ID_ASSUNTO_INSTALACAO e IXC_SETOR_INSTALACAO precisam ser preenchidos com os ids reais do IXC.",
    );
  }

  const ixcClienteId = await passoCliente(pedido);
  const ixcContratoId = await passoContrato(pedido, ixcClienteId);
  const ixcOsId = await passoOrdemServico(pedido, ixcClienteId);

  await requireDb()
    .update(pedidos)
    .set({ ixcClienteId, ixcContratoId, ixcOsId, status: "agendado", atualizadoEm: new Date() })
    .where(eq(pedidos.id, pedido.id));

  return { ixcClienteId, ixcContratoId, ixcOsId };
}
