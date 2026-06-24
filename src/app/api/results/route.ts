import { NextRequest, NextResponse } from "next/server";
import { insertResult, getStats, getLeaderboard } from "@/lib/db";

/** POST — 通关上报 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { studentId, totalScore, durationSeconds } = body;

    if (!studentId || totalScore == null || durationSeconds == null) {
      return NextResponse.json({ error: "缺少必填字段" }, { status: 400 });
    }

    await insertResult(String(studentId), Number(totalScore), Number(durationSeconds));

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("POST /api/results error:", err);
    return NextResponse.json({ error: "服务器错误" }, { status: 500 });
  }
}

/** GET — 查询统计或排行榜 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get("action") || "stats";

    if (action === "leaderboard") {
      const rows = await getLeaderboard();
      return NextResponse.json({ leaderboard: rows });
    }

    const stats = await getStats();
    return NextResponse.json({ stats });
  } catch (err: any) {
    console.error("GET /api/results error:", err);
    return NextResponse.json({ error: "服务器错误" }, { status: 500 });
  }
}
