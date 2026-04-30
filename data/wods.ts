import type { Wod } from "@/types/wod";

export const wods: Wod[] = [
  // ===== AMRAP =====
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
        movements: [
          { movementId: "air-squat", name: "エアスクワット", reps: "10回" },
          { movementId: "push-up", name: "プッシュアップ", reps: "5回" },
          { movementId: "sit-up", name: "シットアップ", reps: "10回" },
        ],
      },
    ],
    notes: "初めてのAMRAPに最適。スケーリングとして膝つきプッシュアップ、クランチに変更可。",
  },
  {
    id: "amrap-02",
    name: "Kettlebell Storm",
    format: "AMRAP",
    level: "中級者",
    goal: "心肺＋下半身爆発力",
    targetBodyPart: ["下半身", "全身"],
    targetEffect: ["心肺", "爆発力"],
    duration: "12分",
    sets: [
      {
        movements: [
          { movementId: "kettlebell-swing", name: "ケトルベルスイング", reps: "15回" },
          { movementId: "box-jump", name: "ボックスジャンプ", reps: "10回" },
          { movementId: "burpee", name: "バーピー", reps: "5回" },
        ],
      },
    ],
    notes: "KBスイングは16kg推奨。ボックスジャンプはステップアップに変更可。",
  },
  {
    id: "amrap-03",
    name: "Gymnast Loop",
    format: "AMRAP",
    level: "中級者",
    goal: "上半身・体幹のジムナスティクス強化",
    targetBodyPart: ["上半身", "コア"],
    targetEffect: ["筋力", "体幹"],
    duration: "10分",
    sets: [
      {
        movements: [
          { movementId: "pull-up", name: "プルアップ", reps: "5回" },
          { movementId: "handstand-push-up", name: "ハンドスタンド・プッシュアップ", reps: "3回" },
          { movementId: "toes-to-bar", name: "トゥーズ・トゥ・バー", reps: "7回" },
        ],
      },
    ],
    notes: "プルアップ→バンドアシスト、HSPU→パイクPU、T2B→ニーレイズにスケーリング可。",
  },

  // ===== EMOM =====
  {
    id: "emom-01",
    name: "Squat Every Minute",
    format: "EMOM",
    level: "初心者",
    goal: "下半身＋上半身の交互強化",
    targetBodyPart: ["下半身", "上半身"],
    targetEffect: ["筋持久力"],
    duration: "10分",
    sets: [
      {
        label: "奇数分",
        movements: [
          { movementId: "air-squat", name: "エアスクワット", reps: "15回" },
        ],
      },
      {
        label: "偶数分",
        movements: [
          { movementId: "push-up", name: "プッシュアップ", reps: "10回" },
        ],
      },
    ],
    notes: "各分内に余った時間が休憩。余裕があればレップ数を増やす。",
  },
  {
    id: "emom-02",
    name: "Barbell Basics",
    format: "EMOM",
    level: "初心者",
    goal: "バーベル基本動作の習得",
    targetBodyPart: ["全身"],
    targetEffect: ["筋力"],
    duration: "12分（4分×3サイクル）",
    sets: [
      {
        label: "1分目",
        movements: [
          { movementId: "deadlift", name: "デッドリフト", reps: "5回" },
        ],
      },
      {
        label: "2分目",
        movements: [
          { movementId: "shoulder-press", name: "ショルダープレス", reps: "5回" },
        ],
      },
      {
        label: "3分目",
        movements: [
          { movementId: "front-squat", name: "フロントスクワット", reps: "5回" },
        ],
      },
      {
        label: "4分目",
        movements: [],
      },
    ],
    rounds: 3,
    notes: "4分目は休憩。重量は空バー〜軽量で正しいフォームを最優先に。",
  },
  {
    id: "emom-03",
    name: "Cardio Punch",
    format: "EMOM",
    level: "中級者",
    goal: "心肺能力の向上",
    targetBodyPart: ["全身"],
    targetEffect: ["心肺"],
    duration: "10分",
    sets: [
      {
        label: "奇数分",
        movements: [
          { movementId: "double-under", name: "ダブルアンダー", reps: "30回" },
        ],
      },
      {
        label: "偶数分",
        movements: [
          { movementId: "rowing", name: "ローイング", reps: "15cal" },
        ],
      },
    ],
    notes: "DU→シングルアンダー60回にスケーリング可。ローイングはペースを一定に。",
  },

  // ===== For Time =====
  {
    id: "fortime-01",
    name: "The Baseline",
    format: "ForTime",
    level: "初心者",
    goal: "体力テスト・記録更新の基準づくり",
    targetBodyPart: ["上半身", "コア"],
    targetEffect: ["筋持久力"],
    duration: "〜15分",
    repScheme: "21-15-9",
    sets: [
      {
        movements: [
          { movementId: "push-up", name: "プッシュアップ", reps: "21-15-9" },
          { movementId: "sit-up", name: "シットアップ", reps: "21-15-9" },
        ],
      },
    ],
    notes: "定期的に実施してタイムの改善を記録するベンチマークWOD。",
  },
  {
    id: "fortime-02",
    name: "Barbell Triplet",
    format: "ForTime",
    level: "中級者",
    goal: "全身パワー持久力（Fran系）",
    targetBodyPart: ["全身"],
    targetEffect: ["筋持久力", "心肺"],
    duration: "〜20分",
    repScheme: "21-15-9",
    sets: [
      {
        movements: [
          { movementId: "thruster", name: "スラスター", reps: "21-15-9" },
          { movementId: "pull-up", name: "プルアップ", reps: "21-15-9" },
        ],
      },
    ],
    notes: "Franの派生WOD。重量は男性30kg/女性20kg推奨。プルアップはバンドアシスト可。",
  },
  {
    id: "fortime-03",
    name: "Lower Body Blast",
    format: "ForTime",
    level: "中級者",
    goal: "下半身総合強化",
    targetBodyPart: ["下半身", "全身"],
    targetEffect: ["筋持久力", "心肺"],
    duration: "〜25分",
    rounds: 3,
    sets: [
      {
        movements: [
          { movementId: "deadlift", name: "デッドリフト", reps: "15回" },
          { movementId: "box-jump", name: "ボックスジャンプ", reps: "20回" },
          { movementId: "wall-ball", name: "ウォールボール", reps: "25回" },
        ],
      },
    ],
    notes: "3ラウンド。デッドリフトは体重×0.7推奨。ボックスジャンプはステップアップ可。",
  },
];
