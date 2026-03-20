import { notFound } from "next/navigation";
import { AuthGate } from "@/components/auth-gate";
import { LevelPage } from "@/components/level-page";
import { TOTAL_LEVELS } from "@/lib/constants";

type LevelRouteParams = {
  level: string;
};

const LEVEL_SEGMENT_REGEX = /^\d{2}$/;

export async function generateStaticParams(): Promise<LevelRouteParams[]> {
  return Array.from({ length: TOTAL_LEVELS }, (_, index) => ({
    level: String(index + 1).padStart(2, "0"),
  }));
}

export const dynamicParams = false;

export default async function DynamicLevelPage({
  params,
}: {
  params: Promise<LevelRouteParams>;
}) {
  const { level } = await params;

  if (!LEVEL_SEGMENT_REGEX.test(level)) {
    notFound();
  }

  const levelNumber = Number(level);
  if (!Number.isInteger(levelNumber) || levelNumber < 1 || levelNumber > TOTAL_LEVELS) {
    notFound();
  }

  return (
    <AuthGate>
      <LevelPage levelNumber={levelNumber} />
    </AuthGate>
  );
}
