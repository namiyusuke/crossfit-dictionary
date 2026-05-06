import { useMemo } from "react";
import { Wod } from "@/types/wod";
import { MOODS } from "@/data/wods";
import type { WodFormat } from "@/types/wod";
import Link from "next/link";
import { useQueryState } from "nuqs";

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
            <button
              onClick={handleReset}
              className="px-3 py-1.5 rounded-full text-xs font-medium border border-border bg-card-bg text-text-secondary hover:text-text-primary transition-all cursor-pointer"
            >
              もう一度選ぶ
            </button>
          </div>

          {filteredWods.length === 0 ? (
            <p className="text-center text-sm text-text-secondary py-8">該当するWODがありません</p>
          ) : (
            <div className="flex flex-col gap-4">
              {filteredWods.map((wod) => {
                const color = FORMAT_COLORS[wod.format];
                return (
                  <div
                    key={wod.id}
                    className="rounded-2xl border border-border shadow-md p-4"
                    style={{ borderTopWidth: "4px", borderTopColor: color }}
                  >
                    <Link
                      href={`/wod/${wod.id}?mood=${selectedMood}`}
                      onClick={() => localStorage.setItem("lastWodPage", `/wod/${wod.id}?mood=${selectedMood}`)}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className="text-[10px] px-2 py-0.5 rounded-full font-bold text-white shrink-0"
                          style={{ backgroundColor: color }}
                        >
                          {wod.format}
                        </span>
                        <h2 className="text-sm font-bold text-text-primary truncate">{wod.name}</h2>
                        <span className="text-[10px] ml-auto px-2 py-0.5 rounded-full border border-border text-text-secondary shrink-0">
                          {wod.level}
                        </span>
                      </div>
                      <p className="text-xs text-text-secondary mb-3">
                        {wod.duration}
                        {wod.rounds && ` / ${wod.rounds}R`}
                        {wod.repScheme && ` / ${wod.repScheme}`}
                      </p>
                      {wod.sets.map((set, i) => (
                        <div key={i} className="mb-1.5">
                          {set.label && (
                            <p className="text-[10px] font-bold text-text-secondary uppercase mb-0.5">{set.label}</p>
                          )}
                          {set.movements.map((mov, j) => (
                            <div key={j} className="flex justify-between text-[11px] py-0.5 border-b border-border/50">
                              <span className="text-text-primary">{mov.name}</span>
                              <span className="text-text-secondary shrink-0 ml-1">{mov.reps}</span>
                            </div>
                          ))}
                        </div>
                      ))}
                      {wod.notes && <p className="text-[9px] text-text-secondary mt-1.5 leading-tight">{wod.notes}</p>}
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
