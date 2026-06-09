import { getAllMovements, getMovementById } from "@/lib/data/movements";
import { categoryLabels, CATEGORY_COLORS, CATEGORY_SHADOW } from "@/types/movement";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import SpriteAnimation from "./SpriteAnimation";
import BackButton from "@/components/BackButton";
import DifficultyDots from "@/components/DifficultyDots";
import GlobalMenuNav from "@/components/GlobalMenuNav";
type Props = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  const movements = await getAllMovements();
  return movements.map((movement) => ({
    id: movement.id,
  }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const movement = await getMovementById(id);
  return {
    title: movement?.name,
  };
}
export default async function MovementPage({ params }: Props) {
  const { id } = await params;
  const movement = await getMovementById(id);
  if (!movement) {
    notFound();
  }
  const categoryColor = CATEGORY_COLORS[movement.category];
  const categoryShadow = CATEGORY_SHADOW[movement.category];
  return (
    <main className="min-h-screen px-4 py-8 pb-[170px] max-w-2xl mx-auto bg-gray relative">
      {/* フレーム枠 */}
      <div className="inset-0 pointer-events-none mx-auto w-[375px] fixed z-3000 before:absolute before:left-0 md:before:rounded-[24px] before:right-0 before:inset-y-0 before:border before:border-[#939393] before:border-3 before:content-[''] hidden md:block"></div>
      {/* 角丸マスク（4隅のみ） */}
      <div className="fixed inset-0 pointer-events-none mx-auto w-[375px] z-20 hidden md:block rounded-[24px]">
        <div
          className="absolute top-0 left-0 w-6 h-6 hidden md:block"
          style={{ background: "radial-gradient(circle at 100% 100%, transparent 23px, #262626 24px)" }}
        />
        <div
          className="absolute top-0 right-0 w-6 h-6"
          style={{ background: "radial-gradient(circle at 0% 100%, transparent 23px, #262626 24px)" }}
        />
        <div
          className="absolute bottom-0 left-0 w-6 h-6"
          style={{ background: "radial-gradient(circle at 100% 0%, transparent 23px, #262626 24px)" }}
        />
        <div
          className="absolute bottom-0 right-0 w-6 h-6"
          style={{ background: "radial-gradient(circle at 0% 0%, transparent 23px, #262626 24px)" }}
        />
      </div>
      {/* 戻るボタン */}
      <div className="mb-5">
        <BackButton label="戻る" />
      </div>
      {/* ヘッダー */}
      <div className="mb-12">
        <div
          className="block rounded-xl border-2 transition-shadow border-6 hover:shadow-lg relative bg-[#0a0a0a]"
          style={{ borderColor: categoryColor }}
        >
          <span
            className="absolute right-[-9px] top-[-2px] rounded-xl border-5 -z-1 w-[calc(100%+12px)] h-[calc(100%+12px)]"
            style={{ borderColor: "#fff" }}
          ></span>
          <span
            className="text-xs px-6 py-2 rounded-[10px] font-black absolute top-0 right-3.5 translate-y-[-50%] "
            style={{
              backgroundColor: categoryColor,
              color: "#0A0A0A",
            }}
          >
            {categoryLabels[movement.category].ja}
          </span>
          <div className="px-10 py-8 relative">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-2xl font-bold font-gothic">{movement.name}</h2>
                </div>
                <p className="text-sm mt-0.5 font-black">{movement.nameEn}</p>
                <p className="text-base mt-6 line-clamp-2 leading-relaxed">{movement.oneLiner}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-6">
              <DifficultyDots difficulty={movement.difficulty} color={categoryColor} />
            </div>
          </div>
        </div>
      </div>

      {/* YouTube動画 */}
      <section className="mb-[64px]">
        <div className="aspect-video rounded-xl overflow-hidden bg-black">
          <iframe
            src={`https://www.youtube.com/embed/${movement.videoId}?mute=1`}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        {movement.videoSource && (
          <p className="text-[11px] text-right mt-1 text-gray-400">出典：{movement.videoSource}</p>
        )}
      </section>
      {/* 使う筋肉 */}
      <section className="mb-12">
        <h2 className="text-2xl mb-3 font-gothic font-normal leading-none">使う部位</h2>
        <div
          className="border px-6 py-4 rounded-[12px] border-3"
          style={{
            borderColor: categoryColor,
          }}
        >
          <div className="mb-6">
            <p className="mb-2 font-bold text-[14px]">主動筋</p>
            <div className="flex flex-wrap gap-4">
              {movement.muscleMain.map((muscle) => (
                <span key={muscle} className="leading-none text-[13px] p-[12px] rounded-[10px] bg-white text-black">
                  {muscle}
                </span>
              ))}
            </div>
          </div>
          {movement.muscleSub.length > 0 && (
            <div>
              <p className="mb-2 font-bold text-[14px]">補助筋</p>
              <div className="flex flex-wrap gap-4">
                {movement.muscleSub.map((muscle) => (
                  <span key={muscle} className="leading-none text-[13px] p-[12px] rounded-[10px] bg-white text-black">
                    {muscle}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
      {/* 目的・効果 */}
      <section className="mb-12">
        <h2 className="text-2xl mb-3 font-gothic font-normal leading-none">効果</h2>
        <div
          className="border px-6 py-4 rounded-[12px] border-3"
          style={{
            borderColor: categoryColor,
          }}
        >
          <p className="text-base  mb-4">{movement.purpose}</p>
          <div className="flex flex-wrap gap-4">
            {/* {movement.primaryEffect.map((effect) => (
              <span
                key={effect}
                className="text-[11px] px-2 py-0.5 rounded-full bg-background text-text-primary border border-border font-medium"
              >
                {effect}
              </span>
            ))} */}
            {movement.bodyPart.map((part) => (
              <span key={part} className="leading-none text-[13px] p-[12px] rounded-[10px] bg-white text-black">
                {part}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* やり方 */}
      <section className="mb-12">
        <h2 className="text-2xl mb-3 font-gothic font-normal leading-none">やり方</h2>
        <div
          className="border px-6 py-4 rounded-[12px] border-3"
          style={{
            borderColor: categoryColor,
          }}
        >
          <ol className="space-y-5">
            {movement.steps.map((step, i) => (
              <li key={i} className="text-basic font-black flex gap-4 items-center">
                <span className="font-gothic w-[22px] text-2xl text-white">{i + 1}</span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 注意点 */}
      <section className="mb-6">
        <h2 className="text-2xl mb-3 font-gothic font-normal leading-none">ここに注意</h2>
        <ul className="space-y-3 px-5 py-6 bg-[#262626] rounded-[12px] border-2" style={{ borderColor: categoryColor }}>
          {movement.tips.map((tip, i) => (
            <li key={i} className="font-black  text-basic flex gap-2 list-none">
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
      <SpriteAnimation category={movement.category} />
      <GlobalMenuNav active="種目辞典" />
    </main>
  );
}
