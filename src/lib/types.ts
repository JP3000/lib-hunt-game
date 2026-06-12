export type LevelOption = {
  id: string;
  label: string;
};

export type ItemConfig = {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
};

export type LevelConfig = {
  level: number;
  title: string;
  story: string;
  question: string;
  options: LevelOption[];
  correctOptionIds: string[];
  qrAnswer: string;
  qrLocation?: string;
  qrLocationNote?: string;
  videoUrl?: string;
  storyImageUrl?: string;
  storyImageAlt?: string;
  storyImageCaption?: string;
  item: ItemConfig;
};

export type LevelResult = {
  score: number;
  attempts: number;
  questionPassed: boolean;
  qrPassed: boolean;
  completedAt: string;
};
