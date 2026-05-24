"use client";
import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { WodFormat } from "@/types/wod";
import Link from "next/link";
import SpriteAnimation from "@/app/movement/[id]/SpriteAnimation";
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
    <div className="fixed inset-0 pt-[123px] z-50 flex flex-col items-center bg-[#553EEC] px-6 overflow-y-auto  z-50 flex flex-col md:max-w-[375px] md:mx-auto z-20 min-h-screen">
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
        <div className="relative">
          <p className="font-gothic relative z-10 text-[40px] mb-6 text-green">COMPLETE</p>
          <p className="font-gothic absolute z-0 text-[40px] top-[5px] right-[-5px] mb-6 text-[#414141] whitespace-nowrap">
            COMPLETE
          </p>
        </div>
        <p className="font-gothic text-[20px] text-white">おつかれさまでした</p>
      </motion.div>
      <div className="mt-[83px]">
        <SpriteAnimation
          category={"end"}
          className="w-[min(calc(278_/_375_*_100vw),278px)]"
          interval={1000}
          delay={0}
        />
      </div>
      <div className="text-right w-full text-green mt-[33px] mb-10">
        <p>
          <Link href="/">WODトップに戻る</Link>
        </p>
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
    <div className="fixed inset-0 pt-[123px] z-50 flex flex-col items-center bg-[#553EEC] px-6 overflow-y-auto  z-50 flex flex-col md:max-w-[375px] overflow-clip md:mx-auto z-20 min-h-screen">
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
        <p className="font-gothic relative z-10 text-[130px] mb-6 text-green whitespace-nowrap">達成感</p>
        <p className="font-gothic absolute z-0 text-[130px] top-[10px] right-[-10px] mb-6 text-[#414141] whitespace-nowrap">
          達成感
        </p>
      </motion.div>
      <div className="mt-[83px]">
        <Image className="mx-auto" width={278} height={369} src="/protein01.png" alt="走るキャラクター" />
      </div>
      <div className="text-right w-full text-green mt-[33px] mb-10">
        <p>
          <Link href="/">WODトップに戻る</Link>
        </p>
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
