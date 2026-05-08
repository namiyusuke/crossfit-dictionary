import { useMemo } from "react";
import { Wod } from "@/types/wod";
import { MOODS } from "@/data/wods";
import type { WodFormat } from "@/types/wod";
import Link from "next/link";
import Image from "next/image";
import { useQueryState } from "nuqs";
import { movements } from "@/data/movements";
import { CATEGORY_COLORS } from "@/types/movement";

const FORMAT_COLORS: Record<WodFormat, string> = {
  AMRAP: "#2ECC71",
  EMOM: "#3A8FE8",
  ForTime: "#E85D3A",
};

interface WodCardScatterProps {
  wods: Wod[];
}

export default function WodCardScatter({ wods }: WodCardScatterProps) {
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
        <div className="flex items-center justify-center py-12">
          <div className="bg-gray shadow-lg p-10 text-center rounded-3xl relative">
            <span className="bg-[#414141] absolute top-[10px] right-[-6px] rounded-3xl -z-10 w-full h-full"></span>
            <p className="text-3xl mb-12 font-gothic">今日の気分は？</p>
            <div className="flex flex-col gap-2">
              {MOODS.map((mood) => (
                <button
                  key={mood.id}
                  onClick={() => handleMoodSelect(mood.id)}
                  className="font-bold px-4 py-2.5 rounded-xl text-sm border border-transparent hover:border-border transition-all cursor-pointer"
                >
                  {mood.label}
                </button>
              ))}
            </div>
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

          {filteredWods.length === 0 ? (
            <p className="text-center text-sm text-text-secondary py-8">該当するWODがありません</p>
          ) : (
            <div className="flex flex-col gap-8">
              {filteredWods.map((wod, index) => {
                const color = FORMAT_COLORS[wod.format];
                return (
                  <div key={wod.id} className="rounded-2xl border border-[3px] border-green shadow-md ">
                    <Link
                      className="w-full h-full block p-4 relative"
                      href={`/wod/${wod.id}?mood=${selectedMood}`}
                      onClick={() => localStorage.setItem("lastWodPage", `/wod/${wod.id}?mood=${selectedMood}`)}
                    >
                      <span className="absolute bg-gray inset-0 top-[10px] right-[-10px] -z-10 rounded-2xl"></span>
                      <p className="text-6xl font-gothic text-green mb-4">0{index + 1}</p>
                      <div className="flex gap-2 mb-2">
                        <span className="text-[14px] px-2 py-0.5 rounded-full font-regular text-white border border-white">
                          {wod.format}
                        </span>
                        <span className="text-[14px] px-2 py-0.5 font-black">{wod.level}</span>
                      </div>
                      <h2 className="font-gothic text-2xl">{wod.name}</h2>
                      {wod.notes && <p className="text-[14px] font-black mt-6 leading-tight">{wod.notes}</p>}
                      <p className="text-[14px] mt-10 border-b-2 pb-6 mb-6 border-[#fff]">
                        時間:{wod.duration}
                        {wod.rounds && ` / ${wod.rounds}R`}
                        {wod.repScheme && ` / ${wod.repScheme}`}
                      </p>
                      {wod.sets.map((set, i) => (
                        <div key={i} className="mb-1.5 flex flex-wrap gap-3.5">
                          {set.label && (
                            <p className="text-[10px] font-bold text-text-secondary uppercase mb-0.5">{set.label}</p>
                          )}
                          {set.movements.map((mov, j) => {
                            const movement = movements.find((m) => m.id === mov.movementId);
                            const movColor = movement ? CATEGORY_COLORS[movement.category] : undefined;
                            const bodyweightColor =
                              CATEGORY_COLORS[movement.category] === "#EDE0C8" ? "#0A0A0A" : "#fff";
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
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
      <div className="mt-20">
        <p className="font-gothic text-green rotate-[-5deg] mb-11  w-max mx-auto">
          <span className="block text-6xl mb-2">追い込んで</span>
          <span className="block text-2xl text-right mr-10">いこうぜ！？</span>
        </p>
        <Image src="/WOD-char01.png" alt="" width={652} height={460} />
      </div>
    </div>
  );
}
