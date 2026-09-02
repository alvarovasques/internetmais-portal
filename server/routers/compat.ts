/**
 * Camada de compatibilidade temporária.
 *
 * As telas /admin/rh e /vagas ainda falam o vocabulário do schema antigo
 * (jobs, applications, title, isActive, fullName). O schema novo é em
 * português. Em vez de segurar a migração do banco até essas telas serem
 * refeitas no redesign, este adaptador traduz os dois lados.
 *
 * Remover junto com a reescrita dessas páginas.
 */
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { adminProcedure, publicProcedure, router } from "../core/trpc";
import {
  atualizarVaga, buscarVaga, criarCandidatura, criarVaga,
  listarCandidaturas, listarTodasVagas, listarVagasAtivas, removerVaga,
} from "../repositories/vagas";
import type { Candidatura, Vaga } from "../../drizzle/schema";

const tipoAntigoParaNovo = {
  "full-time": "clt", "part-time": "temporario", contract: "pj", temporary: "temporario",
} as const;
const tipoNovoParaAntigo = {
  clt: "full-time", temporario: "temporary", pj: "contract", estagio: "part-time",
} as const;
const statusAntigoParaNovo = {
  pending: "recebida", reviewed: "em_analise", accepted: "aprovada", rejected: "recusada",
} as const;
const statusNovoParaAntigo = {
  recebida: "pending", em_analise: "reviewed", aprovada: "accepted", recusada: "rejected",
} as const;

const paraFormatoAntigoVaga = (v: Vaga) => ({
  id: v.id,
  title: v.titulo,
  description: v.descricao,
  requirements: v.requisitos,
  salary: v.salario,
  location: v.local,
  jobType: tipoNovoParaAntigo[v.tipo],
  isActive: v.ativa ? 1 : 0,
  createdAt: v.criadoEm,
  updatedAt: v.atualizadoEm,
});

const paraFormatoAntigoCandidatura = (c: Candidatura) => ({
  id: c.id,
  jobId: c.vagaId,
  fullName: c.nome,
  email: c.email,
  phone: c.telefone,
  resumeUrl: c.curriculoUrl ?? "",
  resumeFileName: "",
  coverLetter: c.apresentacao,
  status: statusNovoParaAntigo[c.status],
  createdAt: c.criadoEm,
});

const tipoAntigo = z.enum(["full-time", "part-time", "contract", "temporary"]);

export const jobsRouter = router({
  list: publicProcedure.query(async () => (await listarVagasAtivas()).map(paraFormatoAntigoVaga)),

  getById: publicProcedure.input(z.object({ id: z.number() })).query(async ({ input }) => {
    const vaga = await buscarVaga(input.id);
    if (!vaga) throw new TRPCError({ code: "NOT_FOUND", message: "Vaga não encontrada." });
    return paraFormatoAntigoVaga(vaga);
  }),

  createApplication: publicProcedure
    .input(
      z.object({
        jobId: z.number(),
        fullName: z.string().min(1),
        email: z.string().email(),
        phone: z.string().min(1),
        // O upload de arquivo saiu junto com o storage do Manus: por ora, link.
        resumeUrl: z.string().optional(),
        resumeFileName: z.string().optional(),
        coverLetter: z.string().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const candidatura = await criarCandidatura({
        vagaId: input.jobId,
        nome: input.fullName,
        email: input.email,
        telefone: input.phone,
        curriculoUrl: input.resumeUrl,
        apresentacao: input.coverLetter,
      });
      return paraFormatoAntigoCandidatura(candidatura);
    }),

  listAll: adminProcedure.query(async () => (await listarTodasVagas()).map(paraFormatoAntigoVaga)),

  create: adminProcedure
    .input(
      z.object({
        title: z.string().min(1),
        description: z.string().min(1),
        requirements: z.string().min(1),
        salary: z.string().optional(),
        location: z.string().min(1),
        jobType: tipoAntigo,
      }),
    )
    .mutation(async ({ input }) =>
      paraFormatoAntigoVaga(
        await criarVaga({
          titulo: input.title,
          descricao: input.description,
          requisitos: input.requirements,
          salario: input.salary,
          local: input.location,
          tipo: tipoAntigoParaNovo[input.jobType],
        }),
      ),
    ),

  update: adminProcedure
    .input(
      z.object({
        id: z.number(),
        title: z.string().optional(),
        description: z.string().optional(),
        requirements: z.string().optional(),
        salary: z.string().optional(),
        location: z.string().optional(),
        jobType: tipoAntigo.optional(),
        isActive: z.number().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const vaga = await atualizarVaga(input.id, {
        titulo: input.title,
        descricao: input.description,
        requisitos: input.requirements,
        salario: input.salary,
        local: input.location,
        tipo: input.jobType ? tipoAntigoParaNovo[input.jobType] : undefined,
        ativa: input.isActive === undefined ? undefined : input.isActive === 1,
      });
      if (!vaga) throw new TRPCError({ code: "NOT_FOUND" });
      return paraFormatoAntigoVaga(vaga);
    }),

  delete: adminProcedure.input(z.object({ id: z.number() })).mutation(async ({ input }) => {
    await removerVaga(input.id);
    return { success: true };
  }),
});

export const applicationsRouter = router({
  listAll: adminProcedure.query(async () => (await listarCandidaturas()).map(paraFormatoAntigoCandidatura)),

  listByJob: adminProcedure.input(z.object({ jobId: z.number() })).query(async ({ input }) =>
    (await listarCandidaturas(input.jobId)).map(paraFormatoAntigoCandidatura),
  ),

  updateStatus: adminProcedure
    .input(z.object({ id: z.number(), status: z.enum(["pending", "reviewed", "accepted", "rejected"]) }))
    .mutation(async ({ input }) => {
      const { atualizarStatusCandidatura } = await import("../repositories/vagas");
      const candidatura = await atualizarStatusCandidatura(input.id, statusAntigoParaNovo[input.status]);
      if (!candidatura) throw new TRPCError({ code: "NOT_FOUND" });
      return paraFormatoAntigoCandidatura(candidatura);
    }),
});
