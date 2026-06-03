"use client";

import { useState, useMemo } from "react";
import type { Wod, WodFormat } from "@/types/wod";
import type { Movement, Equipment } from "@/types/movement";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useTimerSound } from "@/hooks/useTimerSound";
import { AnimatePresence, motion } from "framer-motion";
import WodTimerOverlay from "@/components/timer/WodTimerOverlay";
import BuilderProgressDots from "./BuilderProgressDots";
import StepFormatSelect from "./StepFormatSelect";
import StepDurationConfig from "./StepDurationConfig";
import StepMovementPicker, { type SelectedMovement } from "./StepMovementPicker";
import StepPreview from "./StepPreview";

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
};

const TOTAL_STEPS = 4;

interface WodBuilderProps {
  movements: Movement[];
  onClose: () => void;
}

export default function WodBuilder({ movements, onClose }: WodBuilderProps) {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);

  // Builder state
  const [format, setFormat] = useState<WodFormat | null>(null);
  const [duration, setDuration] = useState(10);
  const [rounds, setRounds] = useState(3);
  const [repScheme, setRepScheme] = useState("");
  const [selectedMovements, setSelectedMovements] = useState<SelectedMovement[]>([]);

  // Timer
  const [showTimer, setShowTimer] = useState(false);
  const { initAudio } = useTimerSound();
  const [userEquipment] = useLocalStorage<Equipment[]>("crossfit-user-equipment", []);

  const goNext = () => {
    setDirection(1);
    setStep((s) => Math.min(TOTAL_STEPS - 1, s + 1));
  };

  const goBack = () => {
    setDirection(-1);
    setStep((s) => Math.max(0, s - 1));
  };

  const canProceed = useMemo(() => {
    switch (step) {
      case 0:
        return format !== null;
      case 1:
        if (format === "ForTime") return rounds >= 1;
        return duration >= 1;
      case 2:
        return selectedMovements.length >= 1 && selectedMovements.every((sm) => sm.reps.trim() !== "");
      default:
        return true;
    }
  }, [step, format, duration, rounds, selectedMovements]);

  const builtWod = useMemo((): Wod | null => {
    if (!format || selectedMovements.length === 0) return null;

    const durationStr = format === "ForTime" ? (duration > 0 ? `〜${duration}分` : "なし") : `${duration}分`;

    const bodyParts = [...new Set(selectedMovements.flatMap((sm) => sm.movement.bodyPart))];
    const effects = [...new Set(selectedMovements.flatMap((sm) => sm.movement.primaryEffect))];

    return {
      id: `custom-${Date.now()}`,
      name: "カスタムWOD",
      format,
      level: "初心者",
      goal: "カスタムWOD",
      targetBodyPart: bodyParts,
      targetEffect: effects,
      duration: durationStr,
      sets: [
        {
          movements: selectedMovements.map((sm) => ({
            movementId: sm.movement.id,
            name: sm.movement.name,
            reps: sm.reps,
          })),
        },
      ],
      rounds: format === "ForTime" ? rounds : undefined,
      repScheme: format === "ForTime" && repScheme ? repScheme : undefined,
      estimate: { beginner: "-", rx: "-" },
      tip: "",
      notes: null,
    };
  }, [format, duration, rounds, repScheme, selectedMovements]);

  const handleLaunchTimer = () => {
    if (!builtWod) return;
    initAudio();
    setShowTimer(true);
  };

  const defaultReps = repScheme || "";

  if (showTimer && builtWod) {
    return <WodTimerOverlay wod={builtWod} onClose={() => setShowTimer(false)} />;
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto md:max-w-[375px] md:mx-auto pb-24 bg-gray">
      <div className="pt-[166px] pb-20">
        {/* ヘッダー */}
        <div className="px-6 pb-2 justify-between items-center">
          <button
            onClick={step === 0 ? onClose : goBack}
            className="text-[12px] cursor-pointer font-black text-white mb-10"
          >
            {step === 0 ? "<　戻る" : "<　前へ"}
          </button>
          <p className="font-gothic text-white font-normal text-[24px] mb-6 ">WODを作る</p>
          <div className="text-right">
            <button
              onClick={onClose}
              className="text-black text-[12px] rounded-2xl cursor-pointer font-black  bg-white px-[18px] py-2 ml-auto"
            >
              閉じる
            </button>
          </div>
        </div>

        {/* ステップコンテンツ */}
        <div className="px-6 py-8 pb-10">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25 }}
            >
              {step === 0 && <StepFormatSelect selected={format} onSelect={setFormat} />}
              {step === 1 && format && (
                <StepDurationConfig
                  format={format}
                  duration={duration}
                  onDurationChange={setDuration}
                  rounds={rounds}
                  onRoundsChange={setRounds}
                  repScheme={repScheme}
                  onRepSchemeChange={setRepScheme}
                />
              )}
              {step === 2 && (
                <StepMovementPicker
                  movements={movements}
                  userEquipment={userEquipment ?? []}
                  selectedMovements={selectedMovements}
                  onMovementsChange={setSelectedMovements}
                  defaultReps={defaultReps}
                />
              )}
              {step === 3 && builtWod && (
                <StepPreview wod={builtWod} movements={movements} onLaunchTimer={handleLaunchTimer} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
        {/* ナビゲーション（Step 4以外） */}
        {step < 3 && (
          <div className=" bottom-0 left-0 right-0 px-6 pb-8 pt-4">
            <button
              onClick={goNext}
              disabled={!canProceed}
              className={`w-full py-4 rounded-xl font-gothic text-lg transition-all cursor-pointer ${
                canProceed ? "bg-button text-black" : "bg-[#333] text-[#666] cursor-not-allowed"
              }`}
            >
              次へ
            </button>
          </div>
        )}
        <BuilderProgressDots currentStep={step} totalSteps={TOTAL_STEPS} />
      </div>
    </div>
  );
}
