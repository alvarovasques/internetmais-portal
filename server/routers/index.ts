import { publicProcedure, router } from "../core/trpc";
import { authRouter } from "./auth";
import { catalogoRouter } from "./catalogo";
import { maistvRouter } from "./maistv";
import { pedidosRouter } from "./pedidos";
import { vagasRouter } from "./vagas";

export const appRouter = router({
  saude: publicProcedure.query(() => ({ ok: true, em: new Date().toISOString() })),
  auth: authRouter,
  catalogo: catalogoRouter,
  pedidos: pedidosRouter,
  vagas: vagasRouter,
  maistv: maistvRouter,
});

export type AppRouter = typeof appRouter;
