import { SAMPLE_VIDEO_URL, TOTAL_LEVELS } from "@/lib/constants";
import type { LevelConfig } from "@/lib/types";

export const LEVELS: LevelConfig[] = [
  {
    level: 1,
    title: "第一关: 尘封入口",
    story: "你在图书馆旧档案室前找到第一张藏宝图，线索藏在馆史短片里。",
    question: "图书馆最重要的寻宝规则是什么?",
    options: [
      { id: "a", label: "尽量安静，遵循馆内秩序" },
      { id: "b", label: "只关注积分，忽略提示" },
      { id: "c", label: "跳过视频直接作答" },
      { id: "d", label: "随意移动实物展品" },
    ],
    correctOptionId: "a",
    qrAnswer: "L01-ARCHIVE-KEY",
    videoUrl: SAMPLE_VIDEO_URL,
  },
  {
    level: 2,
    title: "第二关: 编目回廊",
    story: "编目回廊的书架编号隐藏着下一个坐标，你需要解读检索逻辑。",
    question: "在图书馆检索图书时，最常见的定位方式是?",
    options: [
      { id: "a", label: "按书脊颜色排序" },
      { id: "b", label: "按索书号定位" },
      { id: "c", label: "随机抽取" },
      { id: "d", label: "按封面大小" },
    ],
    correctOptionId: "b",
    qrAnswer: "L02-CATALOG-KEY",
    videoUrl: SAMPLE_VIDEO_URL,
  },
  {
    level: 3,
    title: "第三关: 羊皮卷室",
    story: "羊皮卷室里有一段关于古籍保护的视频，答案就在细节中。",
    question: "处理古籍时正确的行为是?",
    options: [
      { id: "a", label: "直接徒手翻页" },
      { id: "b", label: "保持桌面整洁并轻拿轻放" },
      { id: "c", label: "边吃零食边阅读" },
      { id: "d", label: "随意折角做记号" },
    ],
    correctOptionId: "b",
    qrAnswer: "L03-MANUSCRIPT-KEY",
    videoUrl: SAMPLE_VIDEO_URL,
  },
  {
    level: 4,
    title: "第四关: 星图阅览区",
    story: "星图阅览区亮起蓝色标记点，线索提示你关注信息来源。",
    question: "学术资料使用时最关键的原则是?",
    options: [
      { id: "a", label: "可任意复制无需注明来源" },
      { id: "b", label: "引用时注明出处" },
      { id: "c", label: "只看标题不看内容" },
      { id: "d", label: "优先使用过期资料" },
    ],
    correctOptionId: "b",
    qrAnswer: "L04-STARMAP-KEY",
    videoUrl: SAMPLE_VIDEO_URL,
  },
  {
    level: 5,
    title: "第五关: 密码抽屉",
    story: "你在服务台后方找到密码抽屉，抽屉里藏有二维码残片。",
    question: "借阅流程中最推荐的做法是?",
    options: [
      { id: "a", label: "按时归还并续借" },
      { id: "b", label: "超过归还日也不处理" },
      { id: "c", label: "借给他人后不登记" },
      { id: "d", label: "私自带离未借图书" },
    ],
    correctOptionId: "a",
    qrAnswer: "L05-DRAWER-KEY",
    videoUrl: SAMPLE_VIDEO_URL,
  },
  {
    level: 6,
    title: "第六关: 迷雾索引",
    story: "索引墙逐渐显现，你要在迷雾中判断信息检索策略。",
    question: "当关键词检索结果过多时，优先怎么做?",
    options: [
      { id: "a", label: "加限定词缩小范围" },
      { id: "b", label: "直接放弃" },
      { id: "c", label: "随机点击结果" },
      { id: "d", label: "只看第一页第一条" },
    ],
    correctOptionId: "a",
    qrAnswer: "L06-INDEX-KEY",
    videoUrl: SAMPLE_VIDEO_URL,
  },
  {
    level: 7,
    title: "第七关: 地下书库",
    story: "地下书库光线昏暗，馆员提示你寻找专题文献区域。",
    question: "专题研究时，最有效的资料组合是?",
    options: [
      { id: "a", label: "只看一个来源" },
      { id: "b", label: "图书 + 期刊 + 学位论文交叉验证" },
      { id: "c", label: "只看社交媒体帖子" },
      { id: "d", label: "只看十年前的资料" },
    ],
    correctOptionId: "b",
    qrAnswer: "L07-STACK-KEY",
    videoUrl: SAMPLE_VIDEO_URL,
  },
  {
    level: 8,
    title: "第八关: 光影中庭",
    story: "中庭投影展示了数字资源入口，关键提示一闪而过。",
    question: "访问数字资源时推荐的入口是?",
    options: [
      { id: "a", label: "图书馆提供的数据库入口" },
      { id: "b", label: "未知来源的下载站" },
      { id: "c", label: "弹窗广告链接" },
      { id: "d", label: "非授权镜像站" },
    ],
    correctOptionId: "a",
    qrAnswer: "L08-ATRIUM-KEY",
    videoUrl: SAMPLE_VIDEO_URL,
  },
  {
    level: 9,
    title: "第九关: 回声阶梯",
    story: "回声阶梯记录着过去挑战者的留言，你要找到正确路径。",
    question: "团队查找资料时更高效的方法是?",
    options: [
      { id: "a", label: "每人独立重复检索" },
      { id: "b", label: "分工检索并共享记录" },
      { id: "c", label: "完全不沟通" },
      { id: "d", label: "只相信记忆" },
    ],
    correctOptionId: "b",
    qrAnswer: "L09-ECHO-KEY",
    videoUrl: SAMPLE_VIDEO_URL,
  },
  {
    level: 10,
    title: "第十关: 铜门暗语",
    story: "铜门上刻着一行暗语，提示你关注信息真伪。",
    question: "判断信息可信度时，优先考虑什么?",
    options: [
      { id: "a", label: "来源权威性与可核查性" },
      { id: "b", label: "标题是否夸张" },
      { id: "c", label: "转发量大小" },
      { id: "d", label: "图片是否好看" },
    ],
    correctOptionId: "a",
    qrAnswer: "L10-BRONZE-KEY",
    videoUrl: SAMPLE_VIDEO_URL,
  },
  {
    level: 11,
    title: "第十一关: 王座书厅",
    story: "王座书厅只向真正的探索者开放，最后两道线索即将合并。",
    question: "完成大型资料调研后最应做的是?",
    options: [
      { id: "a", label: "整理引用并形成结论" },
      { id: "b", label: "关闭页面不留记录" },
      { id: "c", label: "删除所有笔记" },
      { id: "d", label: "忽略参考文献" },
    ],
    correctOptionId: "a",
    qrAnswer: "L11-THRONE-KEY",
    videoUrl: SAMPLE_VIDEO_URL,
  },
  {
    level: 12,
    title: "第十二关: 失落宝库",
    story: "你抵达失落宝库，最终二维码将开启积分宝箱。",
    question: "完成寻宝后，最完整的复盘方式是?",
    options: [
      { id: "a", label: "回顾关卡策略并总结改进点" },
      { id: "b", label: "只看总分不看过程" },
      { id: "c", label: "忽略错误题目" },
      { id: "d", label: "不保存任何记录" },
    ],
    correctOptionId: "a",
    qrAnswer: "L12-TREASURE-KEY",
    videoUrl: SAMPLE_VIDEO_URL,
  },
];

if (LEVELS.length !== TOTAL_LEVELS) {
  throw new Error(`关卡数量应为 ${TOTAL_LEVELS}，当前为 ${LEVELS.length}`);
}

export function getLevelConfig(levelNumber: number): LevelConfig {
  const level = LEVELS.find((item) => item.level === levelNumber);
  if (!level) {
    throw new Error(`未找到关卡: ${levelNumber}`);
  }
  return level;
}
