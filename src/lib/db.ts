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

/* ---- platform detection ---- */
// Cloudflare Workers runtime: KV bindings available via getCloudflareContext()
// Vercel: has process.env.VERCEL
// Fallback: assume Cloudflare if not Vercel (local dev uses Vercel Blob)
const isVercel = !!process.env.VERCEL;
const isCloudflare = !isVercel;

/* ================================================================
   Cloudflare KV  backend
   ================================================================ */

let _cfKV: any;

async function getCFKV() {
  if (_cfKV !== undefined) return _cfKV;
  try {
    const { getCloudflareContext } = await import("@opennextjs/cloudflare");
    const { env } = getCloudflareContext();
    _cfKV = (env as any).GAME_RESULTS || null;
  } catch {
    _cfKV = null;
  }
  return _cfKV;
}

async function cfGetKV(): Promise<GameData> {
  const kv = await getCFKV();
  if (!kv) return { results: [], nextId: 1 };
  try {
    const raw = await kv.get(DATA_FILE);
    return raw ? (JSON.parse(raw) as GameData) : { results: [], nextId: 1 };
  } catch {
    return { results: [], nextId: 1 };
  }
}

async function cfPutKV(data: GameData): Promise<void> {
  const kv = await getCFKV();
  if (!kv) return;
  await kv.put(DATA_FILE, JSON.stringify(data));
}

/* ================================================================
   Vercel Blob  backend (unchanged)
   ================================================================ */

async function vcReadData(): Promise<GameData> {
  const { list } = await import("@vercel/blob");
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

async function vcWriteData(data: GameData): Promise<void> {
  const { put, list, del } = await import("@vercel/blob");
  try {
    const { blobs } = await list();
    const old = blobs.find((b) => b.pathname === DATA_FILE);
    if (old) await del(old.url);
  } catch {
    // proceed
  }
  await put(DATA_FILE, JSON.stringify(data), { access: "public" });
}

/* ================================================================
   Public API (same signature for both platforms)
   ================================================================ */

export async function insertResult(
  studentId: string,
  totalScore: number,
  durationSeconds: number,
  role?: string | null
): Promise<void> {
  const data = isCloudflare ? await cfGetKV() : await vcReadData();

  const record: GameResultRow = {
    id: data.nextId++,
    student_id: studentId,
    total_score: totalScore,
    duration_seconds: durationSeconds,
    completed_at: new Date().toISOString(),
    role: role ?? null,
  };

  data.results.push(record);

  if (isCloudflare) await cfPutKV(data);
  else await vcWriteData(data);
}

export async function getStats(): Promise<StatsResult> {
  const data = isCloudflare ? await cfGetKV() : await vcReadData();
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

export async function getLeaderboard(): Promise<GameResultRow[]> {
  const data = isCloudflare ? await cfGetKV() : await vcReadData();

  return data.results
    .slice()
    .sort((a, b) =>
      b.total_score !== a.total_score
        ? b.total_score - a.total_score
        : a.duration_seconds - b.duration_seconds
    )
    .slice(0, 100);
}
