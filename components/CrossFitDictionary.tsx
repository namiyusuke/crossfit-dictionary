"use client";

import { useState, useMemo } from "react";
import { Movement, Category, PrimaryEffect, BodyPart, Equipment } from "@/types/movement";
import { Wod } from "@/types/wod";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useQueryState, parseAsStringLiteral } from "nuqs";
import { useRouter } from "next/navigation";
import SearchBar from "./SearchBar";
import CategoryFilter from "./CategoryFilter";
import MovementCard from "./MovementCard";
import WodCardScatter from "./WodCardScatter";
import OnboardingEquipment from "./OnboardingEquipment";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import SpriteAnimation from "@/app/movement/[id]/SpriteAnimation";
import GlobalMenu, { MenuKey } from "./GlobalMenu";
const sections = ["種目辞典", "WOD"] as const;
type ActiveSection = (typeof sections)[number];

interface CrossFitDictionaryProps {
  movements: Movement[];
  wods: Wod[];
}

export default function CrossFitDictionary({ movements, wods }: CrossFitDictionaryProps) {
  const router = useRouter();
  const [activeSection, setActiveSection] = useQueryState(
    "section",
    parseAsStringLiteral(sections).withDefault("種目辞典").withOptions({ history: "push" }),
  );

  const handleSectionChange = (section: ActiveSection) => {
    if (section === "WOD") {
      const lastWodPage = localStorage.getItem("lastWodPage");
      if (lastWodPage) {
        router.push(lastWodPage);
        return;
      }
    }
    if (section === "種目辞典") {
      localStorage.removeItem("lastWodPage");
    }
    setActiveSection(section);
  };
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedBodyParts, setSelectedBodyParts] = useState<BodyPart[]>([]);
  const [selectedEffects, setSelectedEffects] = useState<PrimaryEffect[]>([]);
  const [userEquipment, setUserEquipment] = useLocalStorage<Equipment[] | null>("crossfit-user-equipment", null);

  const filteredMovements = useMemo(() => {
    // category順にソート
    const categoryOrder = ["W", "G", "M"];
    const sorted = movements.toSorted((a, b) => categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category));
    return sorted.filter((m) => {
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

  const handleOnboardingComplete = (selected: Equipment[]) => {
    setUserEquipment(selected);
  };

  const [showEquipmentSettings, setShowEquipmentSettings] = useState(false);
  const [showWodModal, setShowWodModal] = useState(false);

  // オンボーディング未完了の場合
  if (userEquipment === null || showEquipmentSettings) {
    return (
      <OnboardingEquipment
        key={showEquipmentSettings ? "settings" : "onboarding"}
        onComplete={(selected) => {
          handleOnboardingComplete(selected);
          setShowEquipmentSettings(false);
        }}
        {...(showEquipmentSettings ? { initialStep: 2, initialSelected: userEquipment ?? [] } : {})}
      />
    );
  }

  const handleMenuChange = (key: MenuKey) => {
    if (key === "施設変更") {
      setShowEquipmentSettings(true);
    } else {
      handleSectionChange(key);
    }
  };

  return (
    <div className="">
      <div className="">
        <div className="mx-auto w-[100%] px-6 py-6 pb-24">
          <div className="relative">
            {/* ヘッダー */}
            <div className="mb-10 flex items-start justify-between">
              <div>
                <h1 className="text-4xl text-text-primary font-gothic flex gap-4">
                  <span>{activeSection}</span>
                  {activeSection == "WOD" && (
                    <span onClick={() => setShowWodModal(true)} className="cursor-pointer">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="10" cy="10" r="10" fill="#414141" />
                        <path
                          d="M8.592 11.744C8.336 9.312 11.536 8.832 11.536 7.424C11.536 6.544 10.784 6.144 9.728 6.144C8.816 6.144 8.144 6.56 7.44 7.296L5.872 5.856C6.864 4.64 8.368 3.84 10.064 3.84C12.416 3.84 14.256 4.88 14.256 7.168C14.256 9.472 10.944 9.632 11.088 11.744H8.592ZM9.84 16.192C8.88 16.192 8.208 15.504 8.208 14.56C8.208 13.616 8.896 12.96 9.84 12.96C10.784 12.96 11.472 13.616 11.472 14.56C11.472 15.504 10.784 16.192 9.84 16.192Z"
                          fill="white"
                        />
                      </svg>
                    </span>
                  )}
                </h1>
                <p className="text-sm mt-4">
                  {activeSection == "種目辞典" ? " 種目名をタップして詳細を確認しよう" : "今日のメニューを選ぼう"}
                </p>
              </div>
            </div>
            {/* セクション切り替え */}
            <div className="mb-5">
              <div className="flex gap-1">
                {sections.map((section) => (
                  <div key={section} className="relative w-full">
                    <button
                      onClick={() => handleSectionChange(section)}
                      className={`w-full font-black flex-1 py-2.5 rounded-lg text-sm transition-all cursor-pointer  ${
                        activeSection === section ? "bg-button text-background" : "border border-[#F1FE7D] text-green "
                      }`}
                    >
                      {section}
                    </button>
                    {activeSection === section ? (
                      <span className="bg-white -z-1 absolute w-full h-full rounded-lg  block right-[-2px] top-[2px]"></span>
                    ) : (
                      ""
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="text-right mb-10">
              <button
                onClick={() => setShowEquipmentSettings(true)}
                className="text-xs rounded-[16px] bg-white font-black text-black px-4 py-2  transition-colors cursor-pointer"
              >
                設備変更
              </button>
            </div>
            {activeSection === "種目辞典" && (
              <>
                {/* 検索 */}
                <div className="mb-10">
                  <SearchBar value={searchText} onChange={setSearchText} />
                </div>
                {/* フィルター */}
                <div className="mb-100">
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
                <div className="space-y-15 relative">
                  <SpriteAnimation
                    category={"start"}
                    className="w-[min(calc(151_/_375_*_100vw),151px)] absolute bottom-[99.5%] right-0"
                  />
                  {filteredMovements.length > 0 ? (
                    filteredMovements.map((movement) => (
                      <div key={movement.id}>
                        <MovementCard movement={movement} />
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <p className=" text-lg mb-2">該当する種目が見つかりません</p>
                      <p className=" text-sm">検索条件を変更してください</p>
                    </div>
                  )}
                </div>
                {/* フッター */}
                <div className="mt-8 pb-4 text-center">
                  <p className="text-xs ">
                    {filteredMovements.length} / {movements.length} 種目を表示中
                  </p>
                </div>
              </>
            )}
            {activeSection === "WOD" && <WodCardScatter wods={wods} movements={movements} />}
          </div>
        </div>
      </div>
      <GlobalMenu active={activeSection as MenuKey} onChange={handleMenuChange} />

      {/* WOD説明モーダル */}
      <AnimatePresence>
        {showWodModal && (
          <motion.div
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-6"
            onClick={() => setShowWodModal(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              className="bg-gray rounded-2xl p-8 max-w-sm w-full relative"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
              <button
                onClick={() => setShowWodModal(false)}
                className="absolute top-4 right-4 text-white text-2xl leading-none cursor-pointer"
              >
                ✕
              </button>
              <p className="text-lg font-gothic mb-4 text-green">WOD（Workout of the Day）</p>
              <p className="text-sm leading-6">
                その日のトレーニングメニューのこと。気分や目的に合わせておすすめのWODを提案します。AMRAP・EMOM・ForTimeの3つのフォーマットがあり、それぞれ異なるアプローチでトレーニングを楽しめます。
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
