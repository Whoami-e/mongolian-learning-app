import { openDatabaseAsync, type SQLiteDatabase } from "expo-sqlite";

import { normalizeProgress, ProgressSnapshot } from "@/src/lib/progressStore";

const DATABASE_NAME = "mongolian-learning-progress.db";
const SNAPSHOT_ID = "local-learner";

let databasePromise: Promise<SQLiteDatabase | null> | null = null;

export async function loadProgressFromSQLite(): Promise<ProgressSnapshot | null> {
  const db = await getDatabase();
  if (!db) {
    return null;
  }

  try {
    const row = await db.getFirstAsync<{ payload: string }>(
      "SELECT payload FROM user_progress_snapshot WHERE id = ?",
      SNAPSHOT_ID
    );

    return row?.payload ? normalizeProgress(JSON.parse(row.payload)) : null;
  } catch {
    return null;
  }
}

export async function saveProgressToSQLite(progress: ProgressSnapshot): Promise<void> {
  const db = await getDatabase();
  if (!db) {
    return;
  }

  try {
    await db.runAsync(
      `INSERT OR REPLACE INTO user_progress_snapshot (id, payload, updated_at)
       VALUES (?, ?, ?)`,
      SNAPSHOT_ID,
      JSON.stringify(progress),
      new Date().toISOString()
    );
  } catch {
    // AsyncStorage remains the compatibility fallback when SQLite writes fail.
  }
}

async function getDatabase() {
  databasePromise ??= openDatabaseAsync(DATABASE_NAME)
    .then(async (db) => {
      await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS user_progress_snapshot (
          id TEXT PRIMARY KEY NOT NULL,
          payload TEXT NOT NULL,
          updated_at TEXT NOT NULL
        );
      `);
      return db;
    })
    .catch(() => null);

  return databasePromise;
}
