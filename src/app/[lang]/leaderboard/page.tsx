"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthGate } from "@/components/auth-gate";
import { GameHeader } from "@/components/game-header";
import { getLevels } from "@/data/levels";
import { TOTAL_LEVELS } from "@/lib/constants";
import { useGameStore } from "@/store/game-store";
import { useLocale } from "@/hooks/use-locale";
import { getTranslations } from "@/lib/translations";
import { withLocalePrefix } from "@/lib/i18n";

export default function LeaderboardPage() {
  const router = useRouter();
  const locale = useLocale();
  const t = getTranslations(locale);
  const levels = getLevels(locale);
  const totalScore = useGameStore((state) => state.totalScore);
  const levelResults = useGameStore((state) => state.levelResults);
  const resetProgress = useGameStore((state) => state.resetProgress);
  const collectedItems = useGameStore((state) => state.collectedItems);

  const completedCount = Object.keys(levelResults).length;
  const allCompleted = completedCount >= TOTAL_LEVELS;

  return (
    <AuthGate>
      <div className="pb-8">
        <GameHeader
          title={t.leaderboard.title}
          subtitle={allCompleted ? t.leaderboard.subtitleComplete : t.leaderboard.subtitleIncomplete}
          showLeaderboardLink={false}
        />

        <main className="mx-auto mt-5 w-[min(980px,92vw)] space-y-4">
          <section className="treasure-panel p-5">
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--ink-muted)]">{t.leaderboard.finalScore}</p>
            <h2 className="treasure-title mt-2 text-4xl text-amber-100">{totalScore}</h2>
            <p className="mt-2 text-sm text-[var(--ink-muted)]">
              {t.leaderboard.progress({ completed: completedCount, total: TOTAL_LEVELS })}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                href={withLocalePrefix("/map", locale)}
                className="rounded-xl border border-amber-500/50 bg-amber-500/20 px-4 py-2 text-sm text-amber-100 transition hover:bg-amber-500/30"
              >
                {t.leaderboard.backToMap}
              </Link>
              <button
                type="button"
                onClick={() => {
                  resetProgress();
                  router.push(withLocalePrefix("/map", locale));
                }}
                className="rounded-xl border border-red-500/55 bg-red-500/20 px-4 py-2 text-sm text-red-100 transition hover:bg-red-500/30"
              >
                {t.leaderboard.reset}
              </button>
            </div>
          </section>

          <section className="treasure-panel p-5">
            <h3 className="treasure-title text-xl">{t.leaderboard.levelBreakdown}</h3>
            <div className="mt-3 space-y-2">
              {levels.map((level) => {
                const result = levelResults[level.level];
                return (
                  <div
                    key={level.level}
                    className="flex items-center justify-between rounded-xl border border-[var(--border)] bg-black/20 px-3 py-2 text-sm"
                  >
                    <span>
                      {t.level.title(level.level)} · {level.title}
                    </span>
                    <span className="text-[var(--ink-muted)]">
                      {result ? `${result.score} ${t.leaderboard.scoreUnit}` : t.leaderboard.notCompleted}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="treasure-panel p-5">
            <h3 className="treasure-title text-xl">{t.leaderboard.itemSection}</h3>
            <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {levels.map((level) => {
                const item = level.item;
                const isCollected = collectedItems.includes(item.id);
                return (
                  <div
                    key={item.id}
                    className={`rounded-xl border border-[var(--border)] bg-black/20 p-3 ${
                      isCollected ? "" : "opacity-45"
                    }`}
                  >
                    <div className="aspect-[4/3] overflow-hidden rounded-lg border border-[var(--border)] bg-black/30">
                      <img src={item.imageUrl} alt={item.name} className="h-full w-full object-cover" />
                    </div>
                    <p className="treasure-title mt-2 text-base">{item.name}</p>
                    <p className="mt-1 text-xs text-[var(--ink-muted)]">
                      {isCollected ? item.description : t.items.locked}
                    </p>
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
