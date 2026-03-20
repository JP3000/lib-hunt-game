"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGameStore } from "@/store/game-store";

type AuthGateProps = {
  children: React.ReactNode;
};

export function AuthGate({ children }: AuthGateProps) {
  const router = useRouter();
  const hydrated = useGameStore((state) => state.hasHydrated);
  const studentId = useGameStore((state) => state.studentId);

  useEffect(() => {
    if (hydrated && !studentId) {
      router.replace("/login");
    }
  }, [hydrated, studentId, router]);

  if (!hydrated) {
    return (
      <div className="flex min-h-dvh items-center justify-center px-6 text-center text-[var(--ink-muted)]">
        正在加载探险档案...
      </div>
    );
  }

  if (!studentId) {
    return null;
  }

  return <>{children}</>;
}
