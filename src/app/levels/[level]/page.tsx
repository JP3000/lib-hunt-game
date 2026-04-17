import { notFound, redirect } from "next/navigation";
import { TOTAL_LEVELS } from "@/lib/constants";

type LevelRouteParams = {
  level: string;
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

  const canonicalLevel = String(levelNumber).padStart(2, "0");
  redirect(`/levels/${canonicalLevel}`);
}
