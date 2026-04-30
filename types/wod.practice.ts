// ============================================
// 練習用: WOD の型定義を自分で書いてみよう
// ============================================

// --- Step B-1: movement.ts から型を import する ---
// BodyPart と PrimaryEffect を使いたい
// ヒント: import type { Xxx, Yyy } from "./movement";
// ここに書いてみよう👇
import type { BodyPart, PrimaryEffect } from "./movement";

// --- Step B-2: WOD のフォーマットとレベルの型を作る ---
// フォーマット: "AMRAP", "EMOM", "ForTime" の3つ
// レベル: "初心者", "中級者" の2つ
// ここに書いてみよう👇
export type WodFormat = "AMRAP" | "EMOM" | "ForTime";
export type WodLevel = "初心者" | "中級者";

// --- Step B-3: WOD 内の種目とセットの型を作る ---
// WodMovement: movementId, name, reps を持つ
// WodSet: label(あってもなくてもいい), movements(WodMovement の配列) を持つ
// ヒント: あってもなくてもいいプロパティは label?: string と書く（? がポイント）
// ここに書いてみよう👇
export interface WodMovement {
  movementId: string;
  name: string;
  reps: string;
}

export interface WodSet {
  label?: string; // オプショナル: あってもなくてもいい
  movements: WodMovement[];
}

// --- Step B-4: メインの Wod 型を作る ---
// id, name, format(WodFormat), level(WodLevel), goal,
// targetBodyPart(BodyPart配列), targetEffect(PrimaryEffect配列),
// duration, sets(WodSet配列),
// rounds(あってもなくてもいい・数値), repScheme(あってもなくてもいい・文字列),
// notes(文字列 or null)
// ここに書いてみよう👇
export interface Wod {
  id: string;
  name: string;
  format: WodFormat;
  level: WodLevel;
  goal: string;
  targetBodyPart: BodyPart[];
  targetEffect: PrimaryEffect[];
  duration: string;
  sets: WodSet[];
  rounds?: number; // オプショナル
  repScheme?: string; // オプショナル
  notes: string | null; // 必須だが null を許容
}
