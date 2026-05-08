import { wods } from "@/data/wods";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MOODS } from "@/data/wods";
import Link from "next/link";
import WodTimerLauncher from "@/components/timer/WodTimerLauncher";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ mood?: string }>;
};
export async function generateStaticParams() {
  return wods.map((wod) => ({
    id: wod.id,
  }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const wod = wods.find((m) => m.id === id);
  return {
    title: wod?.name,
  };
}
export default async function WodPage({ params, searchParams }: Props) {
  const { id } = await params;
  const { mood } = await searchParams;

  const wod = wods.find((m) => m.id === id);

  if (!wod) {
    notFound();
  }

  // このWODに該当する気分を探す
  const matchingMoods = MOODS.filter((m) => m.filter(wod));
  return (
    <div className="mx-auto px-4 py-6">
      {/* セクション切り替えタブ */}
      <div className="flex gap-1 mb-4">
        <Link
          href="/"
          className="flex-1 py-2.5 rounded-lg text-sm font-medium text-center bg-gray text-text-secondary hover:text-text-primary transition-all"
        >
          種目辞典
        </Link>
        <span className="flex-1 py-2.5 rounded-lg text-sm font-medium text-center bg-button text-background">WOD</span>
      </div>
      <p className="font-gothic text-2xl mb-4">選んだWOD</p>
      {/* 気分バッジ */}
      <div className="flex flex-wrap gap-2">
        {matchingMoods.map((mood) => (
          <span
            key={mood.id}
            className="px-3 py-1 rounded-full text-xs font-medium border border-border bg-card-bg text-text-secondary"
          >
            {mood.label}
          </span>
        ))}
      </div>
      <div className="mt-4 space-y-3">
        <h1 className="font-gothic text-xl font-bold">{wod.name}</h1>
        <div className="flex gap-2 text-sm">
          <span className="px-2 py-0.5 rounded bg-card-bg border border-border">{wod.format}</span>
          <span className="px-2 py-0.5 rounded bg-card-bg border border-border">{wod.level}</span>
          <span className="px-2 py-0.5 rounded bg-card-bg border border-border">{wod.duration}</span>
        </div>
        <p className="text-sm text-text-secondary">{wod.goal}</p>
        <div className="flex flex-wrap gap-1">
          {wod.targetBodyPart.map((part) => (
            <span key={part} className="px-2 py-0.5 rounded-full text-xs bg-card-bg border border-border">
              {part}
            </span>
          ))}
          {wod.targetEffect.map((effect) => (
            <span key={effect} className="px-2 py-0.5 rounded-full text-xs bg-card-bg border border-border">
              {effect}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-20">
        {/* RX（規定） */}
        <p className="text-2xl font-bold mb-2 font-gothic">RX（規定）</p>
        <div className="mt-4 rounded-lg py-4 px-10 space-y-1 bg-gray">
          <p className="text-green mb-8">RX CONDITIONS</p>
          {wod.sets
            .flatMap((set) => set.movements)
            .filter((mov) => mov.rx)
            .map((mov, i) => (
              <div key={i} className="flex text-sm">
                <span>{mov.name}</span>：<span className="">{mov.rx}</span>
              </div>
            ))}
        </div>
      </div>
      <div className="mt-16">
        <p className="text-2xl font-bold mb-2 font-gothic">種目リスト</p>
        {wod.sets.map((set, i) => (
          <div key={i}>
            {set.label && <p className="text-sm font-bold mb-1">{set.label}</p>}
            <ul className="space-y-1">
              {set.movements.map((mov, j) => (
                <li key={j} className="flex gap-6 border border-border rounded-lg p-4">
                  <div className="font-gothic text-accent-green text-2xl">{`0${j + 1}`}</div>
                  <div className="">
                    <p className="font-gothic text-green">{mov.name}</p>
                    <p className="font-gothic">{mov.reps}</p>
                    {mov.rx && <p className="text-xs text-text-secondary mt-1">RX: {mov.rx}</p>}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-16">
        {/* 目安 */}
        <p className="text-2xl font-bold mb-2 font-gothic">{wod.format === "AMRAP" ? "ラウンド目安" : "タイム目安"}</p>
        <div className="mt-4  rounded-lg p-4 space-y-2 bg-gray">
          <div className="">
            <div className="flex">
              <p className="">初心者：</p>
              <p>{wod.estimate.beginner}</p>
            </div>
            <div className="flex">
              <p className="">RX：</p>
              <p>{wod.estimate.rx}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ワンポイントアドバイス */}
      <div className="mt-4 rounded-lg p-4 bg-gray">
        <p className="">{wod.tip}</p>
      </div>
      {/* きょうはこれをやる！ */}
      <div className="text-center mt-16">
        <WodTimerLauncher wod={wod} />
      </div>
      {/* 一覧に戻る */}
      <Link href={`/?section=WOD${mood ? `&mood=${mood}` : ""}`} className="text-green">
        一覧に戻る
      </Link>
    </div>
  );
}
