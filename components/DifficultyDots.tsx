"use client";

interface DifficultyDotsProps {
  difficulty: number;
  color: string;
}
const LABELS = ["", "初心者OK", "初心者OK", "要練習", "要練習", "上級"];

export default function DifficultyDots({ difficulty, color }: DifficultyDotsProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <svg key={i} width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M9.51074 0L11.7559 6.90983H19.0213L13.1435 11.1803L15.3886 18.0902L9.51074 13.8197L3.63289 18.0902L5.87803 11.1803L0.000177383 6.90983H7.2656L9.51074 0Z"
              fill={`${i <= difficulty ? `${color}` : "#262626"}`}
            />
          </svg>
        ))}
      </div>
      <span className="text-xs ">{LABELS[difficulty]}</span>
    </div>
  );
}
