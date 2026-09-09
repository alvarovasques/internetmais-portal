import { SignJWT, jwtVerify } from "jose";
import type { CookieOptions, Request, Response } from "express";
import { ENV } from "./env";

export const COOKIE_SESSAO = "im_sessao";
const DURACAO_SEGUNDOS = 60 * 60 * 12; // 12 horas

export type Sessao = {
  usuarioId: number;
  email: string;
  papel: "admin" | "operador";
};

/**
 * Sem SESSION_SECRET não existe sessão.
 *
 * Isto é uma trava de segurança, não uma conveniência: assinar um JWT com
 * chave vazia produz um token que qualquer um forja, e o token carrega o
 * papel de admin. Melhor o painel ficar indisponível do que aberto.
 */
function chave() {
  if (!ENV.sessionSecret) {
    throw new Error(
      "SESSION_SECRET não configurado: o painel administrativo está indisponível nesta instância.",
    );
  }
  return new TextEncoder().encode(ENV.sessionSecret);
}

/** Para as camadas de cima decidirem antes de tentar assinar. */
export function sessoesDisponiveis(): boolean {
  return Boolean(ENV.sessionSecret);
}

export async function assinarSessao(sessao: Sessao): Promise<string> {
  return new SignJWT({ email: sessao.email, papel: sessao.papel })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(String(sessao.usuarioId))
    .setIssuedAt()
    .setExpirationTime(`${DURACAO_SEGUNDOS}s`)
    .sign(chave());
}

export async function lerSessao(token: string | undefined): Promise<Sessao | null> {
  if (!token || !ENV.sessionSecret) return null;
  try {
    const { payload } = await jwtVerify(token, chave(), { algorithms: ["HS256"] });
    const usuarioId = Number(payload.sub);
    if (!Number.isInteger(usuarioId)) return null;
    return {
      usuarioId,
      email: String(payload.email ?? ""),
      papel: payload.papel === "admin" ? "admin" : "operador",
    };
  } catch {
    return null;
  }
}

function opcoesCookie(req: Request): CookieOptions {
  const encaminhado = req.headers["x-forwarded-proto"];
  const lista = Array.isArray(encaminhado) ? encaminhado : (encaminhado ?? "").split(",");
  const seguro = req.protocol === "https" || lista.some(p => p.trim().toLowerCase() === "https");
  return {
    httpOnly: true,
    path: "/",
    // lax é suficiente: o login acontece no mesmo site, e evita o cookie
    // ser recusado por navegadores que bloqueiam SameSite=None sem Secure.
    sameSite: "lax",
    secure: seguro,
    maxAge: DURACAO_SEGUNDOS * 1000,
  };
}

export function gravarCookieSessao(req: Request, res: Response, token: string) {
  res.cookie(COOKIE_SESSAO, token, opcoesCookie(req));
}

export function limparCookieSessao(req: Request, res: Response) {
  res.clearCookie(COOKIE_SESSAO, { ...opcoesCookie(req), maxAge: undefined });
}
