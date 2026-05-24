"use client";
import Image from "next/image";
import { BookOpen, Dumbbell, Settings } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const menuItems = [
  { key: "種目辞典", sub: "", label: "種目辞典" },
  { key: "WOD", sub: "今日のメニューを選ぼう", label: "WOD" },
  { key: "施設変更", sub: "", label: "施設変更" },
] as const;

export type MenuKey = (typeof menuItems)[number]["key"];

interface GlobalMenuProps {
  active: MenuKey;
  onChange: (key: MenuKey) => void;
}

export default function GlobalMenu({ active, onChange }: GlobalMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="">
      <p
        className="text-black fixed bottom-4 left-0 right-3 z-50 text-right md:max-w-[375px] md:mx-auto"
        onClick={() => setIsOpen((pre) => !pre)}
      >
        <span className="bg-white inline-block font-gothic py-3 pl-6 pr-10 rounded-3xl text-[14px] relative leading-none">
          Menu
          <Image className="absolute right-0 bottom-0" width={40} height={52} src="/kettlebell.png" alt="ケトルべル" />
        </span>
      </p>
      <nav>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className=" fixed bottom-20 left-0 right-0 z-50  mx-auto  max-w-[375px]"
            >
              <div className="rounded-[20px] bg-white max-w-[212px] p-10 ml-auto">
                <div className="flex flex-col gap-10">
                  {menuItems.map(({ key, sub, label }) => {
                    const isActive = active === key;
                    return (
                      <button
                        key={key}
                        onClick={() => onChange(key)}
                        className={`text-black flex flex-col gap-1 cursor-pointer text-left items-baseline`}
                      >
                        <span className={`text-base block w-full ${isActive ? "font-bold" : ""}`}>
                          {label == "施設変更" ? (
                            <span className="text-[12px] block text-right">{label}</span>
                          ) : (
                            <span className="text-[18px] ">{label}</span>
                          )}
                        </span>
                        <span className="text-[12px] block ">{sub}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
}
