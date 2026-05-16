"use client";

import { useState } from "react";
import { Equipment, ALL_EQUIPMENT } from "@/types/movement";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
};
interface OnboardingEquipmentProps {
  onComplete: (selectedEquipment: Equipment[]) => void;
}

export default function OnboardingEquipment({ onComplete }: OnboardingEquipmentProps) {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [check, setCheck] = useState(false);
  const [selected, setSelected] = useState<Equipment[]>([]);

  const goToStep = (next: number) => {
    setDirection(next > step ? 1 : -1);
    setStep(next);
  };

  const toggleEquipment = (eq: Equipment) => {
    setSelected((prev) => (prev.includes(eq) ? prev.filter((e) => e !== eq) : [...prev, eq]));
  };
  const totalSteps = 4;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-8 py-10">
      <div className="w-full max-w-md relative overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {/* Step 1: ようこそ */}
            {step === 0 && (
              <div className="text-center mb-16">
                <div className="text-5xl mb-6 max-w-[273px]">
                  <Image width={414} height={537} src="/onboarding-char01.png" alt="走るキャラクター" />
                </div>
                <h1 className="text-xs mb-3 px-3 py-2 rounded-lg bg-button w-max mx-auto text-black">
                  本気のやつらのための
                </h1>
                <p className="leading-relaxed text-white font-gothic">
                  <span className="font-gothic text-4xl">CrossFit</span>
                  <br />
                  <span className="text-2xl">種目辞典</span>
                </p>
              </div>
            )}

            {/* Step 2: できること */}
            {step === 1 && (
              <div className="text-center mb-52">
                <h1 className="text-2xl font-bold mb-10 font-gothic text-white">できること</h1>
                <div className="space-y-4 text-left">
                  <div className="flex items-start gap-3 px-10 py-6 rounded-lg border-[5px] bg-gray">
                    <div>
                      <div className="flex gap-x-2  text-2xl mb-4 font-gothic ">
                        <span className="text-xl flex items-center">
                          <svg
                            width="28"
                            height="28"
                            viewBox="0 0 28 28"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M16.3332 11.5498V9.5665C16.9748 9.29428 17.6311 9.09011 18.3019 8.954C18.9728 8.81789 19.6776 8.74984 20.4165 8.74984C20.9221 8.74984 21.4179 8.78873 21.904 8.8665C22.3901 8.94428 22.8665 9.0415 23.3332 9.15817V11.0248C22.8665 10.8498 22.395 10.7186 21.9186 10.6311C21.4422 10.5436 20.9415 10.4998 20.4165 10.4998C19.6776 10.4998 18.9679 10.5922 18.2873 10.7769C17.6068 10.9616 16.9554 11.2193 16.3332 11.5498ZM16.3332 17.9665V15.9832C16.9748 15.7109 17.6311 15.5068 18.3019 15.3707C18.9728 15.2346 19.6776 15.1665 20.4165 15.1665C20.9221 15.1665 21.4179 15.2054 21.904 15.2832C22.3901 15.3609 22.8665 15.4582 23.3332 15.5748V17.4415C22.8665 17.2665 22.395 17.1353 21.9186 17.0478C21.4422 16.9603 20.9415 16.9165 20.4165 16.9165C19.6776 16.9165 18.9679 17.004 18.2873 17.179C17.6068 17.354 16.9554 17.6165 16.3332 17.9665ZM16.3332 14.7582V12.7748C16.9748 12.5026 17.6311 12.2984 18.3019 12.1623C18.9728 12.0262 19.6776 11.9582 20.4165 11.9582C20.9221 11.9582 21.4179 11.9971 21.904 12.0748C22.3901 12.1526 22.8665 12.2498 23.3332 12.3665V14.2332C22.8665 14.0582 22.395 13.9269 21.9186 13.8394C21.4422 13.7519 20.9415 13.7082 20.4165 13.7082C19.6776 13.7082 18.9679 13.8005 18.2873 13.9853C17.6068 14.17 16.9554 14.4276 16.3332 14.7582ZM7.58317 18.6665C8.49706 18.6665 9.38664 18.7686 10.2519 18.9728C11.1172 19.1769 11.9776 19.4832 12.8332 19.8915V8.39984C12.0359 7.93317 11.1901 7.58317 10.2957 7.34984C9.40123 7.1165 8.49706 6.99984 7.58317 6.99984C6.88317 6.99984 6.18803 7.06789 5.49775 7.204C4.80748 7.34011 4.1415 7.54428 3.49984 7.8165V19.3665C4.18039 19.1332 4.85609 18.9582 5.52692 18.8415C6.19775 18.7248 6.88317 18.6665 7.58317 18.6665ZM15.1665 19.8915C16.0221 19.4832 16.8825 19.1769 17.7478 18.9728C18.613 18.7686 19.5026 18.6665 20.4165 18.6665C21.1165 18.6665 21.8019 18.7248 22.4728 18.8415C23.1436 18.9582 23.8193 19.1332 24.4998 19.3665V7.8165C23.8582 7.54428 23.1922 7.34011 22.5019 7.204C21.8116 7.06789 21.1165 6.99984 20.4165 6.99984C19.5026 6.99984 18.5984 7.1165 17.704 7.34984C16.8096 7.58317 15.9637 7.93317 15.1665 8.39984V19.8915ZM13.9998 23.3332C13.0665 22.5943 12.0554 22.0207 10.9665 21.6123C9.87761 21.204 8.74984 20.9998 7.58317 20.9998C6.7665 20.9998 5.96442 21.1068 5.17692 21.3207C4.38942 21.5346 3.63595 21.8359 2.9165 22.2248C2.50817 22.4387 2.11442 22.429 1.73525 22.1957C1.35609 21.9623 1.1665 21.6221 1.1665 21.1748V7.1165C1.1665 6.90261 1.21998 6.69845 1.32692 6.504C1.43387 6.30956 1.59428 6.16373 1.80817 6.0665C2.70262 5.59984 3.63595 5.24984 4.60817 5.0165C5.58039 4.78317 6.57206 4.6665 7.58317 4.6665C8.71095 4.6665 9.81442 4.81234 10.8936 5.104C11.9728 5.39567 13.0082 5.83317 13.9998 6.4165C14.9915 5.83317 16.0269 5.39567 17.1061 5.104C18.1853 4.81234 19.2887 4.6665 20.4165 4.6665C21.4276 4.6665 22.4193 4.78317 23.3915 5.0165C24.3637 5.24984 25.2971 5.59984 26.1915 6.0665C26.4054 6.16373 26.5658 6.30956 26.6728 6.504C26.7797 6.69845 26.8332 6.90261 26.8332 7.1165V21.1748C26.8332 21.6221 26.6436 21.9623 26.2644 22.1957C25.8853 22.429 25.4915 22.4387 25.0832 22.2248C24.3637 21.8359 23.6103 21.5346 22.8228 21.3207C22.0353 21.1068 21.2332 20.9998 20.4165 20.9998C19.2498 20.9998 18.1221 21.204 17.0332 21.6123C15.9443 22.0207 14.9332 22.5943 13.9998 23.3332Z"
                              fill="#E3E3E3"
                            />
                          </svg>
                        </span>
                        <p className="font-medium text-text-primary">種目辞典</p>
                      </div>
                      <p className="">20種目のやり方・ポイントを確認</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 px-10 py-6 rounded-lg border-[5px] bg-gray">
                    <div>
                      <div className="flex gap-x-2 text-2xl mb-4">
                        <span className="text-xl items-center">
                          <svg
                            width="28"
                            height="28"
                            viewBox="0 0 28 28"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M10.1646 19.4979C10.3882 19.2743 10.5 18.9972 10.5 18.6667C10.5 18.3361 10.3882 18.059 10.1646 17.8354C9.94097 17.6118 9.66389 17.5 9.33333 17.5C9.00278 17.5 8.72569 17.6118 8.50208 17.8354C8.27847 18.059 8.16667 18.3361 8.16667 18.6667C8.16667 18.9972 8.27847 19.2743 8.50208 19.4979C8.72569 19.7215 9.00278 19.8333 9.33333 19.8333C9.66389 19.8333 9.94097 19.7215 10.1646 19.4979ZM10.1646 14.8313C10.3882 14.6076 10.5 14.3306 10.5 14C10.5 13.6694 10.3882 13.3924 10.1646 13.1687C9.94097 12.9451 9.66389 12.8333 9.33333 12.8333C9.00278 12.8333 8.72569 12.9451 8.50208 13.1687C8.27847 13.3924 8.16667 13.6694 8.16667 14C8.16667 14.3306 8.27847 14.6076 8.50208 14.8313C8.72569 15.0549 9.00278 15.1667 9.33333 15.1667C9.66389 15.1667 9.94097 15.0549 10.1646 14.8313ZM10.1646 10.1646C10.3882 9.94097 10.5 9.66389 10.5 9.33333C10.5 9.00278 10.3882 8.72569 10.1646 8.50208C9.94097 8.27847 9.66389 8.16667 9.33333 8.16667C9.00278 8.16667 8.72569 8.27847 8.50208 8.50208C8.27847 8.72569 8.16667 9.00278 8.16667 9.33333C8.16667 9.66389 8.27847 9.94097 8.50208 10.1646C8.72569 10.3882 9.00278 10.5 9.33333 10.5C9.66389 10.5 9.94097 10.3882 10.1646 10.1646ZM12.8333 19.8333H19.8333V17.5H12.8333V19.8333ZM12.8333 15.1667H19.8333V12.8333H12.8333V15.1667ZM12.8333 10.5H19.8333V8.16667H12.8333V10.5ZM5.83333 24.5C5.19167 24.5 4.64236 24.2715 4.18542 23.8146C3.72847 23.3576 3.5 22.8083 3.5 22.1667V5.83333C3.5 5.19167 3.72847 4.64236 4.18542 4.18542C4.64236 3.72847 5.19167 3.5 5.83333 3.5H22.1667C22.8083 3.5 23.3576 3.72847 23.8146 4.18542C24.2715 4.64236 24.5 5.19167 24.5 5.83333V22.1667C24.5 22.8083 24.2715 23.3576 23.8146 23.8146C23.3576 24.2715 22.8083 24.5 22.1667 24.5H5.83333ZM5.83333 22.1667H22.1667V5.83333H5.83333V22.1667Z"
                              fill="#E3E3E3"
                            />
                          </svg>
                        </span>
                        <p className="font-medium text-text-primary font-gothic">
                          WOD
                          <br />
                          テンプレート
                        </p>
                      </div>
                      <p className="text-white">今日のメニューをフォーマット別・目的別に調べる</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: 使える設備は？ */}
            {step === 2 && (
              <div>
                <div className="text-center mb-6">
                  <h1 className="text-4xl font-bold text-text-primary mb-6 font-gothic">使える設備は？</h1>
                  <p className="text-left">チェックした設備に合わせて、種目・メニューを表示します。</p>
                </div>
                <div className="flex flex-col gap-y-2 mb-11">
                  {ALL_EQUIPMENT.map((eq) => {
                    const isSelected = selected.includes(eq);
                    return (
                      <button
                        key={eq}
                        onClick={() => toggleEquipment(eq)}
                        className={`bg-gray w-full flex items-center gap-3 p-4 rounded-xl transition-all cursor-pointer ${
                          isSelected
                            ? "border-border bg-border/10 text-green"
                            : "border-border  hover:border-text-secondary"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${
                            isSelected ? "bg-button border-border " : "border-text-secondary"
                          }`}
                        >
                          {isSelected && (
                            <svg
                              className="w-3 h-3 text-background"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={3}
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <span className={`text-sm font-medium ${isSelected ? "text-green" : "text-white"}`}>{eq}</span>
                      </button>
                    );
                  })}
                </div>
                <div className="text-center mb-11">
                  <button
                    onClick={() => {
                      setSelected([...ALL_EQUIPMENT]);
                      goToStep(step + 1);
                    }}
                    className="w-max m-auto p-2 font-bold text-center text-sm rounded-xl border-1 border-white cursor-pointer hover:opacity-80 transition-opacity"
                  >
                    スキップ（全項目を表示）
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: ご確認ください */}
            {step === 3 && (
              <div className="mb-3">
                <div className="text-center mb-8">
                  <h1 className="text-4xl font-bold text-text-primary mb-6 font-gothic">ご確認ください</h1>
                </div>
                <div className="flex flex-col gap-y-4">
                  <article className="bg-gray px-7 py-6 rounded-xl font-bold">
                    <h3 className="text-xl mb-4">安全について</h3>
                    <p className="text-[14px]">
                      掲載のトレーニングは身体への負荷が高い内容を含みます。持病・既往症のある方は開始前に医師へご相談ください。
                    </p>
                  </article>
                  <article className="bg-gray px-7 py-6 rounded-xl font-bold">
                    <h3 className="text-xl mb-4">免責事項</h3>
                    <p className="text-[14px]">
                      アプリの情報をもとにした怪我・体調不良について制作者は責任を負いかねます。重量・強度は必ずご自身のレベルに合わせてください。
                    </p>
                  </article>
                  <article className="bg-gray px-7 py-6 rounded-xl font-bold">
                    <h3 className="text-xl mb-4">コンテンツについて</h3>
                    <p className="text-[14px]">
                      参考動画は外部サービス（YouTube）のコンテンツです。掲載情報は認定コーチによる個別指導の代替ではありません。
                    </p>
                  </article>
                </div>
                <label className="mb-10 flex items-center gap-3 cursor-pointer mt-4 justify-center">
                  <button
                    onClick={() => setCheck((prev) => !prev)}
                    type="button"
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${check ? "bg-button border-border" : "border-text-secondary"}`}
                  >
                    {check && (
                      <svg
                        className="w-3 h-3 text-background"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                  <span className="text-sm text-white">上記の内容を確認しました。</span>
                </label>
                <p className="text-center text-[12px]">＊チェックを入れると進めます</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Step 2 キャラクター（アニメーション外で固定配置） */}
        <AnimatePresence>
          {step === 1 && (
            <motion.div
              className="max-w-[138px] absolute bottom-[82px] right-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Image width={276} height={418} src="/onboarding-char02.png" alt="走るキャラクター" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ナビゲーションボタン */}
        <div className="flex flex-col  gap-3">
          {step === 0 && (
            <button
              onClick={() => goToStep(1)}
              className="flex-1 py-3 rounded-xl bg-button text-background font-bold text-base transition-opacity hover:opacity-90 cursor-pointer"
            >
              はじめる
            </button>
          )}
          {step > 0 && step < totalSteps - 1 && (
            <>
              <button
                onClick={() => goToStep(step + 1)}
                className="flex-1 py-3 rounded-xl bg-button text-background font-bold text-base transition-opacity hover:opacity-90 cursor-pointer"
              >
                次へ
              </button>
              {step >= 2 && (
                <button className="block text-left text-[14px]" onClick={() => goToStep(step - 1)}>
                  ← 戻る
                </button>
              )}
            </>
          )}
          {step === totalSteps - 1 && (
            <>
              <button
                onClick={() => onComplete(selected)}
                disabled={!check}
                className={`flex-1 py-3 rounded-xl font-bold text-base transition-opacity ${check ? "bg-button text-background hover:opacity-90 cursor-pointer" : "bg-[#181818] text-[#414141] cursor-not-allowed"}`}
              >
                同意してはじめる
              </button>
              <button className="block text-left text-[14px]" onClick={() => goToStep(step - 1)}>
                ← 戻る
              </button>
            </>
          )}
        </div>
        {/* プログレスドット */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition-colors ${i === step ? "bg-button w-5" : "border border-[#F1FE7D]"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
