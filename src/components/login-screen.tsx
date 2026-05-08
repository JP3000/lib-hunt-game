"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FAST_PASS_STUDENT_ID, STUDENT_ID_REGEX } from "@/lib/constants";
import { useLocale } from "@/hooks/use-locale";
import { LOCALES, replaceLocaleInPathname, withLocalePrefix } from "@/lib/i18n";
import { getTranslations } from "@/lib/translations";
import { useGameStore } from "@/store/game-store";

export function LoginScreen() {
  const router = useRouter();
  const locale = useLocale();
  const t = getTranslations(locale);
  const hydrated = useGameStore((state) => state.hasHydrated);
  const studentId = useGameStore((state) => state.studentId);
  const login = useGameStore((state) => state.login);

  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (hydrated && studentId) {
      router.replace(withLocalePrefix("/map", locale));
    }
  }, [hydrated, studentId, router, locale]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalized = inputValue.trim();
    if (!STUDENT_ID_REGEX.test(normalized)) {
      setError(t.login.invalidStudentId);
      return;
    }

    const initialLevel = normalized.toLowerCase() === FAST_PASS_STUDENT_ID ? 12 : 1;
    login(normalized, initialLevel);
    router.push(withLocalePrefix("/map", locale));
  };

  if (!hydrated) {
    return (
      <div className="flex min-h-dvh items-center justify-center px-6 text-center text-[var(--ink-muted)]">
        {t.login.loading}
      </div>
    );
  }

  return (
    <main className="relative flex min-h-dvh items-center justify-center px-4 py-10">
      <div className="treasure-panel w-full max-w-md p-6 md:p-8">
        <div className="flex items-center justify-between">
          <p className="text-xs uppercase tracking-[0.28em] text-[var(--ink-muted)]">{t.brand}</p>
          <div className="flex items-center gap-1 rounded-full border border-[var(--border)] bg-black/15 px-2 py-1">
            <span className="text-xs text-[var(--ink-muted)]">{t.header.language}</span>
            {LOCALES.map((lang) => (
              <Link
                key={lang}
                href={replaceLocaleInPathname("/login", lang)}
                className={`rounded-full px-2 py-0.5 text-xs transition ${
                  lang === locale
                    ? "bg-amber-500/30 text-amber-100"
                    : "text-[var(--ink-main)] hover:bg-black/20"
                }`}
              >
                {lang === "zh-Hant" ? "繁體" : "EN"}
              </Link>
            ))}
          </div>
        </div>
        <h1 className="treasure-title mt-2 text-3xl md:text-4xl">{t.login.headline}</h1>
        <p className="mt-3 whitespace-pre-line text-sm leading-6 text-[var(--ink-muted)]">{t.login.description}</p>

        <form onSubmit={handleSubmit} className="mt-5 space-y-3">
          <label className="block text-sm text-[var(--ink-main)]">
            {t.login.studentIdLabel}
            <input
              value={inputValue}
              onChange={(event) => {
                setInputValue(event.target.value);
                setError("");
              }}
              placeholder={t.login.studentIdPlaceholder}
              className="mt-2 w-full rounded-xl border border-[var(--border)] bg-black/20 px-3 py-2 text-base outline-none placeholder:text-[var(--ink-muted)] focus:border-amber-400/70"
            />
          </label>

          <button
            type="submit"
            className="w-full rounded-xl border border-amber-500/50 bg-amber-500/25 px-4 py-2 text-base text-amber-100 transition hover:bg-amber-500/35"
          >
            {t.login.submit}
          </button>
        </form>

        {error ? <p className="mt-3 text-sm text-amber-100">{error}</p> : null}

        <div className="mt-5 rounded-xl border border-[var(--border)] bg-black/15 p-3 text-xs leading-6 text-[var(--ink-muted)]">
          {t.login.fastPass(FAST_PASS_STUDENT_ID)}
        </div>
      </div>
    </main>
  );
}
