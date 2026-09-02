/**
 * Cliente do webservice REST do IXC (v1).
 *
 * Três armadilhas que este módulo fecha de propósito:
 *
 * 1. Listar é POST com o header `ixcsoft: listar`. Um POST sem esse header é
 *    interpretado como INSERÇÃO: uma consulta mal escrita cria registro no ERP
 *    do provedor. Por isso listar e criar são funções separadas e o header
 *    nunca é montado à mão fora daqui.
 * 2. O IXC devolve erro com HTTP 200 e corpo `{type:"error"}`. Checar só o
 *    status esconde falha.
 * 3. Rota errada devolve HTML com status 2xx. Por isso validamos o corpo.
 */
import { Agent } from "undici";
import { ENV } from "../core/env";

export type RespostaListagem<T> = { page?: number; total: number; registros: T[] };
export type RespostaEscrita = { type: "success" | "error"; message?: string; id?: string };

export class ErroIxc extends Error {
  constructor(
    message: string,
    readonly detalhe?: unknown,
  ) {
    super(message);
    this.name = "ErroIxc";
  }
}

function autorizacao(): string {
  if (!ENV.ixc.token) throw new ErroIxc("IXC_TOKEN não configurado");
  return "Basic " + Buffer.from(ENV.ixc.token).toString("base64");
}

const agenteInseguro = ENV.ixc.permitirCertificadoInvalido
  ? new Agent({ connect: { rejectUnauthorized: false } })
  : undefined;

async function chamar(
  tabela: string,
  init: { method: string; headers: Record<string, string>; body?: string; caminhoExtra?: string },
): Promise<unknown> {
  if (!ENV.ixc.host) throw new ErroIxc("IXC_HOST não configurado");
  const url = `${ENV.ixc.host}/webservice/v1/${tabela}${init.caminhoExtra ?? ""}`;

  const resposta = await fetch(url, {
    method: init.method,
    headers: { Authorization: autorizacao(), "Content-Type": "application/json", ...init.headers },
    body: init.body,
    // @ts-expect-error dispatcher é aceito pelo fetch do Node (undici)
    dispatcher: agenteInseguro,
  });

  const texto = await resposta.text();
  const tipo = resposta.headers.get("content-type") ?? "";
  if (!tipo.includes("json") || !/^\s*[[{]/.test(texto)) {
    // Rota errada, webservice desabilitado ou proxy no caminho.
    throw new ErroIxc(
      `Resposta não-JSON do IXC em ${tabela} (HTTP ${resposta.status}). Confira IXC_HOST e se o webservice está habilitado.`,
      texto.slice(0, 300),
    );
  }

  const corpo = JSON.parse(texto);
  if (corpo && typeof corpo === "object" && (corpo as RespostaEscrita).type === "error") {
    throw new ErroIxc((corpo as RespostaEscrita).message ?? "Erro retornado pelo IXC", corpo);
  }
  if (!resposta.ok) {
    throw new ErroIxc(`IXC respondeu HTTP ${resposta.status} em ${tabela}`, corpo);
  }
  return corpo;
}

export type Filtro = {
  qtype: string;
  query: string;
  /** = > < >= <= != e L para LIKE. */
  oper?: "=" | ">" | "<" | ">=" | "<=" | "!=" | "L";
  page?: string;
  rp?: string;
  sortname?: string;
  sortorder?: "asc" | "desc";
};

/** Consulta. Sempre com o header `ixcsoft: listar`. */
export async function listar<T = Record<string, string>>(
  tabela: string,
  filtro: Filtro,
): Promise<RespostaListagem<T>> {
  const corpo = (await chamar(tabela, {
    method: "POST",
    headers: { ixcsoft: "listar" },
    body: JSON.stringify({ oper: "=", page: "1", rp: "20", ...filtro }),
  })) as RespostaListagem<T>;
  return { total: Number(corpo?.total ?? 0), registros: corpo?.registros ?? [] };
}

/** Atalho para buscar por id, já que o IXC não expõe GET por id nesta versão. */
export async function buscarPorId<T = Record<string, string>>(
  tabela: string,
  id: string | number,
): Promise<T | null> {
  const { registros } = await listar<T>(tabela, {
    qtype: `${tabela}.id`,
    query: String(id),
    oper: "=",
    rp: "1",
  });
  return registros[0] ?? null;
}

/** Escrita. Efeito colateral real no ERP do provedor. */
export async function criar(tabela: string, dados: Record<string, unknown>): Promise<RespostaEscrita> {
  return (await chamar(tabela, {
    method: "POST",
    headers: {},
    body: JSON.stringify(dados),
  })) as RespostaEscrita;
}

export async function editar(
  tabela: string,
  id: string | number,
  dados: Record<string, unknown>,
): Promise<RespostaEscrita> {
  return (await chamar(tabela, {
    method: "PUT",
    headers: {},
    caminhoExtra: `/${id}`,
    body: JSON.stringify(dados),
  })) as RespostaEscrita;
}

/** Só para o healthcheck da integração: não escreve nada. */
export async function testarConexao(): Promise<boolean> {
  try {
    await listar("cliente", { qtype: "cliente.id", query: "0", oper: ">", rp: "1" });
    return true;
  } catch {
    return false;
  }
}
