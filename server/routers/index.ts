import { publicProcedure, router } from "../core/trpc";
import { authRouter } from "./auth";
import { catalogoRouter } from "./catalogo";
import { applicationsRouter, jobsRouter } from "./compat";
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

  // Compatibilidade com as telas antigas de RH. Sai no redesign dessas páginas.
  jobs: jobsRouter,
  applications: applicationsRouter,
});

export type AppRouter = typeof appRouter;
