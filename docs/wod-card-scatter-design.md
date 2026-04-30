# WOD カード散らばりフリップ UI 設計ガイド

## 概要

WOD（Workout of the Day）一覧をカード型UIで実装する。
カードはランダムに散らばって表示され、クリックすると裏返って種目テーブルが表示される。

---

## 1. コンポーネント構成

```
WodCardScatter.tsx  ← 新規作成（1ファイルで完結）
```

- 既存の `WodTemplate.tsx` はそのまま残す
- `CrossFitDictionary.tsx` の WOD タブ内で切り替えるか置き換える

---

## 2. HTML構造

```html
<div class="container">        <!-- relative, perspective設定 -->
  <div class="card">            <!-- absolute or relative, transform: rotate + translate -->
    <div class="card-inner">    <!-- transform-style: preserve-3d, フリップ対象 -->
      <div class="card-front">  <!-- backface-visibility: hidden -->
      <div class="card-back">   <!-- backface-visibility: hidden, rotateY(180deg) -->
    </div>
  </div>
</div>
```

**3層構造がポイント：**

| レイヤー | 役割 |
|---------|------|
| `.card` | 位置制御（ランダム回転・移動） |
| `.card-inner` | フリップアニメーション |
| `.card-front` / `.card-back` | 表裏の面 |

---

## 3. CSS 3Dフリップの核心

```css
/* 親に奥行きを設定 */
.container {
  perspective: 1000px;
}

/* フリップ対象 */
.card-inner {
  transform-style: preserve-3d;
  transition: transform 0.6s;
}

/* フリップ時 */
.card-inner.flipped {
  transform: rotateY(180deg);
}

/* 両面共通 */
.card-front, .card-back {
  backface-visibility: hidden;
  position: absolute;
  inset: 0;
}

/* 裏面は最初から反転しておく */
.card-back {
  transform: rotateY(180deg);
}
```

### Tailwind での書き方

```
[perspective:1000px]
[transform-style:preserve-3d]
[backface-visibility:hidden]
[transform:rotateY(180deg)]
```

---

## 4. ランダム散らばりロジック

```typescript
// カードごとに固定のランダム値を生成（再レンダリングで動かないように）
const cardStyles = useMemo(() => {
  return wods.map(() => ({
    rotate: Math.random() * 12 - 6,     // -6deg ~ +6deg
    translateX: Math.random() * 16 - 8,  // -8px ~ +8px
    translateY: Math.random() * 8 - 4,   // -4px ~ +4px
  }));
}, [wods]);
```

各カードの `style` に適用：

```typescript
transform: `rotate(${rotate}deg) translate(${translateX}px, ${translateY}px)`
```

**注意点：**
- `useMemo` で固定しないとリレンダーのたびにガタガタ動く
- フリップ時に `rotate(0)` に戻すとカードが整列する演出も面白い

---

## 5. 状態管理

```typescript
const [flippedId, setFlippedId] = useState<string | null>(null);
```

カードクリック時：
- 同じカード → `null`（表に戻す）
- 別のカード → そのIDに切り替え

---

## 6. 表面（フロント）のデザイン案

| 要素 | データソース |
|------|------------|
| WOD名 | `wod.name`（大きめフォント） |
| フォーマット | `wod.format` バッジ（`FORMAT_COLORS` 流用） |
| レベル | `wod.level` |
| 時間 | `wod.duration` |

カードサイズ目安：`w-40 h-56` ～ `w-48 h-64`

---

## 7. 裏面（バック）のテーブル設計

```
┌──────────────────────┐
│  WOD名（小さめ）      │
├──────────┬───────────┤
│ 種目名    │ レップ数   │
├──────────┼───────────┤
│ エアスクワット │ 10回  │
│ プッシュアップ │ 5回   │
│ シットアップ  │ 10回   │
└──────────┴───────────┘
│ ノート（小さく）      │
└──────────────────────┘
```

- `wod.sets` をループ → `set.movements` をテーブル行に
- `set.label`（"奇数分"など）があればサブヘッダーとして挟む

---

## 8. 実装手順（おすすめ順）

1. **`WodCardScatter.tsx` を作成** — props で `wods: Wod[]` を受け取る
2. **まず静的なカード一覧を並べる** — フリップなし、散らばりなし
3. **3Dフリップを実装** — `useState` + CSS
4. **ランダム散らばりを追加** — `useMemo` + `transform`
5. **裏面にテーブルを実装**
6. **`CrossFitDictionary.tsx` に組み込む**

---

## 9. 既存コードとの接続ポイント

| ファイル | 用途 |
|---------|------|
| `types/wod.ts` | `Wod`, `WodSet`, `WodMovement` 型をそのまま使う |
| `data/wods.ts` | 9本のWODデータ |
| `components/WodTemplate.tsx` L12-16 | `FORMAT_COLORS` をコピーするか共通化 |

---

## 10. 発展アイデア（余裕があれば）

- フリップ時にカードの `rotate` を `0` に戻して整列させる
- カードの `z-index` をクリック時に最前面にする
- フォーマット別に色分け（カードの枠色や背景）
- シャッフルボタンでランダム値を再生成
- カードをドラッグで並べ替え
