"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";

import { useExperience } from "@/components/sections/experience-provider";

type RevealedContentProps = {
  children: ReactNode;
};

export function RevealedContent({ children }: RevealedContentProps) {
  const { isOpened } = useExperience();

  return (
    <AnimatePresence>
      {isOpened && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
