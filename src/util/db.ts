import type { DrizzleD1Database } from 'drizzle-orm/d1';
import type * as DatabaseSchema from '../../drizzle/schema';

export * from '../../drizzle/schema';
export type AppDatabase = DrizzleD1Database<typeof DatabaseSchema>;

let db: AppDatabase | undefined;
export function getDB() {
  if (!db) throw new Error('DB not set');
  return db;
}
export async function initializeDbIfNeeded(
  factory: () => Promise<AppDatabase>
) {
  if (!db) db = await factory();
}
