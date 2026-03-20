"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { AuthGate } from "@/components/auth-gate";
import { GameHeader } from "@/components/game-header";
import { LEVELS } from "@/data/levels";
import { TOTAL_LEVELS } from "@/lib/constants";
import { useGameStore } from "@/store/game-store";

const formatLevel = (level: number) => String(level).padStart(2, "0");

export default function MapPage() {
  const unlockedLevel = useGameStore((state) => state.unlockedLevel);
  const totalScore = useGameStore((state) => state.totalScore);
  const levelResults = useGameStore((state) => state.levelResults);

  const completedCount = Object.keys(levelResults).length;

  return (
    <AuthGate>
      <div className="pb-8">
        <GameHeader
          title="寻宝地图"
          subtitle={`已完成 ${completedCount}/${TOTAL_LEVELS} 关 · 当前总分 ${totalScore}`}
          showMapLink={false}
        />

        <main className="map-grid treasure-panel mx-auto mt-5 w-[min(980px,92vw)] p-4 md:p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="treasure-title text-2xl">失落宝藏路线</h2>
            <Link
              href="/leaderboard"
              className="rounded-full border border-[var(--border)] bg-black/20 px-3 py-1 text-sm transition hover:bg-black/30"
            >
              查看积分板
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {LEVELS.map((level, index) => {
              const path = `/levels/${formatLevel(level.level)}`;
              const isCompleted = Boolean(levelResults[level.level]);
              const isUnlocked = level.level <= unlockedLevel || isCompleted;

              return (
                <motion.div
                  key={level.level}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04, duration: 0.35 }}
                >
                  {isUnlocked ? (
                    <Link
                      href={path}
                      className="block rounded-2xl border border-[var(--border)] bg-black/25 p-3 transition hover:-translate-y-0.5 hover:bg-black/35"
                    >
                      <p className="text-xs uppercase tracking-[0.2em] text-[var(--ink-muted)]">
                        Level {formatLevel(level.level)}
                      </p>
                      <p className="treasure-title mt-1 text-lg">{level.title}</p>
                      <p className="mt-1 text-xs text-[var(--ink-muted)]">
                        {isCompleted ? "已完成" : "可挑战"}
                      </p>
                    </Link>
                  ) : (
                    <div className="rounded-2xl border border-dashed border-white/20 bg-black/20 p-3">
                      <p className="text-xs uppercase tracking-[0.2em] text-[var(--ink-muted)]">
                        Level {formatLevel(level.level)}
                      </p>
                      <p className="treasure-title mt-1 text-lg text-[var(--ink-muted)]">未解锁</p>
                      <p className="mt-1 text-xs text-[var(--ink-muted)]">先完成前置关卡</p>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </main>
      </div>
    </AuthGate>
  );
}
