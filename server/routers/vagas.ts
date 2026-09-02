import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { adminProcedure, publicProcedure, router } from "../core/trpc";
import {
  atualizarVaga, buscarVaga, criarCandidatura, criarVaga,
  listarCandidaturas, listarTodasVagas, listarVagasAtivas, removerVaga,
} from "../repositories/vagas";

const tipos = z.enum(["clt", "estagio", "temporario", "pj"]);

export const vagasRouter = router({
  listar: publicProcedure.query(() => listarVagasAtivas()),

  detalhe: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const vaga = await buscarVaga(input.id);
      if (!vaga || !vaga.ativa) throw new TRPCError({ code: "NOT_FOUND", message: "Vaga não encontrada." });
      return vaga;
    }),

  candidatar: publicProcedure
    .input(
      z.object({
        vagaId: z.number(),
        nome: z.string().min(3),
        email: z.string().email(),
        telefone: z.string().min(10),
        /** Link do currículo. O upload próprio volta quando houver storage na VPS. */
        curriculoUrl: z.string().url().optional(),
        apresentacao: z.string().max(4000).optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const vaga = await buscarVaga(input.vagaId);
      if (!vaga || !vaga.ativa) throw new TRPCError({ code: "NOT_FOUND", message: "Vaga não encontrada." });
      const candidatura = await criarCandidatura(input);
      return { id: candidatura.id };
    }),

  listarTodas: adminProcedure.query(() => listarTodasVagas()),

  criar: adminProcedure
    .input(
      z.object({
        titulo: z.string().min(3),
        descricao: z.string().min(10),
        requisitos: z.string().min(3),
        salario: z.string().optional(),
        local: z.string().min(2),
        tipo: tipos,
      }),
    )
    .mutation(({ input }) => criarVaga(input)),

  atualizar: adminProcedure
    .input(
      z.object({
        id: z.number(),
        titulo: z.string().optional(),
        descricao: z.string().optional(),
        requisitos: z.string().optional(),
        salario: z.string().optional(),
        local: z.string().optional(),
        tipo: tipos.optional(),
        ativa: z.boolean().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const { id, ...dados } = input;
      const vaga = await atualizarVaga(id, dados);
      if (!vaga) throw new TRPCError({ code: "NOT_FOUND" });
      return vaga;
    }),

  remover: adminProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      await removerVaga(input.id);
      return { ok: true };
    }),

  candidaturas: adminProcedure
    .input(z.object({ vagaId: z.number().optional() }).optional())
    .query(({ input }) => listarCandidaturas(input?.vagaId)),
});
