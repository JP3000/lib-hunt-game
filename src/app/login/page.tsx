"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FAST_PASS_STUDENT_ID, STUDENT_ID_REGEX } from "@/lib/constants";
import { useGameStore } from "@/store/game-store";

export default function LoginPage() {
  const router = useRouter();
  const hydrated = useGameStore((state) => state.hasHydrated);
  const studentId = useGameStore((state) => state.studentId);
  const login = useGameStore((state) => state.login);

  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (hydrated && studentId) {
      router.replace("/map");
    }
  }, [hydrated, studentId, router]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalized = inputValue.trim();
    if (!STUDENT_ID_REGEX.test(normalized)) {
      setError("请输入正确学号格式：前两位小写字母 + 6 位数字，例如 ab565666。");
      return;
    }

    const initialLevel = normalized === FAST_PASS_STUDENT_ID ? 12 : 1;
    login(normalized, initialLevel);
    router.push("/map");
  };

  if (!hydrated) {
    return (
      <div className="flex min-h-dvh items-center justify-center px-6 text-center text-[var(--ink-muted)]">
        正在唤醒藏宝系统...
      </div>
    );
  }

  return (
    <main className="relative flex min-h-dvh items-center justify-center px-4 py-10">
      <div className="treasure-panel w-full max-w-md p-6 md:p-8">
        <p className="text-xs uppercase tracking-[0.28em] text-[var(--ink-muted)]">Library Hunt</p>
        <h1 className="treasure-title mt-2 text-3xl md:text-4xl">失落宝藏</h1>
        <p className="mt-3 text-sm leading-6 text-[var(--ink-muted)]">
          输入规定学号字符串即可开始闯关，无需注册。<br />
          示例: ab565666
        </p>

        <form onSubmit={handleSubmit} className="mt-5 space-y-3">
          <label className="block text-sm text-[var(--ink-main)]">
            学号
            <input
              value={inputValue}
              onChange={(event) => {
                setInputValue(event.target.value);
                setError("");
              }}
              placeholder="ab565666"
              className="mt-2 w-full rounded-xl border border-[var(--border)] bg-black/20 px-3 py-2 text-base outline-none placeholder:text-[var(--ink-muted)] focus:border-amber-400/70"
            />
          </label>

          <button
            type="submit"
            className="w-full rounded-xl border border-amber-500/50 bg-amber-500/25 px-4 py-2 text-base text-amber-100 transition hover:bg-amber-500/35"
          >
            开始探险
          </button>
        </form>

        {error ? <p className="mt-3 text-sm text-amber-100">{error}</p> : null}

        <div className="mt-5 rounded-xl border border-[var(--border)] bg-black/15 p-3 text-xs leading-6 text-[var(--ink-muted)]">
          演示快速通关学号: {FAST_PASS_STUDENT_ID}（可直接解锁到第 12 关）
        </div>
      </div>
    </main>
  );
}
