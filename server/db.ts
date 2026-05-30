import { eq, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, jobs, applications, InsertJob, InsertApplication, Job, Application } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// TODO: add feature queries here as your schema grows.

// Jobs queries
export async function createJob(job: InsertJob): Promise<Job | null> {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db.insert(jobs).values(job);
  const jobId = result[0]?.insertId;
  if (!jobId) return null;
  
  const created = await db.select().from(jobs).where(eq(jobs.id, jobId as number)).limit(1);
  return created[0] || null;
}

export async function getActiveJobs(): Promise<Job[]> {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(jobs).where(eq(jobs.isActive, 1)).orderBy(desc(jobs.createdAt));
}

export async function getAllJobs(): Promise<Job[]> {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(jobs).orderBy(desc(jobs.createdAt));
}

export async function getJobById(id: number): Promise<Job | null> {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db.select().from(jobs).where(eq(jobs.id, id)).limit(1);
  return result[0] || null;
}

export async function updateJob(id: number, updates: Partial<InsertJob>): Promise<Job | null> {
  const db = await getDb();
  if (!db) return null;
  
  await db.update(jobs).set(updates).where(eq(jobs.id, id));
  return await getJobById(id);
}

export async function deleteJob(id: number): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;
  
  await db.delete(jobs).where(eq(jobs.id, id));
  return true;
}

// Applications queries
export async function createApplication(app: InsertApplication): Promise<Application | null> {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db.insert(applications).values(app);
  const appId = result[0]?.insertId;
  if (!appId) return null;
  
  const created = await db.select().from(applications).where(eq(applications.id, appId as number)).limit(1);
  return created[0] || null;
}

export async function getApplicationsByJobId(jobId: number): Promise<Application[]> {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(applications).where(eq(applications.jobId, jobId)).orderBy(desc(applications.createdAt));
}

export async function getApplicationById(id: number): Promise<Application | null> {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db.select().from(applications).where(eq(applications.id, id)).limit(1);
  return result[0] || null;
}

export async function updateApplicationStatus(id: number, status: string): Promise<Application | null> {
  const db = await getDb();
  if (!db) return null;
  
  await db.update(applications).set({ status: status as any }).where(eq(applications.id, id));
  return await getApplicationById(id);
}

export async function getAllApplications(): Promise<Application[]> {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(applications).orderBy(desc(applications.createdAt));
}
