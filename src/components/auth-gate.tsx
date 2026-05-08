"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGameStore } from "@/store/game-store";
import { useLocale } from "@/hooks/use-locale";
import { getTranslations } from "@/lib/translations";
import { withLocalePrefix } from "@/lib/i18n";

type AuthGateProps = {
  children: React.ReactNode;
};

export function AuthGate({ children }: AuthGateProps) {
  const router = useRouter();
  const locale = useLocale();
  const t = getTranslations(locale);
  const hydrated = useGameStore((state) => state.hasHydrated);
  const studentId = useGameStore((state) => state.studentId);

  useEffect(() => {
    if (hydrated && !studentId) {
      router.replace(withLocalePrefix("/login", locale));
    }
  }, [hydrated, studentId, router, locale]);

  if (!hydrated) {
    return (
      <div className="flex min-h-dvh items-center justify-center px-6 text-center text-[var(--ink-muted)]">
        {t.authGate.loading}
      </div>
    );
  }

  if (!studentId) {
    return null;
  }

  return <>{children}</>;
}
