import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n";
import { SAMPLE_VIDEO_GITHUB_URL, TOTAL_LEVELS } from "@/lib/constants";
import type { LevelConfig } from "@/lib/types";

const LEVELS_BY_LOCALE: Record<Locale, LevelConfig[]> = {
  "zh-Hant": [
    {
      level: 1,
      title: "第一關: 密文影印本",
      story: "你在特藏室翻到《崇禎七年·閩海貿易帳目折子》影印本，封底浮現淡淡雙十字。",
      item: {
        id: "item-01",
        name: "密文折子影印頁",
        imageUrl: "/assets/Secret_Folder_Copy.jpg",
        description: "影印頁背面留有淡藍墨跡，標註“1982·安東尼奧”。",
      },
      question:
        "假設你帶了一杯超大杯的珍珠奶茶，想在圖書館裡享受閱讀時光，但心裡擔心灑了會惹麻煩。請問，圖書館裡關於飲食的規定是?",
      options: [
        {
          id: "a",
          label: "只要不影響他人，想喝什麼喝什麼，圖書館是你的快樂天堂!",
        },
        { id: "b", label: "嚴禁攜帶任何食物和飲料進入圖書館，違者罰款!" },
        {
          id: "c",
          label: "允許攜帶有蓋子的水瓶和簡單的包裝食品，但請保持清潔，不要影響他人。",
        },
        { id: "d", label: "還是先喝完再進圖書館吧。" },
      ],
      correctOptionIds: ["c", "d"],
      qrAnswer: "L01-ARCHIVE-KEY",
      videoUrl: SAMPLE_VIDEO_GITHUB_URL,
    },
    {
      level: 2,
      title: "第二關: 雙十字印記",
      story: "老館員看見雙十字符號後沉默良久，取出一枚氧化的銀幣。",
      item: {
        id: "item-02",
        name: "雙十字銀印",
        imageUrl: "/assets/macau-map.jpg",
        description: "被圈出的雙十字符號拓印，像是通往密文的門標。",
      },
      question: "你發現資訊共享空間的電腦裡沒有安裝你需要的專業軟體，你該怎麼辦?",
      options: [
        { id: "a", label: "默默忍受，用記事本手繪圖表。" },
        { id: "b", label: "先上圖書館網站查看電腦已安裝的軟體清單。" },
        { id: "c", label: "向館員尋求幫助，他們會協助你安裝或提供替代方案。" },
        { id: "d", label: "偷偷下載安裝，反正誰也發現不了。" },
      ],
      correctOptionIds: ["b", "c"],
      qrAnswer: "L02-CATALOG-KEY",
      videoUrl: SAMPLE_VIDEO_GITHUB_URL,
    },
    {
      level: 3,
      title: "第三關: 海神號傳聞",
      story: "密文提及“海神號”沉沒，白銀與貨物無跡可尋。",
      item: {
        id: "item-03",
        name: "海神號航圖殘片",
        imageUrl: "/assets/macau-map.jpg",
        description: "破損航圖標出十字門水域，暗示沉船位置。",
      },
      question: "通過哪些途徑可以知道和報名參加圖書館辦的各類工作坊?",
      options: [
        { id: "a", label: "圖書館內張貼的工作坊報名海報。" },
        { id: "b", label: "向圖書館參考服務的館員查詢。" },
        { id: "c", label: "關注圖書館的微信公眾號。" },
        { id: "d", label: "瀏覽圖書館網站上的相關網頁。" },
      ],
      correctOptionIds: ["a", "b", "c", "d"],
      qrAnswer: "L03-MANUSCRIPT-KEY",
      videoUrl: SAMPLE_VIDEO_GITHUB_URL,
    },
    {
      level: 4,
      title: "第四關: 海底推移假說",
      story: "安東尼奧提出“海底推浪”假說，認為白銀被暗流推向新岸。",
      item: {
        id: "item-04",
        name: "推移假說手稿",
        imageUrl: "/assets/macau-map.jpg",
        description: "手稿記錄暗流方向，與圖書館所在地重合。",
      },
      question: "你需要查找一篇最新的關於「人工智慧」的綜述性學術文，但不知道何下手，你應該怎做?",
      options: [
        { id: "a", label: "在 Google 上搜尋「人工智慧」，然後隨便點開一篇論文。" },
        { id: "b", label: "到圖書館裡看看有沒有認識的同學知道辦法。" },
        { id: "c", label: "尋求參考館員的幫助，他們會教你如何查找館藏目錄和使用資料庫。" },
        { id: "d", label: "請 AI 聊天機器人提供。" },
      ],
      correctOptionIds: ["c"],
      qrAnswer: "L04-STARMAP-KEY",
      videoUrl: SAMPLE_VIDEO_GITHUB_URL,
    },
    {
      level: 5,
      title: "第五關: 十字門舊圖",
      story: "舊海圖標註大、小橫琴與十字門水道的交界。",
      item: {
        id: "item-05",
        name: "十字門舊海圖",
        imageUrl: "/assets/macau-map.jpg",
        description: "海圖上的水道箭頭指向今日圖書館位置。",
      },
      question: "你想查找一本關於「量子力學」的書籍，但不知道書名和作者，你會怎麼做?",
      options: [
        { id: "a", label: "隨便找一本封面看起來像量子力學的書。" },
        { id: "b", label: "在館藏目錄中輸入「量子力學」作為關鍵字進行搜索。" },
        { id: "c", label: "跑到圖書館外面問書商。" },
        {
          id: "d",
          label: "在館藏目錄中選擇 Subject 欄位，用 \"Quantum mechanics\" 主題詞進行搜索。",
        },
      ],
      correctOptionIds: ["b", "d"],
      qrAnswer: "L05-DRAWER-KEY",
      videoUrl: SAMPLE_VIDEO_GITHUB_URL,
    },
    {
      level: 6,
      title: "第六關: 潮汐回流",
      story: "老漁民稱海底回流為“海底推浪”，能緩慢推移沉物。",
      item: {
        id: "item-06",
        name: "潮汐回流記錄",
        imageUrl: "/assets/macau-map.jpg",
        description: "速記描述回流方向，指向新岸線。",
      },
      question: "假設你要借一本叫做《如何讀一本書》的書，但這時圖書館借閱台已經停止服務了，你要怎麼做呢?",
      options: [
        { id: "a", label: "等到第二天上班時間再來圖書館借書。" },
        { id: "b", label: "找到自助借書機，用校園卡自己借書。" },
        { id: "c", label: "打給圖書館服務熱線，請館員回來給你借書。" },
        { id: "d", label: "算了，我不借了。" },
      ],
      correctOptionIds: ["b"],
      qrAnswer: "L06-INDEX-KEY",
      videoUrl: SAMPLE_VIDEO_GITHUB_URL,
    },
    {
      level: 7,
      title: "第七關: 圍海新岸",
      story: "圍海造田讓海岸線前移，圖書館就在新岸上落成。",
      item: {
        id: "item-07",
        name: "圍海造田剪報",
        imageUrl: "/assets/macau-map.jpg",
        description: "剪報記錄新岸建設，與推移路線吻合。",
      },
      question: "你在館藏目錄中查到一本書的索書號是「N 5300 Gom 2012」，這本書最有可能在哪個區域?",
      options: [
        { id: "a", label: "二樓 C 區 語言文學區 (P-PZ)" },
        { id: "b", label: "二樓 A 區 哲學、宗教、心理、教育及藝術區 (B, L-N)" },
        { id: "c", label: "三樓 A 區 科學及醫學區 (Q-V)" },
        { id: "d", label: "四樓 A 區 工商管理區 (H-HG)" },
      ],
      correctOptionIds: ["b"],
      qrAnswer: "L07-STACK-KEY",
      videoUrl: SAMPLE_VIDEO_GITHUB_URL,
    },
    {
      level: 8,
      title: "第八關: 圖書館地樁",
      story: "2011年打下第一根地樁時，地下傳來木材碎裂巨響。",
      item: {
        id: "item-08",
        name: "地樁施工記錄",
        imageUrl: "/assets/macau-map.jpg",
        description: "施工紀錄標註“地下有異響”。",
      },
      question:
        "你想和你的小組成員一起討論期末報告，可是圖書館閱覽區討論會影響到別的讀者，你該怎辦?",
      options: [
        { id: "a", label: "在圖書館公共區域討論，反正保安沒有到。" },
        { id: "b", label: "用澳大 UMApp 的「Library Rooms Booking」預訂圖書館房間。" },
        { id: "c", label: "跑到圖書館旁的咖啡廳討論，反正那裡更安靜。" },
        { id: "d", label: "向圖書館 IT 服務台尋求幫助。" },
      ],
      correctOptionIds: ["b"],
      qrAnswer: "L08-ATRIUM-KEY",
      videoUrl: SAMPLE_VIDEO_GITHUB_URL,
    },
    {
      level: 9,
      title: "第九關: 木樑巨響",
      story: "泥漿混著貝殼碎屑與鹹水味，與普通地下水不同。",
      item: {
        id: "item-09",
        name: "木樑碎片",
        imageUrl: "/assets/macau-map.jpg",
        description: "斷裂木樑殘片帶著海水與貝殼痕跡。",
      },
      question:
        "你參加了大學的辯論，需要時常翻閱《Economist》（經濟學人）來了解熱門議題的正反方意見，但訂閱很貴，你應該怎麼做?",
      options: [
        { id: "a", label: "放棄吧，因為付費太貴了。" },
        { id: "b", label: "使用圖書館主頁的 Journal Search 查看是否已訂購。" },
        {
          id: "c",
          label: "使用圖書館訂購的 ProQuest Central，在該雜誌頁面設定電郵通知。",
        },
        { id: "d", label: "用 Google 查找免費全文。" },
      ],
      correctOptionIds: ["b", "c"],
      qrAnswer: "L09-ECHO-KEY",
      videoUrl: SAMPLE_VIDEO_GITHUB_URL,
    },
    {
      level: 10,
      title: "第十關: 館員分藏",
      story: "館員為避免傳言擴散，把筆記拆散並分散藏於館內。",
      item: {
        id: "item-10",
        name: "分藏清單",
        imageUrl: "/assets/macau-map.jpg",
        description: "清單標記碎片藏匿區域與順序。",
      },
      question:
        "你不知道學長學姐的姓名，也不知道論文題目，但你知道學院有一位很棒的陳大文教授，你想看看他指導的學位論文。你應該怎麼做?",
      options: [
        { id: "a", label: "隨便找一本論文看看，反正都是學術內容。" },
        { id: "b", label: "在碩博士論文平台中選擇 Supervisor 欄位查找「陳大文」。" },
        { id: "c", label: "詢問圖書館員是否知道這位學長/學姐的論文。" },
        {
          id: "d",
          label:
            "在館藏目錄的進階搜尋中，Author/Creator 填「陳大文」，同時 Subject 填 " +
            "\"University of Macau -- Dissertations\"。",
        },
      ],
      correctOptionIds: ["b", "d"],
      qrAnswer: "L10-BRONZE-KEY",
      videoUrl: SAMPLE_VIDEO_GITHUB_URL,
    },
    {
      level: 11,
      title: "第十一關: 解密鑰匙",
      story: "拼讀筆記的方法被單獨存放，只留給有心人尋找。",
      item: {
        id: "item-11",
        name: "解密鑰匙札記",
        imageUrl: "/assets/macau-map.jpg",
        description: "核心札記揭示碎片組合順序。",
      },
      question: "你在圖書館展覽中看到一幅抽象畫，完全看不懂，你應該怎麼做?",
      options: [
        { id: "a", label: "哈哈，這是哪門子畫家，我胡畫都可以畫成這樣!" },
        { id: "b", label: "假裝懂，隨便評論一句。" },
        { id: "c", label: "閱讀展覽解說，了解畫家的創作理念和背景。" },
        { id: "d", label: "查閱館藏目錄，閱讀相關書籍。" },
      ],
      correctOptionIds: ["c", "d"],
      qrAnswer: "L11-THRONE-KEY",
      videoUrl: SAMPLE_VIDEO_GITHUB_URL,
    },
    {
      level: 12,
      title: "第十二關: 繼承者之證",
      story: "你拼合所有線索，成為這段追問的真正繼承者。",
      item: {
        id: "item-12",
        name: "葡萄牙銀幣",
        imageUrl: "/assets/macau-map.jpg",
        description: "老館員交給你的銀幣，象徵繼承者身份確認。",
      },
      question:
        "你需要這學期的 2024 年版《Essentials of Marketing Research》課本，但發現 3/F A 區書架上只有舊版本。你可以怎做?",
      options: [
        { id: "a", label: "抱怨課本太舊，影響學習。" },
        { id: "b", label: "先用舊版本自學，看看能不能搞定。" },
        { id: "c", label: "到圖書館期刊室（G/FG028）教科書專區找需要的課本。" },
        { id: "d", label: "到圖書館旁的文化廣場書店購買。" },
      ],
      correctOptionIds: ["c", "d"],
      qrAnswer: "L12-TREASURE-KEY",
      videoUrl: SAMPLE_VIDEO_GITHUB_URL,
    },
  ],
  en: [
    {
      level: 1,
      title: "Level 1: Cipher Copy",
      story: "In the special collections room, you find a copy of the Ming ledger. A faint double-cross mark appears on the back cover.",
      item: {
        id: "item-01",
        name: "Cipher Ledger Copy",
        imageUrl: "/assets/macau-map.jpg",
        description: "A pale blue note reads “1982 · Antonio.”",
      },
      question:
        "Suppose you bring a super-sized bubble tea and want to enjoy reading time in the library. What are the library's regulations regarding food and beverages?",
      options: [
        {
          id: "a",
          label: "As long as you don't disturb others, drink whatever you want.",
        },
        {
          id: "b",
          label: "Food and beverages are strictly prohibited; violators will be fined.",
        },
        {
          id: "c",
          label: "Water bottles with lids and simple packaged food are permitted if you keep clean.",
        },
        { id: "d", label: "Finish your drink before entering the library." },
      ],
      correctOptionIds: ["c", "d"],
      qrAnswer: "L01-ARCHIVE-KEY",
      videoUrl: SAMPLE_VIDEO_GITHUB_URL,
    },
    {
      level: 2,
      title: "Level 2: Double-Cross Mark",
      story: "The senior librarian sees the mark, falls silent, and reveals an oxidized silver coin.",
      item: {
        id: "item-02",
        name: "Double-Cross Impression",
        imageUrl: "/assets/macau-map.jpg",
        description: "An impression of the double-cross, like a secret waypoint.",
      },
      question:
        "You find that the computers in the Information Commons don't have the professional software you need installed. What should you do?",
      options: [
        { id: "a", label: "Suffer in silence and use Notepad to hand-draw charts." },
        { id: "b", label: "Check the library website for the installed software list." },
        { id: "c", label: "Ask librarians for help or alternatives." },
        { id: "d", label: "Secretly download and install it yourself." },
      ],
      correctOptionIds: ["b", "c"],
      qrAnswer: "L02-CATALOG-KEY",
      videoUrl: SAMPLE_VIDEO_GITHUB_URL,
    },
    {
      level: 3,
      title: "Level 3: The Poseidon Rumor",
      story: "The cipher mentions the Poseidon flagship sinking with no trace of its silver cargo.",
      item: {
        id: "item-03",
        name: "Poseidon Chart Fragment",
        imageUrl: "/assets/macau-map.jpg",
        description: "A torn chart points to the Cross Gate waters.",
      },
      question:
        "Through which channels can you learn about and register for workshops organized by the library?",
      options: [
        { id: "a", label: "Workshop posters displayed in the library." },
        { id: "b", label: "Ask librarians at the reference desk." },
        { id: "c", label: "Follow the library's WeChat official account." },
        { id: "d", label: "Browse relevant pages on the library website." },
      ],
      correctOptionIds: ["a", "b", "c", "d"],
      qrAnswer: "L03-MANUSCRIPT-KEY",
      videoUrl: SAMPLE_VIDEO_GITHUB_URL,
    },
    {
      level: 4,
      title: "Level 4: Seafloor Drift",
      story: "Antonio proposes that a slow seafloor current pushed the silver toward a new shoreline.",
      item: {
        id: "item-04",
        name: "Drift Hypothesis Notes",
        imageUrl: "/assets/macau-map.jpg",
        description: "Notes on current direction align with the library site.",
      },
      question:
        "You need a recent comprehensive academic paper on Artificial Intelligence but don't know where to start. What should you do?",
      options: [
        { id: "a", label: "Search Google and open a random paper." },
        { id: "b", label: "Look around the library for classmates who might help." },
        { id: "c", label: "Ask reference librarians to help you use the catalog and databases." },
        { id: "d", label: "Ask an AI chatbot to provide one." },
      ],
      correctOptionIds: ["c"],
      qrAnswer: "L04-STARMAP-KEY",
      videoUrl: SAMPLE_VIDEO_GITHUB_URL,
    },
    {
      level: 5,
      title: "Level 5: Cross Gate Chart",
      story: "An old sea chart marks the channel between Hengqin and the Cross Gate waters.",
      item: {
        id: "item-05",
        name: "Cross Gate Sea Chart",
        imageUrl: "/assets/macau-map.jpg",
        description: "The route arrow points toward the present library site.",
      },
      question:
        "You want to find a book about Quantum Mechanics but don't know the title or author. What would you do?",
      options: [
        { id: "a", label: "Pick a book whose cover looks like quantum mechanics." },
        { id: "b", label: "Search the catalog with the keyword \"Quantum Mechanics\"." },
        { id: "c", label: "Ask book dealers outside the library." },
        { id: "d", label: "Use the Subject field and search \"Quantum mechanics\"." },
      ],
      correctOptionIds: ["b", "d"],
      qrAnswer: "L05-DRAWER-KEY",
      videoUrl: SAMPLE_VIDEO_GITHUB_URL,
    },
    {
      level: 6,
      title: "Level 6: Tidal Backflow",
      story: "Fishermen call the slow backflow “seafloor push,” capable of moving heavy objects.",
      item: {
        id: "item-06",
        name: "Backflow Log",
        imageUrl: "/assets/macau-map.jpg",
        description: "A note on current direction points toward the new shoreline.",
      },
      question:
        "Suppose you want to borrow \"How to Read a Book\" but the borrowing desk is closed. What should you do?",
      options: [
        { id: "a", label: "Come back tomorrow during office hours." },
        { id: "b", label: "Use the self-check kiosk with your campus card." },
        { id: "c", label: "Call the library service hotline for help." },
        { id: "d", label: "Forget it." },
      ],
      correctOptionIds: ["b"],
      qrAnswer: "L06-INDEX-KEY",
      videoUrl: SAMPLE_VIDEO_GITHUB_URL,
    },
    {
      level: 7,
      title: "Level 7: Reclaimed Shore",
      story: "Land reclamation shifted the shoreline. The library was built on the new coast.",
      item: {
        id: "item-07",
        name: "Reclamation Clipping",
        imageUrl: "/assets/macau-map.jpg",
        description: "The clipping ties the new shore to the drift route.",
      },
      question:
        "You found a book with call number \"N 5300 Gom 2012.\" Where is it most likely located?",
      options: [
        { id: "a", label: "2/F C Zone - Languages and Literature (P-PZ)" },
        { id: "b", label: "2/F A Zone - Philosophy, Religion, Psychology, Education and Arts (B, L-N)" },
        { id: "c", label: "3/F A Zone - Science and Medicine (Q-V)" },
        { id: "d", label: "4/F A Zone - Business Administration (H-HG)" },
      ],
      correctOptionIds: ["b"],
      qrAnswer: "L07-STACK-KEY",
      videoUrl: SAMPLE_VIDEO_GITHUB_URL,
    },
    {
      level: 8,
      title: "Level 8: Foundation Pile",
      story: "When the first pile was driven in 2011, a loud cracking sound rose from underground.",
      item: {
        id: "item-08",
        name: "Foundation Record",
        imageUrl: "/assets/macau-map.jpg",
        description: "The log notes an “unusual underground sound.”",
      },
      question:
        "You want to discuss a final report with your group, but it would disturb readers in the reading area. What should you do?",
      options: [
        { id: "a", label: "Discuss in public areas anyway as long as security doesn't notice." },
        { id: "b", label: "Use the UM App's Library Rooms Booking to reserve a room." },
        { id: "c", label: "Go to the cafe next to the library to discuss." },
        { id: "d", label: "Ask the library IT service desk for help." },
      ],
      correctOptionIds: ["b"],
      qrAnswer: "L08-ATRIUM-KEY",
      videoUrl: SAMPLE_VIDEO_GITHUB_URL,
    },
    {
      level: 9,
      title: "Level 9: The Timber Echo",
      story: "Mud brought up shell fragments and a salty smell unlike normal groundwater.",
      item: {
        id: "item-09",
        name: "Timber Fragment",
        imageUrl: "/assets/macau-map.jpg",
        description: "The broken beam carries traces of seawater and shells.",
      },
      question:
        "You need to frequently consult The Economist for debate topics, but a subscription is expensive. What should you do?",
      options: [
        { id: "a", label: "Give up because it's too expensive." },
        { id: "b", label: "Use Journal Search to see if the library subscribes." },
        {
          id: "c",
          label: "Use ProQuest Central and set up email alerts for the magazine.",
        },
        { id: "d", label: "Find free full text on Google." },
      ],
      correctOptionIds: ["b", "c"],
      qrAnswer: "L09-ECHO-KEY",
      videoUrl: SAMPLE_VIDEO_GITHUB_URL,
    },
    {
      level: 10,
      title: "Level 10: The Split Notes",
      story: "To avoid rumors, the librarian split Antonio’s notes and hid them around the library.",
      item: {
        id: "item-10",
        name: "Split Notes List",
        imageUrl: "/assets/macau-map.jpg",
        description: "A list marking hiding zones and sequence hints.",
      },
      question:
        "You don't know your seniors' names or thesis titles, but want theses supervised by Professor David Chan. What should you do?",
      options: [
        { id: "a", label: "Pick a random thesis since they're all academic." },
        { id: "b", label: "Search the theses platform by Supervisor \"David Chan\"." },
        { id: "c", label: "Ask librarians if they know the thesis." },
        {
          id: "d",
          label:
            "Use advanced catalog search: Author/Creator \"David Chan\" AND Subject " +
            "\"University of Macau -- Dissertations\".",
        },
      ],
      correctOptionIds: ["b", "d"],
      qrAnswer: "L10-BRONZE-KEY",
      videoUrl: SAMPLE_VIDEO_GITHUB_URL,
    },
    {
      level: 11,
      title: "Level 11: The Cipher Key",
      story: "The method for reassembling the fragments was stored separately for the worthy.",
      item: {
        id: "item-11",
        name: "Cipher Key Notes",
        imageUrl: "/assets/macau-map.jpg",
        description: "Core notes reveal the order of assembly.",
      },
      question:
        "You see an abstract painting in a library exhibition that you don't understand. What should you do?",
      options: [
        { id: "a", label: "Mock it and say anyone could paint that." },
        { id: "b", label: "Pretend to understand and comment randomly." },
        { id: "c", label: "Read the exhibition notes to learn the artist's ideas and background." },
        { id: "d", label: "Search the catalog and read related books." },
      ],
      correctOptionIds: ["c", "d"],
      qrAnswer: "L11-THRONE-KEY",
      videoUrl: SAMPLE_VIDEO_GITHUB_URL,
    },
    {
      level: 12,
      title: "Level 12: Heir’s Proof",
      story: "You unite every clue and become the rightful heir to the story.",
      item: {
        id: "item-12",
        name: "Portuguese Silver Coin",
        imageUrl: "/assets/macau-map.jpg",
        description: "The coin marks your confirmation as the heir.",
      },
      question:
        "You need the 2024 edition of \"Essentials of Marketing Research\" but only older editions are on the 3/F A Zone shelves. What can you do?",
      options: [
        { id: "a", label: "Complain that the textbooks are too old." },
        { id: "b", label: "Use the older edition and try to manage." },
        {
          id: "c",
          label: "Go to the textbook collection at Newspapers & Periodicals (G/FG028).",
        },
        { id: "d", label: "Buy it at the Cultural Plaza bookstore next to the library." },
      ],
      correctOptionIds: ["c", "d"],
      qrAnswer: "L12-TREASURE-KEY",
      videoUrl: SAMPLE_VIDEO_GITHUB_URL,
    },
  ],
};

Object.entries(LEVELS_BY_LOCALE).forEach(([locale, levels]) => {
  if (levels.length !== TOTAL_LEVELS) {
    throw new Error(`關卡數量應為 ${TOTAL_LEVELS}，${locale} 為 ${levels.length}`);
  }
});

export const getLevels = (locale: Locale) => LEVELS_BY_LOCALE[locale] ?? LEVELS_BY_LOCALE[DEFAULT_LOCALE];

export function getLevelConfig(levelNumber: number, locale: Locale): LevelConfig {
  const level = getLevels(locale).find((item) => item.level === levelNumber);
  if (!level) {
    throw new Error(`未找到關卡: ${levelNumber}`);
  }
  return level;
}
