import { eq } from "drizzle-orm";
import { getDb, requireDb } from "../core/db";
import { usuarios, type NovoUsuario, type Usuario } from "../../drizzle/schema";

export async function buscarUsuarioPorEmail(email: string): Promise<Usuario | null> {
  const db = getDb();
  if (!db) return null;
  const [linha] = await db
    .select().from(usuarios)
    .where(eq(usuarios.email, email.trim().toLowerCase()))
    .limit(1);
  return linha ?? null;
}

export async function buscarUsuario(id: number): Promise<Usuario | null> {
  const db = getDb();
  if (!db) return null;
  const [linha] = await db.select().from(usuarios).where(eq(usuarios.id, id)).limit(1);
  return linha ?? null;
}

export async function criarUsuario(dados: NovoUsuario): Promise<Usuario> {
  const [linha] = await requireDb()
    .insert(usuarios)
    .values({ ...dados, email: dados.email.trim().toLowerCase() })
    .returning();
  return linha;
}

export async function atualizarUsuario(id: number, dados: Partial<NovoUsuario>): Promise<Usuario | null> {
  const [linha] = await requireDb()
    .update(usuarios).set({ ...dados, atualizadoEm: new Date() })
    .where(eq(usuarios.id, id)).returning();
  return linha ?? null;
}

export async function registrarAcesso(id: number): Promise<void> {
  const db = getDb();
  if (!db) return;
  await db.update(usuarios).set({ ultimoAcesso: new Date() }).where(eq(usuarios.id, id));
}
