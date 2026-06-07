"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import { useRouter } from "next/navigation";

export default function WodPageHeader() {
  const router = useRouter();
  const [showWodModal, setShowWodModal] = useState(false);

  return (
    <>
      <Header
        activeSection="WOD"
        onShowWodModal={() => setShowWodModal(true)}
        onShowEquipmentSettings={() => router.push("/?equipment=true")}
      />

      <AnimatePresence>
        {showWodModal && (
          <motion.div
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-6"
            onClick={() => setShowWodModal(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              className="bg-gray rounded-2xl p-8 max-w-sm w-full relative"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
              <button
                onClick={() => setShowWodModal(false)}
                className="absolute top-4 right-4 text-white text-2xl leading-none cursor-pointer"
              >
                ✕
              </button>
              <p className="text-lg font-gothic mb-4 text-green">WOD（Workout of the Day）</p>
              <p className="text-sm leading-6">
                その日のトレーニングメニューのこと。気分や目的に合わせておすすめのWODを提案します。AMRAP・EMOM・ForTimeの3つのフォーマットがあり、それぞれ異なるアプローチでトレーニングを楽しめます。
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
