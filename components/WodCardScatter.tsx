import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Wod } from "@/types/wod";
import { MOODS } from "@/data/wods";
import type { WodFormat } from "@/types/wod";
import Link from "next/link";
import Image from "next/image";
import { useQueryState } from "nuqs";
import { CATEGORY_COLORS } from "@/types/movement";
import type { Movement } from "@/types/movement";
import { motion, AnimatePresence } from "framer-motion";
import WodBuilder from "./wod-builder/WodBuilder";

const FORMAT_COLORS: Record<WodFormat, string> = {
  AMRAP: "#2ECC71",
  EMOM: "#3A8FE8",
  ForTime: "#E85D3A",
};

const FORMAT_DESCRIPTIONS: Record<WodFormat, { title: string; description: string }> = {
  AMRAP: {
    title: "AMRAP（As Many Rounds As Possible）",
    description:
      "制限時間内にできるだけ多くのラウンドをこなすフォーマット。自分のペースで動き続け、合計ラウンド数がスコアになります。",
  },
  EMOM: {
    title: "EMOM（Every Minute On the Minute）",
    description:
      "毎分0秒にスタートし、指定された動作を行うフォーマット。動作を終えた残りの時間がレストになります。ペース配分とリカバリーが鍵です。",
  },
  ForTime: {
    title: "ForTime（タイムアタック）",
    description:
      "指定されたメニューをできるだけ早く完了するフォーマット。完了までの時間がスコアになります。全力で駆け抜けましょう。",
  },
};

interface WodCardScatterProps {
  wods: Wod[];
  movements: Movement[];
}

export default function WodCardScatter({ wods, movements }: WodCardScatterProps) {
  const router = useRouter();
  const [selectedMood, setSelectedMood] = useQueryState("mood", {
    history: "push",
    scroll: false,
  });
  const [formatModal, setFormatModal] = useState<WodFormat | null>(null);
  const [showBuilder, setShowBuilder] = useState(false);

  const filteredWods = useMemo(() => {
    if (!selectedMood) return [];
    const mood = MOODS.find((m) => m.id === selectedMood);
    if (!mood) return [];
    return wods.filter(mood.filter);
  }, [selectedMood, wods]);

  const handleMoodSelect = (moodId: string) => {
    setSelectedMood(moodId);
    window.scrollTo(0, 0);
  };

  const handleReset = () => {
    setSelectedMood(null);
  };

  return (
    <div>
      {!selectedMood ? (
        /* 気分セレクター */
        <div className="">
          <div className="flex items-center justify-center pb-12">
            <div className="bg-[#262626] shadow-lg p-10 text-center rounded-3xl relative">
              <span className="bg-[#414141] absolute top-[10px] right-[-6px] rounded-3xl -z-10 w-full h-full"></span>
              <p className="text-3xl mb-12 font-gothic text-green">今日の気分は？</p>
              <div className="flex flex-col gap-4">
                {MOODS.map((mood) => (
                  <button
                    key={mood.id}
                    onClick={() => handleMoodSelect(mood.id)}
                    className="leading-none text-base bg-gray font-black px-4 py-3 rounded-xl border border-2 border-transparent hover:border-2 hover:border-[#F1FE7D] transition-all cursor-pointer"
                  >
                    {mood.label}
                  </button>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-white">
                <button
                  onClick={() => setShowBuilder(true)}
                  className="text-base font-black px-4 py-3 rounded-xl bg-gray   text-white hover:bg-green hover:text-black transition-all cursor-pointer w-full"
                >
                  自分でWODを組む
                </button>
              </div>
            </div>
          </div>
          <div className="text-center">
            <Image
              className="mx-auto animate-flip-x"
              width={180}
              height={271}
              src="/yellow01.webp"
              alt="走るキャラクター"
            />
          </div>
        </div>
      ) : (
        /* WODカード縦積み */
        <div>
          <div className="flex justify-end mb-3">
            <button
              onClick={handleReset}
              className="cursor-pointer text-black bg-green text-[12px] leading-none font-black py-[6px] px-4 rounded-2xl"
            >
              気分を変える
            </button>
          </div>
          <div className="mb-12">
            <p className="font-gothic text-base mb-4">おすすめWOD</p>
            <div className="leading-none inline-block font-black text-black border rounded-[10px] bg-white py-2 px-4">
              {MOODS.map((mood) => mood.id == selectedMood && <div key={mood.id}>{mood.label}</div>)}
            </div>
          </div>
          {filteredWods.length === 0 ? (
            <p className="text-center text-sm  py-8">該当するWODがありません</p>
          ) : (
            <div>
              <div className="flex flex-col gap-8">
                {filteredWods.map((wod, index) => {
                  const color = FORMAT_COLORS[wod.format];
                  return (
                    <div key={wod.id} className="rounded-[16px] border border-[3px] border-green shadow-md relative">
                      <Link
                        className="w-full h-full block "
                        href={`/wod/${wod.id}?mood=${selectedMood}`}
                        onClick={() => localStorage.setItem("lastWodPage", `/wod/${wod.id}?mood=${selectedMood}`)}
                      >
                        <span className="block absolute bg-gray bottom-0 mt-[8px] top-[0px] right-[-8px] -z-10 rounded-[16px] h-[101%] w-[101%]"></span>
                        <div className="pt-9 px-8">
                          <p className="text-6xl font-gothic text-green mb-4">0{index + 1}</p>
                          <div className="flex gap-2 mb-4 items-center">
                            <span className="text-[14px] px-2 py-2 rounded-[10px] font-regular text-white border border-white flex gap-2.5">
                              <span>{wod.format}</span>
                              <span
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  setFormatModal(wod.format);
                                }}
                                className="cursor-pointer"
                              >
                                <svg
                                  width="20"
                                  height="20"
                                  viewBox="0 0 20 20"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <circle cx="10" cy="10" r="10" fill="white" />
                                  <path
                                    d="M8.592 11.744C8.54933 11.3387 8.58667 10.9813 8.704 10.672C8.832 10.3627 9.008 10.0907 9.232 9.856C9.456 9.61067 9.70133 9.392 9.968 9.2C10.2347 8.99733 10.4853 8.80533 10.72 8.624C10.9547 8.44267 11.1467 8.256 11.296 8.064C11.456 7.872 11.536 7.65867 11.536 7.424C11.536 7.12533 11.456 6.88533 11.296 6.704C11.1467 6.512 10.9333 6.37333 10.656 6.288C10.3893 6.192 10.08 6.144 9.728 6.144C9.26933 6.144 8.85867 6.24533 8.496 6.448C8.144 6.64 7.792 6.92267 7.44 7.296L5.872 5.856C6.37333 5.248 6.98667 4.76267 7.712 4.4C8.43733 4.02667 9.22133 3.84 10.064 3.84C10.8533 3.84 11.5627 3.95733 12.192 4.192C12.8213 4.42667 13.3227 4.78933 13.696 5.28C14.0693 5.77067 14.256 6.4 14.256 7.168C14.256 7.552 14.176 7.888 14.016 8.176C13.856 8.45333 13.6533 8.69867 13.408 8.912C13.1627 9.12533 12.9013 9.33333 12.624 9.536C12.3467 9.728 12.0853 9.92533 11.84 10.128C11.6053 10.3307 11.4133 10.5653 11.264 10.832C11.1253 11.088 11.0667 11.392 11.088 11.744H8.592ZM9.84 16.192C9.36 16.192 8.96533 16.0373 8.656 15.728C8.35733 15.4187 8.208 15.0293 8.208 14.56C8.208 14.0907 8.36267 13.7067 8.672 13.408C8.98133 13.1093 9.37067 12.96 9.84 12.96C10.3093 12.96 10.6987 13.1093 11.008 13.408C11.3173 13.7067 11.472 14.0907 11.472 14.56C11.472 15.0293 11.3173 15.4187 11.008 15.728C10.6987 16.0373 10.3093 16.192 9.84 16.192Z"
                                    fill="black"
                                  />
                                </svg>
                              </span>
                            </span>
                            <span className="text-[14px] px-2 py-0.5 font-black font-black">{wod.level}</span>
                          </div>
                          <h2 className="font-gothic text-2xl">{wod.name}</h2>
                          {wod.notes && <p className="text-[14px] font-black mt-6 leading-5">{wod.notes}</p>}
                          <p className="text-[14px] mt-10 border-b-2 pb-6 mb-6 border-[#fff]">
                            時間:{wod.duration}
                            {wod.rounds && ` / ${wod.rounds}R`}
                            {wod.repScheme && ` / ${wod.repScheme}`}
                          </p>
                        </div>
                        <div className=" px-6 pb-10">
                          {wod.sets.map((set, i) => (
                            <div key={i} className="mb-1.5 flex flex-wrap gap-3.5">
                              {set.movements.map((mov, j) => {
                                const movement = movements.find((m) => m.id === mov.movementId);
                                const movColor = movement ? CATEGORY_COLORS[movement.category] : undefined;
                                return (
                                  <div key={j} className="flex justify-between text-[14px] ">
                                    <span
                                      className="py-2 px-3 rounded-xl font-black cursor-pointer"
                                      style={movColor ? { background: movColor, color: "#fff" } : undefined}
                                      onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        router.push(`/movement/${movement?.id}`);
                                      }}
                                    >
                                      {mov.name}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          ))}
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
              {selectedMood == "light" && (
                <div className="mt-20">
                  <p className="font-gothic text-green rotate-[-5deg] mb-11  w-max mx-auto font-normal">
                    <span className="block text-6xl mb-2">さくっと？</span>
                    <span className="block text-2xl text-right mr-10">それいいのか？</span>
                  </p>
                  <Image
                    className="mx-auto"
                    src="/WOD-char02.webp"
                    alt="バーベルを持ち上げるキャラクター"
                    width={170}
                    height={230}
                  />
                </div>
              )}
              {selectedMood == "hard" && (
                <div className="mt-20">
                  <p className="font-gothic text-green rotate-[-5deg] mb-11 w-max mx-auto font-normal">
                    <span className="block text-6xl mb-2">追い込んで</span>
                    <span className="block text-2xl text-right mr-10">いこうぜ！？</span>
                  </p>
                  <Image
                    className="mx-auto"
                    src="/WOD-char01.webp"
                    alt="バーベルを持ち上げるキャラクター"
                    width={326}
                    height={230}
                  />
                </div>
              )}
              {selectedMood == "cardio" && (
                <div className="mt-20">
                  <p className="font-gothic text-green rotate-[-5deg] mb-11 w-max mx-auto font-normal">
                    <span className="block text-4xl ml-10">きざむぜ</span>
                    <span className="block text-5xl mb-2">血液のビート！</span>
                  </p>
                  <Image
                    className="mx-auto"
                    src="/WOD-char03.webp"
                    alt="バーベルを持ち上げるキャラクター"
                    width={163}
                    height={230}
                  />
                </div>
              )}
              {selectedMood == "strength" && (
                <div className="mt-20">
                  <p className="font-gothic text-green rotate-[-5deg] mb-11 w-max mx-auto font-normal">
                    <span className="block text-4xl ">マッスルマッスル！</span>
                    <span className="block text-5xl mb-2">マッチョマン！</span>
                  </p>
                  <Image
                    className="mx-auto"
                    src="/WOD-char04.webp"
                    alt="バーベルを持ち上げるキャラクター"
                    width={189}
                    height={230}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* WODビルダー */}
      {showBuilder && (
        <WodBuilder
          movements={movements}
          onClose={() => {
            setShowBuilder(false);
            window.scrollTo(0, 0);
          }}
        />
      )}

      {/* フォーマット説明モーダル */}
      <AnimatePresence>
        {formatModal && (
          <motion.div
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-6"
            onClick={() => setFormatModal(null)}
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
                onClick={() => setFormatModal(null)}
                className="absolute top-4 right-4 text-white text-2xl leading-none cursor-pointer"
              >
                ✕
              </button>
              <p className="text-lg font-gothic mb-4 text-green">{FORMAT_DESCRIPTIONS[formatModal].title}</p>
              <p className="text-sm leading-6">{FORMAT_DESCRIPTIONS[formatModal].description}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
