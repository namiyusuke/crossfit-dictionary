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
      <Link href={`/?section=WOD${mood ? `&mood=${mood}` : ""}`} className="mb-3 text-white text-[12px] block">
        ＜　wod / 今日のメニューを選ぼう
      </Link>
      {/* ヘッダー */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-4xl text-text-primary font-gothic mb-3">WOD</h1>
          <p className="text-sm mt-1 font-black">今日のメニューを選ぼう</p>
        </div>
      </div>
      {/* セクション切り替えタブ */}
      <div className="flex gap-1 mb-4">
        <Link
          href="/"
          className="flex-1 py-2.5 rounded-lg text-base text-center text-green border hover:text-text-primary transition-all"
        >
          種目辞典
        </Link>
        <span className="flex-1 py-2.5 rounded-lg text-base text-center text-black bg-button relative">
          WOD
          <span className="bg-white -z-10 absolute w-full h-full rounded-[inherit] block right-[-4px] top-[4px]"></span>
        </span>
      </div>
      <div className="mt-8 mb-10 text-right">
        {/* 一覧に戻る */}
        <Link href="/?section=WOD" className="text-green font-black text-[14px]">
          気分を変える
        </Link>
      </div>
      <div className="mb-16">
        <p className="font-gothic text-2xl mb-4">選んだWOD</p>
        {/* 気分バッジ */}
        <div className="flex flex-wrap gap-2">
          {matchingMoods.map((mood) => (
            <span key={mood.id} className="px-2 py-0.5 rounded-[10px] bg-card-bg text-black">
              {mood.label}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-4 space-y-3">
        <div className="flex gap-2 text-sm">
          <span className="px-2 py-0.5 rounded-[10px] bg-card-bg text-black">{wod.format}</span>
          <span className="px-2 py-0.5 rounded-[10px] bg-card-bg text-black">{wod.level}</span>
          <span className="px-2 py-0.5 rounded-[10px] bg-card-bg text-black">{wod.duration}</span>
        </div>
        <div className="mb-10">
          <h1 className="font-gothic text-4xl text-green">{wod.name}</h1>
          <p className="text-sm">{wod.goal}</p>
        </div>
        <div className="">
          <div className="">
            <p className="mb-3">対象部位</p>
            <div className="flex gap-6">
              {wod.targetBodyPart.map((part) => (
                <span key={part} className="p-2 rounded-[10px] text-[13px] border  border-white">
                  {part}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-6">
            <p className="mb-3">主な効果</p>
            <div className="flex gap-6">
              {wod.targetEffect.map((effect) => (
                <span key={effect} className="p-2 rounded-[10px] text-[13px] border border-white">
                  {effect}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-20">
        {/* RX（規定） */}
        <p className="text-2xl font-bold mb-2 font-gothic">RX（規定）</p>
        <div className="mt-4 rounded-lg py-4 px-6 space-y-1 bg-gray">
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
            <ul className="space-y-4">
              {set.movements.map((mov, j) => (
                <li key={j} className="flex gap-6 rounded-lg p-4 bg-gray">
                  <div
                    className={`font-gothic text-5xl ${j === 0 ? "text-[#DB6C66]" : j === 1 ? "text-[#553EEC]" : "text-accent-green"}`}
                  >{`0${j + 1}`}</div>
                  <div className="">
                    <p className="font-gothic text-green text-2xl">{mov.name}</p>
                    <p className="font-gothic">{mov.reps}</p>
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
      <div className="text-right mt-9">
        <div className="">
          {/* 一覧に戻る */}
          <Link href={`/?section=WOD${mood ? `&mood=${mood}` : ""}`} className="text-green font-black text-[14px]">
            一覧に戻る
          </Link>
        </div>
        <div className="mt-8">
          {/* 一覧に戻る */}
          <Link href="/?section=WOD" className="text-green font-black text-[14px]">
            気分を変える
          </Link>
        </div>
      </div>
    </div>
  );
}
