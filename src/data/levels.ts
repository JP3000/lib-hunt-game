import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n";
import { SAMPLE_VIDEO_GITHUB_URL, TOTAL_LEVELS, LEVEL1_VIDEO_URL } from "@/lib/constants";
import type { LevelConfig } from "@/lib/types";

const LEVELS_BY_LOCALE: Record<Locale, LevelConfig[]> = {
  "zh-Hant": [
    {
      level: 1,
      title: "第一關: 密文影印本",
      story: `1634年黑夜，明代旗舰”海神号”在十字门遭遇暴风雨触礁沉没，六十万两白银瞬间消失在”海底推浪”的泥沙之下。而今天，一位学生在图书馆特藏室发现了当年的账目折子影印本，上面带有神秘的”双十字”。当学生向老馆员询问时，老人沉默良久，从抽屉里拿出一枚黑色的葡萄牙银币推给学生。学生追问银币的来历，老人只是指了指影印本上的双十字，低声说：”先去大厅，看看楼层分布图。等你找到第一样东西，再来找我。”`,
      item: {
        id: "item-01",
        name: "老旧的葡萄牙银币",
        imageUrl: "/assets/老旧的葡萄牙银币.png",
        description: "老舊的葡萄牙銀幣，象徵著圖書館的秘密傳承。",
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
      qrLocation: "G/F 大堂·游戏开始摊位",
      qrLocationNote: "认识入馆闸机、携带证件、饮食规定等入馆注意事项",
      videoUrl: LEVEL1_VIDEO_URL,
    },
    {
      level: 2,
      title: "第二關: 雙十字印記",
      story: `拿到銀幣的學生仔細觀察密文影印本的右下角，「雙十字」標記清晰可見。老馆员透露：多年前，航海家安东尼奥将毕生调查笔记捐给图书馆，但自己出于某种顾虑，将笔记拆散后藏在图书馆各处。“想解开设下的谜，就去 【大厅】的【楼层分布图】 找到第一个坐标——安东尼奥留下的印记，会告诉你从哪开始。`,
      storyImageUrl: "/assets/Secret_Folder_Copy.jpg",
      storyImageAlt: "密文影印本細節",
      storyImageCaption: "折子上的密文记着：‘海眼吞金而不溺，银箱似受神引，没于泥沙之下，遁迹于白银水道。’”——谜底，就藏在这句话里",

      
      item: {
        id: "item-02",
        name: "航海笔记封面",
        imageUrl: "/assets/航海笔记封面.png",
        description: "双十字是安东尼奥家族的标记。他在封面写道：‘如果看到这个符号，你就是我在等的人。",
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
      qrLocation: "G/F 整体楼层分布图",
      qrLocationNote: "熟悉G/F至6/F整体布局，学会查看楼层索引图",
      // videoUrl: SAMPLE_VIDEO_GITHUB_URL,
    },
    {
      level: 3,
      title: "第三關: 海神號傳聞",
      story: `翻开封面，笔记的第一页就指向十字门水域。前往【资讯共享空间】，在那里遗留了一张泛黄的海神号航图残片。图上用红笔标注了历史航线，不禁让人回忆起折子中的密文：“飓风突至，浪高如山，六十万两白银悉数沉没，无一浮起。水手俱言——‘海眼吞了银子’。`,
      item: {
        id: "item-03",
        name: "海神號航圖殘片",
        imageUrl: "/assets/海神号航海图.png",
        description: "郑芝龙船队的旗舰，消失在十字门的狂浪里，但密文中的海眼吞金之说是什么意思呢？。",
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
      qrLocation: "G/F 资讯共享空间",
      qrLocationNote: "学习使用OPAC目录查询系统，了解新书区和自助查询终端位置",
      // videoUrl: SAMPLE_VIDEO_GITHUB_URL,
    },
    {
      level: 4,
      title: "第四關: 海底推移假說",
      story: `"白银并未消失，而是被推动了。"答案在【参考咨询台】保存的一份手稿里。安东尼奥在推移假说手稿中写道：十字门水域存在一种缓慢的"海底推浪"，足以在数百年间把沉重的银箱沿海底斜坡推移数公里。手稿上画出一条标注为"白银水道"的示意路线，终点指向一片当时还是浅滩的区域。`,
      item: {
        id: "item-04",
        name: "推移假說手稿",
        imageUrl: "/assets/推移假说手稿.png",
        description: "海眼不是吞噬者，而是搬运工。安东尼奥相信：银箱就在水道终点沉睡。",
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
      qrLocation: "G/F 参考咨询台",
      qrLocationNote: "了解参考咨询台功能，扫码关注图书馆官方微信",
      videoUrl: SAMPLE_VIDEO_GITHUB_URL,
    },
    {
      level: 5,
      title: "第五關: 十字門舊圖",
      story: `验证假说需要证据。前往 【1/F 澳大人文库（a/b区交界处）】 ，找出一幅十字门旧海图。图上绘制着三百多年前的海岸线——大、小横琴之间还是开阔水域，与沉船坐标完全吻合。而"白银水道"的终点，在旧图上是一片浅滩，今天却已是陆地。老馆员走到你跟前对你说："沧海变桑田，桑田之下，或有回音。"`,
      item: {
        id: "item-05",
        name: "十字門舊海圖",
        imageUrl: "/assets/十字门旧海图.png",
        description: "看见了吗？银箱在被推移数百年后，最终搁浅在后来变成陆地的地方。",
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
      qrLocation: "1/F A区·澳大人文库",
      qrLocationNote: "利用好书推荐和特藏书库定位，学会查找图书",
      // videoUrl: SAMPLE_VIDEO_GITHUB_URL,
    },
    {
      level: 6,
      title: "第六關: 潮汐回流",
      story: `科学佐证藏在【1/F 澳门坊 G 类地理类图书】中。翻开厚重的潮汐回流记录，长达数十年的水文数据显示：十字门存在一股稳定的近海底缓流，流速虽慢，却从未停歇。一位海洋学家在旁注里惊叹："理论上，任何密度足够大的物体，都可能在百年尺度上被这股力量搬运数公里。"`,
      item: {
        id: "item-06",
        name: "潮汐回流記錄",
        imageUrl: "/assets/潮汐回流记录.png",
        description: "数十年实测数据，完美印证了安东尼奥的推论。海底推浪不是传说，是物理。",
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
      qrLocation: "1/F 澳门坊G类地理图书区",
      qrLocationNote: "掌握索书号排架规律，在书架上快速找书",
      // videoUrl: SAMPLE_VIDEO_GITHUB_URL,
    },
    {
      level: 7,
      title: "第七關: 圍海新岸",
      story: `银箱被推移的终点，如今在哪？前往【2/F 多媒体区服务台】，查阅一份围海造田简报。20世纪下半叶的大规模填海工程，将旧海图上那片浅滩变成了陆地。安东尼奥在笔记中写着："终点已被封存。若我所料不差，白银已在陆地之下。"`,
      item: {
        id: "item-07",
        name: "圍海造田剪報",
        imageUrl: "/assets/围海造田简报.png",
        description: "填海边界，恰好圈住了白银水道的终点。陆地封住了海底的秘密。",
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
      qrLocation: "2/F 多媒体区服务台",
      qrLocationNote: "了解过期期刊区，学习电子期刊查阅与下载",
      // videoUrl: SAMPLE_VIDEO_GITHUB_URL,
    },
    {
      level: 8,
      title: "第八關: 圖書館地樁",
      story: `证据越来越近。上到 【3/F A区科学技术书籍区】 ，找到一份地桩施工记录。2011年图书馆动工，第一根钢印地桩打入地下约5米时，"传来巨大的木材碎裂声，泥浆中混着贝壳碎屑和咸水味"。施工方备注："疑似击穿埋藏木质构造，待查。"`,
      item: {
        id: "item-08",
        name: "地樁施工記錄",
        imageUrl: "/assets/地椿施工记录.png",
        description: "钢桩击中的，是什么？记录上没有答案，因为没有人开挖验证。",
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
      qrLocation: "3/F A区·科学技术书籍序列架",
      qrLocationNote: "认识LeapSpace，学习使用数据库检索电子文献",
      videoUrl: SAMPLE_VIDEO_GITHUB_URL,
    },
    {
      level: 9,
      title: "第九關: 木樑巨響",
      story: `在【3/F 自习室的玻璃展柜】，保存着一块木梁碎片的照片。碎片从施工地底带上，木质经海水长期浸泡呈深褐色。鉴定显示，这是17世纪福建沿海常用的船用木材，与郑芝龙船队用料一致。边缘的断裂痕迹，极可能是钢桩撞击造成。`,
      item: {
        id: "item-09",
        name: "木樑碎片",
        imageUrl: "/assets/木梁碎片.png",
        description: "三百多年前的船木，在图书馆地基下发出巨响。那是海神号最后的呐喊。”",
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
      qrLocation: "3/F 小组讨论室",
      qrLocationNote: "寻找必修课教材及指定参考书的存放位置",
      // videoUrl: SAMPLE_VIDEO_GITHUB_URL,
    },
    {
      level: 10,
      title: "第十關: 館員分藏",
      story: `这些线索本是一体。前往【1/F 学位论文区架位旁】，找出一份安东尼奥亲笔的分藏清单残页。安东尼奥在清单上写道：”为防止笔记落入贪婪之人手中，我已将其拆散藏于图书馆各处。能走到这一步的人，必已集齐大半碎片。清单上的位置，正是你之前所寻得的道具。”老馆员在旁轻叹：”我只是守候者。这条路，是他三百年前就设计好的考验。”残页上列着数个位置和道具，对应你已经找到的笔记部分。`,
      item: {
        id: "item-10",
        name: "分藏清單",
        imageUrl: "/assets/分藏记录.png",
        description: "安东尼奥三百年前设下的考验，只为等一个不为金银而来的人。老人没有掩埋真相，他只是这条路上的守护者。",
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
      qrLocation: "1/F 学位论文区",
      qrLocationNote: "查找本校学位论文，了解学术传承脉络",
      // videoUrl: SAMPLE_VIDEO_GITHUB_URL,
    },
    {
      level: 11,
      title: "第十一關: 解密鑰匙",
      story: `碎片已齐，但如何拼读？前往【G/F 学科教材区】，找出一份解密钥匙札记。安东尼奥亲手编写了线索推演图，附言：”真相从不轻易示人，需要耐心、智慧，以及最重要的——不是为了金银而来。”按照钥匙指示，你将所有碎片拼合成完整的信息：银箱坐标、推移路径、终点印证，全部吻合。`,
      storyImageUrl: "/assets/解密线索图.png",
      storyImageAlt: "解密线索推演图",
      storyImageCaption: `安东尼奥亲手绘制的线索推演图——你走过的每一步，都在他的预料之中。`,
      item: {
        id: "item-11",
        name: "解密线索图",
        imageUrl: "/assets/解密线索图.png",
        description: "线索图上是你走过的路，是旧时的影子与潮汐。安东尼奥把真相留给了懂得探索的人。",
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
      qrLocation: "G/F 学科教材区",
      qrLocationNote: "学习使用图书馆空间预约系统预约小组讨论室",
      videoUrl: SAMPLE_VIDEO_GITHUB_URL,
    },
    {
      level: 12,
      title: "第十二關: 繼承者之證",
      story: `所有线索都指向同一个地点——你脚下的图书馆地基。前往【G/F 资讯素养教室】，老馆员已在那里等候。他将一枚刻着双十字的银印放入你掌心："重要的从来不是白银本身，而是有人愿意走完这段路。从今天起，你是继承者。"没有开挖，没有宝箱。但三百年的谜团在你手中闭合——白银是否在地底，已不再重要。你证明了追问本身，就是最珍贵的宝藏。`,
      item: {
        id: "item-12",
        name: "雙十字銀印",
        imageUrl: "/assets/葡萄牙银币.png",
        description: "银印上刻着双十字，与影印本上的标记一模一样。老人说：’答案就在书架之间。’——而你，找到了它。",
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
      qrLocation: "G/F 资讯素养室",
      qrLocationNote: "AI会编造虚假文献，图书馆提供真实可靠的知识传承",
      videoUrl: SAMPLE_VIDEO_GITHUB_URL,
    },
  ],
  en: [
    {
      level: 1,
      title: "Level 1: Cipher Copy",
      story: `On a stormy night in 1634, the Ming flagship Poseidon struck a reef and sank in the Cross Gate waters. Six hundred thousand taels of silver vanished beneath the silt, swallowed by what sailors called the "seafloor push." Centuries later, a student discovers a photocopied Ming ledger in the library's special collections room — its back cover marked with a mysterious double-cross symbol. When the student asks the senior librarian about it, the old man falls silent, pulls a blackened Portuguese silver coin from his drawer, and slides it across the desk. The student presses for the coin's origin, but the old man simply points at the double-cross and murmurs: "Go to the lobby first. Study the floor plan. When you find the first piece, come back to me."`,
      item: {
        id: "item-01",
        name: "Cipher Ledger Copy",
        imageUrl: "/assets/老旧的葡萄牙银币.png",
        description: `A pale blue note reads "1982 · Antonio."`,
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
      qrLocation: "G/F Zone B · Game Booth / Information Service Desk",
      qrLocationNote: "Learn about entry gates, ID cards, and food/drink policies",
      videoUrl: SAMPLE_VIDEO_GITHUB_URL,
    },
    {
      level: 2,
      title: "Level 2: Double-Cross Mark",
      story: `Examining the coin, the student notices the same double-cross mark clearly visible on the corner of the cipher copy. The senior librarian reveals: years ago, the navigator Antonio donated his life's investigative notes to the library, but out of caution, he disassembled the notes and hid them throughout the building. "If you want to solve the puzzle he left behind, go to the lobby floor plan and find the first coordinate. Antonio's mark will tell you where to begin."`,
      item: {
        id: "item-02",
        name: "Double-Cross Impression",
        imageUrl: "/assets/航海笔记封面.png",
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
      qrLocation: "G/F Zone B · Information Commons (near the big screen or floor plan)",
      qrLocationNote: "Get familiar with the G/F–6/F layout and floor directory",
      videoUrl: SAMPLE_VIDEO_GITHUB_URL,
    },
    {
      level: 3,
      title: "Level 3: The Poseidon Rumor",
      story: `The first page of Antonio's notes points directly to the Cross Gate waters. Head to the Information Commons, where a yellowed chart fragment of the Poseidon awaits. Red lines trace the historical shipping route, and the ledger's cipher text echoes in your mind: "A hurricane struck without warning — waves rose like mountains. Six hundred thousand taels of silver sank without a trace. Every sailor said the same thing: the Sea Eye swallowed the silver."`,
      item: {
        id: "item-03",
        name: "Poseidon Chart Fragment",
        imageUrl: "/assets/海神号航海图.png",
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
      qrLocation: "G/F Zone B · Near New Books / OPAC Catalog Terminal",
      qrLocationNote: "Learn to search books using the OPAC catalog terminal",
      videoUrl: SAMPLE_VIDEO_GITHUB_URL,
    },
    {
      level: 4,
      title: "Level 4: Seafloor Drift",
      story: `"The silver did not vanish — it was moved." The answer lies in a manuscript preserved at the Reference Desk. In his Seafloor Drift Hypothesis, Antonio wrote: the Cross Gate waters harbor a slow, persistent "seafloor push" capable of shifting heavy silver chests kilometers along the seabed over centuries. The manuscript includes a sketched route labeled "The Silver Waterway," ending at what was then a shallow shoal.`,
      item: {
        id: "item-04",
        name: "Drift Hypothesis Notes",
        imageUrl: "/assets/推移假说手稿.png",
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
      qrLocation: "G/F Zone C · Reference Desk / Circulation Counter",
      qrLocationNote: "Visit the Reference Desk and follow the library's WeChat account",
      videoUrl: SAMPLE_VIDEO_GITHUB_URL,
    },
    {
      level: 5,
      title: "Level 5: Cross Gate Chart",
      story: `To verify the hypothesis, evidence is needed. Head to the Special Collections Reading Room and find an old sea chart of the Cross Gate. Drawn over three hundred years ago, it shows the coastline as it was — open water between Greater and Lesser Hengqin, matching the wreck coordinates perfectly. The Silver Waterway's endpoint on the old chart is a shallow shoal, but today it is dry land. The senior librarian approaches and murmurs: "The sea turned to mulberry fields. Beneath those fields, there may be echoes."`,
      item: {
        id: "item-05",
        name: "Cross Gate Sea Chart",
        imageUrl: "/assets/十字门旧海图.png",
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
      qrLocation: "1/F Zone A · Special Collections Reading Room Entrance / Macau Corner Display",
      qrLocationNote: "Use book recommendations & special collections to locate titles",
      videoUrl: SAMPLE_VIDEO_GITHUB_URL,
    },
    {
      level: 6,
      title: "Level 6: Tidal Backflow",
      story: `Scientific corroboration awaits among the Geography collections. A thick tidal backflow log contains decades of hydrographic data confirming a steady near-seabed current runs through the Cross Gate — slow, but never ceasing. An oceanographer noted in the margin: "In theory, any object of sufficient density could be transported several kilometers by this force over a century." The Sea Eye is not a myth — it is physics.`,
      item: {
        id: "item-06",
        name: "Backflow Log",
        imageUrl: "/assets/潮汐回流记录.png",
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
      qrLocation: "1/F Zone C · General Collections / Series Shelves",
      qrLocationNote: "Master call number ordering to find books on shelves",
      videoUrl: SAMPLE_VIDEO_GITHUB_URL,
    },
    {
      level: 7,
      title: "Level 7: Reclaimed Shore",
      story: `Where is the silver's final resting place today? Go to the Multimedia Area service desk and consult a land reclamation bulletin. The massive reclamation projects of the late 20th century turned the shoal from the old chart into solid ground. Antonio wrote in his notes: "The endpoint has been sealed. If I am not mistaken, the silver now lies beneath the land."`,
      item: {
        id: "item-07",
        name: "Reclamation Clipping",
        imageUrl: "/assets/围海造田简报.png",
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
      qrLocation: "1/F Zone C · Macau Periodicals Section Entrance / Search Terminal",
      qrLocationNote: "Explore the periodicals section and learn e-journal access",
      videoUrl: SAMPLE_VIDEO_GITHUB_URL,
    },
    {
      level: 8,
      title: "Level 8: Foundation Pile",
      story: `The evidence draws closer. Head to the Science & Technology collection and find a foundation pile construction record. In 2011, when the first steel pile was driven roughly five meters into the ground for the library's construction, "a tremendous sound of splitting timber arose, and the mud was mixed with shell fragments and the smell of salt water." The construction team noted: "Suspected penetration of buried wooden structure — pending investigation." No one ever excavated to find out.`,
      item: {
        id: "item-08",
        name: "Foundation Record",
        imageUrl: "/assets/地椿施工记录.png",
        description: `The log notes an "unusual underground sound."`,
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
      qrLocation: "2/F Zone B · Multimedia Area Entrance / Multimedia Service Desk",
      qrLocationNote: "Discover LeapSpace and learn to search academic databases",
      videoUrl: SAMPLE_VIDEO_GITHUB_URL,
    },
    {
      level: 9,
      title: "Level 9: The Timber Echo",
      story: `In a display case near the library archives, a photograph of a timber fragment is preserved. Brought up from the construction depths, the wood had been steeped in seawater for centuries and turned dark brown. Analysis confirmed it as 17th-century shipbuilding timber from the Fujian coast — the same type used by Zheng Zhilong's fleet. The fracture marks at the edges strongly suggest impact from the steel pile. It was the Poseidon's final cry from beneath the library.`,
      item: {
        id: "item-09",
        name: "Timber Fragment",
        imageUrl: "/assets/木梁碎片.png",
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
      qrLocation: "G/F Zone C · Textbook Collection Shelves",
      qrLocationNote: "Locate required textbooks and course reserve materials",
      videoUrl: SAMPLE_VIDEO_GITHUB_URL,
    },
    {
      level: 10,
      title: "Level 10: The Split Notes",
      story: `These clues were always meant to be one. Go to the Theses & Dissertations section and find a fragmented distribution list — written in Antonio's own hand. He wrote: "To prevent my notes from falling into the hands of the greedy, I have disassembled them and hidden them throughout the library. Anyone who has made it this far has already gathered most of the pieces. The locations on this list match what you have already found." The senior librarian adds quietly: "I am merely the guardian. The path was designed by him, three centuries ago." The list marks every hiding place you have already discovered.`,
      item: {
        id: "item-10",
        name: "Split Notes List",
        imageUrl: "/assets/分藏记录.png",
        description: "Antonio designed this test three centuries ago, waiting for someone who came not for the silver. The old librarian was merely its guardian.",
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
      qrLocation: "1/F Zone C · Theses & Dissertations Section",
      qrLocationNote: "Find UM theses & dissertations by senior students",
      videoUrl: SAMPLE_VIDEO_GITHUB_URL,
    },
    {
      level: 11,
      title: "Level 11: The Cipher Key",
      story: `The fragments are gathered — but how should they be assembled? Go to the Textbook Collection and find Antonio's cipher key notes. He wrote in the margin: "Truth never yields itself easily. It requires patience, wisdom, and most importantly — coming not for the silver." Following the key, you piece together every fragment: the wreck coordinates, the drift path, the endpoint confirmation. They all align perfectly.`,
      item: {
        id: "item-11",
        name: "Cipher Key Notes",
        imageUrl: "/assets/解密线索图.png",
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
      qrLocation: "2/F-4/F · Any Group Discussion Room (outside the e-panel)",
      qrLocationNote: "Learn to book group discussion rooms via the reservation system",
      videoUrl: SAMPLE_VIDEO_GITHUB_URL,
    },
    {
      level: 12,
      title: "Level 12: Heir’s Proof",
      story: `All clues point to one place — the ground beneath your feet. Go to the Information Literacy Classroom, where the senior librarian is already waiting. He places a silver seal engraved with the double-cross into your palm: "What mattered was never the silver itself, but that someone was willing to walk this path. From this day forward, you are the heir." There is no excavation. No treasure chest. But the three-hundred-year mystery closes in your hands — whether the silver lies beneath the library no longer matters. You have proven that the act of questioning itself is the most precious treasure of all.`,
      item: {
        id: "item-12",
        name: "Double-Cross Silver Seal",
        imageUrl: "/assets/葡萄牙银币.png",
        description: "The silver seal bears the double-cross — the same mark from the ledger copy. The old man says: \"The answer lies between the bookshelves.\" And you have found it.",
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
      qrLocation: "1/F Zone B · Rare Books Room Entrance / Special Collections Display Case",
      qrLocationNote: "AI can hallucinate — libraries offer verified, trustworthy knowledge",
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
