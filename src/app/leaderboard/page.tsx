"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthGate } from "@/components/auth-gate";
import { GameHeader } from "@/components/game-header";
import { LEVELS } from "@/data/levels";
import { TOTAL_LEVELS } from "@/lib/constants";
import { useGameStore } from "@/store/game-store";

const formatLevel = (level: number) => String(level).padStart(2, "0");

export default function LeaderboardPage() {
  const router = useRouter();
  const totalScore = useGameStore((state) => state.totalScore);
  const levelResults = useGameStore((state) => state.levelResults);
  const resetProgress = useGameStore((state) => state.resetProgress);

  const completedCount = Object.keys(levelResults).length;
  const allCompleted = completedCount >= TOTAL_LEVELS;

  return (
    <AuthGate>
      <div className="pb-8">
        <GameHeader title="积分板总览" subtitle={allCompleted ? "恭喜完成全部关卡" : "继续挑战以解锁完整积分板"} showLeaderboardLink={false} />

        <main className="mx-auto mt-5 w-[min(980px,92vw)] space-y-4">
          <section className="treasure-panel p-5">
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--ink-muted)]">Final Score</p>
            <h2 className="treasure-title mt-2 text-4xl text-amber-100">{totalScore}</h2>
            <p className="mt-2 text-sm text-[var(--ink-muted)]">完成进度: {completedCount}/{TOTAL_LEVELS}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                href="/map"
                className="rounded-xl border border-[var(--border)] bg-black/25 px-4 py-2 text-sm transition hover:bg-black/35"
              >
                返回地图
              </Link>
              <button
                type="button"
                onClick={() => {
                  resetProgress();
                  router.push("/map");
                }}
                className="rounded-xl border border-amber-500/50 bg-amber-500/20 px-4 py-2 text-sm text-amber-100 transition hover:bg-amber-500/30"
              >
                重置进度并重玩
              </button>
            </div>
          </section>

          <section className="treasure-panel p-5">
            <h3 className="treasure-title text-xl">关卡明细</h3>
            <div className="mt-3 space-y-2">
              {LEVELS.map((level) => {
                const result = levelResults[level.level];
                return (
                  <div
                    key={level.level}
                    className="flex items-center justify-between rounded-xl border border-[var(--border)] bg-black/20 px-3 py-2 text-sm"
                  >
                    <span>
                      第 {formatLevel(level.level)} 关 · {level.title}
                    </span>
                    <span className="text-[var(--ink-muted)]">{result ? `${result.score} 分` : "未完成"}</span>
                  </div>
                );
              })}
            </div>
          </section>
        </main>
      </div>
    </AuthGate>
  );
}
