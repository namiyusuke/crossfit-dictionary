import { getAllWods, getWodById } from "@/lib/data/wods";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MOODS } from "@/data/wods";
import Link from "next/link";
import WodTimerLauncher from "@/components/timer/WodTimerLauncher";
import Image from "next/image";
import ScrollComment from "@/components/ScrollComment";
import GlobalMenuNav from "@/components/GlobalMenuNav";
import MoodBackLink from "./MoodBackLink";
import RxHelpButton from "./RxHelpButton";
import WodPageHeader from "./WodPageHeader";
type Props = {
  params: Promise<{ id: string }>;
};
export async function generateStaticParams() {
  const wods = await getAllWods();
  return wods.map((wod) => ({
    id: wod.id,
  }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const wod = await getWodById(id);
  return {
    title: wod?.name,
  };
}
export default async function WodPage({ params }: Props) {
  const { id } = await params;

  const wod = await getWodById(id);

  if (!wod) {
    notFound();
  }
  const comment = {
    AMRAP: "No Repは許さねぇ!",
    ForTime: "スケールなし、言い訳なし！",
    EMOM: "レストは自分で勝ち取れ！",
  };
  // このWODに該当する気分を探す
  const matchingMoods = MOODS.filter((m) => m.filter(wod));
  return (
    <>
      <WodPageHeader />
      {/* フレーム枠 */}
      <div className="inset-0 pointer-events-none mx-auto w-[375px] fixed z-3000 before:absolute before:left-0 md:before:rounded-[24px] before:right-0 before:inset-y-0 before:border before:border-[#939393] before:border-3 before:content-[''] hidden md:block"></div>
      {/* 角丸マスク（4隅のみ） */}
      <div className="fixed inset-0 pointer-events-none mx-auto w-[375px] z-2000 hidden md:block rounded-[24px]">
        <div
          className="absolute top-0 left-0 w-6 h-6"
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
      <div className="mx-auto px-4 py-40 pb-[170px] bg-[#414141] overflow-clip">
        <MoodBackLink className="mb-10 text-white text-[12px] block">＜　戻る</MoodBackLink>
        {/* ヘッダー */}
        {/* <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-4xl text-text-primary font-gothic mb-3">WOD</h1>
          <p className="text-sm mt-1 font-black">今日のメニューを選ぼう</p>
        </div>
      </div> */}
        {/* セクション切り替えタブ */}
        {/* <div className="flex gap-1 mb-4">
        <Link href="/" className="flex-1 py-2.5 rounded-lg text-base text-center text-green border transition-all">
          種目辞典
        </Link>
        <span className="flex-1 py-2.5 rounded-lg text-base text-center text-black bg-button relative">
          WOD
          <span className="bg-white -z-10 absolute w-full h-full rounded-[inherit] block right-[-4px] top-[4px]"></span>
        </span>
      </div> */}

        <div className="mb-6">
          <p className="font-gothic text-base mb-4">選んだWOD</p>
          {/* 気分バッジ */}
          <div className="flex flex-wrap gap-2">
            {matchingMoods.map((mood) => (
              <span key={mood.id} className="px-2 py-0.5 rounded-[10px] bg-white text-black font-black text-[15px]">
                {mood.label}
              </span>
            ))}
          </div>
        </div>
        <div className="mb-10 text-right">
          {/* 一覧に戻る */}
          <Link
            href="/?section=WOD"
            className="cursor-pointer text-black bg-green text-[12px] leading-none font-black py-[6px] px-4 rounded-2xl"
          >
            気分を変える
          </Link>
        </div>
        <div className="mt-4 space-y-3">
          <div className="flex gap-2 text-[14px] items-center font-black">
            <span className="px-2 py-0.5 rounded-[10px] bg-white text-black">{wod.format}</span>
            <span className="px-2 py-0.5 rounded-[10px] bg-white text-black">{wod.duration}</span>
            <span className=" text-white">{wod.level}</span>
          </div>
          <div className="mb-10">
            <h1 className="font-gothic text-4xl text-green mb-4">{wod.name}</h1>
            <p className="text-base">{wod.goal}</p>
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
          <div className="text-2xl font-bold mb-2 font-gothic flex gap-2">
            <span>RX</span>
            <RxHelpButton />
          </div>
          <div className="mt-4 rounded-lg p-6 space-y-6 border border-white border-3">
            <p className="text-green mb-8 text-[24px]">RX CONDITIONS</p>
            {wod.sets
              .flatMap((set) => set.movements)
              .filter((mov) => mov.rx)
              .map((mov, i) => (
                <div key={i} className="flex text-base leading-[1.4] font-bold l">
                  <span className="w-32 block min-w-32">{mov.name}</span>：<span className="block w-max">{mov.rx}</span>
                </div>
              ))}
          </div>
        </div>
        <div className="mt-16">
          <p className="text-2xl font-bold mb-2 font-gothic">種目リスト</p>
          {wod.sets.map((set, i) => (
            <div key={i}>
              <ul className="space-y-6">
                {set.movements.map((mov, j) => (
                  <li key={j} className="flex gap-6 rounded-lg p-6 border border-white border-3">
                    <Link className="flex gap-6" href={`/movement/${mov.movementId}`}>
                      <div
                        className={`font-gothic font-normal text-[48px] text-[#262626] [text-stroke:2px_white] [-webkit-text-stroke:2px_white] leading-none`}
                      >{`0${j + 1}`}</div>
                      <div className="">
                        <p className="font-gothic text-white text-[24px] mb-3.5 leading-none">{mov.name}</p>
                        <p className="font-gothic text-green text-[24px] leading-none">{mov.reps}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16">
          {/* 目安 */}
          <p className="text-2xl font-bold mb-4 font-gothic">
            {wod.format === "AMRAP" ? "ラウンド目安" : "タイム目安"}
          </p>
          <div className="mt-4 rounded-lg p-4 px-10 space-y-2 bg-gray border-2 border-white">
            <div className="space-y-3.5 font-bold">
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
        {/* 画像 */}
        <div className="pt-32 pb-10 my-10 bg-[#414141] relative">
          <ScrollComment text={comment[wod.format]} />
          <Image className="mx-auto" width={240} height={334} src={`/${wod.format}.webp`} alt="走るキャラクター" />
        </div>
        {/* ワンポイントアドバイス */}
        <div className="mt-4 rounded-lg p-4 bg-[#262626] leading-[1.8]">
          <p className="">{wod.tip}</p>
        </div>
        {/* きょうはこれをやる！ */}
        <div className="text-center mt-16">
          <WodTimerLauncher wod={wod} />
        </div>
        <div className="text-right mt-9">
          {/* <div className="">
            <MoodBackLink className="text-green font-black text-[14px]">WODトップに戻る</MoodBackLink>
          </div>
          <div className="mt-8">
            <Link href="/?section=WOD" className="text-green font-black text-[14px]">
              気分を変える
            </Link>
          </div> */}
        </div>
        <GlobalMenuNav active="WOD" />
      </div>
    </>
  );
}
