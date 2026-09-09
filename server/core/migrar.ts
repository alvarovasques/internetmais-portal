import { migrate } from "drizzle-orm/node-postgres/migrator";
import { getDb } from "./db";
import { ENV } from "./env";

/**
 * Aplica as migrações pendentes na subida do servidor.
 *
 * O motivo é prático: a imagem de runtime instala com --omit=dev, então
 * drizzle-kit e tsx não existem lá dentro, e a pasta scripts/ não é copiada.
 * Sem isto, `npm run db:migrate` só roda em uma máquina com o repositório
 * inteiro e as dependências de desenvolvimento, o que transforma toda subida
 * nova em um passo manual fácil de esquecer, e o esquecimento aparece como
 * "relation does not exist" na primeira visita à página de vagas.
 *
 * A pasta drizzle/migrations vai na imagem, e o migrator do Drizzle é
 * idempotente: ele mantém a própria tabela de controle e não reaplica o que
 * já rodou. Com duas réplicas subindo juntas, quem chegar depois não encontra
 * nada pendente.
 *
 * Falha aqui derruba a subida de propósito. Servir o site com o schema errado
 * é pior do que não subir: o container reinicia e o Swarm mantém a versão
 * anterior no ar por causa do start-first.
 */
export async function aplicarMigracoes(): Promise<void> {
  const db = getDb();
  if (!db) {
    if (ENV.isProduction) throw new Error("DATABASE_URL ausente em produção");
    console.warn("[migrações] sem DATABASE_URL, pulando");
    return;
  }

  const inicio = Date.now();
  await migrate(db, { migrationsFolder: "drizzle/migrations" });
  console.log(`[migrações] em dia (${Date.now() - inicio}ms)`);
}
