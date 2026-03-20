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
  setHasHydrated: (hydrated: boolean) => void;
  login: (studentId: string, initialUnlockedLevel?: number) => void;
  logout: () => void;
  setUnlockedLevel: (level: number) => void;
  completeLevel: (level: number, result: Omit<LevelResult, "completedAt">) => void;
  resetProgress: () => void;
};

const initialState: Pick<
  GameState,
  "hasHydrated" | "studentId" | "unlockedLevel" | "totalScore" | "levelResults"
> = {
  hasHydrated: false,
  studentId: null,
  unlockedLevel: 1,
  totalScore: 0,
  levelResults: {},
};

const clampLevel = (level: number) => Math.min(TOTAL_LEVELS, Math.max(1, level));

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
      completeLevel: (level, result) =>
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

          return {
            levelResults: nextLevelResults,
            totalScore,
            unlockedLevel,
          };
        }),
      resetProgress: () =>
        set((state) => ({
          ...state,
          unlockedLevel: 1,
          totalScore: 0,
          levelResults: {},
        })),
    }),
    {
      name: "lib-hunt-game-state-v1",
      version: 1,
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
      partialize: (state) => ({
        studentId: state.studentId,
        unlockedLevel: state.unlockedLevel,
        totalScore: state.totalScore,
        levelResults: state.levelResults,
      }),
    }
  )
);
