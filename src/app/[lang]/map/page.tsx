"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { AuthGate } from "@/components/auth-gate";
import { GameHeader } from "@/components/game-header";
import { getLevels } from "@/data/levels";
import { TOTAL_LEVELS } from "@/lib/constants";
import { useGameStore } from "@/store/game-store";
import { useLocale } from "@/hooks/use-locale";
import { getTranslations } from "@/lib/translations";
import { withLocalePrefix } from "@/lib/i18n";

const formatLevel = (level: number) => String(level).padStart(2, "0");

export default function MapPage() {
  const locale = useLocale();
  const t = getTranslations(locale);
  const unlockedLevel = useGameStore((state) => state.unlockedLevel);
  const totalScore = useGameStore((state) => state.totalScore);
  const levelResults = useGameStore((state) => state.levelResults);
  const levels = getLevels(locale);

  const completedCount = Object.keys(levelResults).length;

  return (
    <AuthGate>
      <div className="pb-8">
        <GameHeader
          title={t.map.title}
          subtitle={t.map.subtitle({ completed: completedCount, total: TOTAL_LEVELS, score: totalScore })}
          showMapLink={false}
        />

        <main className="map-grid treasure-panel mx-auto mt-5 w-[min(980px,92vw)] p-4 md:p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="treasure-title text-2xl">{t.map.routeTitle}</h2>
            <Link
              href={withLocalePrefix("/leaderboard", locale)}
              className="rounded-full border border-[var(--border)] bg-black/20 px-3 py-1 text-sm transition hover:bg-black/30"
            >
              {t.map.viewLeaderboard}
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {levels.map((level, index) => {
              const path = withLocalePrefix(`/levels/${formatLevel(level.level)}`, locale);
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
                      className="map-node block rounded-2xl border border-[var(--border)] bg-black/25 p-3 transition hover:-translate-y-0.5 hover:bg-black/35"
                    >
                      <span className="map-pin" aria-hidden="true" />
                      <p className="text-xs uppercase tracking-[0.2em] text-[var(--ink-muted)]">
                        Level {formatLevel(level.level)}
                      </p>
                      <p className="treasure-title mt-1 text-lg">{level.title}</p>
                      <p className="mt-1 text-xs text-[var(--ink-muted)]">
                        {isCompleted ? t.map.completed : t.map.available}
                      </p>
                      <span className="map-route" aria-hidden="true" />
                      {isCompleted ? <span className="map-stamp">{t.map.stamped}</span> : null}
                    </Link>
                  ) : (
                    <div className="map-node rounded-2xl border border-dashed border-white/20 bg-black/20 p-3">
                      <span className="map-pin" aria-hidden="true" />
                      <p className="text-xs uppercase tracking-[0.2em] text-[var(--ink-muted)]">
                        Level {formatLevel(level.level)}
                      </p>
                      <p className="treasure-title mt-1 text-lg text-[var(--ink-muted)]">{t.map.locked}</p>
                      <p className="mt-1 text-xs text-[var(--ink-muted)]">{t.map.unlockHint}</p>
                      <span className="map-route" aria-hidden="true" />
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
