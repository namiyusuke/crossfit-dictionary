"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Category,
  categoryLabels,
  CATEGORY_COLORS,
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

const CATEGORIES: Category[] = ["W", "G", "M"];

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
    <div className="space-y-2">
      {/* フィルタータグ */}
      <div className="border-white border rounded-[14px] overflow-hidden">
        <button
          onClick={() => toggleSection("category")}
          className="bg-white overflow-hidden p-4 text-black font-black text-[14px] flex items-center justify-between w-full cursor-pointer"
        >
          <p>カテゴリ</p>
          <span>{openSections.has("category") ? "−" : "＋"}</span>
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
              <div className="flex gap-4 overflow-x-auto px-4 py-8 bg-gray scrollbar-hide flex-wrap rounded-b-lg">
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
                        color: isActive ? (cat === "G" || cat === "M" ? "#fff" : "#0A0A0A") : "#fff",
                      }}
                    >
                      {categoryLabels[cat].ja}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="border-white border rounded-[14px] overflow-hidden">
        <button
          onClick={() => toggleSection("bodyPart")}
          className="bg-white p-4 text-black font-black text-[14px] flex items-center justify-between w-full cursor-pointer "
        >
          <p>部位</p>
          <span>{openSections.has("bodyPart") ? "−" : "＋"}</span>
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
              <div className="flex gap-4 overflow-x-auto px-4 py-8 bg-gray scrollbar-hide flex-wrap rounded-b-lg">
                {ALL_BODY_PARTS.map((part) => {
                  const isActive = selectedBodyParts.includes(part);
                  return (
                    <button
                      key={part}
                      onClick={() => toggleBodyPart(part)}
                      className={`shrink-0 p-3 rounded-[10px] font-black text-[13px] transition-all border cursor-pointer`}
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

      <div className="border-white border rounded-[14px] overflow-hidden">
        <button
          onClick={() => toggleSection("effect")}
          className="bg-white p-4 text-black font-black text-[14px] flex items-center justify-between w-full cursor-pointer "
        >
          <p>効果</p>
          <span>{openSections.has("effect") ? "−" : "＋"}</span>
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
              <div className="flex gap-4 overflow-x-auto px-4 py-8 bg-gray scrollbar-hide flex-wrap rounded-b-lg">
                {ALL_EFFECTS.map((effect) => {
                  const isActive = selectedEffects.includes(effect);
                  return (
                    <button
                      key={effect}
                      onClick={() => toggleEffect(effect)}
                      className={`shrink-0 p-3 rounded-[10px] text-[13px] font-black transition-all border cursor-pointer`}
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
        <div className="">
          <p className="text-[14px] ">{activeCount}件のフィルター適用中</p>
          <button
            onClick={() => {
              onCategoryChange(null);
              onBodyPartsChange([]);
              onEffectsChange([]);
            }}
            className="mt-4 leading-none text-[12px] bg-white font-black text-black transition-colors cursor-pointer px-4 py-2 rounded-[1rem]"
          >
            すべてクリア
          </button>
        </div>
      )}
    </div>
  );
}
