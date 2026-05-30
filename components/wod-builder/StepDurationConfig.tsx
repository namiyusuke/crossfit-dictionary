import type { WodFormat } from "@/types/wod";
import { FORMAT_COLORS } from "@/lib/timer-utils";
import { Minus, Plus } from "lucide-react";

const DURATION_PRESETS = [5, 8, 10, 12, 15, 20];
const REP_SCHEME_PRESETS = ["なし", "21-15-9", "15-12-9", "10-8-6"];

interface StepDurationConfigProps {
  format: WodFormat;
  duration: number;
  onDurationChange: (minutes: number) => void;
  rounds: number;
  onRoundsChange: (rounds: number) => void;
  repScheme: string;
  onRepSchemeChange: (scheme: string) => void;
}

export default function StepDurationConfig({
  format,
  duration,
  onDurationChange,
  rounds,
  onRoundsChange,
  repScheme,
  onRepSchemeChange,
}: StepDurationConfigProps) {
  const color = FORMAT_COLORS[format];

  if (format === "ForTime") {
    return (
      <div>
        <p className="font-gothic text-2xl text-green mb-8">ラウンド & レップを設定</p>

        {/* ラウンド数 */}
        <div className="mb-10">
          <p className="text-sm font-black mb-4">ラウンド数</p>
          <div className="flex items-center justify-center gap-8">
            <button
              onClick={() => onRoundsChange(Math.max(1, rounds - 1))}
              className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center cursor-pointer"
            >
              <Minus size={20} />
            </button>
            <span className="font-gothic text-5xl" style={{ color }}>
              {rounds}
            </span>
            <button
              onClick={() => onRoundsChange(Math.min(10, rounds + 1))}
              className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center cursor-pointer"
            >
              <Plus size={20} />
            </button>
          </div>
        </div>

        {/* Rep Scheme */}
        <div className="mb-10">
          <p className="text-sm font-black mb-4">Rep Scheme</p>
          <div className="flex flex-wrap gap-3">
            {REP_SCHEME_PRESETS.map((scheme) => (
              <button
                key={scheme}
                onClick={() => onRepSchemeChange(scheme === "なし" ? "" : scheme)}
                className="px-5 py-3 rounded-[10px] text-[13px] font-black transition-all border cursor-pointer"
                style={{
                  borderColor: (scheme === "なし" ? "" : scheme) === repScheme ? color : "#fff",
                  background: (scheme === "なし" ? "" : scheme) === repScheme ? color : "transparent",
                  color: (scheme === "なし" ? "" : scheme) === repScheme ? "#000" : "#fff",
                }}
              >
                {scheme}
              </button>
            ))}
          </div>
        </div>

        {/* タイムキャップ（任意） */}
        <div>
          <p className="text-sm font-black mb-4">制限時間（任意）</p>
          <div className="flex flex-wrap gap-3">
            {[0, 10, 15, 20, 25, 30].map((min) => (
              <button
                key={min}
                onClick={() => onDurationChange(min)}
                className="px-5 py-3 rounded-[10px] text-[13px] font-black transition-all border cursor-pointer"
                style={{
                  borderColor: duration === min ? color : "#fff",
                  background: duration === min ? color : "transparent",
                  color: duration === min ? "#000" : "#fff",
                }}
              >
                {min === 0 ? "なし" : `${min}分`}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // AMRAP / EMOM
  return (
    <div>
      <p className="font-gothic text-2xl text-green mb-8">時間を設定</p>
      <div className="flex flex-wrap gap-3">
        {DURATION_PRESETS.map((min) => (
          <button
            key={min}
            onClick={() => onDurationChange(min)}
            className="px-5 py-3 rounded-[10px] text-[13px] font-black transition-all border cursor-pointer"
            style={{
              borderColor: duration === min ? color : "#fff",
              background: duration === min ? color : "transparent",
              color: duration === min ? "#000" : "#fff",
            }}
          >
            {min}分
          </button>
        ))}
      </div>
      <div className="mt-10 text-center">
        <span className="font-gothic text-5xl" style={{ color }}>
          {duration}
        </span>
        <span className="text-xl ml-2">分</span>
      </div>
    </div>
  );
}
