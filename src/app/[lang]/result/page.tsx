"use client";

import Link from "next/link";
import { useEffect, useMemo } from "react";
import { AuthGate } from "@/components/auth-gate";
import { GameHeader } from "@/components/game-header";
import { getLevels } from "@/data/levels";
import { useGameStore } from "@/store/game-store";
import { useLocale } from "@/hooks/use-locale";
import { getTranslations } from "@/lib/translations";
import { withLocalePrefix } from "@/lib/i18n";

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return m > 0 ? `${m}分${s}秒` : `${s}秒`;
}

export default function ResultPage() {
  const locale = useLocale();
  const t = getTranslations(locale);
  const totalScore = useGameStore((state) => state.totalScore);
  const startedAt = useGameStore((state) => state.startedAt);
  const collectedItems = useGameStore((state) => state.collectedItems);
  const levels = getLevels(locale);

  useEffect(() => {
    const run = async () => {
      const confetti = (await import("canvas-confetti")).default;
      const colors = ["#f0c040", "#d4b474", "#8b5e3c", "#f5ecd4", "#2c4a6e"];
      confetti({ particleCount: 80, spread: 100, origin: { x: 0.2, y: 0.5 }, colors });
      confetti({ particleCount: 80, spread: 100, origin: { x: 0.8, y: 0.5 }, colors });
      setTimeout(() => confetti({ particleCount: 120, spread: 140, origin: { x: 0.5, y: 0.4 }, colors }), 400);
    };
    run();
  }, []);

  const duration = useMemo(() => {
    if (!startedAt) return 0;
    return Math.round((Date.now() - new Date(startedAt).getTime()) / 1000);
  }, [startedAt]);

  const allItems = useMemo(
    () => levels.flatMap((l) => l.items),
    [levels]
  );

  return (
    <AuthGate>
      <div className="pb-8">
        <GameHeader title={t.result.title} showLeaderboardLink={false} />

        <main className="mx-auto mt-5 w-[min(600px,92vw)] space-y-4">
          {/* 恭喜卡片 */}
          <section className="treasure-panel p-6 text-center">
            <p className="text-4xl">🎉</p>
            <h1 className="treasure-title mt-3 text-2xl text-amber-300">{t.result.headline}</h1>
            <p className="mt-2 text-sm text-[var(--ink-muted)]">{t.result.subtitle}</p>

            <div className="mt-5 flex justify-center gap-6">
              <div>
                <p className="text-3xl font-bold text-amber-400">{totalScore}</p>
                <p className="text-xs text-[var(--ink-muted)]">{t.result.score}</p>
              </div>
              <div className="w-px bg-[var(--border)]" />
              <div>
                <p className="text-3xl font-bold text-amber-400">{formatDuration(duration)}</p>
                <p className="text-xs text-[var(--ink-muted)]">{t.result.duration}</p>
              </div>
              <div className="w-px bg-[var(--border)]" />
              <div>
                <p className="text-3xl font-bold text-amber-400">{collectedItems.length}</p>
                <p className="text-xs text-[var(--ink-muted)]">{t.result.items}</p>
              </div>
            </div>
          </section>

          {/* 道具牆 */}
          <section className="treasure-panel p-5">
            <h2 className="treasure-title text-lg text-amber-300">{t.result.itemWall}</h2>
            <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-4">
              {allItems.map((item) => {
                const collected = collectedItems.includes(item.id);
                return (
                  <div
                    key={item.id}
                    className={`rounded-xl border p-2 text-center transition ${
                      collected ? "border-amber-500/30 bg-amber-500/5" : "border-white/10 bg-white/5 opacity-35"
                    }`}
                  >
                    <div className="mb-1.5 aspect-[4/3] overflow-hidden rounded-lg bg-black/20">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <p className="truncate text-xs font-medium text-[var(--ink-main)]">{item.name}</p>
                    {!collected && (
                      <p className="mt-0.5 text-[10px] text-[var(--ink-muted)]">{t.items.locked}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* 操作按鈕 */}
          <div className="flex gap-3">
            <Link
              href={withLocalePrefix("/leaderboard", locale)}
              className="flex-1 rounded-xl bg-amber-400 py-3 text-center text-sm font-semibold text-amber-950 shadow-sm shadow-amber-400/20 transition hover:bg-amber-300 active:scale-[0.98]"
            >
              {t.result.viewLeaderboard}
            </Link>
            <Link
              href={withLocalePrefix("/map", locale)}
              className="rounded-xl border border-[var(--border)] bg-black/20 px-4 py-3 text-sm text-[var(--ink-muted)] transition hover:bg-black/30"
            >
              {t.result.backToMap}
            </Link>
          </div>
        </main>
      </div>
    </AuthGate>
  );
}
