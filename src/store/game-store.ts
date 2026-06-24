"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { TOTAL_LEVELS } from "@/lib/constants";
import type { LevelResult } from "@/lib/types";

type GameState = {
  hasHydrated: boolean;
  studentId: string | null;
  unlockedLevel: number;
  totalScore: number;
  levelResults: Partial<Record<number, LevelResult>>;
  collectedItems: string[];
  /** 首次登录时间，用于计算通关耗时 */
  startedAt: string | null;
  /** 是否已向服务端上报过通关记录（防止重复上报） */
  reported: boolean;
  setHasHydrated: (hydrated: boolean) => void;
  login: (studentId: string, initialUnlockedLevel?: number) => void;
  logout: () => void;
  setUnlockedLevel: (level: number) => void;
  completeLevel: (level: number, result: Omit<LevelResult, "completedAt">, itemId?: string) => void;
  resetProgress: () => void;
};

const initialState: Pick<
  GameState,
  "hasHydrated" | "studentId" | "unlockedLevel" | "totalScore" | "levelResults" | "collectedItems" | "startedAt" | "reported"
> = {
  hasHydrated: false,
  studentId: null,
  unlockedLevel: 1,
  totalScore: 0,
  levelResults: {},
  collectedItems: [],
  startedAt: null,
  reported: false,
};

const clampLevel = (level: number) => Math.min(TOTAL_LEVELS, Math.max(1, level));

/** 判断是否完成了所有关卡 */
const hasAllLevelsCompleted = (levelResults: Partial<Record<number, LevelResult>>) => {
  return Object.keys(levelResults).length >= TOTAL_LEVELS;
};

/** 非阻塞上报通关记录 */
function reportToServer(studentId: string, totalScore: number, startedAt: string) {
  const durationSeconds = Math.round(
    (Date.now() - new Date(startedAt).getTime()) / 1000
  );

  fetch("/api/results", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ studentId, totalScore, durationSeconds }),
  }).catch(() => {
    // 上报失败不影响游戏流程
  });
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      ...initialState,
      setHasHydrated: (hydrated) => set({ hasHydrated: hydrated }),
      login: (studentId, initialUnlockedLevel = 1) => {
        const normalized = studentId.trim().toLowerCase();
        const state = get();

        if (state.studentId && state.studentId === normalized) {
          set({
            studentId: normalized,
            unlockedLevel: Math.max(state.unlockedLevel, clampLevel(initialUnlockedLevel)),
          });
          return;
        }

        set({
          studentId: normalized,
          unlockedLevel: clampLevel(initialUnlockedLevel),
          totalScore: 0,
          levelResults: {},
          collectedItems: [],
          startedAt: new Date().toISOString(),
          reported: false,
        });
      },
      logout: () =>
        set((state) => ({
          ...initialState,
          hasHydrated: state.hasHydrated,
        })),
      setUnlockedLevel: (level) =>
        set((state) => ({
          unlockedLevel: Math.max(state.unlockedLevel, clampLevel(level)),
        })),
      completeLevel: (level, result, itemId) =>
        set((state) => {
          const safeLevel = clampLevel(level);
          const nextLevelResults: Partial<Record<number, LevelResult>> = {
            ...state.levelResults,
            [safeLevel]: {
              ...result,
              completedAt: new Date().toISOString(),
            },
          };

          const totalScore = Object.values(nextLevelResults).reduce((sum, item) => {
            return sum + (item?.score ?? 0);
          }, 0);

          const unlockedLevel =
            safeLevel >= TOTAL_LEVELS ? TOTAL_LEVELS : Math.max(state.unlockedLevel, clampLevel(safeLevel + 1));

          const nextCollectedItems = itemId
            ? Array.from(new Set([...state.collectedItems, itemId]))
            : state.collectedItems;

          // 首次完成全部关卡且未上报过，触发上报
          if (!state.reported && hasAllLevelsCompleted(nextLevelResults)) {
            const studentId = state.studentId;
            const startedAt = state.startedAt;
            if (studentId && startedAt) {
              reportToServer(studentId, totalScore, startedAt);
            }
            return {
              levelResults: nextLevelResults,
              totalScore,
              unlockedLevel,
              collectedItems: nextCollectedItems,
              reported: true,
            };
          }

          return {
            levelResults: nextLevelResults,
            totalScore,
            unlockedLevel,
            collectedItems: nextCollectedItems,
          };
        }),
      resetProgress: () =>
        set((state) => ({
          ...state,
          unlockedLevel: 1,
          totalScore: 0,
          levelResults: {},
          collectedItems: [],
          startedAt: new Date().toISOString(),
          reported: false,
        })),
    }),
    {
      name: "lib-hunt-game-state-v2",
      version: 2,
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
      partialize: (state) => ({
        studentId: state.studentId,
        unlockedLevel: state.unlockedLevel,
        totalScore: state.totalScore,
        levelResults: state.levelResults,
        collectedItems: state.collectedItems,
        startedAt: state.startedAt,
        reported: state.reported,
      }),
    }
  )
);
