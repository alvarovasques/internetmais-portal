import { z } from "zod";
import { publicProcedure, router } from "../core/trpc";
import { buscarPlanoPorSlug, listarAplicativos, listarPlanos } from "../repositories/catalogo";

const familias = z.enum(["internet", "internet_aplicativos", "empresarial", "movel_5g", "telefonia_fixa"]);

export const catalogoRouter = router({
  planos: publicProcedure
    .input(z.object({ familia: familias.optional() }).optional())
    .query(({ input }) => listarPlanos(input?.familia)),

  plano: publicProcedure
    .input(z.object({ slug: z.string().min(1) }))
    .query(({ input }) => buscarPlanoPorSlug(input.slug)),

  aplicativos: publicProcedure.query(() => listarAplicativos()),
});
