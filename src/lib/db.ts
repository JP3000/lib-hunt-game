import { put, list, del } from "@vercel/blob";

const DATA_FILE = "game-results.json";

export interface GameResultRow {
  id: number;
  student_id: string;
  total_score: number;
  duration_seconds: number;
  completed_at: string;
  role: string | null;
}

export interface StatsResult {
  playerCount: number;
  totalCompletions: number;
  avgScore: number;
  avgDuration: number;
}

interface GameData {
  results: GameResultRow[];
  nextId: number;
}

/** Read game data blob, returns default if not found */
async function readData(): Promise<GameData> {
  try {
    const { blobs } = await list();
    const blob = blobs.find((b) => b.pathname === DATA_FILE);
    if (!blob) return { results: [], nextId: 1 };
    const res = await fetch(blob.url);
    return res.json();
  } catch {
    return { results: [], nextId: 1 };
  }
}

/** Replace old blob with new data */
async function writeData(data: GameData): Promise<void> {
  try {
    const { blobs } = await list();
    const old = blobs.find((b) => b.pathname === DATA_FILE);
    if (old) await del(old.url);
  } catch {
    // If delete fails (e.g. blob doesn't exist), proceed
  }
  await put(DATA_FILE, JSON.stringify(data), { access: "public" });
}

/** Save a game completion record */
export async function insertResult(
  studentId: string,
  totalScore: number,
  durationSeconds: number,
  role?: string | null
): Promise<void> {
  const data = await readData();

  const record: GameResultRow = {
    id: data.nextId++,
    student_id: studentId,
    total_score: totalScore,
    duration_seconds: durationSeconds,
    completed_at: new Date().toISOString(),
    role: role ?? null,
  };

  data.results.push(record);
  await writeData(data);
}

/** Compute aggregate statistics */
export async function getStats(): Promise<StatsResult> {
  const data = await readData();
  const { results } = data;

  if (results.length === 0) {
    return { playerCount: 0, totalCompletions: 0, avgScore: 0, avgDuration: 0 };
  }

  const playerIds = new Set(results.map((r) => r.student_id));
  const totalScore = results.reduce((sum, r) => sum + r.total_score, 0);
  const totalDuration = results.reduce((sum, r) => sum + r.duration_seconds, 0);

  return {
    playerCount: playerIds.size,
    totalCompletions: results.length,
    avgScore: Math.round(totalScore / results.length),
    avgDuration: Math.round(totalDuration / results.length),
  };
}

/** Leaderboard: top 100, sorted by score desc then duration asc */
export async function getLeaderboard(): Promise<GameResultRow[]> {
  const data = await readData();

  return data.results
    .slice()
    .sort((a, b) =>
      b.total_score !== a.total_score
        ? b.total_score - a.total_score
        : a.duration_seconds - b.duration_seconds
    )
    .slice(0, 100);
}
