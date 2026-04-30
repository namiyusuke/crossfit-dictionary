"use client";

interface DifficultyDotsProps {
  difficulty: number;
}

const LABELS = ["", "初心者OK", "初心者OK", "要練習", "要練習", "上級"];

export default function DifficultyDots({ difficulty }: DifficultyDotsProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <span
            key={i}
            className={`inline-block w-2.5 h-2.5 rounded-full ${
              i <= difficulty
                ? "bg-text-primary opacity-80"
                : "bg-text-secondary opacity-30"
            }`}
          />
        ))}
      </div>
      <span className="text-xs text-text-secondary">{LABELS[difficulty]}</span>
    </div>
  );
}
