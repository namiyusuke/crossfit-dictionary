"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface CountdownIntroProps {
  formatColor: string;
  onComplete: () => void;
}

export default function CountdownIntro({
  formatColor,
  onComplete,
}: CountdownIntroProps) {
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => setCount(count - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(onComplete, 600);
      return () => clearTimeout(timer);
    }
  }, [count, onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <AnimatePresence mode="wait">
        <motion.div
          key={count}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="font-gothic"
          style={{
            color: formatColor,
            fontSize: count === 0 ? "6rem" : "8rem",
            lineHeight: 1,
          }}
        >
          {count === 0 ? "GO!" : count}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
