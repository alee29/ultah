"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";

type LetterBoxProps = {
  letterContent: string;
};

export function LetterBox({ letterContent }: LetterBoxProps) {
  return (
    <motion.div
      className="mx-auto max-w-lg rounded-2xl bg-card p-8 text-left shadow-xl ring-1 ring-primary/10 sm:p-10 lg:max-w-xl lg:p-12"
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Mail className="mx-auto size-8 text-primary" aria-hidden="true" />

      <p className="font-heading mt-4 text-center text-lg text-foreground italic">
        Untuk Kamu, Sayangku
      </p>

      <p className="mt-6 text-pretty leading-relaxed whitespace-pre-line text-muted-foreground">
        {letterContent}
      </p>

      <p className="font-heading mt-8 text-right text-sm text-primary italic">
        — Dengan cinta, Ale
      </p>
    </motion.div>
  );
}
