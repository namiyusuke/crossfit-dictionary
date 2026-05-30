import type { WodFormat } from "@/types/wod";
import { FORMAT_COLORS } from "@/lib/timer-utils";

const FORMAT_INFO: Record<WodFormat, { title: string; subtitle: string; description: string }> = {
  AMRAP: {
    title: "AMRAP",
    subtitle: "As Many Rounds As Possible",
    description: "制限時間内にラウンドを重ねる",
  },
  EMOM: {
    title: "EMOM",
    subtitle: "Every Minute On the Minute",
    description: "毎分0秒にスタート、残りがレスト",
  },
  ForTime: {
    title: "For Time",
    subtitle: "タイムアタック",
    description: "できるだけ早く完了する",
  },
};

const FORMATS: WodFormat[] = ["AMRAP", "EMOM", "ForTime"];

interface StepFormatSelectProps {
  selected: WodFormat | null;
  onSelect: (format: WodFormat) => void;
}

export default function StepFormatSelect({ selected, onSelect }: StepFormatSelectProps) {
  return (
    <div>
      <p className="font-gothic text-2xl text-green mb-8">フォーマットを選ぼう</p>
      <div className="flex flex-col gap-4">
        {FORMATS.map((format) => {
          const isSelected = selected === format;
          const color = FORMAT_COLORS[format];
          return (
            <button
              key={format}
              onClick={() => onSelect(format)}
              className="text-left p-6 rounded-[16px] border-[3px] transition-all cursor-pointer"
              style={{
                borderColor: isSelected ? color : "#414141",
                background: isSelected ? `${color}15` : "transparent",
              }}
            >
              <p className="font-gothic text-xl mb-1" style={{ color }}>
                {FORMAT_INFO[format].title}
              </p>
              <p className="text-xs text-[#999] mb-2">{FORMAT_INFO[format].subtitle}</p>
              <p className="text-sm">{FORMAT_INFO[format].description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
