"use client";

import { useState } from "react";
import { Movement, CATEGORY_LABELS, CATEGORY_COLORS } from "@/types/movement";
import DifficultyDots from "./DifficultyDots";
import YouTubeEmbed from "./YouTubeEmbed";
import VideoEditModal from "./VideoEditModal";
import RoadmapSection from "./RoadmapSection";

interface MovementCardProps {
  movement: Movement;
  isOpen: boolean;
  onToggle: () => void;
  videoOverride?: string;
  onVideoChange: (videoId: string) => void;
}

export default function MovementCard({
  movement,
  isOpen,
  onToggle,
  videoOverride,
  onVideoChange,
}: MovementCardProps) {
  const [showVideoEdit, setShowVideoEdit] = useState(false);
  const categoryColor = CATEGORY_COLORS[movement.category];
  const currentVideoId = videoOverride || movement.videoId;

  return (
    <>
      <div
        className="rounded-2xl overflow-hidden transition-shadow hover:shadow-lg bg-card-bg border border-border"
        style={{ borderLeftWidth: "4px", borderLeftColor: categoryColor }}
      >
        {/* カードヘッダー（常に表示） */}
        <button
          onClick={onToggle}
          className="w-full text-left px-4 py-4 cursor-pointer"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base font-bold text-text-primary">
                  {movement.name}
                </h2>
                {movement.roadmap && (
                  <span
                    className="text-[10px] px-1.5 py-0.5 rounded-full font-bold text-white"
                    style={{ backgroundColor: categoryColor }}
                  >
                    MAP
                  </span>
                )}
              </div>
              <p className="text-sm text-text-secondary mt-0.5">
                {movement.nameEn}
              </p>
              <p className="text-sm text-text-secondary mt-1 line-clamp-2">
                {movement.oneLiner}
              </p>
            </div>
            <div className="shrink-0 mt-1">
              <svg
                className={`w-5 h-5 text-text-secondary transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-2">
            <span
              className="text-xs px-2 py-0.5 rounded-full font-medium"
              style={{
                backgroundColor: categoryColor + "20",
                color: categoryColor,
              }}
            >
              {CATEGORY_LABELS[movement.category]}
            </span>
            <DifficultyDots difficulty={movement.difficulty} />
          </div>
        </button>

        {/* カード展開時のコンテンツ */}
        {isOpen && (
          <div className="px-4 pb-4 animate-fade-slide">
            {/* YouTube動画 */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold text-text-primary">
                  📹 参考動画
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowVideoEdit(true);
                  }}
                  className="text-xs text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
                >
                  動画を変更
                </button>
              </div>
              <YouTubeEmbed videoId={currentVideoId} />
            </div>

            {/* 目的・効果 */}
            <div className="mb-4">
              <p className="text-sm font-semibold text-text-primary mb-2">
                🎯 目的・効果
              </p>
              <p className="text-sm text-text-secondary mb-2">
                {movement.purpose}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {movement.primaryEffect.map((effect) => (
                  <span
                    key={effect}
                    className="text-[11px] px-2 py-0.5 rounded-full bg-background text-text-primary border border-border font-medium"
                  >
                    {effect}
                  </span>
                ))}
                {movement.bodyPart.map((part) => (
                  <span
                    key={part}
                    className="text-[11px] px-2 py-0.5 rounded-full text-text-secondary border border-border"
                  >
                    {part}
                  </span>
                ))}
              </div>
            </div>

            {/* やり方 */}
            <div className="mb-4">
              <p className="text-sm font-semibold text-text-primary mb-2">
                📝 やり方
              </p>
              <ol className="space-y-1.5">
                {movement.steps.map((step, i) => (
                  <li
                    key={i}
                    className="text-sm text-text-secondary flex gap-2"
                  >
                    <span className="text-text-secondary/60 shrink-0">
                      {i + 1}.
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            {/* 注意点 */}
            <div className="mb-4">
              <p className="text-sm font-semibold text-text-primary mb-2">
                ⚠️ 注意点
              </p>
              <ul className="space-y-1">
                {movement.tips.map((tip, i) => (
                  <li
                    key={i}
                    className="text-sm text-text-secondary flex gap-2"
                  >
                    <span className="shrink-0">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            {/* 使う筋肉 */}
            <div className="mb-4">
              <p className="text-sm font-semibold text-text-primary mb-2">
                💪 使う筋肉
              </p>
              <div className="mb-2">
                <p className="text-xs text-text-secondary mb-1">主動筋</p>
                <div className="flex flex-wrap gap-1.5">
                  {movement.muscleMain.map((muscle) => (
                    <span
                      key={muscle}
                      className="text-xs px-2.5 py-1 rounded-full bg-text-primary/10 text-text-primary border border-border font-medium"
                    >
                      {muscle}
                    </span>
                  ))}
                </div>
              </div>
              {movement.muscleSub.length > 0 && (
                <div>
                  <p className="text-xs text-text-secondary mb-1">補助筋</p>
                  <div className="flex flex-wrap gap-1.5">
                    {movement.muscleSub.map((muscle) => (
                      <span
                        key={muscle}
                        className="text-xs px-2.5 py-1 rounded-full bg-background text-text-secondary border border-border"
                      >
                        {muscle}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* スケーリング */}
            <div className="mb-2">
              <p className="text-sm font-semibold text-text-primary mb-1">
                📊 スケーリング
              </p>
              <p className="text-sm text-text-secondary">{movement.scaling}</p>
            </div>

            {/* 達成ロードマップ */}
            {movement.roadmap && (
              <RoadmapSection roadmap={movement.roadmap} />
            )}
          </div>
        )}
      </div>

      {/* 動画編集モーダル */}
      {showVideoEdit && (
        <VideoEditModal
          currentVideoId={currentVideoId}
          onSave={onVideoChange}
          onClose={() => setShowVideoEdit(false)}
        />
      )}
    </>
  );
}
