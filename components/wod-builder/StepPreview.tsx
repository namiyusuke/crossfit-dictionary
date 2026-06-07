import type { Wod } from "@/types/wod";
import type { Movement } from "@/types/movement";
import { CATEGORY_COLORS } from "@/types/movement";
import { FORMAT_COLORS } from "@/lib/timer-utils";

interface StepPreviewProps {
  wod: Wod;
  movements: Movement[];
  onLaunchTimer: () => void;
}

export default function StepPreview({ wod, movements, onLaunchTimer }: StepPreviewProps) {
  const color = FORMAT_COLORS[wod.format];

  return (
    <div>
      <p className="font-gothic text-2xl text-white mb-10">5.プレビューで確認しよう</p>
      {/* 種目リスト */}
      <div className="bg-gray rounded-2xl mb-15">
        <p className="text-[24px] font-gothic font-regular mb-4 text-white">種目リスト</p>
        {/* フォーマット & 時間 */}
        <div className="flex gap-2 mb-6 flex-wrap">
          <span className="px-3 py-1.5 rounded-[10px] text-base font-black text-black bg-green">{wod.format}</span>
          <span className="px-3 py-1.5 rounded-[10px] text-sm font-black bg-white text-black">{wod.duration}</span>
          {wod.rounds && (
            <span className="px-3 py-1.5 rounded-[10px] text-sm font-black bg-white text-black">{wod.rounds}R</span>
          )}
          {wod.repScheme && (
            <span className="px-3 py-1.5 rounded-[10px] text-sm font-black bg-white text-black">{wod.repScheme}</span>
          )}
        </div>
        <div className="space-y-4">
          {wod.sets.flatMap((set) =>
            set.movements.map((mov, j) => {
              const movement = movements.find((m) => m.id === mov.movementId);
              const movColor = movement ? CATEGORY_COLORS[movement.category] : "#666";
              return (
                <div key={j} className="flex gap-6 border border-white p-6 border-2 rounded-[14px]">
                  <span
                    className={`font-gothic font-normal text-[48px] text-[#262626] [text-stroke:2px_white] [-webkit-text-stroke:2px_white] leading-none`}
                  >{`0${j + 1}`}</span>
                  <div className="flex-1">
                    <span className="inline-block rounded-xl font-gothic text-[24px] font-black text-white mb-1 leading-[1.2]">
                      {mov.name}
                    </span>
                    <p className="text-[24px] font-gothic text-green">{mov.reps}</p>
                  </div>
                </div>
              );
            }),
          )}
        </div>
      </div>

      {/* 対象部位 & 効果 */}
      {/* <div className="flex flex-wrap gap-2 mb-10">
        {wod.targetBodyPart.map((part) => (
          <span key={part} className="px-2 py-1 rounded-[10px] text-xs border border-[#666]">
            {part}
          </span>
        ))}
        {wod.targetEffect.map((effect) => (
          <span key={effect} className="px-2 py-1 rounded-[10px] text-xs border border-green text-green">
            {effect}
          </span>
        ))}
      </div> */}

      {/* タイマー起動ボタン */}
      <div className="text-center">
        <div className="relative inline-block">
          <button
            onClick={onLaunchTimer}
            className="py-5 px-7 rounded-2xl font-gothic bg-button text-black text-2xl mx-auto cursor-pointer"
            type="button"
          >
            きょうはこれをやる！
          </button>
          <span className="bg-white -z-10 absolute w-full h-full rounded-2xl block right-[-4px] top-[4px]" />
        </div>
      </div>
    </div>
  );
}
