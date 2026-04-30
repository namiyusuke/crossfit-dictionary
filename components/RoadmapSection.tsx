"use client";

import { useState } from "react";
import { Roadmap } from "@/types/movement";

interface RoadmapSectionProps {
  roadmap: Roadmap;
}

export default function RoadmapSection({ roadmap }: RoadmapSectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-4 border border-border rounded-xl overflow-hidden">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="w-full flex items-center justify-between px-4 py-3 bg-card-bg hover:bg-border/20 transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">🗺️</span>
          <span className="font-semibold text-text-primary text-sm">
            達成ロードマップ
          </span>
        </div>
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
      </button>

      {isOpen && (
        <div className="px-4 pb-4 pt-2 animate-fade-slide">
          {/* ゴール */}
          <div className="mb-4">
            <p className="text-sm font-semibold text-text-primary mb-1">
              🎯 目標
            </p>
            <p className="text-sm text-text-secondary">{roadmap.goal}</p>
          </div>

          {/* 前提スキル */}
          <div className="mb-4">
            <p className="text-sm font-semibold text-text-primary mb-2">
              📋 前提スキル
            </p>
            <div className="space-y-2">
              {roadmap.prerequisites.map((prereq, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2 bg-background rounded-lg p-3"
                >
                  <span className="text-text-secondary text-xs mt-0.5 shrink-0">
                    {i + 1}.
                  </span>
                  <div>
                    <p className="text-sm font-medium text-text-primary">
                      {prereq.name}
                    </p>
                    <p className="text-xs text-text-secondary">
                      {prereq.description}
                    </p>
                    <p className="text-xs text-text-secondary mt-1">
                      目標: {prereq.target}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 段階的練習 */}
          <div className="mb-4">
            <p className="text-sm font-semibold text-text-primary mb-2">
              🏋️ 段階的練習メニュー
            </p>
            <div className="relative pl-4 border-l-2 border-border space-y-4">
              {roadmap.drills.map((drill, i) => (
                <div key={i} className="relative">
                  <span className="absolute -left-[calc(0.5rem+1px)] top-1 w-2.5 h-2.5 rounded-full bg-text-secondary" />
                  <p className="text-xs font-bold text-text-secondary uppercase tracking-wide">
                    {drill.phase}
                  </p>
                  <p className="text-sm font-medium text-text-primary">
                    {drill.name}
                  </p>
                  <p className="text-xs text-text-secondary">{drill.detail}</p>
                  <p className="text-xs text-text-secondary mt-1">
                    推奨: {drill.reps}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 達成目安期間 */}
          <div className="bg-background rounded-lg p-3 flex items-center gap-2">
            <span className="text-lg">⏱️</span>
            <div>
              <p className="text-xs text-text-secondary">達成目安期間</p>
              <p className="text-sm font-semibold text-text-primary">
                {roadmap.timeEstimate}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
