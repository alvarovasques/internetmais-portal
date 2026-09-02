import { and, asc, eq } from "drizzle-orm";
import { getDb } from "../core/db";
import { aplicativos, planos, type Aplicativo, type Plano } from "../../drizzle/schema";

export async function listarPlanos(familia?: Plano["familia"]): Promise<Plano[]> {
  const db = getDb();
  if (!db) return [];
  const filtro = familia
    ? and(eq(planos.ativo, true), eq(planos.familia, familia))
    : eq(planos.ativo, true);
  return db.select().from(planos).where(filtro).orderBy(asc(planos.ordem), asc(planos.id));
}

export async function buscarPlanoPorSlug(slug: string): Promise<Plano | null> {
  const db = getDb();
  if (!db) return null;
  const [linha] = await db.select().from(planos).where(eq(planos.slug, slug)).limit(1);
  return linha ?? null;
}

export async function listarAplicativos(): Promise<Aplicativo[]> {
  const db = getDb();
  if (!db) return [];
  return db
    .select()
    .from(aplicativos)
    .where(eq(aplicativos.ativo, true))
    .orderBy(asc(aplicativos.ordem), asc(aplicativos.nome));
}

export async function buscarPlanoPorId(id: number): Promise<Plano | null> {
  const db = getDb();
  if (!db) return null;
  const [linha] = await db.select().from(planos).where(eq(planos.id, id)).limit(1);
  return linha ?? null;
}
