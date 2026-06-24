import mysql from "mysql2/promise";

let pool: mysql.Pool | null = null;

function getPool(): mysql.Pool {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST || "mysql7.sqlpub.com",
      port: Number(process.env.DB_PORT) || 3312,
      database: process.env.DB_NAME || "lib_hunt_game",
      user: process.env.DB_USER || "game_admin",
      password: process.env.DB_PASSWORD || "",
      charset: "utf8mb4",
      waitForConnections: true,
      connectionLimit: 5,
      connectTimeout: 10000,
      timezone: "+08:00",
    });
  }
  return pool;
}

export interface GameResultRow {
  id: number;
  student_id: string;
  total_score: number;
  duration_seconds: number;
  completed_at: string;
}

export interface StatsResult {
  playerCount: number;
  totalCompletions: number;
  avgScore: number;
  avgDuration: number;
}

/** 保存一条通关记录 */
export async function insertResult(
  studentId: string,
  totalScore: number,
  durationSeconds: number
): Promise<void> {
  const p = getPool();
  await p.execute(
    `INSERT INTO game_results (student_id, total_score, duration_seconds) VALUES (?, ?, ?)`,
    [studentId, totalScore, durationSeconds]
  );
}

/** 统计维度 */
export async function getStats(): Promise<StatsResult> {
  const p = getPool();
  const [rows] = await p.query(
    `SELECT
       COUNT(DISTINCT student_id) AS playerCount,
       COUNT(*)                   AS totalCompletions,
       COALESCE(AVG(total_score), 0)       AS avgScore,
       COALESCE(AVG(duration_seconds), 0)  AS avgDuration
     FROM game_results`
  );
  const r = (rows as any[])[0];
  return {
    playerCount: Number(r.playerCount),
    totalCompletions: Number(r.totalCompletions),
    avgScore: Math.round(Number(r.avgScore)),
    avgDuration: Math.round(Number(r.avgDuration)),
  };
}

/** 排行榜：按分数降序、用时升序 */
export async function getLeaderboard(): Promise<GameResultRow[]> {
  const p = getPool();
  const [rows] = await p.query(
    `SELECT * FROM game_results ORDER BY total_score DESC, duration_seconds ASC LIMIT 100`
  );
  return rows as GameResultRow[];
}
