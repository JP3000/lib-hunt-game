"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CACHE_BUSTER, FAST_PASS_STUDENT_ID, STUDENT_ID_REGEX, isValidStaffUsername } from "@/lib/constants";
import { useLocale } from "@/hooks/use-locale";
import { LOCALES, replaceLocaleInPathname, withLocalePrefix } from "@/lib/i18n";
import { getTranslations } from "@/lib/translations";
import { useGameStore } from "@/store/game-store";

type LoginRole = "student" | "staff";

export function LoginScreen() {
  const router = useRouter();
  const locale = useLocale();
  const t = getTranslations(locale);
  const hydrated = useGameStore((state) => state.hasHydrated);
  const studentId = useGameStore((state) => state.studentId);
  const storeRole = useGameStore((state) => state.role);
  const login = useGameStore((state) => state.login);

  // 從 store 初始化角色（舊資料遷移後為 null 則預設 student）
  const [role, setRole] = useState<LoginRole>(storeRole ?? "student");
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

    // 依角色選擇校驗規則與初始關卡
    if (role === "student") {
      if (!STUDENT_ID_REGEX.test(normalized)) {
        setError(t.login.invalidStudentId);
        return;
      }
      const initialLevel = normalized.toLowerCase() === FAST_PASS_STUDENT_ID ? 12 : 1;
      login(normalized, initialLevel, "student");
    } else {
      if (!isValidStaffUsername(normalized)) {
        setError(t.login.invalidStaffUsername);
        return;
      }
      login(normalized, 1, "staff");
    }

    router.push(withLocalePrefix("/map", locale));
  };

  const handleRoleSwitch = (newRole: LoginRole) => {
    setRole(newRole);
    setError("");
    setInputValue("");
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
    if (error) setError("");
  };

  // 依角色決定 UI 文案，避免 JSX 中散佈三元表達式
  const labels = useMemo(
    () => ({
      description: role === "student" ? t.login.description : t.login.staffDescription,
      inputLabel: role === "student" ? t.login.studentIdLabel : t.login.staffUsernameLabel,
      inputPlaceholder:
        role === "student" ? t.login.studentIdPlaceholder : t.login.staffUsernamePlaceholder,
    }),
    [role, t]
  );

  if (!hydrated) {
    return (
      <div className="flex min-h-dvh items-center justify-center px-6 text-center text-[var(--ink-muted)]">
        {t.login.loading}
      </div>
    );
  }

  return (
    <main className="intro-shell">
      <video
        className="intro-video"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      >
        <source src={`/assets/intro.mp4?v=${CACHE_BUSTER}`} type="video/mp4" />
      </video>
      <div className="intro-video-overlay" aria-hidden="true" />
      <div className="intro-glow" aria-hidden="true" />
      <div className="intro-orbit" aria-hidden="true" />

      <section className="intro-card w-full max-w-md p-6 md:p-8">
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
                {lang === "zh-Hant" ? "繁體" : lang === "zh-Hans" ? "简体" : "EN"}
              </Link>
            ))}
          </div>
        </div>
        <h1 className="treasure-title mt-2 text-3xl md:text-4xl">{t.login.headline}</h1>
        <p className="mt-3 whitespace-pre-line text-sm leading-6 text-[var(--ink-muted)]">
          {labels.description}
        </p>

        {/* 角色切換 */}
        <div className="mt-4">
          <div className="flex gap-2">
            {(["student", "staff"] as LoginRole[]).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => handleRoleSwitch(r)}
                className={`flex-1 rounded-lg border px-3 py-2 text-sm transition ${
                  role === r
                    ? "border-amber-500/50 bg-amber-500/20 text-amber-100"
                    : "border-[var(--border)] bg-black/20 text-[var(--ink-muted)] hover:border-amber-400/30"
                }`}
              >
                {r === "student" ? t.login.studentRole : t.login.staffRole}
              </button>
            ))}
          </div>
        </div>

        {/* 登入表單 */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-3">
          <label className="block text-sm text-[var(--ink-main)]">
            {labels.inputLabel}
            <input
              value={inputValue}
              onChange={(event) => handleInputChange(event.target.value)}
              placeholder={labels.inputPlaceholder}
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

        <div className="mt-5 border-t border-[var(--border)] pt-4 text-center">
          <p className="text-xs font-medium text-[var(--ink-muted)]">{t.footer.producer}</p>
          <p className="mt-1 text-[0.65rem] leading-relaxed text-[var(--ink-muted)] opacity-60">
            {t.footer.disclaimer}
          </p>
        </div>
      </section>

      <div className="intro-spark intro-spark-a" aria-hidden="true" />
      <div className="intro-spark intro-spark-b" aria-hidden="true" />
      <div className="intro-spark intro-spark-c" aria-hidden="true" />
    </main>
  );
}
