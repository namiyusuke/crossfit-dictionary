import { Movement, CATEGORY_LABELS, CATEGORY_COLORS } from "@/types/movement";
import DifficultyDots from "./DifficultyDots";
import Link from "next/link";

interface MovementCardProps {
  movement: Movement;
}

export default function MovementCard({ movement }: MovementCardProps) {
  const categoryColor = CATEGORY_COLORS[movement.category];

  return (
    <Link
      href={`/movement/${movement.id}`}
      className="block rounded-xl transition-shadow hover:shadow-lg bg-card-bg border border-border relative"
    >
      <span
        className="text-xs px-6 py-2 rounded-[10px] font-black absolute top-0 right-3.5 translate-y-[-50%]"
        style={{
          backgroundColor: categoryColor,
          color: "#0A0A0A",
        }}
      >
        {CATEGORY_LABELS[movement.category]}
      </span>
      <div className="px-4 py-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-base font-bold text-text-primary font-gothic">{movement.name}</h2>
            </div>
            <p className="text-sm mt-0.5">{movement.nameEn}</p>
            <p className="text-sm mt-1 line-clamp-2">{movement.oneLiner}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 mt-2">
          <DifficultyDots difficulty={movement.difficulty} />
        </div>
      </div>
    </Link>
  );
}
