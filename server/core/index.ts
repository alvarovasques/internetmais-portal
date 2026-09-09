import express from "express";
import { createServer } from "http";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "../routers/index";
import { createContext } from "./context";
import { ENV, assertProductionEnv } from "./env";
import { aplicarMigracoes } from "./migrar";
import { serveStatic } from "./static";

async function iniciar() {
  assertProductionEnv();
  await aplicarMigracoes();

  const app = express();
  const server = createServer(app);

  // Atrás do Traefik: confia no X-Forwarded-Proto para marcar o cookie como seguro.
  app.set("trust proxy", 1);
  app.use(express.json({ limit: "2mb" }));
  app.use(express.urlencoded({ limit: "2mb", extended: true }));

  app.get("/api/saude", (_req, res) => res.json({ ok: true }));

  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
      onError({ error, path }) {
        if (error.code === "INTERNAL_SERVER_ERROR") {
          console.error(`[trpc] ${path}:`, error.cause ?? error);
        }
      },
    }),
  );

  if (ENV.isProduction) {
    serveStatic(app);
  } else {
    const { setupVite } = await import("./vite");
    await setupVite(app, server);
  }

  server.listen(ENV.port, () => {
    console.log(`Internet Mais rodando em http://localhost:${ENV.port}/`);
  });
}

iniciar().catch(erro => {
  console.error("Falha ao iniciar o servidor:", erro);
  process.exit(1);
});
