"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getLevelConfig } from "@/data/levels";
import { TOTAL_LEVELS } from "@/lib/constants";
import { useGameStore } from "@/store/game-store";
import { GameHeader } from "@/components/game-header";
import { QrVerifier } from "@/components/qr-verifier";

type LevelPageProps = {
  levelNumber: number;
};

const formatLevel = (level: number) => String(level).padStart(2, "0");

export function LevelPage({ levelNumber }: LevelPageProps) {
  const router = useRouter();
  const level = useMemo(() => getLevelConfig(levelNumber), [levelNumber]);

  const unlockedLevel = useGameStore((state) => state.unlockedLevel);
  const levelResults = useGameStore((state) => state.levelResults);
  const completeLevel = useGameStore((state) => state.completeLevel);

  const existingResult = levelResults[levelNumber];

  const [selectedOption, setSelectedOption] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [answerMessage, setAnswerMessage] = useState("");
  const [questionPassedLocal, setQuestionPassedLocal] = useState(false);
  const [qrPassedLocal, setQrPassedLocal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const isCompleted = Boolean(existingResult);
  const questionPassed = isCompleted || questionPassedLocal;
  const qrPassed = isCompleted || qrPassedLocal;
  const shownAttempts = existingResult?.attempts ?? attempts;
  const shownMessage = isCompleted ? "本关已完成，可继续下一关或返回地图。" : answerMessage;

  useEffect(() => {
    if (levelNumber > unlockedLevel && !existingResult) {
      router.replace("/map");
    }
  }, [levelNumber, unlockedLevel, existingResult, router]);

  const goNext = () => {
    if (levelNumber >= TOTAL_LEVELS) {
      router.push("/leaderboard");
      return;
    }
    router.push(`/levels/${formatLevel(levelNumber + 1)}`);
  };

  const checkAnswer = () => {
    if (isCompleted) {
      return;
    }

    if (!selectedOption) {
      setAnswerMessage("请先选择一个答案。");
      return;
    }

    const nextAttempts = attempts + 1;
    setAttempts(nextAttempts);

    if (selectedOption === level.correctOptionId) {
      setQuestionPassedLocal(true);
      setAnswerMessage("回答正确，继续完成二维码验证。");
      return;
    }

    setQuestionPassedLocal(false);
    setAnswerMessage("回答不正确，再试一次。");
  };

  const finishLevel = () => {
    if (!questionPassed || !qrPassed || submitting || isCompleted) {
      return;
    }

    const usedAttempts = attempts === 0 ? 1 : attempts;
    const score = 10 + (usedAttempts === 1 ? 5 : 0) + 5;

    setSubmitting(true);

    completeLevel(levelNumber, {
      score,
      attempts: usedAttempts,
      questionPassed: true,
      qrPassed: true,
    });

    goNext();
  };

  return (
    <div className="pb-8">
      <GameHeader title={`第 ${levelNumber} 关`} subtitle={level.title} />

      <main className="mx-auto mt-5 grid w-[min(980px,92vw)] gap-4 md:grid-cols-5">
        <section className="treasure-panel p-4 md:col-span-3">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--ink-muted)]">剧情线索</p>
          <h2 className="treasure-title mt-1 text-2xl">{level.title}</h2>
          <p className="mt-3 leading-7 text-[var(--ink-main)]/95">{level.story}</p>

          <div className="mt-4 overflow-hidden rounded-xl border border-[var(--border)] bg-black/25">
            <video src={level.videoUrl} controls playsInline className="w-full" />
          </div>
          <p className="mt-2 text-xs text-[var(--ink-muted)]">提示: 先看视频，再完成答题与扫码验证。</p>
        </section>

        <section className="treasure-panel p-4 md:col-span-2">
          <h3 className="treasure-title text-lg">问题挑战</h3>
          <p className="mt-2 text-sm leading-6 text-[var(--ink-main)]">{level.question}</p>

          <div className="mt-3 space-y-2">
            {level.options.map((option) => (
              <label
                key={option.id}
                className="flex cursor-pointer items-center gap-2 rounded-lg border border-[var(--border)] bg-black/15 px-3 py-2 text-sm"
              >
                <input
                  type="radio"
                  name={`level-question-${level.level}`}
                  value={option.id}
                  checked={selectedOption === option.id}
                  onChange={(event) => setSelectedOption(event.target.value)}
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
            提交答案
          </button>

          {shownMessage ? <p className="mt-3 text-sm text-amber-100">{shownMessage}</p> : null}
        </section>

        <div className="md:col-span-3">
          <QrVerifier
            levelNumber={level.level}
            expectedValue={level.qrAnswer}
            onVerified={() => setQrPassedLocal(true)}
          />
        </div>

        <section className="treasure-panel flex flex-col gap-3 p-4 md:col-span-2">
          <h3 className="treasure-title text-lg">本关结算</h3>
          <p className="text-sm text-[var(--ink-muted)]">答题状态: {questionPassed ? "已通过" : "未通过"}</p>
          <p className="text-sm text-[var(--ink-muted)]">扫码状态: {qrPassed ? "已通过" : "未通过"}</p>
          <p className="text-sm text-[var(--ink-muted)]">尝试次数: {shownAttempts}</p>

          <button
            type="button"
            onClick={finishLevel}
            disabled={!questionPassed || !qrPassed || submitting}
            className="rounded-xl border border-amber-500/45 bg-amber-500/20 px-4 py-2 text-sm text-amber-100 transition hover:bg-amber-500/30 disabled:cursor-not-allowed disabled:opacity-50"
          >
            完成本关并继续
          </button>

          <div className="flex gap-2">
            <Link
              href="/map"
              className="rounded-xl border border-[var(--border)] bg-black/25 px-3 py-2 text-sm transition hover:bg-black/35"
            >
              返回地图
            </Link>
            {existingResult ? (
              <button
                type="button"
                onClick={goNext}
                className="rounded-xl border border-[var(--border)] bg-black/25 px-3 py-2 text-sm transition hover:bg-black/35"
              >
                前往下一关
              </button>
            ) : null}
          </div>
        </section>
      </main>
    </div>
  );
}
