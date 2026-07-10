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
  /** 過關情節：答題正確後展示，有影片的關卡可作為影片的文字補充 */
  completionStory?: string;
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
  items: ItemConfig[];
};

export type LevelResult = {
  score: number;
  attempts: number;
  questionPassed: boolean;
  qrPassed: boolean;
  completedAt: string;
};
