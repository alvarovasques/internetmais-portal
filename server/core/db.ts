import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "../../drizzle/schema";
import { ENV } from "./env";

let pool: Pool | null = null;
let _db: ReturnType<typeof drizzle<typeof schema>> | null = null;

/**
 * Instância única do Drizzle. Retorna null quando não há DATABASE_URL,
 * para que build, lint e testes rodem sem banco.
 */
export function getDb() {
  if (_db) return _db;
  if (!ENV.databaseUrl) {
    if (ENV.isProduction) throw new Error("DATABASE_URL ausente em produção");
    return null;
  }
  pool = new Pool({
    connectionString: ENV.databaseUrl,
    max: 10,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 10_000,
  });
  pool.on("error", err => console.error("[postgres] erro no pool:", err));
  _db = drizzle(pool, { schema });
  return _db;
}

/** Lança quando o banco é indispensável para a operação. */
export function requireDb() {
  const db = getDb();
  if (!db) throw new Error("Banco de dados indisponível");
  return db;
}

export async function closeDb() {
  await pool?.end();
  pool = null;
  _db = null;
}
