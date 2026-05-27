export type Category = "M" | "G" | "W";

export type MovementPattern =
  | "squat"
  | "hinge"
  | "push-vertical"
  | "push-horizontal"
  | "pull-vertical"
  | "pull-horizontal"
  | "core"
  | "locomotion"
  | "olympic";

export type PrimaryEffect = "筋力" | "筋持久力" | "心肺" | "爆発力" | "可動域" | "体幹";

export type BodyPart = "脚" | "臀部" | "背中" | "肩" | "腕" | "胸" | "コア" | "全身" | "ふくらはぎ";

export type Equipment =
  | "バーベル"
  | "ケトルベル"
  | "鉄棒"
  | "ローイングマシン"
  | "縄跳び"
  | "ボックス"
  | "ウォールボール"
  | "平行棒"
  | "つり輪"
  | "クライミングロープ"
  | "ダンベル"
  | "パラレットまたは床"
  | "スラムボール"
  | "なし";

export const ALL_EQUIPMENT: Equipment[] = [
  "バーベル",
  "ケトルベル",
  "鉄棒",
  "ローイングマシン",
  "縄跳び",
  "ボックス",
  "ウォールボール",
  "平行棒",
  "つり輪",
  "クライミングロープ",
  "ダンベル",
  "パラレットまたは床",
  "スラムボール",
];

export interface Prerequisite {
  name: string;
  description: string;
  target: string;
}

export interface Drill {
  phase: string;
  name: string;
  detail: string;
  reps: string;
}

export interface Roadmap {
  goal: string;
  prerequisites: Prerequisite[];
  drills: Drill[];
  timeEstimate: string;
}

export interface Movement {
  id: string;
  name: string;
  nameEn: string;
  category: Category;
  equipment: Equipment[];
  oneLiner: string;
  purpose: string;
  primaryEffect: PrimaryEffect[];
  bodyPart: BodyPart[];
  movementPattern: MovementPattern[];
  steps: string[];
  tips: string[];
  muscleMain: string[];
  muscleSub: string[];
  difficulty: number;
  scaling: string;
  videoId: string;
  roadmap: Roadmap | null;
}

export const categoryLabels: Record<Category, { ja: string; en: string }> = {
  M: { ja: "カーディオ", en: "Monostructural" },
  G: { ja: "ジムナスティクス", en: "Gymnastics" },
  W: { ja: "ウェイトリフティング", en: "Weightlifting" },
};

export const movementPatternLabels: Record<MovementPattern, { ja: string; en: string }> = {
  squat: { ja: "スクワット", en: "Squat" },
  hinge: { ja: "ヒンジ", en: "Hinge" },
  "push-vertical": { ja: "押す・垂直", en: "Vertical Push" },
  "push-horizontal": { ja: "押す・水平", en: "Horizontal Push" },
  "pull-vertical": { ja: "引く・垂直", en: "Vertical Pull" },
  "pull-horizontal": { ja: "引く・水平", en: "Horizontal Pull" },
  core: { ja: "コア", en: "Core" },
  locomotion: { ja: "移動・運搬", en: "Locomotion" },
  olympic: { ja: "オリンピックリフト", en: "Olympic Lift" },
};

export const CATEGORY_COLORS: Record<Category, string> = {
  W: "#DB6C66",
  G: "#553EEC",
  M: "#6BAF7A",
};

export const CATEGORY_SHADOW: Record<Category, string> = {
  W: "#5D4230",
  G: "#5D4230",
  M: "#5D4230",
};

export const ALL_EFFECTS: PrimaryEffect[] = ["筋力", "筋持久力", "心肺", "爆発力", "可動域", "体幹"];

export const ALL_BODY_PARTS: BodyPart[] = ["脚", "臀部", "背中", "肩", "腕", "胸", "コア", "全身", "ふくらはぎ"];

export const ALL_MOVEMENT_PATTERNS: MovementPattern[] = [
  "squat",
  "hinge",
  "push-vertical",
  "push-horizontal",
  "pull-vertical",
  "pull-horizontal",
  "core",
  "locomotion",
  "olympic",
];
