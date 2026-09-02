import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { adminProcedure, protectedProcedure, publicProcedure, router } from "../core/trpc";
import { hashSenha, verificarSenha } from "../core/password";
import { gerarSegredoTotp, uriTotp, verificarTotp } from "../core/totp";
import { assinarSessao, gravarCookieSessao, limparCookieSessao } from "../core/session";
import { ENV } from "../core/env";
import {
  atualizarUsuario, buscarUsuario, buscarUsuarioPorEmail, criarUsuario, registrarAcesso,
} from "../repositories/usuarios";

/** Atraso fixo em falha de login: encarece a força bruta e nivela o tempo de resposta. */
const ATRASO_FALHA_MS = 400;
const esperar = (ms: number) => new Promise(r => setTimeout(r, ms));

const CREDENCIAL_INVALIDA = "E-mail, senha ou código inválidos.";

export const authRouter = router({
  /** Sessão atual, ou null. Nunca devolve hash nem segredo TOTP. */
  eu: publicProcedure.query(async ({ ctx }) => {
    if (!ctx.sessao) return null;
    const usuario = await buscarUsuario(ctx.sessao.usuarioId);
    if (!usuario || !usuario.ativo) return null;
    return {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      papel: usuario.papel,
      totpAtivo: usuario.totpAtivo,
    };
  }),

  entrar: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        senha: z.string().min(1),
        /** Obrigatório quando o usuário já ativou o segundo fator. */
        codigo: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const usuario = await buscarUsuarioPorEmail(input.email);

      // Mesmo sem usuário, gastamos tempo comparável para não vazar quais e-mails existem.
      const senhaConfere = usuario
        ? await verificarSenha(input.senha, usuario.senhaHash)
        : await verificarSenha(input.senha, "scrypt$32768$8$1$AAAA$AAAA");

      if (!usuario || !usuario.ativo || !senhaConfere) {
        await esperar(ATRASO_FALHA_MS);
        throw new TRPCError({ code: "UNAUTHORIZED", message: CREDENCIAL_INVALIDA });
      }

      if (usuario.totpAtivo) {
        if (!input.codigo) {
          // Não é erro de credencial: a senha passou, falta o segundo fator.
          return { precisaCodigo: true as const };
        }
        if (!usuario.totpSegredo || !verificarTotp(usuario.totpSegredo, input.codigo)) {
          await esperar(ATRASO_FALHA_MS);
          throw new TRPCError({ code: "UNAUTHORIZED", message: CREDENCIAL_INVALIDA });
        }
      }

      const token = await assinarSessao({
        usuarioId: usuario.id,
        email: usuario.email,
        papel: usuario.papel,
      });
      gravarCookieSessao(ctx.req, ctx.res, token);
      await registrarAcesso(usuario.id);

      return {
        precisaCodigo: false as const,
        usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email, papel: usuario.papel },
        /** Avisa o operador que a conta ainda está sem segundo fator. */
        segundoFatorPendente: !usuario.totpAtivo,
      };
    }),

  sair: publicProcedure.mutation(({ ctx }) => {
    limparCookieSessao(ctx.req, ctx.res);
    return { ok: true };
  }),

  /** Passo 1 do cadastro do segundo fator: gera o segredo e devolve o URI do QR Code. */
  prepararSegundoFator: protectedProcedure.mutation(async ({ ctx }) => {
    const usuario = await buscarUsuario(ctx.sessao.usuarioId);
    if (!usuario) throw new TRPCError({ code: "NOT_FOUND" });
    if (usuario.totpAtivo) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Segundo fator já está ativo." });
    }
    const segredo = gerarSegredoTotp();
    await atualizarUsuario(usuario.id, { totpSegredo: segredo, totpAtivo: false });
    return { segredo, uri: uriTotp(segredo, usuario.email, ENV.totpIssuer) };
  }),

  /** Passo 2: confirma com um código válido antes de exigir o fator no próximo login. */
  ativarSegundoFator: protectedProcedure
    .input(z.object({ codigo: z.string().min(6) }))
    .mutation(async ({ ctx, input }) => {
      const usuario = await buscarUsuario(ctx.sessao.usuarioId);
      if (!usuario?.totpSegredo) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Gere o segredo antes de ativar." });
      }
      if (!verificarTotp(usuario.totpSegredo, input.codigo)) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Código inválido. Confira o relógio do aparelho." });
      }
      await atualizarUsuario(usuario.id, { totpAtivo: true });
      return { ok: true };
    }),

  trocarSenha: protectedProcedure
    .input(z.object({ senhaAtual: z.string().min(1), senhaNova: z.string().min(10) }))
    .mutation(async ({ ctx, input }) => {
      const usuario = await buscarUsuario(ctx.sessao.usuarioId);
      if (!usuario || !(await verificarSenha(input.senhaAtual, usuario.senhaHash))) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Senha atual incorreta." });
      }
      await atualizarUsuario(usuario.id, { senhaHash: await hashSenha(input.senhaNova) });
      return { ok: true };
    }),

  criarUsuario: adminProcedure
    .input(
      z.object({
        nome: z.string().min(2),
        email: z.string().email(),
        senha: z.string().min(10),
        papel: z.enum(["admin", "operador"]).default("operador"),
      }),
    )
    .mutation(async ({ input }) => {
      if (await buscarUsuarioPorEmail(input.email)) {
        throw new TRPCError({ code: "CONFLICT", message: "Já existe usuário com esse e-mail." });
      }
      const usuario = await criarUsuario({
        nome: input.nome,
        email: input.email,
        senhaHash: await hashSenha(input.senha),
        papel: input.papel,
      });
      return { id: usuario.id, email: usuario.email, papel: usuario.papel };
    }),
});
