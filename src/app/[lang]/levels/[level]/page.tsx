import { notFound } from "next/navigation";
import { AuthGate } from "@/components/auth-gate";
import { LevelPage } from "@/components/level-page";
import { TOTAL_LEVELS } from "@/lib/constants";
import type { Locale } from "@/lib/i18n";

type LevelRouteParams = {
  level: string;
  lang: Locale;
};

const LEVEL_SEGMENT_REGEX = /^\d{1,2}$/;

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
