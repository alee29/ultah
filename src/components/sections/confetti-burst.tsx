"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Heart } from "lucide-react";

export type ConfettiPiece = {
  id: number;
  x: number;
  y: number;
  rotate: number;
  color: string;
  width: number;
  height: number;
  delay: number;
};

const CONFETTI_COLORS = [
  "#f43f5e",
  "#fb7185",
  "#f9a8d4",
  "#fbbf24",
  "#ffffff",
  "#c084fc",
];

export function createConfettiPieces(count: number): ConfettiPiece[] {
  return Array.from({ length: count }, (_, index) => {
    const angle = Math.random() * Math.PI * 2;
    const distance = 90 + Math.random() * 140;
    return {
      id: Date.now() + index,
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance - 60,
      rotate: Math.random() * 720 - 360,
      color: CONFETTI_COLORS[index % CONFETTI_COLORS.length],
      width: 6 + Math.random() * 5,
      height: 10 + Math.random() * 6,
      delay: Math.random() * 0.1,
    };
  });
}

type ConfettiBurstProps = {
  pieces: ConfettiPiece[];
};

export function ConfettiBurst({ pieces }: ConfettiBurstProps) {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute top-1/2 left-1/2">
        <AnimatePresence>
          {pieces.map((piece) => (
            <motion.span
              key={piece.id}
              className="absolute rounded-sm"
              style={{
                width: piece.width,
                height: piece.height,
                backgroundColor: piece.color,
              }}
              initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
              animate={{
                x: piece.x,
                y: [0, piece.y, piece.y + 200],
                opacity: [1, 1, 0],
                rotate: piece.rotate,
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 1.6,
                delay: piece.delay,
                ease: "easeOut",
              }}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

type HeartPulseProps = {
  show: boolean;
};

export function HeartPulse({ show }: HeartPulseProps) {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center"
      aria-hidden="true"
    >
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.3, 1.1], opacity: [0, 1, 1] }}
            exit={{ scale: 1.6, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Heart
              className="size-24 text-primary drop-shadow-lg"
              fill="currentColor"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
