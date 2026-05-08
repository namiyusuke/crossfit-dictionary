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
  weightlifting: "#DB6C66",
  gymnastics: "#553EEC",
  cardio: "#6BAF7A",
  kettlebell: "#F39C12",
  bodyweight: "#EDE0C8",
};
export const CATEGORY_SHADOW: Record<Category, string> = {
  weightlifting: "#5D4230",
  gymnastics: "#5D4230",
  cardio: "#5D4230",
  kettlebell: "#5D4230",
  bodyweight: "#5D4230",
};

export const ALL_EFFECTS: PrimaryEffect[] = ["筋力", "筋持久力", "心肺", "爆発力", "可動域", "体幹"];

export const ALL_BODY_PARTS: BodyPart[] = ["上半身", "下半身", "コア", "全身"];
