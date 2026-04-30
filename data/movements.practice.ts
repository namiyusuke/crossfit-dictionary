// ============================================
// 練習用: 種目データを作ってみよう
// ============================================
// 型定義を import して、その型に合うデータを書く
// → 型と合わないデータを書くとエディタがエラーを出してくれる！

import { Movement } from "@/types/movement";

export const movements: Movement[] = [
  // ===== 種目 1: デッドリフト（ウェイトリフティング） =====
  // roadmap が null のシンプルな例
  {
    id: "deadlift",
    name: "デッドリフト",
    nameEn: "Deadlift",
    category: "weightlifting",
    oneLiner: "床からバーベルを股関節と膝の伸展で持ち上げる基本動作",
    purpose: "後面の筋力を効率よく鍛えるための基本種目",
    primaryEffect: ["筋力"],
    bodyPart: ["下半身"],
    steps: [
      "足を腰幅に開き、バーベルの真上に立つ",
      "股関節を引いて（ヒンジ）バーを握る",
      "胸を張り、背中をフラットに保つ",
      "足裏全体で床を押しながら立ち上がる",
      "股関節と膝を完全に伸ばして完了",
    ],
    tips: [
      "腰を丸めない — 背中はフラットをキープ",
      "バーは体に近い軌道で引く",
      "首は中立位置（上も下も見ない）",
    ],
    muscleMain: ["臀筋", "ハムストリングス", "脊柱起立筋"],
    muscleSub: ["大腿四頭筋", "前腕", "体幹"],
    difficulty: 2,
    scaling: "軽い重量から始める → トラップバーデッドリフト",
    videoId: "op9kVnSso6Q",
    roadmap: null, // ← null の例: ロードマップなし
  },

  // ===== 種目 2: プルアップ（ジムナスティクス） =====
  // roadmap がある例
  {
    id: "pull-up",
    name: "プルアップ",
    nameEn: "Pull-Up",
    category: "gymnastics",
    oneLiner: "バーにぶら下がり、自重で体を引き上げる上半身種目",
    purpose: "上半身の引く力と握力を強化する基本動作",
    primaryEffect: ["筋力"],
    bodyPart: ["上半身"],
    steps: [
      "肩幅よりやや広くバーを握る",
      "肩甲骨を下げてから引き始める",
      "顎がバーの上に出るまで引き上げる",
      "コントロールしながら腕を伸ばして戻る",
    ],
    tips: [
      "反動を使わず、肩甲骨の動きを意識する",
      "親指を巻かないサムレスグリップも試す",
      "下ろすときもゆっくり（ネガティブを効かせる）",
    ],
    muscleMain: ["広背筋", "上腕二頭筋"],
    muscleSub: ["僧帽筋", "前腕", "体幹"],
    difficulty: 3,
    scaling: "バンド補助 → ジャンピングプルアップ → ネガティブプルアップ",
    videoId: "eGo4IYlbE5g",
    roadmap: {
      goal: "ストリクトプルアップを5回連続で行う",
      prerequisites: [
        { name: "デッドハング", description: "バーに30秒以上ぶら下がれる", target: "30秒" },
        { name: "リングロウ", description: "水平に近い角度で10回", target: "10回×3セット" },
      ],
      drills: [
        { phase: "Phase 1", name: "バンド補助プルアップ", detail: "太いバンドで補助して動作を覚える", reps: "5回×3セット" },
        { phase: "Phase 2", name: "ネガティブプルアップ", detail: "ジャンプして上がり、5秒かけて下ろす", reps: "3回×5セット" },
        { phase: "Phase 3", name: "ストリクトプルアップ", detail: "補助なしで行う", reps: "1〜2回×多セット" },
      ],
      timeEstimate: "4〜12週間",
    },
  },

  // ===== 種目 3: バーピー（自重トレーニング） =====
  // roadmap が null、カテゴリが bodyweight の例
  {
    id: "burpee",
    name: "バーピー",
    nameEn: "Burpee",
    category: "bodyweight",
    oneLiner: "立位→腕立て→ジャンプを1動作で行う全身コンディショニング種目",
    purpose: "心肺機能と全身持久力を短時間で高める",
    primaryEffect: ["心肺", "筋持久力"],
    bodyPart: ["全身"],
    steps: [
      "立った状態からしゃがみ、両手を床につく",
      "両足を後ろに跳ばしてプランク姿勢になる",
      "プッシュアップを1回行う",
      "足を手の近くに戻す",
      "ジャンプして両手を頭上で叩く",
    ],
    tips: [
      "腰が落ちないようにプランクを意識",
      "ペースを一定に保つ（飛ばしすぎない）",
      "プッシュアップが厳しければ省略OK",
    ],
    muscleMain: ["大腿四頭筋", "大胸筋", "三角筋"],
    muscleSub: ["体幹", "上腕三頭筋"],
    difficulty: 2,
    scaling: "プッシュアップなし → ステップバック → 通常バーピー",
    videoId: "dZgVxmf6jkA",
    roadmap: null,
  },
];
