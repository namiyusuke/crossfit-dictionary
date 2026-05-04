import { movements } from "@/data/movements";
import { CATEGORY_LABELS, CATEGORY_COLORS } from "@/types/movement";
import { notFound } from "next/navigation";
import type { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import { getPracticeLog, togglePractice } from "./action";
import PracticeButton from "../PracticeButton";
type Props = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return movements.map((movement) => ({
    id: movement.id,
  }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const movement = movements.find((m) => m.id === id);
  return {
    title: movement?.name,
  };
}
export default async function MovementPage({ params }: Props) {
  const { id } = await params;
  console.log(id);
  const movement = movements.find((m) => m.id === id);
  if (!movement) {
    notFound();
  }
  const practiceLog = await getPracticeLog();
  const isPracticed = practiceLog.includes(id);
  const categoryColor = CATEGORY_COLORS[movement.category];
  return (
    <main className="min-h-screen px-4 py-8 max-w-2xl mx-auto">
      {/* 戻るリンク */}
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-text-primary mb-6"
      >
        ← 一覧に戻る
      </Link>
      <PracticeButton movementId={id} initialIsPracticed={isPracticed} />
      {/* ヘッダー */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span
            className="text-xs px-2 py-0.5 rounded-full font-medium"
            style={{
              backgroundColor: categoryColor + "20",
              color: categoryColor,
            }}
          >
            {CATEGORY_LABELS[movement.category]}
          </span>
          <span className="text-xs text-text-secondary">
            難易度 {"★".repeat(movement.difficulty)}
            {"☆".repeat(5 - movement.difficulty)}
          </span>
        </div>
        <h1 className="text-2xl font-bold text-text-primary">{movement.name}</h1>
        <p className="text-sm text-text-secondary mt-1">{movement.nameEn}</p>
        <p className="text-base text-text-secondary mt-2">{movement.oneLiner}</p>
      </div>

      {/* YouTube動画 */}
      <section className="mb-6">
        <div className="aspect-video rounded-xl overflow-hidden bg-black">
          <iframe
            src={`https://www.youtube.com/embed/${movement.videoId}`}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </section>

      {/* 目的・効果 */}
      <section className="mb-6">
        <h2 className="text-sm font-semibold text-text-primary mb-2">目的・効果</h2>
        <p className="text-sm text-text-secondary mb-2">{movement.purpose}</p>
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
            <span key={part} className="text-[11px] px-2 py-0.5 rounded-full text-text-secondary border border-border">
              {part}
            </span>
          ))}
        </div>
      </section>

      {/* やり方 */}
      <section className="mb-6">
        <h2 className="text-sm font-semibold text-text-primary mb-2">やり方</h2>
        <ol className="space-y-1.5">
          {movement.steps.map((step, i) => (
            <li key={i} className="text-sm text-text-secondary flex gap-2">
              <span className="text-text-secondary/60 shrink-0">{i + 1}.</span>
              {step}
            </li>
          ))}
        </ol>
      </section>

      {/* 注意点 */}
      <section className="mb-6">
        <h2 className="text-sm font-semibold text-text-primary mb-2">注意点</h2>
        <ul className="space-y-1">
          {movement.tips.map((tip, i) => (
            <li key={i} className="text-sm text-text-secondary flex gap-2">
              <span className="shrink-0">•</span>
              {tip}
            </li>
          ))}
        </ul>
      </section>

      {/* 使う筋肉 */}
      <section className="mb-6">
        <h2 className="text-sm font-semibold text-text-primary mb-2">使う筋肉</h2>
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
      </section>

      {/* スケーリング */}
      <section className="mb-6">
        <h2 className="text-sm font-semibold text-text-primary mb-2">スケーリング</h2>
        <p className="text-sm text-text-secondary">{movement.scaling}</p>
      </section>
    </main>
  );
}
