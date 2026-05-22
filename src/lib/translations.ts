import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n";

type Translations = {
  brand: string;
  demoLabel: string;
  gameName: string;
  metaDescription: string;
  login: {
    headline: string;
    description: string;
    studentIdLabel: string;
    studentIdPlaceholder: string;
    submit: string;
    loading: string;
    invalidStudentId: string;
    fastPass: (id: string) => string;
  };
  header: {
    player: string;
    score: string;
    items: string;
    map: string;
    leaderboard: string;
    logout: string;
    language: string;
  };
  map: {
    title: string;
    subtitle: (data: { completed: number; total: number; score: number }) => string;
    routeTitle: string;
    viewLeaderboard: string;
    completed: string;
    available: string;
    locked: string;
    unlockHint: string;
    stamped: string;
  };
  level: {
    title: (level: number) => string;
    storyHeading: string;
    promptHint: string;
    questionHeading: string;
    multiSelectHint: string;
    submitAnswer: string;
    answerRequired: string;
    answerCorrect: string;
    answerWrong: string;
    completedHint: string;
    settlementHeading: string;
    questionStatus: string;
    qrStatus: string;
    attempts: string;
    passed: string;
    pending: string;
    completeAndNext: string;
    backToMap: string;
    nextLevel: string;
    itemHeading: string;
    itemUnlockHint: string;
  };
  qr: {
    heading: string;
    locationLabel: string;
    description: string;
    startScan: string;
    stopScan: string;
    manualPlaceholder: string;
    manualVerify: string;
    demoCode: string;
    emptyValue: string;
    success: string;
    mismatch: string;
    cameraError: string;
  };
  items: {
    panelTitle: string;
    panelSubtitle: string;
    close: string;
    locked: string;
  };
  leaderboard: {
    title: string;
    subtitleComplete: string;
    subtitleIncomplete: string;
    finalScore: string;
    progress: (data: { completed: number; total: number }) => string;
    backToMap: string;
    reset: string;
    levelBreakdown: string;
    notCompleted: string;
    itemSection: string;
    scoreUnit: string;
  };
  authGate: {
    loading: string;
  };
};

const translations: Record<Locale, Translations> = {
  "zh-Hant": {
    brand: "十字門代碼",
    demoLabel: "Demo",
    gameName: "十字門代碼",
    metaDescription: "基於故事背景的 H5 圖書館線索解謎互動演示項目",
    login: {
      headline: "十字門代碼",
      description: "輸入規定學號字串即可開始闖關，無需註冊。\n示例: ab565666",
      studentIdLabel: "學號",
      studentIdPlaceholder: "ab565666",
      submit: "開始解碼",
      loading: "正在喚醒解碼系統...",
      invalidStudentId: "請輸入正確學號格式：前兩位字母（大寫或小寫）+ 6 位數字，例如 ab565666 或 AB565666。",
      fastPass: (id) => `演示快速通關學號: ${id}（可直接解鎖到第 12 關）`,
    },
    header: {
      player: "玩家",
      score: "總分",
      items: "道具",
      map: "地圖",
      leaderboard: "積分板",
      logout: "退出",
      language: "語言",
    },
    map: {
      title: "十字門線索圖",
      subtitle: ({ completed, total, score }) => `已完成 ${completed}/${total} 關 · 當前總分 ${score}`,
      routeTitle: "白銀線索路線",
      viewLeaderboard: "查看積分板",
      completed: "已完成",
      available: "可挑戰",
      locked: "未解鎖",
      unlockHint: "先完成前置關卡",
      stamped: "已蓋章",
    },
    level: {
      title: (level) => `第 ${level} 關`,
      storyHeading: "劇情線索",
      promptHint: "提示: 先看影片，再完成答題與掃碼驗證。",
      questionHeading: "問題挑戰",
      multiSelectHint: "本題可多選",
      submitAnswer: "提交答案",
      answerRequired: "請先選擇一個答案。",
      answerCorrect: "回答正確，繼續完成二維碼驗證。",
      answerWrong: "回答不正確，再試一次。",
      completedHint: "本關已完成，可繼續下一關或返回地圖。",
      settlementHeading: "本關結算",
      questionStatus: "答題狀態",
      qrStatus: "掃碼狀態",
      attempts: "嘗試次數",
      passed: "已通過",
      pending: "未通過",
      completeAndNext: "完成本關並繼續",
      backToMap: "返回地圖",
      nextLevel: "前往下一關",
      itemHeading: "本道具",
      itemUnlockHint: "通關後自動收錄到道具欄",
    },
    qr: {
      heading: "位置驗證（掃碼）",
      locationLabel: "位置",
      description: "可選擇呼叫攝像頭掃碼，也可手動輸入二維碼內容進行驗證。",
      startScan: "開始掃碼",
      stopScan: "停止掃碼",
      manualPlaceholder: "手動輸入二維碼內容",
      manualVerify: "手動驗證",
      demoCode: "演示測試碼",
      emptyValue: "請輸入二維碼內容後再驗證。",
      success: "驗證成功，寶藏機關已解鎖。",
      mismatch: "二維碼內容不匹配，請重試。",
      cameraError: "無法打開攝像頭，請改用手動輸入二維碼內容。",
    },
    items: {
      panelTitle: "已獲得的道具",
      panelSubtitle: "道具收藏",
      close: "關閉",
      locked: "未解鎖",
    },
    leaderboard: {
      title: "積分板總覽",
      subtitleComplete: "恭喜完成全部關卡",
      subtitleIncomplete: "繼續挑戰以解鎖完整積分板",
      finalScore: "最終得分",
      progress: ({ completed, total }) => `完成進度: ${completed}/${total}`,
      backToMap: "返回地圖",
      reset: "重置進度並重玩",
      levelBreakdown: "關卡明細",
      notCompleted: "未完成",
      itemSection: "已獲得道具",
      scoreUnit: "分",
    },
    authGate: {
      loading: "正在載入探險檔案...",
    },
  },
  en: {
    brand: "Cross Gate Code",
    demoLabel: "Demo",
    gameName: "Cross Gate Code",
    metaDescription: "Story-driven H5 library clue-hunt interactive demo",
    login: {
      headline: "Cross Gate Code",
      description: "Enter your student ID to start. No registration required.\nExample: ab565666",
      studentIdLabel: "Student ID",
      studentIdPlaceholder: "ab565666",
      submit: "Start Decoding",
      loading: "Waking the decoding system...",
      invalidStudentId: "Use the correct format: two letters (upper or lower case) + 6 digits, e.g. ab565666 or AB565666.",
      fastPass: (id) => `Fast-pass demo ID: ${id} (unlock level 12)`,
    },
    header: {
      player: "Player",
      score: "Score",
      items: "Items",
      map: "Map",
      leaderboard: "Leaderboard",
      logout: "Logout",
      language: "Language",
    },
    map: {
      title: "Cross Gate Map",
      subtitle: ({ completed, total, score }) => `Completed ${completed}/${total} · Score ${score}`,
      routeTitle: "Silver Trail Route",
      viewLeaderboard: "View Leaderboard",
      completed: "Completed",
      available: "Available",
      locked: "Locked",
      unlockHint: "Finish the previous level first",
      stamped: "Stamped",
    },
    level: {
      title: (level) => `Level ${level}`,
      storyHeading: "Story Clue",
      promptHint: "Tip: Watch the video, then finish the quiz and QR check.",
      questionHeading: "Challenge Question",
      multiSelectHint: "Multiple answers allowed",
      submitAnswer: "Submit Answer",
      answerRequired: "Choose an answer first.",
      answerCorrect: "Correct. Proceed to QR verification.",
      answerWrong: "Incorrect. Try again.",
      completedHint: "This level is complete. Continue or return to the map.",
      settlementHeading: "Level Summary",
      questionStatus: "Quiz Status",
      qrStatus: "QR Status",
      attempts: "Attempts",
      passed: "Passed",
      pending: "Pending",
      completeAndNext: "Complete Level",
      backToMap: "Back to Map",
      nextLevel: "Next Level",
      itemHeading: "Reward Item",
      itemUnlockHint: "Unlocks after completion",
    },
    qr: {
      heading: "Location Scan",
      locationLabel: "Location",
      description: "Use the camera to scan, or enter the QR code manually.",
      startScan: "Start Scan",
      stopScan: "Stop Scan",
      manualPlaceholder: "Enter QR code",
      manualVerify: "Verify",
      demoCode: "Demo code",
      emptyValue: "Enter a QR code before verifying.",
      success: "Verified. The mechanism is unlocked.",
      mismatch: "QR code does not match. Try again.",
      cameraError: "Camera unavailable. Use manual input instead.",
    },
    items: {
      panelTitle: "Collected Items",
      panelSubtitle: "Collected Items",
      close: "Close",
      locked: "Locked",
    },
    leaderboard: {
      title: "Scoreboard",
      subtitleComplete: "All levels completed",
      subtitleIncomplete: "Complete more levels to unlock the full board",
      finalScore: "Final Score",
      progress: ({ completed, total }) => `Progress: ${completed}/${total}`,
      backToMap: "Back to Map",
      reset: "Reset Progress",
      levelBreakdown: "Level Breakdown",
      notCompleted: "Not completed",
      itemSection: "Collected Items",
      scoreUnit: "pts",
    },
    authGate: {
      loading: "Loading exploration data...",
    },
  },
};

export const getTranslations = (locale: Locale) =>
  translations[locale] ?? translations[DEFAULT_LOCALE];
