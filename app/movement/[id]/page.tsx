import { movements } from "@/data/movements";
import { CATEGORY_LABELS, CATEGORY_COLORS, CATEGORY_SHADOW } from "@/types/movement";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getPracticeLog } from "./action";
import PracticeButton from "../PracticeButton";
import SpriteAnimation from "./SpriteAnimation";
import DifficultyDots from "@/components/DifficultyDots";
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
  const movement = movements.find((m) => m.id === id);
  if (!movement) {
    notFound();
  }
  const practiceLog = await getPracticeLog();
  const isPracticed = practiceLog.includes(id);
  const categoryColor = CATEGORY_COLORS[movement.category];
  const categoryShadow = CATEGORY_SHADOW[movement.category];
  return (
    <main className="min-h-screen px-4 py-8 max-w-2xl mx-auto">
      {/* 戻るリンク */}
      <Link href="/" className="inline-flex items-center gap-1 text-sm  hover:text-text-primary mb-14">
        ＜　種目辞典
      </Link>
      {/* <PracticeButton movementId={id} initialIsPracticed={isPracticed} /> */}
      {/* ヘッダー */}
      <div className="mb-12">
        <div
          className="block rounded-xl transition-shadow border-6 hover:shadow-lg relative bg-[#0a0a0a]"
          style={{ borderColor: categoryColor }}
        >
          <span
            className="absolute right-[-9px] top-[-2px] rounded-xl border-5 -z-1 w-[calc(100%+12px)] h-[calc(100%+12px)]"
            style={{ borderColor: categoryShadow }}
          ></span>
          <span
            className="text-xs px-6 py-2 rounded-[10px] font-black absolute top-0 right-3.5 translate-y-[-50%] "
            style={{
              backgroundColor: categoryColor,
              color: "#0A0A0A",
            }}
          >
            {CATEGORY_LABELS[movement.category]}
          </span>
          <div className="px-10 py-8">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-2xl font-gothic">{movement.name}</h2>
                </div>
                <p className="text-sm mt-0.5">{movement.nameEn}</p>
                <p className="text-sm mt-1 line-clamp-2">{movement.oneLiner}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-2">
              <DifficultyDots difficulty={movement.difficulty} color={categoryColor} />
            </div>
          </div>
        </div>
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
      {/* 使う筋肉 */}
      <section className="mb-16">
        <h2
          className="text-2xl mb-2 font-gothic"
          style={{
            color: categoryColor,
          }}
        >
          使う部位
        </h2>
        <div className="mb-2">
          <p className="mb-2 font-bold">主動筋</p>
          <div className="flex flex-wrap gap-1.5">
            {movement.muscleMain.map((muscle) => (
              <span key={muscle} className="text-[13px] px-2.5 py-1 rounded-[10px] bg-white text-black">
                {muscle}
              </span>
            ))}
          </div>
        </div>
        {movement.muscleSub.length > 0 && (
          <div>
            <p className="mb-2 font-bold">補助筋</p>
            <div className="flex flex-wrap gap-1.5">
              {movement.muscleSub.map((muscle) => (
                <span key={muscle} className="text-[13px] px-2.5 py-1 rounded-[10px] bg-white text-black">
                  {muscle}
                </span>
              ))}
            </div>
          </div>
        )}
      </section>
      {/* 目的・効果 */}
      <section className="mb-16">
        <h2
          className="text-2xl mb-2 font-gothic"
          style={{
            color: categoryColor,
          }}
        >
          目的・効果
        </h2>
        <p className="text-sm  mb-2">{movement.purpose}</p>
        <div className="flex flex-wrap gap-1.5">
          {/* {movement.primaryEffect.map((effect) => (
            <span
              key={effect}
              className="text-[11px] px-2 py-0.5 rounded-full bg-background text-text-primary border border-border font-medium"
            >
              {effect}
            </span>
          ))} */}
          {movement.bodyPart.map((part) => (
            <span key={part} className="text-[13px] px-2.5 py-1 rounded-[10px] bg-white text-black">
              {part}
            </span>
          ))}
        </div>
      </section>

      {/* やり方 */}
      <section className="mb-16">
        <h2
          className="text-2xl mb-2 font-gothic"
          style={{
            color: categoryColor,
          }}
        >
          やり方
        </h2>
        <ol className="space-y-1.5">
          {movement.steps.map((step, i) => (
            <li key={i} className="text-basic font-bold flex gap-2 items-center">
              <span
                className="font-gothic w-[22px] text-2xl"
                style={{
                  color: categoryColor,
                }}
              >
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </section>

      {/* 注意点 */}
      <section className="mb-6">
        <h2
          className="text-2xl mb-2 font-gothic"
          style={{
            color: categoryColor,
          }}
        >
          ここに注意
        </h2>
        <ul className="space-y-3">
          {movement.tips.map((tip, i) => (
            <li key={i} className="text-basic flex gap-2 list-none px-5 py-3 bg-gray rounded-[8px]">
              {tip}
            </li>
          ))}
        </ul>
      </section>

      {/* スケーリング */}
      {/* <section className="mb-6">
        <h2 className="text-sm font-semibold text-text-primary mb-2">スケーリング</h2>
        <p className="text-sm ">{movement.scaling}</p>
      </section> */}
      <SpriteAnimation />
    </main>
  );
}
