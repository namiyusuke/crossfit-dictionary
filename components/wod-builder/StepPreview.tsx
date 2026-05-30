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
      <p className="font-gothic text-2xl text-green mb-8">プレビュー</p>

      {/* フォーマット & 時間 */}
      <div className="flex gap-2 mb-6 flex-wrap">
        <span className="px-3 py-1.5 rounded-[10px] text-sm font-black text-white" style={{ background: color }}>
          {wod.format}
        </span>
        <span className="px-3 py-1.5 rounded-[10px] text-sm font-black bg-white text-black">{wod.duration}</span>
        {wod.rounds && (
          <span className="px-3 py-1.5 rounded-[10px] text-sm font-black bg-white text-black">{wod.rounds}R</span>
        )}
        {wod.repScheme && (
          <span className="px-3 py-1.5 rounded-[10px] text-sm font-black bg-white text-black">{wod.repScheme}</span>
        )}
      </div>

      {/* 種目リスト */}
      <div className="bg-gray rounded-2xl p-6 mb-8">
        <p className="text-sm font-black mb-4 text-[#999]">種目リスト</p>
        <div className="space-y-4">
          {wod.sets.flatMap((set) =>
            set.movements.map((mov, j) => {
              const movement = movements.find((m) => m.id === mov.movementId);
              const movColor = movement ? CATEGORY_COLORS[movement.category] : "#666";
              return (
                <div key={j} className="flex items-center gap-4">
                  <span className="font-gothic text-3xl text-green">{`0${j + 1}`}</span>
                  <div className="flex-1">
                    <span
                      className="inline-block px-3 py-1.5 rounded-xl text-xs font-black text-white mb-1"
                      style={{ background: movColor }}
                    >
                      {mov.name}
                    </span>
                    <p className="text-sm text-[#ccc]">{mov.reps}</p>
                  </div>
                </div>
              );
            }),
          )}
        </div>
      </div>

      {/* 対象部位 & 効果 */}
      <div className="flex flex-wrap gap-2 mb-10">
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
      </div>

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
