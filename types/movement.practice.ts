// ============================================
// 練習用: 型定義を自分で書いてみよう
// ============================================

// --- Step A-1: カテゴリの型を作る ---
// ウェイトリフティング、ジムナスティクス、カーディオ、ケトルベル、自重トレーニング の5つ
// ヒント: type Category = "xxx" | "yyy" | ...
// ここに書いてみよう👇

export type Category = "weightlifting" | "gymnastics" | "cardio" | "kettlebell" | "bodyweight";

// --- Step A-2: 効果と部位の型を作る ---
// 効果: 筋力、筋持久力、心肺、爆発力、可動域、体幹
// 部位: 上半身、下半身、コア、全身
// ここに書いてみよう👇
export type PrimaryEffect = "筋力" | "筋持久力" | "心肺" | "爆発力" | "可動域" | "体幹";
export type BodyPart = "上半身" | "下半身" | "コア" | "全身";

// --- Step A-3: ロードマップ関連の型を作る ---
// Prerequisite（前提スキル）: name, description, target を持つ
// Drill（練習メニュー）: phase, name, detail, reps を持つ
// Roadmap: goal, prerequisites(配列), drills(配列), timeEstimate を持つ
// ここに書いてみよう👇
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
  prerequisites: Prerequisite[]; // Prerequisite の配列
  drills: Drill[]; // Drill の配列
  timeEstimate: string;
}

// --- Step A-4: メインの Movement 型を作る ---
// 上で作った型を使って、Movement interface を完成させよう
// ヒント: 配列は string[] や PrimaryEffect[] のように書く
//        null になりうるものは Roadmap | null のように書く
// ここに書いてみよう👇

export interface Movement {
  id: string;
  name: string;
  nameEn: string;
  category: Category;
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

// --- Step A-5: 定数を作る ---
// CATEGORY_LABELS: Category をキーにした日本語ラベルの辞書
// CATEGORY_COLORS: Category をキーにした色コードの辞書
// ALL_EFFECTS: 全効果の配列
// ALL_BODY_PARTS: 全部位の配列
// ヒント: Record<Category, string> を使う
// ここに書いてみよう👇

export const CATEGORY_LABELS: Record<Category, string> = {
  weightlifting: "ウェイトリフティング",
  gymnastics: "ジムナスティクス",
  cardio: "カーディオ",
  kettlebell: "ケトルベル",
  bodyweight: "自重トレーニング",
};
export const ALL_EFFECTS: PrimaryEffect[] = ["筋力", "筋持久力", "心肺", "爆発力", "可動域", "体幹"];

export const ALL_BODY_PARTS: BodyPart[] = ["上半身", "下半身", "コア", "全身"];
