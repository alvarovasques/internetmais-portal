import { desc, eq } from "drizzle-orm";
import { getDb, requireDb } from "../core/db";
import { cobrancas, type Cobranca } from "../../drizzle/schema";
import { listar } from "../integrations/ixc";

/** Mapa dos códigos de status do IXC (fn_areceber). */
const STATUS: Record<string, Cobranca["status"]> = {
  A: "aberta",
  R: "recebida",
  P: "parcial",
  C: "cancelada",
};

type TituloIxc = {
  id: string;
  id_cliente?: string;
  valor?: string;
  data_vencimento?: string;
  status?: string;
  tipo_recebimento?: string;
  gateway_link?: string;
  linha_digitavel?: string;
  pix_txid?: string;
};

/**
 * Lê os títulos do cliente no IXC e guarda uma cópia local para exibição.
 * O IXC continua sendo a fonte da verdade: aqui é espelho, nunca origem.
 */
export async function sincronizarCobrancas(
  ixcClienteId: string,
  pedidoId?: number,
): Promise<Cobranca[]> {
  const { registros } = await listar<TituloIxc>("fn_areceber", {
    qtype: "fn_areceber.id_cliente",
    query: ixcClienteId,
    oper: "=",
    rp: "50",
    sortname: "fn_areceber.data_vencimento",
    sortorder: "asc",
  });

  const db = requireDb();
  const salvas: Cobranca[] = [];
  for (const titulo of registros) {
    const valores = {
      pedidoId: pedidoId ?? null,
      ixcAreceberId: titulo.id,
      ixcClienteId,
      // O IXC devolve tudo como string e valor pode vir com vírgula decimal.
      valor: (titulo.valor ?? "0").replace(".", "").replace(",", "."),
      vencimento: titulo.data_vencimento || null,
      status: STATUS[titulo.status ?? "A"] ?? "aberta",
      tipoRecebimento: titulo.tipo_recebimento ?? null,
      gatewayLink: titulo.gateway_link || null,
      linhaDigitavel: titulo.linha_digitavel || null,
      pixTxid: titulo.pix_txid || null,
      sincronizadoEm: new Date(),
    };
    const [linha] = await db
      .insert(cobrancas)
      .values(valores)
      .onConflictDoUpdate({ target: cobrancas.ixcAreceberId, set: valores })
      .returning();
    salvas.push(linha);
  }
  return salvas;
}

export async function listarCobrancasDoPedido(pedidoId: number): Promise<Cobranca[]> {
  const db = getDb();
  if (!db) return [];
  return db.select().from(cobrancas).where(eq(cobrancas.pedidoId, pedidoId)).orderBy(desc(cobrancas.vencimento));
}
