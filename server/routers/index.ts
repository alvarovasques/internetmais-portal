import { publicProcedure, router } from "../core/trpc";
import { authRouter } from "./auth";
import { catalogoRouter } from "./catalogo";
import { maistvRouter } from "./maistv";
import { vagasRouter } from "./vagas";

/**
 * A venda pelo site é a fase 3, e até lá `pedidosRouter` fica de fora daqui.
 *
 * Não basta não ter tela: enquanto o router estava montado, o endpoint tRPC
 * respondia a quem chamasse direto, e ele cria pedido, recebe documento de
 * cliente e conversa com cobrança. Deixar um checkout incompleto respondendo
 * na internet aberta é risco sem contrapartida, já que ninguém o usa.
 *
 * O código continua no repositório, intacto, em `server/routers/pedidos.ts`,
 * `server/repositories/pedidos.ts` e `server/services/contratacao.ts`. Para
 * religar na fase 3 é reimportar e devolver a linha `pedidos: pedidosRouter`
 * — e aí, sim, revisar as regras de cobrança pelo IXC antes de publicar.
 */
export const appRouter = router({
  saude: publicProcedure.query(() => ({ ok: true, em: new Date().toISOString() })),
  auth: authRouter,
  catalogo: catalogoRouter,
  vagas: vagasRouter,
  maistv: maistvRouter,
});

export type AppRouter = typeof appRouter;
