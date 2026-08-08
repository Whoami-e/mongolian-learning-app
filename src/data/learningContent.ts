// 这些内容是开发样例数据，正式蒙古文、发音和例句必须由蒙古语教师或母语者审核后发布。
export type LessonStatus = "done" | "current" | "locked" | "challenge";
export type LearningMode = "child" | "adult";
export type VocabularyCategory =
  | "letter"
  | "family"
  | "animal"
  | "number"
  | "food"
  | "school"
  | "body"
  | "color"
  | "home"
  | "greeting";

export type Lesson = {
  id: string;
  order: number;
  title: string;
  subtitle: string;
  objective: string;
  category: VocabularyCategory;
  glyph: string;
  xp: number;
  newItems: number;
  questionCount: number;
  focusVocabularyIds: string[];
};

export type VocabularyItem = {
  id: string;
  category: VocabularyCategory;
  chinese: string;
  mongolian: string;
  pronunciationHint: string;
  audioHint: string;
  image?: "water" | "bread" | "tea" | "coffee";
  exampleChinese: string;
  exampleMongolian: string;
  reviewStatus: "draft" | "pending-review" | "published";
};

export type SentenceItem = {
  id: string;
  chinese: string;
  mongolian: string;
  pronunciationHint: string;
  audioHint: string;
  reviewStatus: "draft" | "pending-review" | "published";
};

export type ExerciseType =
  | "audio-choice"
  | "meaning-choice"
  | "picture-choice"
  | "fill-letter"
  | "triple-match";

export type ExerciseOption = {
  id: string;
  label: string;
  mongolian?: string;
  image?: "water" | "bread" | "tea" | "coffee";
  helper?: string;
};

export type Exercise = {
  id: string;
  lessonId: string;
  type: ExerciseType;
  prompt: string;
  answer: string | string[];
  options: ExerciseOption[];
  explanation: string;
  xp: number;
  audioHint?: string;
  mongolian?: string;
  missingText?: string;
  chinese?: string;
  image?: "water" | "bread" | "tea" | "coffee";
};

export type DailyQuest = {
  id: string;
  title: string;
  reward: string;
  target: number;
  color: "blue" | "green" | "purple" | "yellow";
};

export const categoryLabels: Record<VocabularyCategory | "all", string> = {
  all: "全部",
  letter: "字母",
  family: "家庭",
  animal: "动物",
  number: "数字",
  food: "食物",
  school: "学校",
  body: "身体",
  color: "颜色",
  home: "房间",
  greeting: "问候"
};

export const lessons: Lesson[] = [
  {
    id: "direction",
    order: 1,
    title: "文字和书写方向",
    subtitle: "了解传统蒙古文的阅读和书写方式",
    objective: "知道传统蒙古文从上到下书写，列从左向右排列。",
    category: "letter",
    glyph: "ᠠ",
    xp: 20,
    newItems: 3,
    questionCount: 5,
    focusVocabularyIds: ["letter-a", "letter-e", "letter-i"]
  },
  {
    id: "vowels-one",
    order: 2,
    title: "基础元音一",
    subtitle: "认识第一组元音和发音",
    objective: "听辨 ᠠ、ᠡ、ᠢ，并能从字形中选出对应元音。",
    category: "letter",
    glyph: "ᠠ",
    xp: 20,
    newItems: 3,
    questionCount: 6,
    focusVocabularyIds: ["letter-a", "letter-e", "letter-i"]
  },
  {
    id: "vowels-two",
    order: 3,
    title: "基础元音二",
    subtitle: "区分更多元音和相近发音",
    objective: "认识 ᠣ、ᠤ、ᠥ，并练习相近字形辨认。",
    category: "letter",
    glyph: "ᠣ",
    xp: 20,
    newItems: 3,
    questionCount: 6,
    focusVocabularyIds: ["letter-o", "letter-u", "letter-oe"]
  },
  {
    id: "consonants-one",
    order: 4,
    title: "基础辅音一",
    subtitle: "认识第一组常见辅音",
    objective: "认识 ᠮ、ᠨ、ᠪ，并能完成听音选字。",
    category: "letter",
    glyph: "ᠮ",
    xp: 20,
    newItems: 3,
    questionCount: 6,
    focusVocabularyIds: ["letter-m", "letter-n", "letter-b"]
  },
  {
    id: "syllables",
    order: 5,
    title: "字母组合",
    subtitle: "使用已学字母拼读简单音节",
    objective: "把已学元音和辅音组合成可读音节。",
    category: "letter",
    glyph: "ᠮᠠ",
    xp: 20,
    newItems: 3,
    questionCount: 6,
    focusVocabularyIds: ["syllable-ma", "syllable-na", "syllable-ba"]
  },
  {
    id: "letter-shapes",
    order: 6,
    title: "字母位置变化",
    subtitle: "区分词首、词中、词尾形态",
    objective: "理解同一字母在词首、词中、词尾可能呈现不同形态。",
    category: "letter",
    glyph: "ᠪ",
    xp: 25,
    newItems: 3,
    questionCount: 6,
    focusVocabularyIds: ["shape-initial", "shape-medial", "shape-final"]
  },
  {
    id: "family",
    order: 7,
    title: "家庭词汇",
    subtitle: "学习 5 个家庭相关词汇",
    objective: "识别家庭成员相关词汇，并能看字选义。",
    category: "family",
    glyph: "ᠡᠵᠢ",
    xp: 25,
    newItems: 5,
    questionCount: 7,
    focusVocabularyIds: ["mother", "father", "elder-brother", "elder-sister", "child"]
  },
  {
    id: "animals",
    order: 8,
    title: "动物词汇",
    subtitle: "学习 5 个常见动物词汇",
    objective: "认识马、羊、牛等动物词，并完成三项配对。",
    category: "animal",
    glyph: "ᠮᠣᠷᠢ",
    xp: 25,
    newItems: 5,
    questionCount: 7,
    focusVocabularyIds: ["horse", "sheep", "cow", "camel", "dog"]
  },
  {
    id: "numbers",
    order: 9,
    title: "数字一到五",
    subtitle: "学习数字词并进行听辨",
    objective: "听辨并识别一到五的基础数字词。",
    category: "number",
    glyph: "ᠨᠢᠭᠡ",
    xp: 25,
    newItems: 5,
    questionCount: 7,
    focusVocabularyIds: ["one", "two", "three", "four", "five"]
  },
  {
    id: "unit-challenge",
    order: 10,
    title: "综合复习",
    subtitle: "检查第一单元掌握情况",
    objective: "混合复习字母、词汇、听辨、补全和配对。",
    category: "letter",
    glyph: "★",
    xp: 35,
    newItems: 0,
    questionCount: 10,
    focusVocabularyIds: ["letter-a", "mother", "horse", "one", "tea"]
  }
];

export const vocabulary: VocabularyItem[] = [
  { id: "letter-a", category: "letter", chinese: "元音 A", mongolian: "ᠠ", pronunciationHint: "a", audioHint: "letter-a", exampleChinese: "字母样例", exampleMongolian: "ᠠ", reviewStatus: "pending-review" },
  { id: "letter-e", category: "letter", chinese: "元音 E", mongolian: "ᠡ", pronunciationHint: "e", audioHint: "letter-e", exampleChinese: "字母样例", exampleMongolian: "ᠡ", reviewStatus: "pending-review" },
  { id: "letter-i", category: "letter", chinese: "元音 I", mongolian: "ᠢ", pronunciationHint: "i", audioHint: "letter-i", exampleChinese: "字母样例", exampleMongolian: "ᠢ", reviewStatus: "pending-review" },
  { id: "letter-o", category: "letter", chinese: "元音 O", mongolian: "ᠣ", pronunciationHint: "o", audioHint: "letter-o", exampleChinese: "字母样例", exampleMongolian: "ᠣ", reviewStatus: "pending-review" },
  { id: "letter-u", category: "letter", chinese: "元音 U", mongolian: "ᠤ", pronunciationHint: "u", audioHint: "letter-u", exampleChinese: "字母样例", exampleMongolian: "ᠤ", reviewStatus: "pending-review" },
  { id: "letter-oe", category: "letter", chinese: "元音 OE", mongolian: "ᠥ", pronunciationHint: "oe", audioHint: "letter-oe", exampleChinese: "字母样例", exampleMongolian: "ᠥ", reviewStatus: "pending-review" },
  { id: "letter-m", category: "letter", chinese: "辅音 M", mongolian: "ᠮ", pronunciationHint: "m", audioHint: "letter-m", exampleChinese: "字母样例", exampleMongolian: "ᠮ", reviewStatus: "pending-review" },
  { id: "letter-n", category: "letter", chinese: "辅音 N", mongolian: "ᠨ", pronunciationHint: "n", audioHint: "letter-n", exampleChinese: "字母样例", exampleMongolian: "ᠨ", reviewStatus: "pending-review" },
  { id: "letter-b", category: "letter", chinese: "辅音 B", mongolian: "ᠪ", pronunciationHint: "b", audioHint: "letter-b", exampleChinese: "字母样例", exampleMongolian: "ᠪ", reviewStatus: "pending-review" },
  { id: "syllable-ma", category: "letter", chinese: "音节 ma", mongolian: "ᠮᠠ", pronunciationHint: "ma", audioHint: "syllable-ma", exampleChinese: "拼读样例", exampleMongolian: "ᠮᠠ", reviewStatus: "pending-review" },
  { id: "syllable-na", category: "letter", chinese: "音节 na", mongolian: "ᠨᠠ", pronunciationHint: "na", audioHint: "syllable-na", exampleChinese: "拼读样例", exampleMongolian: "ᠨᠠ", reviewStatus: "pending-review" },
  { id: "syllable-ba", category: "letter", chinese: "音节 ba", mongolian: "ᠪᠠ", pronunciationHint: "ba", audioHint: "syllable-ba", exampleChinese: "拼读样例", exampleMongolian: "ᠪᠠ", reviewStatus: "pending-review" },
  { id: "shape-initial", category: "letter", chinese: "词首形", mongolian: "ᠪᠠ", pronunciationHint: "ba", audioHint: "shape-initial", exampleChinese: "词首位置样例", exampleMongolian: "ᠪᠠ", reviewStatus: "pending-review" },
  { id: "shape-medial", category: "letter", chinese: "词中形", mongolian: "ᠠᠪᠠ", pronunciationHint: "aba", audioHint: "shape-medial", exampleChinese: "词中位置样例", exampleMongolian: "ᠠᠪᠠ", reviewStatus: "pending-review" },
  { id: "shape-final", category: "letter", chinese: "词尾形", mongolian: "ᠠᠪ", pronunciationHint: "ab", audioHint: "shape-final", exampleChinese: "词尾位置样例", exampleMongolian: "ᠠᠪ", reviewStatus: "pending-review" },
  { id: "mother", category: "family", chinese: "妈妈", mongolian: "ᠡᠵᠢ", pronunciationHint: "eji", audioHint: "mother", exampleChinese: "这是妈妈。", exampleMongolian: "ᠡᠨᠡ ᠡᠵᠢ", reviewStatus: "pending-review" },
  { id: "father", category: "family", chinese: "爸爸", mongolian: "ᠠᠪᠤ", pronunciationHint: "abu", audioHint: "father", exampleChinese: "这是爸爸。", exampleMongolian: "ᠡᠨᠡ ᠠᠪᠤ", reviewStatus: "pending-review" },
  { id: "elder-brother", category: "family", chinese: "哥哥", mongolian: "ᠠᠬ᠎ᠠ", pronunciationHint: "aha", audioHint: "elder-brother", exampleChinese: "哥哥在家。", exampleMongolian: "ᠠᠬ᠎ᠠ", reviewStatus: "pending-review" },
  { id: "elder-sister", category: "family", chinese: "姐姐", mongolian: "ᠡᠭᠡᠴᠢ", pronunciationHint: "egechi", audioHint: "elder-sister", exampleChinese: "姐姐在家。", exampleMongolian: "ᠡᠭᠡᠴᠢ", reviewStatus: "pending-review" },
  { id: "child", category: "family", chinese: "孩子", mongolian: "ᠬᠡᠦᠬᠡᠳ", pronunciationHint: "huuhed", audioHint: "child", exampleChinese: "一个孩子。", exampleMongolian: "ᠬᠡᠦᠬᠡᠳ", reviewStatus: "pending-review" },
  { id: "horse", category: "animal", chinese: "马", mongolian: "ᠮᠣᠷᠢ", pronunciationHint: "mori", audioHint: "horse", exampleChinese: "一匹马。", exampleMongolian: "ᠮᠣᠷᠢ", reviewStatus: "pending-review" },
  { id: "sheep", category: "animal", chinese: "羊", mongolian: "ᠬᠣᠨᠢ", pronunciationHint: "honi", audioHint: "sheep", exampleChinese: "一只羊。", exampleMongolian: "ᠬᠣᠨᠢ", reviewStatus: "pending-review" },
  { id: "cow", category: "animal", chinese: "牛", mongolian: "ᠦᠬᠡᠷ", pronunciationHint: "uher", audioHint: "cow", exampleChinese: "一头牛。", exampleMongolian: "ᠦᠬᠡᠷ", reviewStatus: "pending-review" },
  { id: "camel", category: "animal", chinese: "骆驼", mongolian: "ᠲᠡᠮᠡᠭᠡ", pronunciationHint: "temee", audioHint: "camel", exampleChinese: "一峰骆驼。", exampleMongolian: "ᠲᠡᠮᠡᠭᠡ", reviewStatus: "pending-review" },
  { id: "dog", category: "animal", chinese: "狗", mongolian: "ᠨᠣᠬᠠᠢ", pronunciationHint: "nohai", audioHint: "dog", exampleChinese: "一只狗。", exampleMongolian: "ᠨᠣᠬᠠᠢ", reviewStatus: "pending-review" },
  { id: "one", category: "number", chinese: "一", mongolian: "ᠨᠢᠭᠡ", pronunciationHint: "nige", audioHint: "one", exampleChinese: "一个。", exampleMongolian: "ᠨᠢᠭᠡ", reviewStatus: "pending-review" },
  { id: "two", category: "number", chinese: "二", mongolian: "ᠬᠣᠶᠠᠷ", pronunciationHint: "hoyar", audioHint: "two", exampleChinese: "两个。", exampleMongolian: "ᠬᠣᠶᠠᠷ", reviewStatus: "pending-review" },
  { id: "three", category: "number", chinese: "三", mongolian: "ᠭᠤᠷᠪᠠ", pronunciationHint: "gurba", audioHint: "three", exampleChinese: "三个。", exampleMongolian: "ᠭᠤᠷᠪᠠ", reviewStatus: "pending-review" },
  { id: "four", category: "number", chinese: "四", mongolian: "ᠳᠥᠷᠪᠡ", pronunciationHint: "dorbe", audioHint: "four", exampleChinese: "四个。", exampleMongolian: "ᠳᠥᠷᠪᠡ", reviewStatus: "pending-review" },
  { id: "five", category: "number", chinese: "五", mongolian: "ᠲᠠᠪᠤ", pronunciationHint: "tabu", audioHint: "five", exampleChinese: "五个。", exampleMongolian: "ᠲᠠᠪᠤ", reviewStatus: "pending-review" },
  { id: "tea", category: "food", chinese: "茶", mongolian: "ᠴᠠᠢ", pronunciationHint: "chai", audioHint: "tea", image: "tea", exampleChinese: "请给我茶。", exampleMongolian: "ᠴᠠᠢ ᠨᠠᠳᠠᠳ ᠥᠭ", reviewStatus: "pending-review" },
  { id: "water", category: "food", chinese: "水", mongolian: "ᠤᠰᠤ", pronunciationHint: "usu", audioHint: "water", image: "water", exampleChinese: "请给我水。", exampleMongolian: "ᠤᠰᠤ", reviewStatus: "pending-review" },
  { id: "bread", category: "food", chinese: "面包", mongolian: "ᠲᠠᠯᠬ᠎ᠠ", pronunciationHint: "talha", audioHint: "bread", image: "bread", exampleChinese: "这是面包。", exampleMongolian: "ᠲᠠᠯᠬ᠎ᠠ", reviewStatus: "pending-review" },
  { id: "coffee", category: "food", chinese: "咖啡", mongolian: "ᠺᠣᠹᠧ", pronunciationHint: "kofe", audioHint: "coffee", image: "coffee", exampleChinese: "这是咖啡。", exampleMongolian: "ᠺᠣᠹᠧ", reviewStatus: "pending-review" },
  { id: "milk", category: "food", chinese: "奶", mongolian: "ᠰᠦ", pronunciationHint: "su", audioHint: "milk", exampleChinese: "一杯奶。", exampleMongolian: "ᠰᠦ", reviewStatus: "pending-review" },
  { id: "book", category: "school", chinese: "书", mongolian: "ᠨᠣᠮ", pronunciationHint: "nom", audioHint: "book", exampleChinese: "一本书。", exampleMongolian: "ᠨᠣᠮ", reviewStatus: "pending-review" },
  { id: "pen", category: "school", chinese: "笔", mongolian: "ᠦᠵᠦᠭ", pronunciationHint: "uzug", audioHint: "pen", exampleChinese: "一支笔。", exampleMongolian: "ᠦᠵᠦᠭ", reviewStatus: "pending-review" },
  { id: "school", category: "school", chinese: "学校", mongolian: "ᠰᠤᠷᠭᠠᠭᠤᠯᠢ", pronunciationHint: "surguuli", audioHint: "school", exampleChinese: "我的学校。", exampleMongolian: "ᠰᠤᠷᠭᠠᠭᠤᠯᠢ", reviewStatus: "pending-review" },
  { id: "bag", category: "school", chinese: "书包", mongolian: "ᠴᠦᠩᠬᠡ", pronunciationHint: "chunghe", audioHint: "bag", exampleChinese: "我的书包。", exampleMongolian: "ᠴᠦᠩᠬᠡ", reviewStatus: "pending-review" },
  { id: "teacher", category: "school", chinese: "老师", mongolian: "ᠪᠠᠭᠰᠢ", pronunciationHint: "bagshi", audioHint: "teacher", exampleChinese: "我的老师。", exampleMongolian: "ᠪᠠᠭᠰᠢ", reviewStatus: "pending-review" },
  { id: "hand", category: "body", chinese: "手", mongolian: "ᠭᠠᠷ", pronunciationHint: "gar", audioHint: "hand", exampleChinese: "我的手。", exampleMongolian: "ᠭᠠᠷ", reviewStatus: "pending-review" },
  { id: "eye", category: "body", chinese: "眼睛", mongolian: "ᠨᠢᠳᠦ", pronunciationHint: "nidu", audioHint: "eye", exampleChinese: "眼睛。", exampleMongolian: "ᠨᠢᠳᠦ", reviewStatus: "pending-review" },
  { id: "red", category: "color", chinese: "红色", mongolian: "ᠤᠯᠠᠭᠠᠨ", pronunciationHint: "ulagan", audioHint: "red", exampleChinese: "红色。", exampleMongolian: "ᠤᠯᠠᠭᠠᠨ", reviewStatus: "pending-review" },
  { id: "blue", category: "color", chinese: "蓝色", mongolian: "ᠬᠥᠬᠡ", pronunciationHint: "huh", audioHint: "blue", exampleChinese: "蓝色。", exampleMongolian: "ᠬᠥᠬᠡ", reviewStatus: "pending-review" },
  { id: "home", category: "home", chinese: "家", mongolian: "ᠭᠡᠷ", pronunciationHint: "ger", audioHint: "home", exampleChinese: "我的家。", exampleMongolian: "ᠭᠡᠷ", reviewStatus: "pending-review" },
  { id: "room", category: "home", chinese: "房间", mongolian: "ᠥᠷᠥᠭᠡ", pronunciationHint: "oroo", audioHint: "room", exampleChinese: "房间。", exampleMongolian: "ᠥᠷᠥᠭᠡ", reviewStatus: "pending-review" },
  { id: "hello", category: "greeting", chinese: "你好", mongolian: "ᠰᠠᠢᠨ ᠪᠠᠢᠨ᠎ᠠ ᠤᠤ", pronunciationHint: "sain baina uu", audioHint: "hello", exampleChinese: "你好。", exampleMongolian: "ᠰᠠᠢᠨ ᠪᠠᠢᠨ᠎ᠠ ᠤᠤ", reviewStatus: "pending-review" },
  { id: "thanks", category: "greeting", chinese: "谢谢", mongolian: "ᠪᠠᠶᠠᠷᠯᠠᠯ᠎ᠠ", pronunciationHint: "bayarlalaa", audioHint: "thanks", exampleChinese: "谢谢。", exampleMongolian: "ᠪᠠᠶᠠᠷᠯᠠᠯ᠎ᠠ", reviewStatus: "pending-review" },
  { id: "name", category: "greeting", chinese: "名字", mongolian: "ᠨᠡᠷ᠎ᠡ", pronunciationHint: "nere", audioHint: "name", exampleChinese: "你叫什么名字？", exampleMongolian: "ᠴᠢ ᠬᠡᠨ ᠭᠡᠳᠡᠭ ᠪᠤᠢ", reviewStatus: "pending-review" },
  { id: "goodbye", category: "greeting", chinese: "再见", mongolian: "ᠪᠠᠶᠠᠷᠲᠠᠢ", pronunciationHint: "bayartai", audioHint: "goodbye", exampleChinese: "再见。", exampleMongolian: "ᠪᠠᠶᠠᠷᠲᠠᠢ", reviewStatus: "pending-review" }
];

export const simpleSentences: SentenceItem[] = [
  { id: "sentence-this-is-mother", chinese: "这是妈妈。", mongolian: "ᠡᠨᠡ ᠡᠵᠢ", pronunciationHint: "ene eji", audioHint: "sentence-this-is-mother", reviewStatus: "pending-review" },
  { id: "sentence-this-is-father", chinese: "这是爸爸。", mongolian: "ᠡᠨᠡ ᠠᠪᠤ", pronunciationHint: "ene abu", audioHint: "sentence-this-is-father", reviewStatus: "pending-review" },
  { id: "sentence-this-is-horse", chinese: "这是马。", mongolian: "ᠡᠨᠡ ᠮᠣᠷᠢ", pronunciationHint: "ene mori", audioHint: "sentence-this-is-horse", reviewStatus: "pending-review" },
  { id: "sentence-this-is-sheep", chinese: "这是羊。", mongolian: "ᠡᠨᠡ ᠬᠣᠨᠢ", pronunciationHint: "ene honi", audioHint: "sentence-this-is-sheep", reviewStatus: "pending-review" },
  { id: "sentence-one-horse", chinese: "一匹马。", mongolian: "ᠨᠢᠭᠡ ᠮᠣᠷᠢ", pronunciationHint: "nige mori", audioHint: "sentence-one-horse", reviewStatus: "pending-review" },
  { id: "sentence-two-sheep", chinese: "两只羊。", mongolian: "ᠬᠣᠶᠠᠷ ᠬᠣᠨᠢ", pronunciationHint: "hoyar honi", audioHint: "sentence-two-sheep", reviewStatus: "pending-review" },
  { id: "sentence-i-want-tea", chinese: "我想要茶。", mongolian: "ᠪᠢ ᠴᠠᠢ ᠬᠦᠰᠡᠨ᠎ᠡ", pronunciationHint: "bi chai husene", audioHint: "sentence-i-want-tea", reviewStatus: "pending-review" },
  { id: "sentence-give-me-water", chinese: "请给我水。", mongolian: "ᠤᠰᠤ ᠨᠠᠳᠠᠳ ᠥᠭ", pronunciationHint: "usu nadad og", audioHint: "sentence-give-me-water", reviewStatus: "pending-review" },
  { id: "sentence-give-me-tea", chinese: "请给我茶。", mongolian: "ᠴᠠᠢ ᠨᠠᠳᠠᠳ ᠥᠭ", pronunciationHint: "chai nadad og", audioHint: "sentence-give-me-tea", reviewStatus: "pending-review" },
  { id: "sentence-this-is-book", chinese: "这是书。", mongolian: "ᠡᠨᠡ ᠨᠣᠮ", pronunciationHint: "ene nom", audioHint: "sentence-this-is-book", reviewStatus: "pending-review" },
  { id: "sentence-this-is-pen", chinese: "这是笔。", mongolian: "ᠡᠨᠡ ᠦᠵᠦᠭ", pronunciationHint: "ene uzug", audioHint: "sentence-this-is-pen", reviewStatus: "pending-review" },
  { id: "sentence-my-school", chinese: "我的学校。", mongolian: "ᠮᠢᠨᠦ ᠰᠤᠷᠭᠠᠭᠤᠯᠢ", pronunciationHint: "minu surguuli", audioHint: "sentence-my-school", reviewStatus: "pending-review" },
  { id: "sentence-my-home", chinese: "我的家。", mongolian: "ᠮᠢᠨᠦ ᠭᠡᠷ", pronunciationHint: "minu ger", audioHint: "sentence-my-home", reviewStatus: "pending-review" },
  { id: "sentence-red-book", chinese: "红色的书。", mongolian: "ᠤᠯᠠᠭᠠᠨ ᠨᠣᠮ", pronunciationHint: "ulagan nom", audioHint: "sentence-red-book", reviewStatus: "pending-review" },
  { id: "sentence-blue-bag", chinese: "蓝色的书包。", mongolian: "ᠬᠥᠬᠡ ᠴᠦᠩᠬᠡ", pronunciationHint: "huh chunghe", audioHint: "sentence-blue-bag", reviewStatus: "pending-review" },
  { id: "sentence-i-like-milk", chinese: "我喜欢奶。", mongolian: "ᠪᠢ ᠰᠦ ᠳᠤᠷᠠᠲᠠᠢ", pronunciationHint: "bi su duratai", audioHint: "sentence-i-like-milk", reviewStatus: "pending-review" },
  { id: "sentence-i-like-horse", chinese: "我喜欢马。", mongolian: "ᠪᠢ ᠮᠣᠷᠢ ᠳᠤᠷᠠᠲᠠᠢ", pronunciationHint: "bi mori duratai", audioHint: "sentence-i-like-horse", reviewStatus: "pending-review" },
  { id: "sentence-what-is-this", chinese: "这是什么？", mongolian: "ᠡᠨᠡ ᠶᠠᠭᠤ ᠪᠤᠢ", pronunciationHint: "ene yagu bui", audioHint: "sentence-what-is-this", reviewStatus: "pending-review" },
  { id: "sentence-what-is-your-name", chinese: "你叫什么名字？", mongolian: "ᠴᠢ ᠬᠡᠨ ᠭᠡᠳᠡᠭ ᠪᠤᠢ", pronunciationHint: "chi hen gedeg bui", audioHint: "sentence-what-is-your-name", reviewStatus: "pending-review" },
  { id: "sentence-goodbye", chinese: "再见。", mongolian: "ᠪᠠᠶᠠᠷᠲᠠᠢ", pronunciationHint: "bayartai", audioHint: "sentence-goodbye", reviewStatus: "pending-review" }
];

const commonLetterOptions: ExerciseOption[] = [
  { id: "letter-a", label: "ᠠ", mongolian: "ᠠ", helper: "a" },
  { id: "letter-e", label: "ᠡ", mongolian: "ᠡ", helper: "e" },
  { id: "letter-i", label: "ᠢ", mongolian: "ᠢ", helper: "i" },
  { id: "letter-o", label: "ᠣ", mongolian: "ᠣ", helper: "o" },
  { id: "letter-u", label: "ᠤ", mongolian: "ᠤ", helper: "u" },
  { id: "letter-oe", label: "ᠥ", mongolian: "ᠥ", helper: "oe" },
  { id: "letter-b", label: "ᠪ", mongolian: "ᠪ", helper: "b" }
];

export const exercises: Exercise[] = [
  makeAudio("direction-audio-a", "direction", "听音选字：audio/letter-a", "letter-a", "ᠠ 是本课的第一个元音样例。"),
  makeMeaning("direction-meaning-vertical", "direction", "选择“从上到下书写”", "vertical", [
    { id: "vertical", label: "从上到下" },
    { id: "left-right", label: "从左到右" },
    { id: "right-left", label: "从右到左" }
  ], "传统蒙古文主要按竖排阅读。"),
  makeFill("direction-fill-a", "direction", "补全字母：_ ᠡ", "letter-a", "ᠠ_ᠡ", "ᠠ", "缺少的字母是 ᠠ。"),
  makeTriple("direction-match", "direction", "配对：元音 A", ["元音 A", "ᠠ", "audio/letter-a"], "三项都指向同一个学习条目。"),
  makeMeaning("direction-meaning-a", "direction", "选择 ᠠ 的发音提示", "a", [
    { id: "a", label: "a" },
    { id: "e", label: "e" },
    { id: "i", label: "i" }
  ], "ᠠ 的开发发音提示为 a。"),

  makeAudio("vowels-one-audio-e", "vowels-one", "听音选字：audio/letter-e", "letter-e", "ᠡ 与 ᠠ 需要分开识别。"),
  makeMeaning("vowels-one-meaning-i", "vowels-one", "看字选义：ᠢ", "i", [
    { id: "a", label: "元音 A" },
    { id: "e", label: "元音 E" },
    { id: "i", label: "元音 I" }
  ], "ᠢ 是本课的第三个元音。", "ᠢ"),
  makeFill("vowels-one-fill", "vowels-one", "补全这个字母组合", "letter-o", "ᠮ_ᠷᠢ", "ᠣ", "正确答案是 ᠣ。"),
  makeTriple("vowels-one-match", "vowels-one", "配对：元音 E", ["元音 E", "ᠡ", "audio/letter-e"], "中文、字形和音频编号需要对应。"),
  makeMeaning("vowels-one-meaning-a", "vowels-one", "选择 ᠠ", "letter-a", commonLetterOptions, "这个字形是 ᠠ。", "ᠠ"),
  makeAudio("vowels-one-audio-i", "vowels-one", "听音选字：audio/letter-i", "letter-i", "ᠢ 的发音提示为 i。"),

  makeAudio("vowels-two-audio-o", "vowels-two", "听音选字：audio/letter-o", "letter-o", "ᠣ 是本课新元音。"),
  makeMeaning("vowels-two-meaning-u", "vowels-two", "看字选发音：ᠤ", "u", [
    { id: "o", label: "o" },
    { id: "u", label: "u" },
    { id: "oe", label: "oe" }
  ], "ᠤ 的发音提示为 u。", "ᠤ"),
  makeFill("vowels-two-fill", "vowels-two", "补全字母组合", "letter-u", "ᠰ_ᠨ", "ᠤ", "缺少 ᠤ。"),
  makeTriple("vowels-two-match", "vowels-two", "配对：元音 OE", ["元音 OE", "ᠥ", "audio/letter-oe"], "三项配对用于复习。"),
  makeMeaning("vowels-two-meaning-o", "vowels-two", "选择 ᠣ", "letter-o", commonLetterOptions, "这个字形是 ᠣ。", "ᠣ"),
  makeAudio("vowels-two-audio-oe", "vowels-two", "听音选字：audio/letter-oe", "letter-oe", "ᠥ 与 ᠣ 要分开听辨。"),

  makeAudio("consonants-audio-m", "consonants-one", "听音选字：audio/letter-m", "letter-m", "ᠮ 是常见辅音。"),
  makeMeaning("consonants-meaning-n", "consonants-one", "看字选发音：ᠨ", "n", [
    { id: "m", label: "m" },
    { id: "n", label: "n" },
    { id: "b", label: "b" }
  ], "ᠨ 的发音提示为 n。", "ᠨ"),
  makeFill("consonants-fill", "consonants-one", "补全音节", "letter-b", "ᠪ_", "ᠠ", "这里补上 ᠠ 形成音节样例。"),
  makeTriple("consonants-match", "consonants-one", "配对：辅音 B", ["辅音 B", "ᠪ", "audio/letter-b"], "三项都指向辅音 B。"),
  makeMeaning("consonants-meaning-m", "consonants-one", "选择 ᠮ", "letter-m", [
    { id: "letter-m", label: "ᠮ", mongolian: "ᠮ" },
    { id: "letter-n", label: "ᠨ", mongolian: "ᠨ" },
    { id: "letter-b", label: "ᠪ", mongolian: "ᠪ" }
  ], "这个字形是 ᠮ。", "ᠮ"),
  makeAudio("consonants-audio-b", "consonants-one", "听音选字：audio/letter-b", "letter-b", "ᠪ 的发音提示为 b。"),

  makeMeaning("syllables-meaning-ma", "syllables", "看字选音节：ᠮᠠ", "ma", [
    { id: "ma", label: "ma" },
    { id: "na", label: "na" },
    { id: "ba", label: "ba" }
  ], "ᠮ + ᠠ 可作为 ma 的拼读样例。", "ᠮᠠ"),
  makeAudio("syllables-audio-na", "syllables", "听音选字：audio/syllable-na", "syllable-na", "ᠨᠠ 是 na 的拼读样例。"),
  makeFill("syllables-fill-ba", "syllables", "补全音节", "letter-a", "ᠪ_", "ᠠ", "ᠪ + ᠠ 是 ba 的拼读样例。"),
  makeTriple("syllables-match-ma", "syllables", "配对：音节 ma", ["音节 ma", "ᠮᠠ", "audio/syllable-ma"], "三项配对可帮助建立字音联系。"),
  makeMeaning("syllables-meaning-ba", "syllables", "选择 ba", "syllable-ba", [
    { id: "syllable-ma", label: "ᠮᠠ", mongolian: "ᠮᠠ" },
    { id: "syllable-na", label: "ᠨᠠ", mongolian: "ᠨᠠ" },
    { id: "syllable-ba", label: "ᠪᠠ", mongolian: "ᠪᠠ" }
  ], "ᠪᠠ 是 ba。", "ᠪᠠ"),
  makeAudio("syllables-audio-ba", "syllables", "听音选字：audio/syllable-ba", "syllable-ba", "正确字形是 ᠪᠠ。"),

  makeMeaning("shapes-initial", "letter-shapes", "词首位置样例是哪一个？", "shape-initial", [
    { id: "shape-initial", label: "ᠪᠠ", mongolian: "ᠪᠠ", helper: "词首" },
    { id: "shape-medial", label: "ᠠᠪᠠ", mongolian: "ᠠᠪᠠ", helper: "词中" },
    { id: "shape-final", label: "ᠠᠪ", mongolian: "ᠠᠪ", helper: "词尾" }
  ], "词首、词中、词尾形态需要单独观察。", "ᠪᠠ"),
  makeAudio("shapes-audio-medial", "letter-shapes", "听音选字：audio/shape-medial", "shape-medial", "本题用于观察词中位置样例。"),
  makeFill("shapes-fill", "letter-shapes", "补全词中样例", "letter-b", "ᠠ_ᠠ", "ᠪ", "这里缺少辅音 ᠪ。"),
  makeTriple("shapes-match", "letter-shapes", "配对：词尾形", ["词尾形", "ᠠᠪ", "audio/shape-final"], "词尾形需要和词首、词中分开记。"),
  makeMeaning("shapes-final", "letter-shapes", "选择词尾样例", "shape-final", [
    { id: "shape-initial", label: "词首" },
    { id: "shape-medial", label: "词中" },
    { id: "shape-final", label: "词尾" }
  ], "这个样例用于词尾位置。", "ᠠᠪ"),
  makeAudio("shapes-audio-final", "letter-shapes", "听音选字：audio/shape-final", "shape-final", "正确选项是词尾样例。"),

  makeMeaning("family-mother", "family", "看字选义：ᠡᠵᠢ", "mother", familyOptions(), "ᠡᠵᠢ 的开发释义为妈妈。", "ᠡᠵᠢ"),
  makeAudio("family-father-audio", "family", "听音选词：audio/father", "father", "正确选项是爸爸。"),
  makeMeaning("family-child", "family", "选择“孩子”", "child", familyOptions(), "孩子对应的开发词条是 ᠬᠡᠦᠬᠡᠳ。"),
  makeFill("family-fill-mother", "family", "补全妈妈", "letter-e", "_ᠵᠢ", "ᠡ", "缺少 ᠡ。"),
  makeTriple("family-match", "family", "配对：妈妈", ["妈妈", "ᠡᠵᠢ", "audio/mother"], "三项都指向妈妈。"),
  makeMeaning("family-brother", "family", "看字选义：ᠠᠬ᠎ᠠ", "elder-brother", familyOptions(), "本条目释义为哥哥。", "ᠠᠬ᠎ᠠ"),
  makeAudio("family-sister-audio", "family", "听音选词：audio/elder-sister", "elder-sister", "正确选项是姐姐。"),

  makeMeaning("animals-horse", "animals", "看字选义：ᠮᠣᠷᠢ", "horse", animalOptions(), "ᠮᠣᠷᠢ 的开发释义为马。", "ᠮᠣᠷᠢ"),
  makeAudio("animals-sheep-audio", "animals", "听音选词：audio/sheep", "sheep", "正确选项是羊。"),
  makeMeaning("animals-cow", "animals", "选择“牛”", "cow", animalOptions(), "牛对应的开发词条是 ᠦᠬᠡᠷ。"),
  makeFill("animals-fill-horse", "animals", "补全马", "letter-o", "ᠮ_ᠷᠢ", "ᠣ", "缺少 ᠣ。"),
  makeTriple("animals-match", "animals", "配对：马", ["马", "ᠮᠣᠷᠢ", "audio/horse"], "三项都指向马。"),
  makeMeaning("animals-dog", "animals", "看字选义：ᠨᠣᠬᠠᠢ", "dog", animalOptions(), "本条目释义为狗。", "ᠨᠣᠬᠠᠢ"),
  makeAudio("animals-camel-audio", "animals", "听音选词：audio/camel", "camel", "正确选项是骆驼。"),

  makeMeaning("numbers-one", "numbers", "看字选义：ᠨᠢᠭᠡ", "one", numberOptions(), "ᠨᠢᠭᠡ 的开发释义为一。", "ᠨᠢᠭᠡ"),
  makeAudio("numbers-two-audio", "numbers", "听音选词：audio/two", "two", "正确选项是二。"),
  makeMeaning("numbers-three", "numbers", "选择“三”", "three", numberOptions(), "三对应的开发词条是 ᠭᠤᠷᠪᠠ。"),
  makeFill("numbers-fill-five", "numbers", "补全五", "letter-a", "ᠲ_ᠪᠤ", "ᠠ", "缺少 ᠠ。"),
  makeTriple("numbers-match", "numbers", "配对：一", ["一", "ᠨᠢᠭᠡ", "audio/one"], "三项都指向数字一。"),
  makeMeaning("numbers-four", "numbers", "看字选义：ᠳᠥᠷᠪᠡ", "four", numberOptions(), "本条目释义为四。", "ᠳᠥᠷᠪᠡ"),
  makeAudio("numbers-five-audio", "numbers", "听音选词：audio/five", "five", "正确选项是五。"),

  makePicture("challenge-picture-tea", "unit-challenge", "看图选词", "tea", "茶", "选择茶对应的词。"),
  makeMeaning("challenge-meaning-horse", "unit-challenge", "看字选义：ᠮᠣᠷᠢ", "horse", animalOptions(), "ᠮᠣᠷᠢ 的开发释义为马。", "ᠮᠣᠷᠢ"),
  makeAudio("challenge-audio-one", "unit-challenge", "听音选词：audio/one", "one", "正确选项是一。"),
  makeFill("challenge-fill", "unit-challenge", "补全音节", "letter-a", "ᠮ_", "ᠠ", "缺少 ᠠ。"),
  makeTriple("challenge-match-mother", "unit-challenge", "配对：妈妈", ["妈妈", "ᠡᠵᠢ", "audio/mother"], "三项都指向妈妈。"),
  makeMeaning("challenge-meaning-tea", "unit-challenge", "选择“茶”", "tea", foodOptions(), "茶对应的开发词条是 ᠴᠠᠢ。"),
  makeAudio("challenge-audio-letter-b", "unit-challenge", "听音选字：audio/letter-b", "letter-b", "正确选项是 ᠪ。"),
  makeMeaning("challenge-meaning-five", "unit-challenge", "看字选义：ᠲᠠᠪᠤ", "five", numberOptions(), "本条目释义为五。", "ᠲᠠᠪᠤ"),
  makePicture("challenge-picture-water", "unit-challenge", "看图选词", "water", "水", "选择水对应的词。"),
  makeTriple("challenge-match-horse", "unit-challenge", "配对：马", ["马", "ᠮᠣᠷᠢ", "audio/horse"], "三项都指向马。")
];

export const dailyQuests: DailyQuest[] = [
  { id: "one-lesson", title: "完成 1 节课程", reward: "+10 XP", target: 1, color: "purple" },
  { id: "answer-five", title: "答对 5 道练习", reward: "+5 XP", target: 5, color: "blue" },
  { id: "review-three", title: "复习 3 道错题", reward: "◆5", target: 3, color: "green" }
];

export function getLessonById(id: string) {
  return lessons.find((lesson) => lesson.id === id) ?? lessons[0];
}

export function getExercisesForLesson(lessonId: string) {
  return exercises.filter((exercise) => exercise.lessonId === lessonId);
}

export function getVocabularyById(id: string) {
  return vocabulary.find((item) => item.id === id);
}

export function getVocabularyForLesson(lessonId: string) {
  const lesson = getLessonById(lessonId);
  return lesson.focusVocabularyIds
    .map((id) => getVocabularyById(id))
    .filter((item): item is VocabularyItem => Boolean(item));
}

export function getNextLessonId(completedLessonIds: string[]) {
  return lessons.find((lesson) => !completedLessonIds.includes(lesson.id))?.id ?? lessons[lessons.length - 1].id;
}

export function getLessonStatus(lessonId: string, completedLessonIds: string[]): LessonStatus {
  if (completedLessonIds.includes(lessonId)) {
    return "done";
  }

  const nextLessonId = getNextLessonId(completedLessonIds);
  if (lessonId === nextLessonId) {
    return lessonId === "unit-challenge" ? "challenge" : "current";
  }

  return "locked";
}

function makeAudio(id: string, lessonId: string, prompt: string, answer: string, explanation: string): Exercise {
  return {
    id,
    lessonId,
    type: "audio-choice",
    prompt,
    answer,
    audioHint: answer,
    options: mixedOptions(answer),
    explanation,
    xp: 5
  };
}

function makeMeaning(
  id: string,
  lessonId: string,
  prompt: string,
  answer: string,
  options: ExerciseOption[],
  explanation: string,
  mongolian?: string
): Exercise {
  return {
    id,
    lessonId,
    type: "meaning-choice",
    prompt,
    answer,
    options,
    explanation,
    mongolian,
    xp: 5
  };
}

function makeFill(
  id: string,
  lessonId: string,
  prompt: string,
  answer: string,
  missingText: string,
  mongolian: string,
  explanation: string
): Exercise {
  return {
    id,
    lessonId,
    type: "fill-letter",
    prompt,
    answer,
    missingText,
    mongolian,
    options: commonLetterOptions,
    explanation,
    xp: 5
  };
}

function makeTriple(
  id: string,
  lessonId: string,
  prompt: string,
  answer: string[],
  explanation: string
): Exercise {
  return {
    id,
    lessonId,
    type: "triple-match",
    prompt,
    answer,
    options: [
      ...answer.map((label) => ({ id: label, label })),
      { id: `${id}-distractor-1`, label: "干扰项" },
      { id: `${id}-distractor-2`, label: "audio/other" }
    ],
    explanation,
    xp: 5
  };
}

function makePicture(
  id: string,
  lessonId: string,
  prompt: string,
  answer: "tea" | "water" | "bread" | "coffee",
  chinese: string,
  explanation: string
): Exercise {
  return {
    id,
    lessonId,
    type: "picture-choice",
    prompt,
    answer,
    chinese,
    image: answer,
    options: foodOptions(),
    explanation,
    xp: 5
  };
}

function mixedOptions(answer: string): ExerciseOption[] {
  const answerItem = getVocabularyById(answer);
  const fallback = answerItem
    ? [{ id: answerItem.id, label: answerItem.chinese, mongolian: answerItem.mongolian, helper: answerItem.pronunciationHint }]
    : [];
  const pool = vocabulary
    .filter((item) => item.id !== answer && item.category === (answerItem?.category ?? "letter"))
    .slice(0, 3)
    .map((item) => ({ id: item.id, label: item.chinese, mongolian: item.mongolian, helper: item.pronunciationHint }));

  return [...fallback, ...pool].slice(0, 4);
}

function optionsFromIds(ids: string[]): ExerciseOption[] {
  return ids
    .map((id) => getVocabularyById(id))
    .filter((item): item is VocabularyItem => Boolean(item))
    .map((item) => ({
      id: item.id,
      label: item.chinese,
      mongolian: item.mongolian,
      helper: item.pronunciationHint,
      image: item.image
    }));
}

function familyOptions() {
  return optionsFromIds(["mother", "father", "elder-brother", "elder-sister", "child"]);
}

function animalOptions() {
  return optionsFromIds(["horse", "sheep", "cow", "camel", "dog"]);
}

function numberOptions() {
  return optionsFromIds(["one", "two", "three", "four", "five"]);
}

function foodOptions() {
  return optionsFromIds(["water", "bread", "tea", "coffee"]);
}
