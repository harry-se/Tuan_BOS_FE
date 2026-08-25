// Minimal record-keeping store for leads/orders/applications (requirement
// FR-04/FR-05/19.3 "member database, consent và phân nhóm"). No database is
// provisioned yet, so records are appended to local JSON files under
// .data/ (gitignored). This works for local development and demoing the
// flows end-to-end, but most serverless hosts (e.g. Vercel) have a
// read-only/ephemeral filesystem in production — swap `store` below for a
// real database (Postgres/Supabase/etc.) before go-live. Every API route
// only depends on the Store interface, so the swap is localized here.
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), ".data");

export type RecordKind =
  | "contact-leads"
  | "newsletter-subscribers"
  | "assessment-results"
  | "community-applications"
  | "orders";

async function readAll<T>(kind: RecordKind): Promise<T[]> {
  try {
    const raw = await readFile(path.join(DATA_DIR, `${kind}.json`), "utf-8");
    return JSON.parse(raw) as T[];
  } catch {
    return [];
  }
}

async function appendRecord<T extends object>(kind: RecordKind, record: T): Promise<T> {
  await mkdir(DATA_DIR, { recursive: true });
  const existing = await readAll<T>(kind);
  const withMeta = { ...record, _id: `${kind}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, _createdAt: new Date().toISOString() };
  existing.push(withMeta as T);
  await writeFile(path.join(DATA_DIR, `${kind}.json`), JSON.stringify(existing, null, 2), "utf-8");
  return withMeta as T;
}

export const store = {
  append: appendRecord,
  all: readAll,
};
