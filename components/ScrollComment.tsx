"use client";

import { motion } from "motion/react";

type Props = {
  text: string;
};

export default function ScrollComment({ text }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, rotate: 0, scale: 0 }}
      whileInView={{ opacity: 1, rotate: -12, scale: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ type: "spring", stiffness: 140, damping: 10 }}
      className="absolute top-14 left-0 right-0"
    >
      <p className="text-[36px] top-0 absolute font-gothic z-10 text-green text-center left-0 right-0">{text}</p>
      <p className="text-[36px] top-2 font-gothic absolute text-black text-center left-0 right-0 ">{text}</p>
    </motion.div>
  );
}
