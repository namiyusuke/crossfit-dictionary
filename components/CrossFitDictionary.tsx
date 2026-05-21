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

  return (
    <div className="">
      <div
        className="min-h-screen z-10 fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/bg.png')" }}
      ></div>

      <div className="fixed inset-0 w-full h-full pointer-events-none visible translate-z-0">
        <div className="grid grid-cols-[1fr_375px_1fr] h-screen overflow-hidden sticky top-0 w-full">
          <div className="">
            <div className="flex items-center flex-col justify-center m-auto h-full">
              <p className="bg-green rounded-[8px] text-black py-2 px-3 font-black mb-3.5 leading-none">
                本気のやつらのための
              </p>
              <p className="text-center">
                <span className="block font-gothic text-5xl mb-4">CrossFit</span>
                <span className="font-gothic text-2xl">種目辞典</span>
              </p>
            </div>
          </div>
          <div className=""></div>
          <div className=""></div>
        </div>
      </div>
      <div className="max-w-[375px] mx-auto relative z-20 bg-black">
        <div className="mx-auto w-[100%] px-6 py-6">
          <div className="relative">
            {/* ヘッダー */}
            <div className="mb-10 flex items-start justify-between">
              <div>
                <h1 className="text-4xl text-text-primary font-gothic">{activeSection}</h1>
                <p className="text-sm mt-4">
                  {activeSection == "種目辞典" ? " 種目名をタップして詳細を確認しよう" : "今日のメニューを選ぼう"}
                </p>
              </div>
            </div>
            {/* セクション切り替え */}
            <div className="mb-5">
              <div className="flex gap-1">
                {sections.map((section) => (
                  <div className="relative w-full">
                    <button
                      key={section}
                      onClick={() => handleSectionChange(section)}
                      className={`w-full font-black flex-1 py-2.5 rounded-lg text-sm transition-all cursor-pointer  ${
                        activeSection === section
                          ? "bg-button text-background"
                          : "border border-[#F1FE7D] text-green hover:text-text-primary"
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
                className="text-xs rounded-[16px] bg-white font-black text-black px-4 py-2 hover:text-text-primary hover:border-text-secondary transition-colors cursor-pointer"
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
                  <Image
                    className="absolute bottom-[99.5%] right-0"
                    src="/crossFitDictionary-char01.png"
                    alt="バーベルを持ち上げるキャラクター"
                    width={151}
                    height={320}
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
            {activeSection === "WOD" && <WodCardScatter wods={wods} />}
          </div>
        </div>
      </div>
    </div>
  );
}
