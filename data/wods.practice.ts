// ============================================
// 練習用: WOD データを作ってみよう
// ============================================

import type { Wod } from "@/types/wod";

export const wods: Wod[] = [
  // ===== WOD 1: AMRAP（時間内にできるだけ多く） =====
  // シンプルな1セットの例
  {
    id: "amrap-01",
    name: "First AMRAP",
    format: "AMRAP",
    level: "初心者",
    goal: "全身の基礎体力づくり",
    targetBodyPart: ["全身"],
    targetEffect: ["筋持久力", "心肺"],
    duration: "10分",
    sets: [
      {
        // label なし → WodSet の label?: string が省略されている例
        movements: [
          { movementId: "air-squat", name: "エアスクワット", reps: "10回" },
          { movementId: "push-up", name: "プッシュアップ", reps: "5回" },
          { movementId: "burpee", name: "バーピー", reps: "3回" },
        ],
      },
    ],
    // rounds, repScheme は省略（オプショナル）
    estimate: { beginner: "3〜4ラウンド", rx: "6〜7ラウンド" },
    tip: "スクワットは深さを妥協しないこと。フルレンジで動く方が成長につながる。",
    notes: "初めてのAMRAPに最適。スケーリングとして膝つきプッシュアップに変更可。",
  },

  // ===== WOD 2: EMOM（毎分スタート） =====
  // 複数セット + label ありの例
  {
    id: "emom-01",
    name: "Push Pull EMOM",
    format: "EMOM",
    level: "初心者",
    goal: "上半身の筋持久力アップ",
    targetBodyPart: ["上半身"],
    targetEffect: ["筋力", "筋持久力"],
    duration: "10分（5ラウンド）",
    sets: [
      {
        label: "奇数分", // ← label ありの例
        movements: [
          { movementId: "push-up", name: "プッシュアップ", reps: "8回" },
        ],
      },
      {
        label: "偶数分",
        movements: [
          { movementId: "pull-up", name: "プルアップ", reps: "5回" },
        ],
      },
    ],
    rounds: 5, // ← オプショナルプロパティを使っている例
    estimate: { beginner: "各セット40〜50秒", rx: "各セット25〜35秒" },
    tip: "EMOMの本質は「決まった時間内にやりきる→残りで回復」のサイクル。レストが短すぎるならレップ数を下げて質を保つ。",
    notes: null, // ← string | null で null を使っている例
  },
];
