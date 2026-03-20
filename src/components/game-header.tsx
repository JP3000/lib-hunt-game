"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useGameStore } from "@/store/game-store";

type GameHeaderProps = {
  title: string;
  subtitle?: string;
  showMapLink?: boolean;
  showLeaderboardLink?: boolean;
};

export function GameHeader({
  title,
  subtitle,
  showMapLink = true,
  showLeaderboardLink = true,
}: GameHeaderProps) {
  const router = useRouter();
  const studentId = useGameStore((state) => state.studentId);
  const totalScore = useGameStore((state) => state.totalScore);
  const logout = useGameStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  return (
    <header className="treasure-panel sticky top-3 z-20 mx-auto flex w-[min(980px,92vw)] flex-col gap-3 px-4 py-4 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-xs uppercase tracking-[0.22em] text-[var(--ink-muted)]">Library Hunt Demo</p>
        <h1 className="treasure-title text-xl text-[var(--ink-main)] md:text-2xl">{title}</h1>
        {subtitle ? <p className="mt-1 text-sm text-[var(--ink-muted)]">{subtitle}</p> : null}
      </div>

      <div className="flex flex-wrap items-center gap-2 text-sm">
        <span className="rounded-full border border-[var(--border)] px-3 py-1 text-[var(--ink-muted)]">
          玩家: {studentId}
        </span>
        <span className="rounded-full border border-[var(--border)] px-3 py-1 text-[var(--ink-main)]">
          总分: {totalScore}
        </span>
        {showMapLink ? (
          <Link
            href="/map"
            className="rounded-full border border-[var(--border)] bg-black/20 px-3 py-1 text-[var(--ink-main)] transition hover:bg-black/30"
          >
            地图
          </Link>
        ) : null}
        {showLeaderboardLink ? (
          <Link
            href="/leaderboard"
            className="rounded-full border border-[var(--border)] bg-black/20 px-3 py-1 text-[var(--ink-main)] transition hover:bg-black/30"
          >
            积分板
          </Link>
        ) : null}
        <button
          type="button"
          onClick={handleLogout}
          className="rounded-full border border-amber-500/40 bg-amber-500/20 px-3 py-1 text-amber-100 transition hover:bg-amber-500/30"
        >
          退出
        </button>
      </div>
    </header>
  );
}
