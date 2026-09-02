import { randomBytes } from "crypto";
import { desc, eq } from "drizzle-orm";
import { getDb, requireDb } from "../core/db";
import {
  consultasCobertura, pedidos,
  type NovoPedido, type Pedido,
} from "../../drizzle/schema";

/** Protocolo curto e legível ao telefone: IM-7K3F9Q. */
export function gerarProtocolo(): string {
  const alfabeto = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // sem I, O, 0 e 1
  const bytes = randomBytes(6);
  let saida = "";
  for (const b of bytes) saida += alfabeto[b % alfabeto.length];
  return `IM-${saida}`;
}

export async function criarPedido(dados: Omit<NovoPedido, "protocolo">): Promise<Pedido> {
  const db = requireDb();
  const [linha] = await db
    .insert(pedidos)
    .values({ ...dados, protocolo: gerarProtocolo() })
    .returning();
  return linha;
}

export async function atualizarPedido(id: number, dados: Partial<NovoPedido>): Promise<Pedido | null> {
  const db = requireDb();
  const [linha] = await db
    .update(pedidos)
    .set({ ...dados, atualizadoEm: new Date() })
    .where(eq(pedidos.id, id))
    .returning();
  return linha ?? null;
}

export async function buscarPedidoPorProtocolo(protocolo: string): Promise<Pedido | null> {
  const db = getDb();
  if (!db) return null;
  const [linha] = await db.select().from(pedidos).where(eq(pedidos.protocolo, protocolo)).limit(1);
  return linha ?? null;
}

export async function listarPedidos(limite = 100): Promise<Pedido[]> {
  const db = getDb();
  if (!db) return [];
  return db.select().from(pedidos).orderBy(desc(pedidos.criadoEm)).limit(limite);
}


export async function registrarConsultaCobertura(dados: {
  cep: string; logradouro?: string; numero?: string; bairro?: string;
  temViabilidade?: boolean; telefone?: string; email?: string; avisarQuandoChegar?: boolean;
}) {
  const db = getDb();
  if (!db) return null;
  const [linha] = await db.insert(consultasCobertura).values(dados).returning();
  return linha;
}
