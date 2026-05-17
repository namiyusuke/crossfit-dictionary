"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Category,
  CATEGORY_LABELS,
  CATEGORY_COLORS,
  CATEGORY_SHADOW,
  PrimaryEffect,
  BodyPart,
  ALL_EFFECTS,
  ALL_BODY_PARTS,
} from "@/types/movement";

type FilterTab = "カテゴリ" | "部位" | "効果";
type AccordionSection = "category" | "bodyPart" | "effect";

interface CategoryFilterProps {
  selectedCategory: Category | null;
  onCategoryChange: (category: Category | null) => void;
  selectedBodyParts: BodyPart[];
  onBodyPartsChange: (parts: BodyPart[]) => void;
  selectedEffects: PrimaryEffect[];
  onEffectsChange: (effects: PrimaryEffect[]) => void;
}

const CATEGORIES: Category[] = ["weightlifting", "gymnastics", "cardio", "bodyweight"];

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

  const [openSections, setOpenSections] = useState<Set<AccordionSection>>(new Set());

  const toggleSection = (section: AccordionSection) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(section)) {
        next.delete(section);
      } else {
        next.add(section);
      }
      return next;
    });
  };

  const activeCount = (selectedCategory ? 1 : 0) + selectedBodyParts.length + selectedEffects.length;

  return (
    <div className="space-y-4">
      {/* フィルタータグ */}
      <div>
        <button
          onClick={() => toggleSection("category")}
          className="flex items-center justify-between w-full py-2 cursor-pointer"
        >
          <p>カテゴリ</p>
          <motion.span
            className="text-white"
            animate={{ rotate: openSections.has("category") ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            ▼
          </motion.span>
        </button>
        <AnimatePresence>
          {openSections.has("category") && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="flex gap-4 overflow-x-auto pb-1 pt-2 scrollbar-hide flex-wrap">
                {CATEGORIES.map((cat) => {
                  const isActive = selectedCategory === cat;
                  const color = CATEGORY_COLORS[cat];
                  return (
                    <button
                      key={cat}
                      onClick={() => onCategoryChange(isActive ? null : cat)}
                      className="shrink-0 px-5 py-3 rounded-[10px] text-[13px] font-black transition-all border cursor-pointer"
                      style={{
                        backgroundColor: isActive ? color : "transparent",
                        borderColor: isActive ? "transparent" : "white",
                        color: isActive ? (cat === "gymnastics" || cat === "cardio" ? "#fff" : "#0A0A0A") : "#fff",
                      }}
                    >
                      {CATEGORY_LABELS[cat]}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div>
        <button
          onClick={() => toggleSection("bodyPart")}
          className="flex items-center justify-between w-full py-2 cursor-pointer"
        >
          <p>部位</p>
          <motion.span
            className="text-white"
            animate={{ rotate: openSections.has("bodyPart") ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            ▼
          </motion.span>
        </button>
        <AnimatePresence>
          {openSections.has("bodyPart") && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="flex gap-2 overflow-x-auto pb-1 pt-2 scrollbar-hide flex-wrap">
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div>
        <button
          onClick={() => toggleSection("effect")}
          className="flex items-center justify-between w-full py-2 cursor-pointer"
        >
          <p>効果</p>
          <motion.span
            className="text-white"
            animate={{ rotate: openSections.has("effect") ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            ▼
          </motion.span>
        </button>
        <AnimatePresence>
          {openSections.has("effect") && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="flex gap-2 overflow-x-auto pb-1 pt-2 scrollbar-hide flex-wrap">
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* アクティブフィルター数 */}
      {activeCount > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-xs ">{activeCount}件のフィルター適用中</p>
          <button
            onClick={() => {
              onCategoryChange(null);
              onBodyPartsChange([]);
              onEffectsChange([]);
            }}
            className="text-xs  hover:text-text-primary transition-colors cursor-pointer"
          >
            すべてクリア
          </button>
        </div>
      )}
    </div>
  );
}
