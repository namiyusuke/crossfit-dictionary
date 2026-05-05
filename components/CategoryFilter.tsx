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

const CATEGORIES: Category[] = ["weightlifting", "gymnastics", "cardio", "kettlebell", "bodyweight"];

export default function CategoryFilter({
  selectedCategory,
  onCategoryChange,
  selectedBodyParts,
  onBodyPartsChange,
  selectedEffects,
  onEffectsChange,
}: CategoryFilterProps) {
  const toggleBodyPart = (part: BodyPart) => {
    onBodyPartsChange(
      selectedBodyParts.includes(part) ? selectedBodyParts.filter((p) => p !== part) : [...selectedBodyParts, part],
    );
  };

  const toggleEffect = (effect: PrimaryEffect) => {
    onEffectsChange(
      selectedEffects.includes(effect) ? selectedEffects.filter((e) => e !== effect) : [...selectedEffects, effect],
    );
  };

  const activeCount = (selectedCategory ? 1 : 0) + selectedBodyParts.length + selectedEffects.length;

  return (
    <div className="space-y-2">
      {/* フィルタータグ */}
      <div className="">
        <p className="mb-4">カテゴリ</p>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide flex-wrap">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            const color = CATEGORY_COLORS[cat];
            return (
              <button
                key={cat}
                onClick={() => onCategoryChange(isActive ? null : cat)}
                className="shrink-0 px-3 py-1.5 rounded-[10px] text-sm font-medium transition-all border cursor-pointer"
                style={{
                  backgroundColor: isActive ? "white" : "transparent",
                  borderColor: "white",
                  color: isActive ? "#0A0A0A" : "#fff",
                }}
              >
                {CATEGORY_LABELS[cat]}
              </button>
            );
          })}
        </div>
      </div>
      <div className="">
        <p className="mb-4">部位</p>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide flex-wrap">
          {ALL_BODY_PARTS.map((part) => {
            const isActive = selectedBodyParts.includes(part);
            return (
              <button
                key={part}
                onClick={() => toggleBodyPart(part)}
                className={`shrink-0 px-3 py-1.5 rounded-[10px] text-sm font-medium transition-all border cursor-pointer`}
                style={{
                  backgroundColor: isActive ? "white" : "transparent",
                  borderColor: "white",
                  color: isActive ? "#0A0A0A" : "#fff",
                }}
              >
                {part}
              </button>
            );
          })}
        </div>
      </div>

      <div className="">
        <p className="mb-4">効果</p>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide flex-wrap">
          {ALL_EFFECTS.map((effect) => {
            const isActive = selectedEffects.includes(effect);
            return (
              <button
                key={effect}
                onClick={() => toggleEffect(effect)}
                className={`shrink-0 px-3 py-1.5 rounded-[10px] text-sm font-medium transition-all border cursor-pointer`}
                style={{
                  backgroundColor: isActive ? "white" : "transparent",
                  borderColor: "white",
                  color: isActive ? "#0A0A0A" : "#fff",
                }}
              >
                {effect}
              </button>
            );
          })}
        </div>
      </div>

      {/* アクティブフィルター数 */}
      {activeCount > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-xs text-text-secondary">{activeCount}件のフィルター適用中</p>
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
