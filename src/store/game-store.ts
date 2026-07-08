"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { TOTAL_LEVELS } from "@/lib/constants";
import type { LevelResult } from "@/lib/types";

type GameState = {
  hasHydrated: boolean;
  studentId: string | null;
  /** 登入身分：學生或職員 */
  role: "student" | "staff" | null;
  unlockedLevel: number;
  totalScore: number;
  levelResults: Partial<Record<number, LevelResult>>;
  collectedItems: string[];
  /** 首次登入時間，用於計算通關耗時 */
  startedAt: string | null;
  /** 是否已向服務端上報過通關記錄（防止重複上報） */
  reported: boolean;
  setHasHydrated: (hydrated: boolean) => void;
  login: (studentId: string, initialUnlockedLevel?: number, role?: "student" | "staff") => void;
  logout: () => void;
  setUnlockedLevel: (level: number) => void;
  completeLevel: (level: number, result: Omit<LevelResult, "completedAt">, itemId?: string) => void;
  resetProgress: () => void;
};

const initialState: Pick<
  GameState,
  "hasHydrated" | "studentId" | "role" | "unlockedLevel" | "totalScore" | "levelResults" | "collectedItems" | "startedAt" | "reported"
> = {
  hasHydrated: false,
  studentId: null,
  role: null,
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
function reportToServer(studentId: string, totalScore: number, startedAt: string, role: string | null) {
  const durationSeconds = Math.round(
    (Date.now() - new Date(startedAt).getTime()) / 1000
  );

  fetch("/api/results", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ studentId, totalScore, durationSeconds, role }),
  }).catch(() => {
    // 上报失败不影响游戏流程
  });
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      ...initialState,
      setHasHydrated: (hydrated) => set({ hasHydrated: hydrated }),
      login: (studentId, initialUnlockedLevel = 1, role = "student") => {
        const normalized = studentId.trim().toLowerCase();
        const state = get();

        if (state.studentId && state.studentId === normalized) {
          // 同一用戶重新登入：保留原有角色，避免靜默覆蓋
          set({
            studentId: normalized,
            role: state.role ?? role,
            unlockedLevel: Math.max(state.unlockedLevel, clampLevel(initialUnlockedLevel)),
          });
          return;
        }

        set({
          studentId: normalized,
          role,
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
              reportToServer(studentId, totalScore, startedAt, state.role);
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
      migrate: (persisted: unknown) => {
        const data = persisted as Record<string, unknown>;
        // v1 → v2：補齊 role 欄位，舊資料預設為 null
        if (data.role === undefined) {
          data.role = null;
        }
        return data as GameState;
      },
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
      partialize: (state) => ({
        studentId: state.studentId,
        role: state.role,
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
