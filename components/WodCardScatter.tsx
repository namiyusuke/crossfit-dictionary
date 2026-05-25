import { useMemo } from "react";
import { Wod } from "@/types/wod";
import { MOODS } from "@/data/wods";
import type { WodFormat } from "@/types/wod";
import Link from "next/link";
import Image from "next/image";
import { useQueryState } from "nuqs";
import { CATEGORY_COLORS } from "@/types/movement";
import type { Movement } from "@/types/movement";

const FORMAT_COLORS: Record<WodFormat, string> = {
  AMRAP: "#2ECC71",
  EMOM: "#3A8FE8",
  ForTime: "#E85D3A",
};

interface WodCardScatterProps {
  wods: Wod[];
  movements: Movement[];
}

export default function WodCardScatter({ wods, movements }: WodCardScatterProps) {
  const [selectedMood, setSelectedMood] = useQueryState("mood", {
    history: "push",
    scroll: false,
  });

  const filteredWods = useMemo(() => {
    if (!selectedMood) return [];
    const mood = MOODS.find((m) => m.id === selectedMood);
    if (!mood) return [];
    return wods.filter(mood.filter);
  }, [selectedMood, wods]);

  const handleMoodSelect = (moodId: string) => {
    setSelectedMood(moodId);
  };

  const handleReset = () => {
    setSelectedMood(null);
  };

  return (
    <div>
      {!selectedMood ? (
        /* 気分セレクター */
        <div className="">
          <div className="flex items-center justify-center pb-12 pt-5">
            <div className="bg-gray shadow-lg p-10 text-center rounded-3xl relative">
              <span className="bg-[#414141] absolute top-[10px] right-[-6px] rounded-3xl -z-10 w-full h-full"></span>
              <p className="text-3xl mb-12 font-gothic text-green">今日の気分は？</p>
              <div className="flex flex-col gap-4">
                {MOODS.map((mood) => (
                  <button
                    key={mood.id}
                    onClick={() => handleMoodSelect(mood.id)}
                    className="text-base font-black px-4 py-4 rounded-xl border border-transparent hover:border-2 hover:border-[#F1FE7D] transition-all cursor-pointer"
                  >
                    {mood.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="text-center">
            <Image
              className="mx-auto animate-flip-x"
              width={180}
              height={271}
              src="/yellow01.png"
              alt="走るキャラクター"
            />
          </div>
        </div>
      ) : (
        /* WODカード縦積み */
        <div>
          <div className="flex justify-end mb-3">
            <button onClick={handleReset} className=" cursor-pointer text-green">
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
                          <div className="flex gap-2 mb-4">
                            <span className="text-[14px] px-2 py-0.5 rounded-[10px] font-regular text-white border border-white">
                              {wod.format}
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
                                const bodyweightColor =
                                  movement && CATEGORY_COLORS[movement.category] === "#EDE0C8" ? "#0A0A0A" : "#fff";
                                return (
                                  <div key={j} className="flex justify-between text-[14px] ">
                                    <span
                                      className="py-2 px-3 rounded-xl font-black"
                                      style={movColor ? { background: movColor, color: bodyweightColor } : undefined}
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
              <div className="mt-20">
                <p className="font-gothic text-green rotate-[-5deg] mb-11  w-max mx-auto">
                  <span className="block text-6xl mb-2">追い込んで</span>
                  <span className="block text-2xl text-right mr-10">いこうぜ！？</span>
                </p>
                <Image src="/WOD-char01.png" alt="バーベルを持ち上げるキャラクター" width={652} height={460} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
