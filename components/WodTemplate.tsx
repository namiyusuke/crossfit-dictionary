"use client";

import { useState, useMemo } from "react";
import { Wod } from "@/types/wod";
import type { WodFormat } from "@/types/wod";

interface WodTemplateProps {
  wods: Wod[];
  onMovementClick: (movementId: string) => void;
}

const FORMAT_COLORS: Record<WodFormat, string> = {
  AMRAP: "#2ECC71",
  EMOM: "#3A8FE8",
  ForTime: "#E85D3A",
};

const FORMAT_DESCRIPTIONS: Record<WodFormat, string> = {
  AMRAP: "制限時間内に最大ラウンド",
  EMOM: "毎分ごとに指定動作",
  ForTime: "タイムアタック",
};

export default function WodTemplate({ wods, onMovementClick }: WodTemplateProps) {
  const [selectedFormat, setSelectedFormat] = useState<WodFormat | null>(null);
  const [openWodId, setOpenWodId] = useState<string | null>(null);

  const formats: WodFormat[] = ["AMRAP", "EMOM", "ForTime"];

  const filteredWods = useMemo(() => {
    if (!selectedFormat) return wods;
    return wods.filter((w) => w.format === selectedFormat);
  }, [wods, selectedFormat]);

  return (
    <div>
      {/* フォーマットフィルター */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-1 scrollbar-hide">
        {formats.map((format) => {
          const isActive = selectedFormat === format;
          const color = FORMAT_COLORS[format];
          return (
            <button
              key={format}
              onClick={() => setSelectedFormat(isActive ? null : format)}
              className="shrink-0 px-3 py-1.5 rounded-full text-sm font-medium transition-all border cursor-pointer"
              style={{
                backgroundColor: isActive ? color : "transparent",
                borderColor: color,
                color: isActive ? "#fff" : color,
              }}
            >
              {format}
            </button>
          );
        })}
      </div>

      {/* WODカード一覧 */}
      <div className="space-y-6">
        {filteredWods.map((wod) => {
          const isOpen = openWodId === wod.id;
          const formatColor = FORMAT_COLORS[wod.format];

          return (
            <div
              key={wod.id}
              className="rounded-2xl overflow-hidden bg-card-bg border border-border"
              style={{
                borderLeftWidth: "4px",
                borderLeftColor: formatColor,
              }}
            >
              {/* WODヘッダー */}
              <button
                onClick={() => setOpenWodId(isOpen ? null : wod.id)}
                className="w-full text-left px-4 py-3 cursor-pointer"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base font-bold text-text-primary">{wod.name}</h3>
                      <span
                        className="text-[10px] px-1.5 py-0.5 rounded-full font-bold text-white"
                        style={{ backgroundColor: formatColor }}
                      >
                        {wod.format}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full font-medium border border-border ">
                        {wod.level}
                      </span>
                    </div>
                    <p className="text-sm  mt-1">{wod.goal}</p>
                    <p className="text-xs  mt-1">
                      {wod.duration}
                      {wod.rounds && ` / ${wod.rounds}ラウンド`}
                      {wod.repScheme && ` / ${wod.repScheme}`}
                    </p>
                  </div>
                  <svg
                    className={`w-5 h-5  transition-transform shrink-0 mt-1 ${isOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {/* WOD詳細 */}
              {isOpen && (
                <div className="px-4 pb-4 animate-fade-slide">
                  {/* 種目リスト */}
                  {wod.sets.map((set, si) => (
                    <div key={si} className="mb-3">
                      {set.label && <p className="text-xs font-bold  uppercase tracking-wide mb-1.5">{set.label}</p>}
                      {set.movements.length > 0 ? (
                        <div className="space-y-1.5">
                          {set.movements.map((mov, mi) => (
                            <button
                              key={mi}
                              onClick={(e) => {
                                e.stopPropagation();
                                onMovementClick(mov.movementId);
                              }}
                              className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-background hover:bg-border/30 transition-colors text-left cursor-pointer"
                            >
                              <span className="text-sm text-text-primary font-medium">{mov.name}</span>
                              <span className="text-sm  shrink-0 ml-2">{mov.reps}</span>
                            </button>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm  italic px-3 py-2">休憩</p>
                      )}
                    </div>
                  ))}

                  {/* タグ */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {wod.targetBodyPart.map((part) => (
                      <span key={part} className="text-[11px] px-2 py-0.5 rounded-full border border-border ">
                        {part}
                      </span>
                    ))}
                    {wod.targetEffect.map((effect) => (
                      <span
                        key={effect}
                        className="text-[11px] px-2 py-0.5 rounded-full bg-background text-text-primary border border-border font-medium"
                      >
                        {effect}
                      </span>
                    ))}
                  </div>

                  {/* ノート */}
                  {wod.notes && (
                    <div className="bg-background rounded-lg p-3">
                      <p className="text-xs ">📋 {wod.notes}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
