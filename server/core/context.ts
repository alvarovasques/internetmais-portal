import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { COOKIE_SESSAO, lerSessao, type Sessao } from "./session";

export type TrpcContext = {
  req: CreateExpressContextOptions["req"];
  res: CreateExpressContextOptions["res"];
  sessao: Sessao | null;
};

function lerCookie(cabecalho: string | undefined, nome: string): string | undefined {
  if (!cabecalho) return undefined;
  for (const parte of cabecalho.split(";")) {
    const [chave, ...resto] = parte.trim().split("=");
    if (chave === nome) return decodeURIComponent(resto.join("="));
  }
  return undefined;
}

export async function createContext(opts: CreateExpressContextOptions): Promise<TrpcContext> {
  const token = lerCookie(opts.req.headers.cookie, COOKIE_SESSAO);
  return {
    req: opts.req,
    res: opts.res,
    sessao: await lerSessao(token),
  };
}
