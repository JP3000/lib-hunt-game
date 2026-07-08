import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n";

type Translations = {
  brand: string;
  gameName: string;
  metaDescription: string;
  login: {
    headline: string;
    description: string;
    staffDescription: string;
    studentIdLabel: string;
    studentIdPlaceholder: string;
    submit: string;
    loading: string;
    invalidStudentId: string;
    fastPass: (id: string) => string;
    roleLabel: string;
    studentRole: string;
    staffRole: string;
    staffUsernameLabel: string;
    staffUsernamePlaceholder: string;
    invalidStaffUsername: string;
  };
  intro: {
    eyebrow: string;
    headline: string;
    subtitle: string;
    start: string;
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
  footer: {
    producer: string;
    disclaimer: string;
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
    completionStoryHeading: string;
    itemHeading: string;
    itemUnlockHint: string;
  };
  qr: {
    heading: string;
    locationLabel: string;
    description: string;
    scanArea: string;
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
    brand: "鄭芝龍的寶藏 II",
    gameName: "鄭芝龍的寶藏 II",
    metaDescription: "一張泛黃字條，一首明代古詩，一段橫跨四百年的圖書館尋寶之旅。",
    login: {
      headline: "鄭芝龍的寶藏 II",
      description: "輸入規定學號字串即可開始尋寶。\n示例: ab565666",
      staffDescription: "輸入職員用戶名即可開始尋寶。\n用戶名長度：5 至 15 個字符。",
      studentIdLabel: "學號",
      studentIdPlaceholder: "輸入學號",
      submit: "開始解碼",
      loading: "正在喚醒解碼系統...",
      invalidStudentId: "請輸入正確學號格式：前兩位字母（大寫或小寫）+ 6 位數字，例如 ab565666 或 AB565666。",
      fastPass: (id) => `演示快速通關學號: ${id}（可直接解鎖到第 12 關）`,
      roleLabel: "登入身分",
      studentRole: "學生",
      staffRole: "職員",
      staffUsernameLabel: "用戶名",
      staffUsernamePlaceholder: "輸入用戶名（5-15 個字符）",
      invalidStaffUsername: "用戶名長度需為 5 至 15 個字符。",
    },
    intro: {
      eyebrow: "序幕 · 神祕字條",
      headline: "鄭芝龍的寶藏 II",
      subtitle: "一張泛黃的字條，一首四百年前的詩。簽名 N. Iquan, 1634——他是誰？寶藏又在哪裡？",
      start: "開始尋寶",
    },
    header: {
      player: "玩家",
      score: "總分",
      items: "道具",
      map: "返回地圖",
      leaderboard: "積分板",
      logout: "重新登入",
      language: "語言",
    },
    footer: {
      producer: "澳門大學圖書館 製作",
      disclaimer: "本故事純屬虛構，如有雷同實屬巧合。",
    },
    map: {
      title: "尋寶線索圖",
      subtitle: ({ completed, total, score }) => `已完成 ${completed}/${total} 關 · 當前總分 ${score}`,
      routeTitle: "尋寶路線",
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
      promptHint: "提示：先掃碼驗證，再看影片並完成答題",
      questionHeading: "問題挑戰",
      multiSelectHint: "本題可多選",
      submitAnswer: "提交答案",
      answerRequired: "請先選擇一個答案。",
      answerCorrect: "提交成功",
      answerWrong: "提交不成功，再試一次。",
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
      completionStoryHeading: "過關情節",
      itemHeading: "本道具",
      itemUnlockHint: "通關後自動收錄到道具欄",
    },
    qr: {
      heading: "掃碼驗證",
      locationLabel: "位置",
      description: "可選擇呼叫攝影鏡頭掃碼，也可手動輸入二維碼內容進行驗證。",
      scanArea: "掃碼區域",
      startScan: "開始掃碼",
      stopScan: "停止掃碼",
      manualPlaceholder: "手動輸入密鑰",
      manualVerify: "手動驗證",
      demoCode: "演示測試碼",
      emptyValue: "請輸入二維碼內容後再驗證。",
      success: "驗證成功，寶藏機關已解鎖。",
      mismatch: "二維碼內容不匹配，請重試。",
      cameraError: "無法打開攝影鏡頭，請改用手動輸入二維碼內容。",
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
      reset: "重置進度",
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
    brand: "Zheng Zhilong's Treasure II",
    gameName: "Zheng Zhilong's Treasure II",
    metaDescription: "A yellowed note, a Ming dynasty poem, and a 400-year treasure hunt across the library.",
    login: {
      headline: "Zheng Zhilong's Treasure II",
      description: "Enter your student ID to start the hunt.\nExample: ab565666",
      staffDescription: "Enter your staff username to start the hunt.\nUsername length: 5-15 characters.",
      studentIdLabel: "Student ID",
      studentIdPlaceholder: "Enter student ID",
      submit: "Start Decoding",
      loading: "Waking the decoding system...",
      invalidStudentId: "Use the correct format: two letters (upper or lower case) + 6 digits, e.g. ab565666 or AB565666.",
      fastPass: (id) => `Demo fast-pass ID: ${id} (unlocks up to level 12)`,
      roleLabel: "Login as",
      studentRole: "Student",
      staffRole: "Staff",
      staffUsernameLabel: "Username",
      staffUsernamePlaceholder: "Enter username (5-15 characters)",
      invalidStaffUsername: "Username must be 5-15 characters.",
    },
    intro: {
      eyebrow: "Prologue · The Cipher Note",
      headline: "Zheng Zhilong's Treasure II",
      subtitle: "A yellowed note. A 400-year-old poem. Signed N. Iquan, 1634 — who is he, and where is the treasure?",
      start: "Begin the Hunt",
    },
    header: {
      player: "Player",
      score: "Score",
      items: "Items",
      map: "Map",
      leaderboard: "Leaderboard",
      logout: "Sign in again",
      language: "Language",
    },
    footer: {
      producer: "Produced by the University of Macau Library",
      disclaimer: "This story is a work of fiction. Any resemblance to actual persons or events is purely coincidental.",
    },
    map: {
      title: "Treasure Hunt Map",
      subtitle: ({ completed, total, score }) => `Completed ${completed}/${total} · Score ${score}`,
      routeTitle: "Treasure Trail",
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
      promptHint: "Tip: Scan the QR code first, then watch the video and complete the quiz.",
      questionHeading: "Challenge Question",
      multiSelectHint: "Multiple answers allowed",
      submitAnswer: "Submit Answer",
      answerRequired: "Choose an answer first.",
      answerCorrect: "Submitted successfully",
      answerWrong: "Submission failed. Try again.",
      completedHint: "This level is complete. Continue or return to the map.",
      settlementHeading: "Level Summary",
      questionStatus: "Quiz Status",
      qrStatus: "QR Status",
      attempts: "Attempts",
      passed: "Passed",
      pending: "Not passed",
      completeAndNext: "Complete & Continue",
      backToMap: "Back to Map",
      nextLevel: "Next Level",
      completionStoryHeading: "Level Story",
      itemHeading: "Reward Item",
      itemUnlockHint: "Unlocks after completion",
    },
    qr: {
      heading: "QR Verification",
      locationLabel: "Location",
      description: "Use the camera to scan, or enter the QR code manually.",
      scanArea: "Scan area",
      startScan: "Start Scan",
      stopScan: "Stop Scan",
      manualPlaceholder: "Enter QR code",
      manualVerify: "Verify",
      demoCode: "Demo code",
      emptyValue: "Please enter the QR code content before verifying.",
      success: "Verification successful. The treasure mechanism is now unlocked.",
      mismatch: "QR code does not match. Try again.",
      cameraError: "Camera unavailable. Use manual input instead.",
    },
    items: {
      panelTitle: "Collected Items",
      panelSubtitle: "Your Collection",
      close: "Close",
      locked: "Locked",
    },
    leaderboard: {
      title: "Leaderboard",
      subtitleComplete: "All levels completed",
      subtitleIncomplete: "Complete more levels to unlock the full board",
      finalScore: "Final Score",
      progress: ({ completed, total }) => `Progress: ${completed}/${total}`,
      backToMap: "Back to Map",
      reset: "Reset",
      levelBreakdown: "Level Breakdown",
      notCompleted: "Not completed",
      itemSection: "Collected Items",
      scoreUnit: "points",
    },
    authGate: {
      loading: "Loading exploration data...",
    },
  },
};

export const getTranslations = (locale: Locale) =>
  translations[locale] ?? translations[DEFAULT_LOCALE];
