"use client";
import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { WodFormat } from "@/types/wod";
import Link from "next/link";
import SpriteAnimation from "@/app/movement/[id]/SpriteAnimation";
import BackButton from "../BackButton";
import GlobalMenuNav from "../GlobalMenuNav";
import WodPageHeader from "@/app/wod/[id]/WodPageHeader";
export interface TimerResult {
  format: WodFormat;
  wodName: string;
  elapsedSeconds: number;
  rounds?: number;
  extraReps?: number;
  completedMinutes?: number;
}

interface CompletionScreenProps {
  result: TimerResult;
  formatColor: string;
  onClose: () => void;
}

const STAR_COUNT = 5;

function generateStars() {
  return Array.from({ length: STAR_COUNT }, (_, i) => {
    // 左端(0~20%)か右端(80~100%)にランダム配置して中央を避ける
    const left = Math.random() < 0.5 ? Math.random() * 20 : 80 + Math.random() * 20;
    return {
      id: i,
      top: `${Math.random() * 90}%`,
      left: `${left}%`,
      delay: Math.random() * 1.5,
    };
  });
}

function CompletionScreenA({ result, formatColor, onClose }: CompletionScreenProps) {
  const [showResultModal, setShowResultModal] = useState(false);
  const stars = useMemo(() => generateStars(), []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowResultModal(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <WodPageHeader />
      {/* フレーム枠 */}
      <div className="inset-0 pointer-events-none mx-auto w-[375px] fixed z-3000 before:absolute before:left-0 md:before:rounded-[24px] before:right-0 before:inset-y-0 before:border before:border-[#939393] before:border-3 before:content-[''] hidden md:block"></div>
      {/* 角丸マスク（4隅のみ） */}
      <div className="fixed inset-0 pointer-events-none mx-auto w-[375px] z-2000 hidden md:block rounded-[24px]">
        <div className="absolute top-0 left-0 w-6 h-6" style={{ background: "radial-gradient(circle at 100% 100%, transparent 23px, #262626 24px)" }} />
        <div className="absolute top-0 right-0 w-6 h-6" style={{ background: "radial-gradient(circle at 0% 100%, transparent 23px, #262626 24px)" }} />
        <div className="absolute bottom-0 left-0 w-6 h-6" style={{ background: "radial-gradient(circle at 100% 0%, transparent 23px, #262626 24px)" }} />
        <div className="absolute bottom-0 right-0 w-6 h-6" style={{ background: "radial-gradient(circle at 0% 0%, transparent 23px, #262626 24px)" }} />
      </div>
      <div className="fixed inset-0 pt-[130px] z-50 flex flex-col items-center bg-[#553EEC] px-6 overflow-y-auto  z-50 flex flex-col md:max-w-[375px] md:mx-auto z-20 min-h-screen">
        <div className="text-left w-full text-green  mb-8">
          {/* 戻るボタン */}
          <BackButton label="戻る" />
        </div>
        {stars.map((star) => (
          <motion.div
            key={star.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: star.delay, duration: 0.5, ease: "easeOut" }}
            className="absolute pointer-events-none"
            style={{
              top: star.top,
              left: star.left,
            }}
          >
            <Image width={22} height={25} src="/star.svg" alt="" />
          </motion.div>
        ))}
        {/* COMPLETE! テキスト */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-center"
        >
          <div className="relative leading-normal">
            <p className="font-gothic relative z-10 text-[40px] mb-1 text-green">COMPLETE</p>
            <p className="font-gothic absolute z-0 text-[40px] top-[5px] mb-1 right-[-5px]  text-[#414141] whitespace-nowrap">
              COMPLETE
            </p>
          </div>
          <p className="font-gothic text-[20px] text-white leading-normal">おつかれさまでした</p>
        </motion.div>
        <div className="mt-[10px]">
          <SpriteAnimation
            category={"end"}
            className="w-[min(calc(200_/_375_*_100vw),200px)]"
            interval={1000}
            delay={0}
          />
        </div>

        {/* 結果モーダル */}
        <AnimatePresence>
          {showResultModal && (
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 60 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="absolute bottom-0 left-0 right-0 rounded-t-2xl px-6 pt-8 pb-10"
            ></motion.div>
          )}
        </AnimatePresence>
      </div>
      <GlobalMenuNav active="WOD" />
    </>
  );
}

function CompletionScreenB({ result, formatColor, onClose }: CompletionScreenProps) {
  const [showResultModal, setShowResultModal] = useState(false);
  const stars = useMemo(() => generateStars(), []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowResultModal(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <WodPageHeader />
      {/* フレーム枠 */}
      <div className="inset-0 pointer-events-none mx-auto w-[375px] fixed z-3000 before:absolute before:left-0 md:before:rounded-[24px] before:right-0 before:inset-y-0 before:border before:border-[#939393] before:border-3 before:content-[''] hidden md:block"></div>
      {/* 角丸マスク（4隅のみ） */}
      <div className="fixed inset-0 pointer-events-none mx-auto w-[375px] z-2000 hidden md:block rounded-[24px]">
        <div className="absolute top-0 left-0 w-6 h-6" style={{ background: "radial-gradient(circle at 100% 100%, transparent 23px, #262626 24px)" }} />
        <div className="absolute top-0 right-0 w-6 h-6" style={{ background: "radial-gradient(circle at 0% 100%, transparent 23px, #262626 24px)" }} />
        <div className="absolute bottom-0 left-0 w-6 h-6" style={{ background: "radial-gradient(circle at 100% 0%, transparent 23px, #262626 24px)" }} />
        <div className="absolute bottom-0 right-0 w-6 h-6" style={{ background: "radial-gradient(circle at 0% 0%, transparent 23px, #262626 24px)" }} />
      </div>
      <div className="fixed inset-0 pt-[130px] z-50 flex flex-col items-center bg-[#553EEC] px-6 overflow-y-auto  z-50 flex flex-col md:max-w-[375px] overflow-clip md:mx-auto z-20 min-h-screen">
        <div className="text-left w-full text-green mb-8">
          {/* 戻るボタン */}
          <BackButton label="戻る" />
        </div>
        {stars.map((star) => (
          <motion.div
            key={star.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: star.delay, duration: 0.5, ease: "easeOut" }}
            className="absolute pointer-events-none"
            style={{
              top: star.top,
              left: star.left,
            }}
          >
            <Image width={22} height={25} src="/star.svg" alt="" />
          </motion.div>
        ))}
        {/* COMPLETE! テキスト */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-center rotate-[10.41deg] relative font-normal"
        >
          <p className="font-gothic relative z-10 text-[110px] mb-3 text-green whitespace-nowrap leading-none">
            達成感
          </p>
          <p className="font-gothic absolute z-0 text-[110px] top-[10px] right-[-10px] mb-3 text-[#414141] whitespace-nowrap leading-none">
            達成感
          </p>
        </motion.div>
        <div className="mt-[0px]">
          <SpriteAnimation
            category={"end"}
            className="w-[min(calc(200_/_375_*_100vw),200px)]"
            interval={1000}
            delay={0}
          />
        </div>

        {/* 結果モーダル */}
        <AnimatePresence>
          {showResultModal && (
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 60 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="absolute bottom-0 left-0 right-0 rounded-t-2xl px-6 pt-8 pb-10"
            ></motion.div>
          )}
        </AnimatePresence>
      </div>
      <GlobalMenuNav active="WOD" />
    </>
  );
}

export default function CompletionScreen(props: CompletionScreenProps) {
  // マウント時に一度だけランダムで画面を選択
  const variant = useMemo(() => (Math.random() < 0.5 ? "A" : "B"), []);

  if (variant === "A") {
    return <CompletionScreenA {...props} />;
  }
  return <CompletionScreenB {...props} />;
}
