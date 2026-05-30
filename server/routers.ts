import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import { 
  createJob, 
  getActiveJobs, 
  getAllJobs, 
  getJobById, 
  updateJob, 
  deleteJob,
  createApplication,
  getApplicationsByJobId,
  getApplicationById,
  updateApplicationStatus,
  getAllApplications
} from "./db";
import { storagePut } from "./storage";
import { TRPCError } from "@trpc/server";

// Helper para verificar se é admin
const adminProcedure = protectedProcedure.use(async ({ ctx, next }) => {
  if (ctx.user?.role !== 'admin') {
    throw new TRPCError({ code: 'FORBIDDEN', message: 'Admin access required' });
  }
  return next({ ctx });
});

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Jobs - Public procedures
  jobs: router({
    // Listar vagas ativas (público)
    list: publicProcedure.query(async () => {
      return await getActiveJobs();
    }),

    // Obter detalhes de uma vaga (público)
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        const job = await getJobById(input.id);
        if (!job) {
          throw new TRPCError({ code: 'NOT_FOUND', message: 'Job not found' });
        }
        return job;
      }),

    // Criar candidatura (público)
    createApplication: publicProcedure
      .input(z.object({
        jobId: z.number(),
        fullName: z.string().min(1),
        email: z.string().email(),
        phone: z.string().min(1),
        resumeBase64: z.string(),
        resumeFileName: z.string(),
        coverLetter: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        // Verificar se vaga existe
        const job = await getJobById(input.jobId);
        if (!job) {
          throw new TRPCError({ code: 'NOT_FOUND', message: 'Job not found' });
        }

        // Upload do currículo para S3
        try {
          const buffer = Buffer.from(input.resumeBase64, 'base64');
          const fileKey = `resumes/${input.jobId}/${Date.now()}-${input.resumeFileName}`;
          const { url } = await storagePut(fileKey, buffer, 'application/pdf');

          // Criar candidatura
          const application = await createApplication({
            jobId: input.jobId,
            fullName: input.fullName,
            email: input.email,
            phone: input.phone,
            resumeUrl: url,
            resumeFileName: input.resumeFileName,
            coverLetter: input.coverLetter,
          });

          if (!application) {
            throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Failed to create application' });
          }

          return application;
        } catch (error) {
          console.error('Error creating application:', error);
          throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Failed to upload resume' });
        }
      }),

    // Admin: Listar todas as vagas
    listAll: adminProcedure.query(async () => {
      return await getAllJobs();
    }),

    // Admin: Criar vaga
    create: adminProcedure
      .input(z.object({
        title: z.string().min(1),
        description: z.string().min(1),
        requirements: z.string().min(1),
        salary: z.string().optional(),
        location: z.string().min(1),
        jobType: z.enum(['full-time', 'part-time', 'contract', 'temporary']),
      }))
      .mutation(async ({ input }) => {
        const job = await createJob({
          ...input,
          isActive: 1,
        });
        if (!job) {
          throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Failed to create job' });
        }
        return job;
      }),

    // Admin: Atualizar vaga
    update: adminProcedure
      .input(z.object({
        id: z.number(),
        title: z.string().optional(),
        description: z.string().optional(),
        requirements: z.string().optional(),
        salary: z.string().optional(),
        location: z.string().optional(),
        jobType: z.enum(['full-time', 'part-time', 'contract', 'temporary']).optional(),
        isActive: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...updates } = input;
        const job = await updateJob(id, updates);
        if (!job) {
          throw new TRPCError({ code: 'NOT_FOUND', message: 'Job not found' });
        }
        return job;
      }),

    // Admin: Deletar vaga
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        const success = await deleteJob(input.id);
        if (!success) {
          throw new TRPCError({ code: 'NOT_FOUND', message: 'Job not found' });
        }
        return { success: true };
      }),
  }),

  // Applications - Admin procedures
  applications: router({
    // Admin: Listar todas as candidaturas
    listAll: adminProcedure.query(async () => {
      return await getAllApplications();
    }),

    // Admin: Listar candidaturas de uma vaga
    listByJob: adminProcedure
      .input(z.object({ jobId: z.number() }))
      .query(async ({ input }) => {
        return await getApplicationsByJobId(input.jobId);
      }),

    // Admin: Obter detalhes de candidatura
    getById: adminProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        const app = await getApplicationById(input.id);
        if (!app) {
          throw new TRPCError({ code: 'NOT_FOUND', message: 'Application not found' });
        }
        return app;
      }),

    // Admin: Atualizar status da candidatura
    updateStatus: adminProcedure
      .input(z.object({
        id: z.number(),
        status: z.enum(['pending', 'reviewed', 'accepted', 'rejected']),
      }))
      .mutation(async ({ input }) => {
        const app = await updateApplicationStatus(input.id, input.status);
        if (!app) {
          throw new TRPCError({ code: 'NOT_FOUND', message: 'Application not found' });
        }
        return app;
      }),
  }),
});

export type AppRouter = typeof appRouter;
