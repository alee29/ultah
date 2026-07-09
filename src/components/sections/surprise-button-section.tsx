"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  ConfettiBurst,
  createConfettiPieces,
  HeartPulse,
  type ConfettiPiece,
} from "@/components/sections/confetti-burst";

type FallingPiece = {
  id: number;
  left: number;
  duration: number;
  delay: number;
  rotate: number;
  size: number;
  symbol: string;
};

const SYMBOLS = ["❤️", "🌸", "💗"];
const PIECE_COUNT = 18;
const CONFETTI_COUNT = 26;
const CLEAR_AFTER_MS = 4200;
const CONFETTI_CLEAR_AFTER_MS = 1900;
const HEART_PULSE_MS = 700;

function createFallingPieces(): FallingPiece[] {
  return Array.from({ length: PIECE_COUNT }, (_, index) => ({
    id: Date.now() + index,
    left: Math.random() * 100,
    duration: 2.5 + Math.random() * 1.5,
    delay: Math.random() * 0.5,
    rotate: (Math.random() - 0.5) * 360,
    size: 16 + Math.random() * 16,
    symbol: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
  }));
}

export function SurpriseButtonSection() {
  const [pieces, setPieces] = useState<FallingPiece[]>([]);
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  const [showHeartPulse, setShowHeartPulse] = useState(false);

  function triggerSurprise() {
    setPieces(createFallingPieces());
    window.setTimeout(() => setPieces([]), CLEAR_AFTER_MS);

    setConfetti(createConfettiPieces(CONFETTI_COUNT));
    window.setTimeout(() => setConfetti([]), CONFETTI_CLEAR_AFTER_MS);

    setShowHeartPulse(true);
    window.setTimeout(() => setShowHeartPulse(false), HEART_PULSE_MS);
  }

  return (
    <section className="flex flex-col items-center gap-4 px-6 py-12 text-center sm:py-16 lg:gap-6 lg:py-20">
      <p className="font-heading text-lg text-foreground italic sm:text-xl lg:text-2xl">
        Masih ada satu kejutan lagi untukmu
      </p>
      <Button
        variant="secondary"
        size="lg"
        className="gap-2 rounded-full px-8 sm:h-11 sm:px-10 sm:text-base"
        onClick={triggerSurprise}
      >
        <Sparkles className="size-5" />
        Sentuhan Kejut
      </Button>

      <div
        className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
        aria-hidden="true"
      >
        <AnimatePresence>
          {pieces.map((piece) => (
            <motion.span
              key={piece.id}
              className="absolute top-0 select-none"
              style={{ left: `${piece.left}%`, fontSize: piece.size }}
              initial={{ y: "-10vh", opacity: 0, rotate: 0 }}
              animate={{
                y: "110vh",
                opacity: [0, 1, 1, 0],
                rotate: piece.rotate,
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: piece.duration,
                delay: piece.delay,
                ease: "easeIn",
              }}
            >
              {piece.symbol}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>

      <ConfettiBurst pieces={confetti} />
      <HeartPulse show={showHeartPulse} />
    </section>
  );
}
