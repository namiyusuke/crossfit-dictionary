"use client";

import { useState } from "react";
import {
  Category,
  CATEGORY_LABELS,
  CATEGORY_COLORS,
  PrimaryEffect,
  BodyPart,
  ALL_EFFECTS,
  ALL_BODY_PARTS,
} from "@/types/movement";

type FilterTab = "カテゴリ" | "部位" | "効果";

interface CategoryFilterProps {
  selectedCategory: Category | null;
  onCategoryChange: (category: Category | null) => void;
  selectedBodyParts: BodyPart[];
  onBodyPartsChange: (parts: BodyPart[]) => void;
  selectedEffects: PrimaryEffect[];
  onEffectsChange: (effects: PrimaryEffect[]) => void;
}

const CATEGORIES: Category[] = [
  "weightlifting",
  "gymnastics",
  "cardio",
  "kettlebell",
  "bodyweight",
];

export default function CategoryFilter({
  selectedCategory,
  onCategoryChange,
  selectedBodyParts,
  onBodyPartsChange,
  selectedEffects,
  onEffectsChange,
}: CategoryFilterProps) {
  const [activeTab, setActiveTab] = useState<FilterTab>("カテゴリ");

  const tabs: FilterTab[] = ["カテゴリ", "部位", "効果"];

  const toggleBodyPart = (part: BodyPart) => {
    onBodyPartsChange(
      selectedBodyParts.includes(part)
        ? selectedBodyParts.filter((p) => p !== part)
        : [...selectedBodyParts, part]
    );
  };

  const toggleEffect = (effect: PrimaryEffect) => {
    onEffectsChange(
      selectedEffects.includes(effect)
        ? selectedEffects.filter((e) => e !== effect)
        : [...selectedEffects, effect]
    );
  };

  const activeCount =
    (selectedCategory ? 1 : 0) +
    selectedBodyParts.length +
    selectedEffects.length;

  return (
    <div className="space-y-2">
      {/* タブ切り替え */}
      <div className="flex gap-1 bg-card-bg rounded-lg p-1 border border-border">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 text-xs py-1.5 rounded-md font-medium transition-all cursor-pointer ${
              activeTab === tab
                ? "bg-text-primary text-background"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* フィルタータグ */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {activeTab === "カテゴリ" &&
          CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            const color = CATEGORY_COLORS[cat];
            return (
              <button
                key={cat}
                onClick={() => onCategoryChange(isActive ? null : cat)}
                className="shrink-0 px-3 py-1.5 rounded-full text-sm font-medium transition-all border cursor-pointer"
                style={{
                  backgroundColor: isActive ? color : "transparent",
                  borderColor: color,
                  color: isActive ? "#fff" : color,
                }}
              >
                {CATEGORY_LABELS[cat]}
              </button>
            );
          })}

        {activeTab === "部位" &&
          ALL_BODY_PARTS.map((part) => {
            const isActive = selectedBodyParts.includes(part);
            return (
              <button
                key={part}
                onClick={() => toggleBodyPart(part)}
                className={`shrink-0 px-3 py-1.5 rounded-full text-sm font-medium transition-all border cursor-pointer ${
                  isActive
                    ? "bg-text-primary text-background border-text-primary"
                    : "border-border text-text-secondary hover:border-text-secondary"
                }`}
              >
                {part}
              </button>
            );
          })}

        {activeTab === "効果" &&
          ALL_EFFECTS.map((effect) => {
            const isActive = selectedEffects.includes(effect);
            return (
              <button
                key={effect}
                onClick={() => toggleEffect(effect)}
                className={`shrink-0 px-3 py-1.5 rounded-full text-sm font-medium transition-all border cursor-pointer ${
                  isActive
                    ? "bg-text-primary text-background border-text-primary"
                    : "border-border text-text-secondary hover:border-text-secondary"
                }`}
              >
                {effect}
              </button>
            );
          })}
      </div>

      {/* アクティブフィルター数 */}
      {activeCount > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-xs text-text-secondary">
            {activeCount}件のフィルター適用中
          </p>
          <button
            onClick={() => {
              onCategoryChange(null);
              onBodyPartsChange([]);
              onEffectsChange([]);
            }}
            className="text-xs text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
          >
            すべてクリア
          </button>
        </div>
      )}
    </div>
  );
}
