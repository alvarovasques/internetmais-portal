import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { publicProcedure, router } from "../core/trpc";

/**
 * Proxy do login da MaisTV feito no servidor: evita CORS e tira o rate limit
 * do IP do assinante. O cache guarda o token por 55 minutos.
 */
const cache = new Map<string, { data: unknown; expiraEm: number }>();
const TTL_MS = 55 * 60 * 1000;

export const maistvRouter = router({
  login: publicProcedure
    .input(z.object({ username: z.string().min(1), password: z.string().min(1) }))
    .mutation(async ({ input }) => {
      const chave = `${input.username}:${input.password}`;
      const emCache = cache.get(chave);
      if (emCache && emCache.expiraEm > Date.now()) {
        return { success: true, data: emCache.data };
      }

      let resposta: Response;
      try {
        resposta = await fetch("https://maistv.internetmais.net/auth", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Origin: "https://maistv.internetmais.net",
            Referer: "https://maistv.internetmais.net/login",
          },
          body: JSON.stringify({
            username: input.username,
            password: input.password,
            location: { latitude: null, longitude: null },
          }),
        });
      } catch (erro) {
        console.error("[MaisTV] falha de rede:", erro);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Erro ao conectar com a MaisTV. Tente novamente.",
        });
      }

      if (resposta.status === 429) {
        throw new TRPCError({
          code: "TOO_MANY_REQUESTS",
          message: "Muitas tentativas. Aguarde alguns segundos antes de tentar novamente.",
        });
      }
      if (!resposta.ok) {
        cache.delete(chave);
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Usuário ou senha inválidos. Verifique seus dados e tente novamente.",
        });
      }

      const data = await resposta.json();
      cache.set(chave, { data, expiraEm: Date.now() + TTL_MS });
      return { success: true, data };
    }),
});
