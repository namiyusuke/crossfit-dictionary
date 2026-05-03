import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Wod } from "@/types/wod";
import type { WodFormat } from "@/types/wod";

const FORMAT_COLORS: Record<WodFormat, string> = {
  AMRAP: "#2ECC71",
  EMOM: "#3A8FE8",
  ForTime: "#E85D3A",
};

interface Mood {
  id: string;
  label: string;
  filter: (wod: Wod) => boolean;
}

const MOODS: Mood[] = [
  {
    id: "light",
    label: "さくっと動きたい",
    filter: (w) => w.level === "初心者",
  },
  {
    id: "hard",
    label: "ガッツリ追い込みたい",
    filter: (w) => w.level === "中級者",
  },
  {
    id: "cardio",
    label: "心肺を上げたい",
    filter: (w) => w.targetEffect.includes("心肺"),
  },
  {
    id: "strength",
    label: "筋力をつけたい",
    filter: (w) => w.targetEffect.includes("筋力") || w.targetEffect.includes("爆発力"),
  },
];

interface WodCardScatterProps {
  wods: Wod[];
}

export default function WodCardScatter({ wods }: WodCardScatterProps) {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [cardsReady, setCardsReady] = useState(false);

  const cardStyles = useMemo(() => {
    const radius = 20; // 中心からの距離（%）
    return wods.map((_, i) => {
      const angle = (i / wods.length) * 2 * Math.PI - Math.PI / 2; // 上から時計回り
      return {
        rotate: (angle * 180) / Math.PI + 90,
        left: 50 + radius * Math.cos(angle),
        top: 50 + radius * Math.sin(angle),
      };
    });
  }, [wods]);

  // 気分に合うWODを1つ選ぶ（日付シードで同じ日は同じ結果）
  const matchedWodId = useMemo(() => {
    if (!selectedMood) return null;
    const mood = MOODS.find((m) => m.id === selectedMood);
    if (!mood) return null;
    const candidates = wods.filter(mood.filter);
    if (candidates.length === 0) return null;
    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    return candidates[seed % candidates.length].id;
  }, [selectedMood, wods]);

  const handleMoodSelect = (moodId: string) => {
    setSelectedMood(moodId);
  };

  const handleReset = () => {
    setSelectedMood(null);
  };

  return (
    <div className="perspective-[1000px]">
      {/* カード一覧 + 中央セレクター */}
      <div className="relative" style={{ height: "500px" }}>
        {/* 気分セレクター（中央オーバーレイ） */}
        <div
          className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
          style={{
            opacity: selectedMood ? 0 : 1,
            transition: "opacity 0.4s",
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: cardsReady ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            className="pointer-events-auto bg-card-bg/90 backdrop-blur-sm rounded-2xl border border-border shadow-lg p-6 text-center"
          >
            <p className="text-sm font-bold text-text-primary mb-4">今日の気分は？</p>
            <div className="flex flex-col gap-2">
              {MOODS.map((mood) => (
                <button
                  key={mood.id}
                  onClick={() => handleMoodSelect(mood.id)}
                  className="px-4 py-2.5 rounded-xl text-sm font-medium border border-border bg-background text-text-primary hover:bg-border/30 transition-all cursor-pointer"
                >
                  {mood.label}
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* リセットボタン（選択後） */}
        {selectedMood && (
          <div className="absolute top-2 right-2 z-20">
            <button
              onClick={handleReset}
              className="px-3 py-1.5 rounded-full text-xs font-medium border border-border bg-card-bg text-text-secondary hover:text-text-primary transition-all cursor-pointer"
            >
              もう一度選ぶ
            </button>
          </div>
        )}
        {wods.map((wod, index) => {
          const isMatched = wod.id === matchedWodId;
          const isFlipped = isMatched;
          const color = FORMAT_COLORS[wod.format];
          return (
            <motion.div
              key={wod.id}
              className="absolute w-40 h-56"
              onClick={() => {
                if (isFlipped) handleReset();
              }}
              initial={{
                left: "50%",
                top: "50%",
                x: "-50%",
                y: "-50%",
                rotate: 0,
                scale: 0.8,
                opacity: 0,
              }}
              animate={{
                left: isFlipped ? "50%" : `${cardStyles[index].left}%`,
                top: isFlipped ? "50%" : `${cardStyles[index].top}%`,
                x: "-50%",
                y: "-50%",
                rotate: isFlipped ? 0 : cardStyles[index].rotate,
                scale: isFlipped ? 1.05 : 1,
                opacity: selectedMood && !isMatched ? 0.3 : 1,
              }}
              transition={{
                type: "spring",
                stiffness: 80,
                damping: 15,
                delay: index * 0.05,
              }}
              onAnimationComplete={() => {
                if (index === wods.length - 1) setCardsReady(true);
              }}
              style={{
                zIndex: isFlipped ? 10 : 1,
              }}
            >
              <div
                className="relative w-full h-full transform-3d transition-transform duration-500"
                style={{
                  transform: isFlipped ? "rotateY(180deg)" : "",
                }}
              >
                {/* 表面 */}
                <div
                  className="absolute inset-0 backface-hidden rounded-2xl border border-border shadow-md flex flex-col items-center justify-center p-4 text-center"
                  style={{
                    backgroundColor: "var(--card-bg)",
                    borderTopWidth: "4px",
                    borderTopColor: color,
                  }}
                >
                  <span
                    className="text-[10px] px-2 py-0.5 rounded-full font-bold text-white mb-3"
                    style={{ backgroundColor: color }}
                  >
                    {wod.format}
                  </span>
                  <h2 className="text-base font-bold text-text-primary leading-tight mb-2">{wod.name}</h2>
                  <p className="text-xs text-text-secondary">{wod.duration}</p>
                  <span className="text-[10px] mt-2 px-2 py-0.5 rounded-full border border-border text-text-secondary">
                    {wod.level}
                  </span>
                </div>

                {/* 裏面（種目テーブル） */}
                <div
                  className="absolute inset-0 backface-hidden transform-[rotateY(180deg)] rounded-2xl bg-card-bg border border-border shadow-md p-3 overflow-y-auto"
                  style={{ borderTopWidth: "4px", borderTopColor: color }}
                >
                  <div className="flex items-center gap-1.5 mb-2">
                    <span
                      className="text-[9px] px-1.5 py-0.5 rounded-full font-bold text-white shrink-0"
                      style={{ backgroundColor: color }}
                    >
                      {wod.format}
                    </span>
                    <h3 className="text-xs font-bold text-text-primary truncate">{wod.name}</h3>
                  </div>
                  <p className="text-[10px] text-text-secondary mb-2">
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
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
