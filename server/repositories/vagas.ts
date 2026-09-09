import { desc, eq } from "drizzle-orm";
import { getDb, requireDb } from "../core/db";
import {
  candidaturas, vagas,
  type Candidatura, type NovaCandidatura, type NovaVaga, type Vaga,
} from "../../drizzle/schema";

export async function listarVagasAtivas(): Promise<Vaga[]> {
  const db = getDb();
  if (!db) return [];
  return db.select().from(vagas).where(eq(vagas.ativa, true)).orderBy(desc(vagas.criadoEm));
}

export async function listarTodasVagas(): Promise<Vaga[]> {
  const db = getDb();
  if (!db) return [];
  return db.select().from(vagas).orderBy(desc(vagas.criadoEm));
}

export async function buscarVaga(id: number): Promise<Vaga | null> {
  const db = getDb();
  if (!db) return null;
  const [linha] = await db.select().from(vagas).where(eq(vagas.id, id)).limit(1);
  return linha ?? null;
}

export async function criarVaga(dados: NovaVaga): Promise<Vaga> {
  const [linha] = await requireDb().insert(vagas).values(dados).returning();
  return linha;
}

export async function atualizarVaga(id: number, dados: Partial<NovaVaga>): Promise<Vaga | null> {
  const [linha] = await requireDb()
    .update(vagas).set({ ...dados, atualizadoEm: new Date() })
    .where(eq(vagas.id, id)).returning();
  return linha ?? null;
}

export async function removerVaga(id: number): Promise<void> {
  await requireDb().delete(vagas).where(eq(vagas.id, id));
}

export async function criarCandidatura(dados: NovaCandidatura): Promise<Candidatura> {
  const [linha] = await requireDb().insert(candidaturas).values(dados).returning();
  return linha;
}

export async function listarCandidaturas(vagaId?: number): Promise<Candidatura[]> {
  const db = getDb();
  if (!db) return [];
  const consulta = db.select().from(candidaturas);
  const linhas = vagaId
    ? await consulta.where(eq(candidaturas.vagaId, vagaId)).orderBy(desc(candidaturas.criadoEm))
    : await consulta.orderBy(desc(candidaturas.criadoEm));
  return linhas;
}

export async function atualizarStatusCandidatura(
  id: number,
  status: Candidatura["status"],
): Promise<Candidatura | null> {
  const [linha] = await requireDb()
    .update(candidaturas).set({ status })
    .where(eq(candidaturas.id, id)).returning();
  return linha ?? null;
}
