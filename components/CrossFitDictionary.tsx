"use client";

import { useState, useMemo, useRef, useCallback } from "react";
import { Movement, Category, PrimaryEffect, BodyPart, Equipment } from "@/types/movement";
import { Wod } from "@/types/wod";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import SearchBar from "./SearchBar";
import CategoryFilter from "./CategoryFilter";
import MovementCard from "./MovementCard";
import WodCardScatter from "./WodCardScatter";
import OnboardingEquipment from "./OnboardingEquipment";

type ActiveSection = "種目辞典" | "WOD";

interface CrossFitDictionaryProps {
  movements: Movement[];
  wods: Wod[];
}

export default function CrossFitDictionary({ movements, wods }: CrossFitDictionaryProps) {
  const [activeSection, setActiveSection] = useState<ActiveSection>("種目辞典");
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedBodyParts, setSelectedBodyParts] = useState<BodyPart[]>([]);
  const [selectedEffects, setSelectedEffects] = useState<PrimaryEffect[]>([]);
  const [openCardId, setOpenCardId] = useState<string | null>(null);
  const [videoOverrides, setVideoOverrides] = useLocalStorage<Record<string, string>>("crossfit-video-overrides", {});
  const [userEquipment, setUserEquipment] = useLocalStorage<Equipment[] | null>("crossfit-user-equipment", null);

  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const filteredMovements = useMemo(() => {
    return movements.filter((m) => {
      // 設備フィルター: 「なし」（自重）は常に表示、それ以外はユーザーの設備と一致する場合のみ
      if (userEquipment && userEquipment.length > 0) {
        const needsEquipment = m.equipment.filter((e) => e !== "なし");
        if (needsEquipment.length > 0 && !needsEquipment.some((e) => userEquipment.includes(e))) {
          return false;
        }
      }

      if (selectedCategory && m.category !== selectedCategory) return false;

      if (selectedBodyParts.length > 0 && !selectedBodyParts.some((bp) => m.bodyPart.includes(bp))) return false;

      if (selectedEffects.length > 0 && !selectedEffects.some((ef) => m.primaryEffect.includes(ef))) return false;

      if (searchText) {
        const query = searchText.toLowerCase();
        const searchTargets = [m.name, m.nameEn, m.oneLiner, m.purpose, ...m.muscleMain, ...m.muscleSub].map((s) =>
          s.toLowerCase(),
        );
        return searchTargets.some((target) => target.includes(query));
      }

      return true;
    });
  }, [movements, userEquipment, selectedCategory, selectedBodyParts, selectedEffects, searchText]);

  const handleVideoChange = (movementId: string, videoId: string) => {
    setVideoOverrides((prev) => ({
      ...prev,
      [movementId]: videoId,
    }));
  };

  const handleMovementClick = useCallback((movementId: string) => {
    setActiveSection("種目辞典");
    setOpenCardId(movementId);
    setTimeout(() => {
      const el = cardRefs.current[movementId];
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 100);
  }, []);

  const handleOnboardingComplete = (selected: Equipment[]) => {
    setUserEquipment(selected);
  };

  const [showEquipmentSettings, setShowEquipmentSettings] = useState(false);

  // オンボーディング未完了の場合
  if (userEquipment === null || showEquipmentSettings) {
    return (
      <OnboardingEquipment
        onComplete={(selected) => {
          handleOnboardingComplete(selected);
          setShowEquipmentSettings(false);
        }}
      />
    );
  }

  const sections: ActiveSection[] = ["種目辞典", "WOD"];

  return (
    <div className="mx-auto px-4 py-6">
      {/* ヘッダー */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary font-gothic">種目辞典</h1>
          <p className="text-sm mt-1">種目名をタップして詳細を確認しよう</p>
        </div>
        <button
          onClick={() => setShowEquipmentSettings(true)}
          className="text-xs text-text-secondary border border-border rounded-lg px-3 py-1.5 hover:text-text-primary hover:border-text-secondary transition-colors cursor-pointer"
        >
          設備変更
        </button>
      </div>

      {/* セクション切り替え */}
      <div className="max-w-72 mx-auto">
        <div className="flex gap-1 mb-4 bg-card-bg rounded-xl p-1 border border-border">
          {sections.map((section) => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                activeSection === section
                  ? "bg-text-primary text-background"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              {section}
            </button>
          ))}
        </div>
      </div>

      {activeSection === "種目辞典" && (
        <>
          {/* 検索 */}
          <div className="mb-4">
            <SearchBar value={searchText} onChange={setSearchText} />
          </div>

          {/* フィルター */}
          <div className="mb-6">
            <CategoryFilter
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              selectedBodyParts={selectedBodyParts}
              onBodyPartsChange={setSelectedBodyParts}
              selectedEffects={selectedEffects}
              onEffectsChange={setSelectedEffects}
            />
          </div>

          {/* 種目カード一覧 */}
          <div className="space-y-3">
            {filteredMovements.length > 0 ? (
              filteredMovements.map((movement) => (
                <div
                  key={movement.id}
                  ref={(el) => {
                    cardRefs.current[movement.id] = el;
                  }}
                >
                  <MovementCard
                    movement={movement}
                    isOpen={openCardId === movement.id}
                    onToggle={() => setOpenCardId(openCardId === movement.id ? null : movement.id)}
                    videoOverride={videoOverrides[movement.id]}
                    onVideoChange={(videoId) => handleVideoChange(movement.id, videoId)}
                  />
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-text-secondary text-lg mb-2">該当する種目が見つかりません</p>
                <p className="text-text-secondary text-sm">検索条件を変更してください</p>
              </div>
            )}
          </div>

          {/* フッター */}
          <div className="mt-8 pb-4 text-center">
            <p className="text-xs text-text-secondary">
              {filteredMovements.length} / {movements.length} 種目を表示中
            </p>
          </div>
        </>
      )}

      {activeSection === "WOD" && <WodCardScatter wods={wods} />}
    </div>
  );
}
