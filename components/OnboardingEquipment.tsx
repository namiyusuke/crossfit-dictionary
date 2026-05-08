"use client";

import { useState } from "react";
import { Equipment, ALL_EQUIPMENT } from "@/types/movement";

interface OnboardingEquipmentProps {
  onComplete: (selectedEquipment: Equipment[]) => void;
}

export default function OnboardingEquipment({ onComplete }: OnboardingEquipmentProps) {
  const [step, setStep] = useState(0);
  const [check, setCheck] = useState(false);
  const [selected, setSelected] = useState<Equipment[]>([]);

  const toggleEquipment = (eq: Equipment) => {
    setSelected((prev) => (prev.includes(eq) ? prev.filter((e) => e !== eq) : [...prev, eq]));
  };
  const totalSteps = 4;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-10">
      <div className="w-full max-w-md">
        {/* Step 1: ようこそ */}
        {step === 0 && (
          <div className="text-center">
            <div className="text-5xl mb-6">💪</div>
            <h1 className="text-xs text-text-primary mb-3 px-3 py-2 rounded-lg bg-button w-max mx-auto font-black">
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
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-10 font-gothic text-white">できること</h1>
            <div className="space-y-4 text-left">
              <div className="flex items-start gap-3 px-10 py-6 rounded-lg border border-border">
                <div>
                  <div className="flex gap-x-2  text-2xl mb-4 font-gothic">
                    <span className="text-xl">📖</span>
                    <p className="font-medium text-text-primary">種目辞典</p>
                  </div>
                  <p className="text-text-secondary">20種目のやり方・ポイントを確認</p>
                </div>
              </div>
              <div className="flex items-start gap-3 px-10 py-6 rounded-lg border border-border">
                <div>
                  <div className="flex gap-x-2 text-2xl mb-4">
                    <span className="text-xl">📖</span>
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
            <div className="flex flex-col gap-y-2">
              {ALL_EQUIPMENT.map((eq) => {
                const isSelected = selected.includes(eq);
                return (
                  <button
                    key={eq}
                    onClick={() => toggleEquipment(eq)}
                    className={`bg-gray w-full flex items-center gap-3 p-4 rounded-xl transition-all cursor-pointer ${
                      isSelected
                        ? "border-border bg-border/10"
                        : "border-border text-text-secondary hover:border-text-secondary"
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
                    <span className="text-sm font-medium text-white">{eq}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 4: ご確認ください */}
        {step === 3 && (
          <div>
            <div className="text-center mb-6">
              <h1 className="text-4xl font-bold text-text-primary mb-6 font-gothic">ご確認ください</h1>
              <p className="text-left">チェックした設備に合わせて、種目・メニューを表示します。</p>
            </div>
            <div className="flex flex-col gap-y-4">
              <article className="bg-gray px-7 py-6 rounded-xl font-bold">
                <h3 className="text-xl mb-4">安全について</h3>
                <p className="text-[14px]">
                  掲載のトレーニングは身体への負荷が高い内容を含みます。持病・既往症のある方は開始前に医師へご相談ください。
                </p>
              </article>
              <article className="bg-gray px-7 py-6 rounded-xl font-bold">
                <h3 className="text-xl mb-4">安全について</h3>
                <p className="text-[14px]">
                  掲載のトレーニングは身体への負荷が高い内容を含みます。持病・既往症のある方は開始前に医師へご相談ください。
                </p>
              </article>
              <article className="bg-gray px-7 py-6 rounded-xl font-bold">
                <h3 className="text-xl mb-4">安全について</h3>
                <p className="text-[14px]">
                  掲載のトレーニングは身体への負荷が高い内容を含みます。持病・既往症のある方は開始前に医師へご相談ください。
                </p>
              </article>
            </div>
            <label className="flex items-center gap-3 cursor-pointer mt-4 justify-center">
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
          </div>
        )}

        {/* ナビゲーションボタン */}
        <div className="mt-8 flex gap-3">
          {step === 0 && (
            <button
              onClick={() => setStep(1)}
              className="flex-1 py-3 rounded-xl bg-button text-background font-bold text-base transition-opacity hover:opacity-90 cursor-pointer"
            >
              はじめる
            </button>
          )}
          {step > 0 && step < totalSteps - 1 && (
            <button
              onClick={() => setStep(step + 1)}
              className="flex-1 py-3 rounded-xl bg-button text-background font-bold text-base transition-opacity hover:opacity-90 cursor-pointer"
            >
              次へ
            </button>
          )}
          {step === totalSteps - 1 && (
            <button
              onClick={() => onComplete(selected)}
              disabled={!check}
              className={`flex-1 py-3 rounded-xl bg-button text-background font-bold text-base transition-opacity ${check ? "hover:opacity-90 cursor-pointer" : "opacity-30 cursor-not-allowed"}`}
            >
              最後
            </button>
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
