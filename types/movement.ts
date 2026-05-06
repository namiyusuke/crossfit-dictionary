export type Category = "weightlifting" | "gymnastics" | "cardio" | "kettlebell" | "bodyweight";

export type PrimaryEffect = "筋力" | "筋持久力" | "心肺" | "爆発力" | "可動域" | "体幹";

export type BodyPart = "上半身" | "下半身" | "コア" | "全身";

export type Equipment =
  | "バーベル"
  | "ケトルベル"
  | "鉄棒"
  | "ローイングマシン"
  | "トレッドミル"
  | "縄跳び"
  | "バイク"
  | "ボックス"
  | "ウォールボール"
  | "なし";

export const ALL_EQUIPMENT: Equipment[] = [
  "バーベル",
  "ケトルベル",
  "鉄棒",
  "ローイングマシン",
  "トレッドミル",
  "縄跳び",
  "バイク",
  "ボックス",
  "ウォールボール",
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
  steps: string[];
  tips: string[];
  muscleMain: string[];
  muscleSub: string[];
  difficulty: number;
  scaling: string;
  videoId: string;
  roadmap: Roadmap | null;
}

export const CATEGORY_LABELS: Record<Category, string> = {
  weightlifting: "ウェイトリフティング",
  gymnastics: "ジムナスティクス",
  cardio: "カーディオ",
  kettlebell: "ケトルベル",
  bodyweight: "自重トレーニング",
};

export const CATEGORY_COLORS: Record<Category, string> = {
  weightlifting: "#FFD700",
  gymnastics: "#9B4DFF",
  cardio: "#FF6B00",
  kettlebell: "#F39C12",
  bodyweight: "#00FF88",
};
export const CATEGORY_SHADOW: Record<Category, string> = {
  weightlifting: "#A38900",
  gymnastics: "#5A1E99",
  cardio: "#994000",
  kettlebell: "#F39C12",
  bodyweight: "#007A40",
};

export const ALL_EFFECTS: PrimaryEffect[] = ["筋力", "筋持久力", "心肺", "爆発力", "可動域", "体幹"];

export const ALL_BODY_PARTS: BodyPart[] = ["上半身", "下半身", "コア", "全身"];
