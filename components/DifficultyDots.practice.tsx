"use client";
// ↑ State や onClick を使うコンポーネントはこれが必要
// （このコンポーネントでは State は使わないが、ブラウザで動く部品なので付ける）

// --- Step 4-1a: Props の型を定義する ---
// difficulty(数値) を受け取る
// ここに書いてみよう👇
interface Data {
  difficulty: number;
}

// --- Step 4-1b: ラベルの定数を作る ---
// difficulty が 1,2 → "初心者OK"、3,4 → "要練習"、5 → "上級"
// ヒント: 配列のインデックスで引く → LABELS[difficulty]
// ここに書いてみよう👇
const LABELS = ["", "初心者OK", "初心者OK", "要練習", "要練習", "上級"];

// --- Step 4-1c: コンポーネント本体を作る ---
// 1. 関数コンポーネントとして DifficultyDots を export する
// 2. [1,2,3,4,5] を .map() で5つのドット(<span>)に変換
// 3. i <= difficulty なら濃い色、それ以外は薄い色
// 4. ラベルも表示する
export function DifficultyDots({ difficulty }: Data) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <span
            key={i}
            className={`inline-block w-2.5 h-2.5 rounded-full ${
              i <= difficulty ? "bg-text-primary opacity-80" : "bg-text-secondary opacity-30"
            }`}
          />
        ))}
      </div>
      <span className="text-xs ">{LABELS[difficulty]}</span>
    </div>
  );
}
// ヒント:
//   - .map() の中では key={i} が必須（React がどの要素か識別するため）
//   - 三項演算子: 条件 ? "真の場合" : "偽の場合"
//   - className の中で三項演算子を使ってスタイルを切り替え
//
// 完成イメージ:
//   <div>
//     <div>  ← ドット5つの並び
//       <span /> ← 1つ目のドット
//       <span /> ← 2つ目のドット
//       ...
//     </div>
//     <span>要練習</span>  ← ラベル
//   </div>
//
// ここに書いてみよう👇
