export type LevelOption = {
  id: string;
  label: string;
};

export type LevelConfig = {
  level: number;
  title: string;
  story: string;
  question: string;
  options: LevelOption[];
  correctOptionId: string;
  qrAnswer: string;
  videoUrl: string;
};

export type LevelResult = {
  score: number;
  attempts: number;
  questionPassed: boolean;
  qrPassed: boolean;
  completedAt: string;
};
