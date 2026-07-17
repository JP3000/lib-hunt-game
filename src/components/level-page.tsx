"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getLevelConfig } from "@/data/levels";
import { TOTAL_LEVELS } from "@/lib/constants";
import { useGameStore } from "@/store/game-store";
import { GameHeader } from "@/components/game-header";
import { QrVerifier } from "@/components/qr-verifier";
import { StoryClueBox } from "@/components/story-clue-box";
import { useLocale } from "@/hooks/use-locale";
import { getTranslations } from "@/lib/translations";
import { withLocalePrefix } from "@/lib/i18n";

type LevelPageProps = {
  levelNumber: number;
};

const formatLevel = (level: number) => String(level).padStart(2, "0");

type TabKey = "story" | "question";

const TAB_ICONS: Record<TabKey, string> = {
  story: "📖",
  question: "❓",
};

export function LevelPage({ levelNumber }: LevelPageProps) {
  const router = useRouter();
  const locale = useLocale();
  const t = getTranslations(locale);
  const level = useMemo(() => getLevelConfig(levelNumber, locale), [levelNumber, locale]);
  const items = level.items;
  const storyImageUrl = level.storyImageUrl;
  const storyImageAlt = level.storyImageAlt ?? "";
  const storyImageCaption = level.storyImageCaption;

  const unlockedLevel = useGameStore((state) => state.unlockedLevel);
  const levelResults = useGameStore((state) => state.levelResults);
  const completeLevel = useGameStore((state) => state.completeLevel);

  const existingResult = levelResults[levelNumber];

  const [activeTab, setActiveTab] = useState<TabKey>("story");
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [attempts, setAttempts] = useState(0);
  const [answerMessage, setAnswerMessage] = useState("");
  const [questionPassedLocal, setQuestionPassedLocal] = useState(false);
  const [qrPassedLocal, setQrPassedLocal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [previewItem, setPreviewItem] = useState<typeof items[0] | null>(null);

  const isCompleted = Boolean(existingResult);
  const questionPassed = isCompleted || questionPassedLocal;
  const qrPassed = isCompleted || qrPassedLocal;
  const shownAttempts = existingResult?.attempts ?? attempts;
  const shownMessage = isCompleted ? t.level.completedHint : answerMessage;
  const getCorrectCount = () =>
    selectedOptions.filter((optionId) => level.correctOptionIds.includes(optionId)).length;

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

    const nextAttempts = attempts + 1;
    setAttempts(nextAttempts);

    setQuestionPassedLocal(true);
    setAnswerMessage(t.level.answerCorrect);
  };

  const finishLevel = () => {
    if (!questionPassed || !qrPassed || submitting || isCompleted) {
      return;
    }

    const usedAttempts = attempts === 0 ? 1 : attempts;
    const correctCount = getCorrectCount();
    const score = correctCount * 10;

    setSubmitting(true);

    completeLevel(
      levelNumber,
      {
        score,
        attempts: usedAttempts,
        questionPassed: true,
        qrPassed: true,
      },
      items.map(i => i.id)
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
          location={level.qrLocation}
          locationNote={level.qrLocationNote}
          onVerified={() => setQrPassedLocal(true)}
        />
      </section>

      <main className="mx-auto mt-5 grid w-[min(980px,92vw)] gap-4 md:grid-cols-5">
        {/* 主內容區：標籤切換 */}
        <section className="treasure-panel flex flex-col p-0 md:col-span-3">
          {/* 標籤欄 */}
          <div className="flex border-b border-[var(--border)]">
            {(["story", "question"] as TabKey[]).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`flex-1 px-4 py-3 text-sm font-medium transition ${
                  activeTab === tab
                    ? "border-b-2 border-amber-400 text-amber-100"
                    : "text-[var(--ink-muted)] hover:text-[var(--ink-main)]"
                }`}
              >
                <span className="mr-1.5">{TAB_ICONS[tab]}</span>
                {tab === "story" ? t.level.storyHeading : t.level.questionHeading}
              </button>
            ))}
          </div>

          {/* 標籤內容 */}
          <div className="p-4">
            {activeTab === "story" ? (
              <>
                <h2 className="treasure-title text-xl">{level.title}</h2>
                <p className="mt-3 leading-7" style={{ color: "var(--ink-main)", opacity: 0.95 }}>
                  {level.story}
                </p>
                <StoryClueBox
                  videoUrl={level.videoUrl}
                  imageUrl={storyImageUrl}
                  imageAlt={storyImageAlt}
                  imageCaption={storyImageCaption}
                />
              </>
            ) : (
              <>
                <div className="flex items-center justify-between gap-2">
                  <h2 className="treasure-title text-lg">{t.level.questionHeading}</h2>
                  {level.correctOptionIds.length > 1 ? (
                    <span className="rounded-full border border-amber-500/40 bg-amber-500/20 px-2 py-0.5 text-xs text-amber-100">
                      {t.level.multiSelectHint}
                    </span>
                  ) : null}
                </div>
                <p className="mt-2 text-base leading-7" style={{ color: "var(--ink-main)" }}>
                  {level.question}
                </p>

                <div className="mt-4 space-y-2">
                  {level.options.map((option) => (
                    <label
                      key={option.id}
                      className="flex cursor-pointer items-center gap-2.5 rounded-lg border bg-black/15 px-3.5 py-2.5 text-sm transition hover:bg-black/25"
                      style={{ borderColor: "var(--border)" }}
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
                  className="mt-4 w-full rounded-xl border border-amber-500/50 bg-amber-500/20 py-2.5 text-sm font-medium text-amber-100 transition hover:bg-amber-500/30 active:scale-[0.98]"
                >
                  {t.level.submitAnswer}
                </button>

                {shownMessage ? <p className="mt-3 text-sm text-amber-100">{shownMessage}</p> : null}
              </>
            )}
          </div>
        </section>

        {/* 側邊欄：結算 */}
        <section className="treasure-panel flex flex-col gap-3 p-4 md:col-span-2">
          <h3 className="treasure-title text-lg">{t.level.settlementHeading}</h3>
          <div className="flex items-center gap-2.5 text-base">
            <span className="text-[var(--ink-muted)]">{t.level.qrStatus}</span>
            {qrPassed ? (
              <span className="flex items-center gap-1.5 font-semibold text-green-400">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                {t.level.passed}
              </span>
            ) : (
              <span className="flex items-center gap-1.5 font-semibold text-amber-400">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" /></svg>
                {t.level.pending}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2.5 text-base">
            <span className="text-[var(--ink-muted)]">{t.level.questionStatus}</span>
            {questionPassed ? (
              <span className="flex items-center gap-1.5 font-semibold text-green-400">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                {t.level.passed}
              </span>
            ) : (
              <span className="flex items-center gap-1.5 font-semibold text-amber-400">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" /></svg>
                {t.level.pending}
              </span>
            )}
          </div>

          {questionPassed && level.completionStory ? (
            <div
              className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4"
              style={{ animation: "fadeIn 0.5s ease-out" }}
            >
              <p className="text-xs uppercase tracking-[0.2em] text-amber-300">
                {t.level.completionStoryHeading}
              </p>
              <p className="mt-2 text-base leading-7" style={{ color: "var(--ink-main)", opacity: 0.95 }}>
                {level.completionStory}
              </p>
            </div>
          ) : null}

          {items.map((it) => (
            <div key={it.id} className="rounded-xl border bg-black/20 p-3" style={{ borderColor: "var(--border)" }}>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setPreviewItem(it)}
                  className="h-14 w-20 shrink-0 overflow-hidden rounded-lg border bg-black/30 transition hover:opacity-80"
                  style={{ borderColor: "var(--border)" }}
                  aria-label={`查看道具大图：${it.name}`}
                >
                  <img src={it.imageUrl} alt={it.name} className="h-full w-full object-cover" />
                </button>
                <div>
                  <p className="treasure-title text-base">{it.name}</p>
                  <p className="text-xs" style={{ color: "var(--ink-muted)" }}>
                    {t.level.itemUnlockHint}
                  </p>
                </div>
              </div>
            </div>
          ))}

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
              className="rounded-xl border bg-black/25 px-3 py-2 text-sm transition hover:bg-black/35"
              style={{ borderColor: "var(--border)" }}
            >
              {t.level.backToMap}
            </Link>
            {existingResult ? (
              <button
                type="button"
                onClick={goNext}
                className="rounded-xl border bg-black/25 px-3 py-2 text-sm transition hover:bg-black/35"
                style={{ borderColor: "var(--border)" }}
              >
                {t.level.nextLevel}
              </button>
            ) : null}
          </div>
        </section>
      </main>

      {previewItem ? (
        <button
          type="button"
          onClick={() => setPreviewItem(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          aria-label="关闭道具大图预览"
        >
          <div className="max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-2xl bg-black/90 shadow-2xl">
            <img
              src={previewItem.imageUrl}
              alt={previewItem.name}
              className="max-h-[90vh] w-full object-contain"
            />
            <div className="border-t border-white/10 px-4 py-3">
              <p className="text-base font-semibold text-white">{previewItem.name}</p>
              <p className="mt-1 text-sm text-white/70">{previewItem.description}</p>
            </div>
          </div>
        </button>
      ) : null}
    </div>
  );
}
