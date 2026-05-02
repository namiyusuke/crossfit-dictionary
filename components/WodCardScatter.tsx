import { useMemo, useState } from "react";
import { Wod } from "@/types/wod";
import type { WodFormat } from "@/types/wod";

const FORMAT_COLORS: Record<WodFormat, string> = {
  AMRAP: "#2ECC71",
  EMOM: "#3A8FE8",
  ForTime: "#E85D3A",
};

interface WodCardScatterProps {
  wods: Wod[];
}

export default function WodCardScatter({ wods }: WodCardScatterProps) {
  const [revealed, setRevealed] = useState(false);

  const todayIndex = useMemo(() => {
    const today = new Date();
    const seed =
      today.getFullYear() * 10000 +
      (today.getMonth() + 1) * 100 +
      today.getDate();
    return seed % wods.length;
  }, [wods.length]);

  const cardStyles = useMemo(() => {
    return wods.map(() => ({
      rotate: Math.random() * 12 - 6,
      translateX: Math.random() * 16 - 8,
      translateY: Math.random() * 8 - 4,
    }));
  }, [wods]);

  return (
    <div className="perspective-[1000px]">
      {/* 引くボタン */}
      <div className="text-center mb-6">
        <button
          onClick={() => setRevealed(!revealed)}
          className="px-6 py-2.5 rounded-full text-sm font-bold text-white transition-all cursor-pointer"
          style={{
            backgroundColor: revealed ? "#656D76" : "#E85D3A",
          }}
        >
          {revealed ? "カードを戻す" : "今日のWODを引く"}
        </button>
      </div>

      {/* カード一覧 */}
      <div className="flex flex-wrap gap-4 justify-center">
        {wods.map((wod, index) => {
          const isToday = index === todayIndex;
          const isFlipped = revealed && isToday;
          const color = FORMAT_COLORS[wod.format];
          return (
            <div
              key={wod.id}
              className="w-40 h-56"
              style={{
                transform: `rotate(${cardStyles[index].rotate}deg) translate(${cardStyles[index].translateX}px, ${cardStyles[index].translateY}px)`,
                transition: "transform 0.5s",
                ...(isFlipped
                  ? { transform: "rotate(0deg) translate(0px, 0px)" }
                  : {}),
              }}
            >
              <div
                className="relative w-full h-full transform-3d transition-transform duration-500"
                style={{
                  transform: isFlipped ? "rotateY(180deg)" : "",
                }}
              >
                {/* 表面（裏向きカード） */}
                <div
                  className="absolute inset-0 backface-hidden rounded-2xl border border-border shadow-md flex flex-col items-center justify-center p-4 text-center"
                  style={{
                    backgroundColor: isToday && !revealed ? color : "var(--card-bg)",
                    borderTopWidth: "4px",
                    borderTopColor: color,
                  }}
                >
                  {isToday && !revealed ? (
                    <span className="text-2xl">?</span>
                  ) : (
                    <>
                      <span
                        className="text-[10px] px-2 py-0.5 rounded-full font-bold text-white mb-3"
                        style={{ backgroundColor: color }}
                      >
                        {wod.format}
                      </span>
                      <h2 className="text-base font-bold text-text-primary leading-tight mb-2">
                        {wod.name}
                      </h2>
                      <p className="text-xs text-text-secondary">
                        {wod.duration}
                      </p>
                      <span className="text-[10px] mt-2 px-2 py-0.5 rounded-full border border-border text-text-secondary">
                        {wod.level}
                      </span>
                    </>
                  )}
                </div>

                {/* 裏面（種目テーブル） */}
                <div
                  className="absolute inset-0 backface-hidden transform-[rotateY(180deg)] rounded-2xl bg-card-bg border border-border shadow-md p-3 overflow-y-auto"
                  style={{ borderTopWidth: "4px", borderTopColor: color }}
                >
                  <h3 className="text-xs font-bold text-text-primary mb-2 truncate">
                    {wod.name}
                  </h3>
                  {wod.sets.map((set, i) => (
                    <div key={i} className="mb-1.5">
                      {set.label && (
                        <p className="text-[10px] font-bold text-text-secondary uppercase mb-0.5">
                          {set.label}
                        </p>
                      )}
                      {set.movements.map((mov, j) => (
                        <div
                          key={j}
                          className="flex justify-between text-[11px] py-0.5 border-b border-border/50"
                        >
                          <span className="text-text-primary">{mov.name}</span>
                          <span className="text-text-secondary shrink-0 ml-1">
                            {mov.reps}
                          </span>
                        </div>
                      ))}
                    </div>
                  ))}
                  {wod.notes && (
                    <p className="text-[9px] text-text-secondary mt-1.5 leading-tight">
                      {wod.notes}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
