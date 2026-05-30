"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function RxHelpButton() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <span onClick={() => setShowModal(true)} className="cursor-pointer relative z-10">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="10" cy="10" r="10" fill="white" />
          <path
            d="M8.592 11.744C8.54933 11.3387 8.58667 10.9813 8.704 10.672C8.832 10.3627 9.008 10.0907 9.232 9.856C9.456 9.61067 9.70133 9.392 9.968 9.2C10.2347 8.99733 10.4853 8.80533 10.72 8.624C10.9547 8.44267 11.1467 8.256 11.296 8.064C11.456 7.872 11.536 7.65867 11.536 7.424C11.536 7.12533 11.456 6.88533 11.296 6.704C11.1467 6.512 10.9333 6.37333 10.656 6.288C10.3893 6.192 10.08 6.144 9.728 6.144C9.26933 6.144 8.85867 6.24533 8.496 6.448C8.144 6.64 7.792 6.92267 7.44 7.296L5.872 5.856C6.37333 5.248 6.98667 4.76267 7.712 4.4C8.43733 4.02667 9.22133 3.84 10.064 3.84C10.8533 3.84 11.5627 3.95733 12.192 4.192C12.8213 4.42667 13.3227 4.78933 13.696 5.28C14.0693 5.77067 14.256 6.4 14.256 7.168C14.256 7.552 14.176 7.888 14.016 8.176C13.856 8.45333 13.6533 8.69867 13.408 8.912C13.1627 9.12533 12.9013 9.33333 12.624 9.536C12.3467 9.728 12.0853 9.92533 11.84 10.128C11.6053 10.3307 11.4133 10.5653 11.264 10.832C11.1253 11.088 11.0667 11.392 11.088 11.744H8.592ZM9.84 16.192C9.36 16.192 8.96533 16.0373 8.656 15.728C8.35733 15.4187 8.208 15.0293 8.208 14.56C8.208 14.0907 8.36267 13.7067 8.672 13.408C8.98133 13.1093 9.37067 12.96 9.84 12.96C10.3093 12.96 10.6987 13.1093 11.008 13.408C11.3173 13.7067 11.472 14.0907 11.472 14.56C11.472 15.0293 11.3173 15.4187 11.008 15.728C10.6987 16.0373 10.3093 16.192 9.84 16.192Z"
            fill="black"
          />
        </svg>
      </span>

      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-6"
            onClick={() => setShowModal(false)}
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
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-white text-2xl leading-none cursor-pointer"
              >
                ✕
              </button>
              <p className="text-lg font-gothic mb-4 text-green">RX（As Prescribed）</p>
              <p className="text-sm leading-6 font-noto">
                「処方通り」という意味で、WODの規定重量・規定動作のこと。RXをクリアできれば、そのWODを正式に完遂したことになります。まずはスケーリング（軽い重量や簡易動作）から始めて、RXを目指しましょう。
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
