"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getLevelConfig } from "@/data/levels";
import { TOTAL_LEVELS } from "@/lib/constants";
import { useGameStore } from "@/store/game-store";
import { GameHeader } from "@/components/game-header";
import { QrVerifier } from "@/components/qr-verifier";
import { useLocale } from "@/hooks/use-locale";
import { getTranslations } from "@/lib/translations";
import { withLocalePrefix } from "@/lib/i18n";

type LevelPageProps = {
  levelNumber: number;
};

const formatLevel = (level: number) => String(level).padStart(2, "0");

export function LevelPage({ levelNumber }: LevelPageProps) {
  const router = useRouter();
  const locale = useLocale();
  const t = getTranslations(locale);
  const level = useMemo(() => getLevelConfig(levelNumber, locale), [levelNumber, locale]);
  const item = level.item;

  const unlockedLevel = useGameStore((state) => state.unlockedLevel);
  const levelResults = useGameStore((state) => state.levelResults);
  const completeLevel = useGameStore((state) => state.completeLevel);

  const existingResult = levelResults[levelNumber];

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [attempts, setAttempts] = useState(0);
  const [answerMessage, setAnswerMessage] = useState("");
  const [questionPassedLocal, setQuestionPassedLocal] = useState(false);
  const [qrPassedLocal, setQrPassedLocal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const isCompleted = Boolean(existingResult);
  const questionPassed = isCompleted || questionPassedLocal;
  const qrPassed = isCompleted || qrPassedLocal;
  const shownAttempts = existingResult?.attempts ?? attempts;
  const shownMessage = isCompleted ? t.level.completedHint : answerMessage;

  useEffect(() => {
    if (levelNumber > unlockedLevel && !existingResult) {
      router.replace(withLocalePrefix("/map", locale));
    }
  }, [levelNumber, unlockedLevel, existingResult, router, locale]);

  const goNext = () => {
    if (levelNumber >= TOTAL_LEVELS) {
      router.push(withLocalePrefix("/leaderboard", locale));
      return;
    }
    router.push(withLocalePrefix(`/levels/${formatLevel(levelNumber + 1)}`, locale));
  };

  const checkAnswer = () => {
    if (isCompleted) {
      return;
    }

    if (selectedOptions.length === 0) {
      setAnswerMessage(t.level.answerRequired);
      return;
    }

    const nextAttempts = attempts + 1;
    setAttempts(nextAttempts);

    const expected = [...level.correctOptionIds].sort();
    const chosen = [...selectedOptions].sort();
    const isCorrect =
      expected.length === chosen.length && expected.every((value, index) => value === chosen[index]);

    if (isCorrect) {
      setQuestionPassedLocal(true);
      setAnswerMessage(t.level.answerCorrect);
      return;
    }

    setQuestionPassedLocal(false);
    setAnswerMessage(t.level.answerWrong);
  };

  const finishLevel = () => {
    if (!questionPassed || !qrPassed || submitting || isCompleted) {
      return;
    }

    const usedAttempts = attempts === 0 ? 1 : attempts;
    const score = 10 + (usedAttempts === 1 ? 5 : 0) + 5;

    setSubmitting(true);

    completeLevel(
      levelNumber,
      {
        score,
        attempts: usedAttempts,
        questionPassed: true,
        qrPassed: true,
      },
      item.id
    );

    goNext();
  };

  return (
    <div className="pb-8">
      <GameHeader title={t.level.title(levelNumber)} subtitle={level.title} />

      <section className="mx-auto mt-4 w-[min(980px,92vw)]">
        <QrVerifier
          levelNumber={level.level}
          expectedValue={level.qrAnswer}
          onVerified={() => setQrPassedLocal(true)}
        />
      </section>

      <main className="mx-auto mt-5 grid w-[min(980px,92vw)] gap-4 md:grid-cols-5">
        <section className="treasure-panel p-4 md:col-span-3">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--ink-muted)]">{t.level.storyHeading}</p>
          <h2 className="treasure-title mt-1 text-2xl">{level.title}</h2>
          <p className="mt-3 leading-7 text-[var(--ink-main)]/95">{level.story}</p>

          <div className="mt-4 overflow-hidden rounded-xl border border-[var(--border)] bg-black/25">
            <video controls playsInline className="w-full">
              <source src={level.videoUrl} type="video/mp4" />
            </video>
          </div>
          <p className="mt-2 text-xs text-[var(--ink-muted)]">{t.level.promptHint}</p>
        </section>

        <section className="treasure-panel p-4 md:col-span-2">
          <div className="flex items-center justify-between gap-2">
            <h3 className="treasure-title text-lg">{t.level.questionHeading}</h3>
            {level.correctOptionIds.length > 1 ? (
              <span className="rounded-full border border-[var(--border)] bg-black/20 px-2 py-0.5 text-xs text-[var(--ink-muted)]">
                {t.level.multiSelectHint}
              </span>
            ) : null}
          </div>
          <p className="mt-2 text-sm leading-6 text-[var(--ink-main)]">{level.question}</p>

          <div className="mt-3 space-y-2">
            {level.options.map((option) => (
              <label
                key={option.id}
                className="flex cursor-pointer items-center gap-2 rounded-lg border border-[var(--border)] bg-black/15 px-3 py-2 text-sm"
              >
                <input
                  type={level.correctOptionIds.length > 1 ? "checkbox" : "radio"}
                  name={`level-question-${level.level}`}
                  value={option.id}
                  checked={selectedOptions.includes(option.id)}
                  onChange={(event) => {
                    const { checked, value } = event.target;
                    setSelectedOptions((prev) => {
                      if (level.correctOptionIds.length <= 1) {
                        return [value];
                      }

                      if (checked) {
                        return Array.from(new Set([...prev, value]));
                      }

                      return prev.filter((item) => item !== value);
                    });
                  }}
                />
                {option.label}
              </label>
            ))}
          </div>

          <button
            type="button"
            onClick={checkAnswer}
            className="mt-3 rounded-xl border border-[var(--border)] bg-black/25 px-4 py-2 text-sm transition hover:bg-black/35"
          >
            {t.level.submitAnswer}
          </button>

          {shownMessage ? <p className="mt-3 text-sm text-amber-100">{shownMessage}</p> : null}
        </section>

        <section className="treasure-panel flex flex-col gap-3 p-4 md:col-span-2">
          <h3 className="treasure-title text-lg">{t.level.settlementHeading}</h3>
          <p className="text-sm text-[var(--ink-muted)]">
            {t.level.questionStatus}: {questionPassed ? t.level.passed : t.level.pending}
          </p>
          <p className="text-sm text-[var(--ink-muted)]">
            {t.level.qrStatus}: {qrPassed ? t.level.passed : t.level.pending}
          </p>
          <p className="text-sm text-[var(--ink-muted)]">
            {t.level.attempts}: {shownAttempts}
          </p>

          <div className="rounded-xl border border-[var(--border)] bg-black/20 p-3">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--ink-muted)]">{t.level.itemHeading}</p>
            <div className="mt-2 flex items-center gap-3">
              <div className="h-14 w-20 overflow-hidden rounded-lg border border-[var(--border)] bg-black/30">
                <img src={item.imageUrl} alt={item.name} className="h-full w-full object-cover" />
              </div>
              <div>
                <p className="treasure-title text-base">{item.name}</p>
                <p className="text-xs text-[var(--ink-muted)]">{t.level.itemUnlockHint}</p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={finishLevel}
            disabled={!questionPassed || !qrPassed || submitting}
            className="rounded-xl border border-amber-500/45 bg-amber-500/20 px-4 py-2 text-sm text-amber-100 transition hover:bg-amber-500/30 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {t.level.completeAndNext}
          </button>

          <div className="flex gap-2">
            <Link
              href={withLocalePrefix("/map", locale)}
              className="rounded-xl border border-[var(--border)] bg-black/25 px-3 py-2 text-sm transition hover:bg-black/35"
            >
              {t.level.backToMap}
            </Link>
            {existingResult ? (
              <button
                type="button"
                onClick={goNext}
                className="rounded-xl border border-[var(--border)] bg-black/25 px-3 py-2 text-sm transition hover:bg-black/35"
              >
                {t.level.nextLevel}
              </button>
            ) : null}
          </div>
        </section>
      </main>
    </div>
  );
}
