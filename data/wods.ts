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
          { movementId: "air-squat", name: "エアスクワット", reps: "10回", rx: "股関節が膝より下まで" },
          { movementId: "push-up", name: "プッシュアップ", reps: "5回", rx: "胸が床に触れる" },
          { movementId: "sit-up", name: "シットアップ", reps: "10回", rx: "アブマット使用" },
        ],
      },
    ],
    estimate: { beginner: "3〜4ラウンド", rx: "6〜7ラウンド" },
    tip: "スクワットは深さを妥協しないこと。浅いスクワットで回数を稼ぐより、フルレンジで動く方が成長につながる。",
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
          { movementId: "kettlebell-swing", name: "ケトルベルスイング", reps: "15回", rx: "男性24kg / 女性16kg" },
          { movementId: "box-jump", name: "ボックスジャンプ", reps: "10回", rx: "男性60cm / 女性50cm" },
          { movementId: "burpee", name: "バーピー", reps: "5回", rx: "胸が床に触れる" },
        ],
      },
    ],
    estimate: { beginner: "3〜4ラウンド", rx: "5〜6ラウンド" },
    tip: "バーピーをラウンドの締めに置いているのは意図的。疲れてからのバーピーで心肺の上限を引き上げる。",
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
          { movementId: "pull-up", name: "プルアップ", reps: "5回", rx: "キッピングOK" },
          { movementId: "handstand-push-up", name: "ハンドスタンド・プッシュアップ", reps: "3回", rx: "アブマット1枚まで" },
          { movementId: "toes-to-bar", name: "トゥーズ・トゥ・バー", reps: "7回", rx: "両足同時にバーにタッチ" },
        ],
      },
    ],
    estimate: { beginner: "2〜3ラウンド", rx: "4〜5ラウンド" },
    tip: "プルアップとHSPUは肩への負荷が連続する。プルアップ後に肩を数秒シェイクしてからHSPUに入ると持続力が上がる。",
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
        movements: [{ movementId: "air-squat", name: "エアスクワット", reps: "15回", rx: "股関節が膝より下まで" }],
      },
      {
        label: "偶数分",
        movements: [{ movementId: "push-up", name: "プッシュアップ", reps: "10回", rx: "胸が床に触れる" }],
      },
    ],
    estimate: { beginner: "各セット40〜50秒", rx: "各セット25〜35秒" },
    tip: "EMOMの本質は「決まった時間内にやりきる→残りで回復」のサイクル。レストが10秒未満になるならレップ数を下げて質を保つ。",
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
        movements: [{ movementId: "deadlift", name: "デッドリフト", reps: "5回", rx: "男性60kg / 女性40kg" }],
      },
      {
        label: "2分目",
        movements: [{ movementId: "shoulder-press", name: "ショルダープレス", reps: "5回", rx: "男性30kg / 女性20kg" }],
      },
      {
        label: "3分目",
        movements: [{ movementId: "front-squat", name: "フロントスクワット", reps: "5回", rx: "男性40kg / 女性30kg" }],
      },
      {
        label: "4分目",
        movements: [],
      },
    ],
    rounds: 3,
    estimate: { beginner: "12分（規定通り）", rx: "12分（重量を上げて実施）" },
    tip: "4分目の休憩を必ず取ること。休憩分を飛ばして詰め込むと後半のフォームが崩れる。「休むのもトレーニング」と割り切る。",
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
        movements: [{ movementId: "double-under", name: "ダブルアンダー", reps: "30回", rx: "連続（シングル不可）" }],
      },
      {
        label: "偶数分",
        movements: [{ movementId: "rowing", name: "ローイング", reps: "15cal", rx: "ダンパー設定5〜7" }],
      },
    ],
    estimate: { beginner: "各セット45〜55秒", rx: "各セット30〜40秒" },
    tip: "ダブルアンダーで引っかかるとメンタルが崩れやすい。引っかかったら深呼吸1回→再開のルーティンを決めておく。",
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
          { movementId: "push-up", name: "プッシュアップ", reps: "21-15-9", rx: "胸が床に触れる" },
          { movementId: "sit-up", name: "シットアップ", reps: "21-15-9", rx: "アブマット使用" },
        ],
      },
    ],
    estimate: { beginner: "12〜15分", rx: "5〜8分" },
    tip: "21-15-9はレップが減る分ペースを上げるのが鉄則。最初の21で飛ばしすぎず、15→9で加速する「ネガティブスプリット」を意識。",
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
          { movementId: "thruster", name: "スラスター", reps: "21-15-9", rx: "男性43kg / 女性29kg" },
          { movementId: "pull-up", name: "プルアップ", reps: "21-15-9", rx: "キッピングOK" },
        ],
      },
    ],
    estimate: { beginner: "15〜20分", rx: "5〜8分（上級者は3分台可能）" },
    tip: "スラスター→プルアップの切り替えで手を休めたくなるが、バーを下ろしたら即鉄棒へ。トランジションの速さがタイムを決める。",
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
          { movementId: "deadlift", name: "デッドリフト", reps: "15回", rx: "男性70kg / 女性47.5kg" },
          { movementId: "box-jump", name: "ボックスジャンプ", reps: "20回", rx: "男性60cm / 女性50cm" },
          { movementId: "wall-ball", name: "ウォールボール", reps: "25回", rx: "男性9kg→3m / 女性6kg→2.7m" },
        ],
      },
    ],
    estimate: { beginner: "20〜25分", rx: "12〜16分" },
    tip: "デッドリフトで腰を守るため、毎ラウンド1回目のリフト前に必ずブレーシング（腹圧）を確認。疲れた後半こそフォームチェックが重要。",
    notes: "3ラウンド。デッドリフトは体重×0.7推奨。ボックスジャンプはステップアップ可。",
  },
];

interface Mood {
  id: string;
  label: string;
  filter: (wod: Wod) => boolean;
}
export const MOODS: Mood[] = [
  {
    id: "light",
    label: "さくっと動きたい",
    filter: (w) => w.level === "初心者",
  },
  {
    id: "hard",
    label: "ガッツリ追い込みたい",
    filter: (w) => w.level === "中級者",
  },
  {
    id: "cardio",
    label: "心肺を上げたい",
    filter: (w) => w.targetEffect.includes("心肺"),
  },
  {
    id: "strength",
    label: "筋力をつけたい",
    filter: (w) => w.targetEffect.includes("筋力") || w.targetEffect.includes("爆発力"),
  },
];
