import { ProgressSnapshot } from "@/src/lib/progressStore";

export async function loadProgressFromSQLite(): Promise<ProgressSnapshot | null> {
  return null;
}

export async function saveProgressToSQLite(_progress: ProgressSnapshot): Promise<void> {
  // Web keeps using AsyncStorage because expo-sqlite's web bundle requires a wasm asset not present here.
}
