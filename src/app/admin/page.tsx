"use client";

import { useState, useCallback, useEffect } from "react";
import { TOTAL_MAX_SCORE } from "@/lib/constants";

const calcAccuracy = (score: number) => ((score / TOTAL_MAX_SCORE) * 100).toFixed(1);

interface StatsData {
  playerCount: number;
  totalCompletions: number;
  avgScore: number;
  avgDuration: number;
}

interface LeaderboardRow {
  id: number;
  student_id: string;
  total_score: number;
  duration_seconds: number;
  completed_at: string;
  role: string | null;
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return m > 0 ? `${m}分${s}秒` : `${s}秒`;
}

function formatTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString("zh-CN", { hour12: false });
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pwdInput, setPwdInput] = useState("");
  const [pwdError, setPwdError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [stats, setStats] = useState<StatsData | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardRow[]>([]);

  const [checking, setChecking] = useState(false);

  const handleLogin = async () => {
    if (!pwdInput.trim()) return;
    setChecking(true);
    setPwdError(false);
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pwdInput }),
      });
      const data = await res.json();
      if (data.ok) {
        setAuthed(true);
      } else {
        setPwdError(true);
      }
    } catch {
      setPwdError(true);
    } finally {
      setChecking(false);
    }
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [statsRes, lbRes] = await Promise.all([
        fetch("/api/results?action=stats"),
        fetch("/api/results?action=leaderboard"),
      ]);
      const statsJson = await statsRes.json();
      const lbJson = await lbRes.json();
      if (statsJson.stats) setStats(statsJson.stats);
      if (lbJson.leaderboard) setLeaderboard(lbJson.leaderboard);
    } catch (err) {
      console.error("取得資料失敗", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authed) {
      fetchData();
    }
  }, [authed, fetchData]);

  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0d0d0c] px-4">
        <div className="treasure-panel w-full max-w-sm p-6">
          <h1 className="treasure-title text-center text-2xl">🔐 管理端登入</h1>
          <input
            type="password"
            value={pwdInput}
            onChange={(e) => { setPwdInput(e.target.value); setPwdError(false); }}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            placeholder="請輸入管理密碼"
            className="mt-5 w-full rounded-xl border border-[var(--border)] bg-black/30 px-4 py-2.5 text-sm text-amber-100 placeholder:text-[var(--ink-muted)] focus:border-amber-500/50 focus:outline-none"
            autoFocus
          />
          {pwdError && (
            <p className="mt-2 text-center text-xs text-red-400">密碼錯誤</p>
          )}
          <button
            type="button"
            onClick={handleLogin}
            disabled={checking}
            className="mt-3 w-full rounded-xl border border-amber-500/50 bg-amber-500/20 px-4 py-2.5 text-sm text-amber-100 transition hover:bg-amber-500/30 disabled:opacity-50"
          >
            {checking ? "驗證中…" : "進入"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d0d0c] px-4 py-8">
      <div className="mx-auto max-w-3xl space-y-5">
        {/* 頁頭 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="treasure-title text-2xl text-amber-100">📊 遊戲數據看板</h1>
            <p className="mt-1 text-xs text-[var(--ink-muted)]">圖書館尋寶遊戲 · 通關記錄</p>
          </div>
          <button
            type="button"
            onClick={fetchData}
            disabled={loading}
            className="rounded-xl border border-amber-500/50 bg-amber-500/20 px-4 py-2 text-sm text-amber-100 transition hover:bg-amber-500/30 disabled:opacity-50"
          >
            {loading ? "載入中…" : "重新整理"}
          </button>
        </div>

        {/* 統計卡片 */}
        {stats && (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
            <div className="treasure-panel p-4 text-center">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--ink-muted)]">參與人數</p>
              <p className="treasure-title mt-1 text-3xl text-amber-100">{stats.playerCount}</p>
            </div>
            <div className="treasure-panel p-4 text-center">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--ink-muted)]">通關次數</p>
              <p className="treasure-title mt-1 text-3xl text-amber-100">{stats.totalCompletions}</p>
            </div>
            <div className="treasure-panel p-4 text-center">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--ink-muted)]">平均分</p>
              <p className="treasure-title mt-1 text-3xl text-amber-100">{stats.avgScore}</p>
            </div>
            <div className="treasure-panel p-4 text-center">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--ink-muted)]">平均正確率</p>
              <p className="treasure-title mt-1 text-3xl text-amber-100">
                {stats.avgScore > 0 ? `${calcAccuracy(stats.avgScore)}%` : "-"}
              </p>
            </div>
            <div className="treasure-panel p-4 text-center">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--ink-muted)]">平均耗時</p>
              <p className="treasure-title mt-1 text-3xl text-amber-100">
                {stats.avgDuration > 0 ? formatDuration(stats.avgDuration) : "-"}
              </p>
            </div>
          </div>
        )}

        {/* 排行榜 */}
        <div className="treasure-panel p-5">
          <h2 className="treasure-title text-xl text-amber-100">🏆 排行榜</h2>
          {leaderboard.length === 0 ? (
            <p className="mt-4 text-sm text-[var(--ink-muted)]">
              {loading ? "載入中…" : "暫無數據"}
            </p>
          ) : (
            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)] text-[10px] uppercase tracking-[0.15em] text-[var(--ink-muted)]">
                    <th className="pb-2 pr-3 font-medium">排名</th>
                    <th className="pb-2 pr-3 font-medium">答題人 ID</th>
                    <th className="pb-2 pr-3 font-medium">身分</th>
                    <th className="pb-2 pr-3 font-medium">分數</th>
                    <th className="pb-2 pr-3 font-medium">正確率</th>
                    <th className="pb-2 pr-3 font-medium">耗時</th>
                    <th className="pb-2 font-medium">完成時間</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((row, i) => (
                    <tr key={row.id} className="border-b border-[var(--border)]/50 text-amber-100">
                      <td className="py-2.5 pr-3 text-[var(--ink-muted)]">{i + 1}</td>
                      <td className="py-2.5 pr-3 font-mono text-xs">{row.student_id}</td>
                      <td className="py-2.5 pr-3 text-xs">{row.role === "staff" ? "職員" : row.role === "student" ? "學生" : "-"}</td>
                      <td className="py-2.5 pr-3">{row.total_score}</td>
                      <td className="py-2.5 pr-3">{calcAccuracy(row.total_score)}%</td>
                      <td className="py-2.5 pr-3 text-[var(--ink-muted)]">{formatDuration(row.duration_seconds)}</td>
                      <td className="py-2.5 text-[var(--ink-muted)]">{formatTime(row.completed_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
