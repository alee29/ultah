"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

type FloatingHeart = {
  id: number;
  left: number;
  size: number;
  duration: number;
  startVh: number;
  opacity: number;
  sway: number;
};

function generateHearts(count: number): FloatingHeart[] {
  return Array.from({ length: count }, (_, index) => ({
    id: index,
    left: Math.random() * 100,
    size: 14 + Math.random() * 20,
    duration: 10 + Math.random() * 10,
    // scatter hearts across the full vertical range up front, so the sky
    // already looks populated on load instead of building up from the bottom
    startVh: 110 - Math.random() * 230,
    opacity: 0.1 + Math.random() * 0.18,
    sway: 20 + Math.random() * 30,
  }));
}

export function FloatingHeartsBackground() {
  const [hearts, setHearts] = useState<FloatingHeart[] | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- randomized positions must be generated client-only to avoid SSR/hydration mismatch
    setHearts(generateHearts(18));
  }, []);

  if (!hearts) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
    >
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute bottom-0 text-primary"
          style={{ left: `${heart.left}%`, opacity: heart.opacity }}
          initial={{ y: `${heart.startVh}vh`, x: 0 }}
          animate={{
            y: "-120vh",
            x: [0, heart.sway, -heart.sway, 0],
          }}
          transition={{
            y: {
              duration: heart.duration,
              repeat: Infinity,
              ease: "linear",
            },
            x: {
              duration: heart.duration / 2,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            },
          }}
        >
          <Heart
            style={{ width: heart.size, height: heart.size }}
            fill="currentColor"
          />
        </motion.div>
      ))}
    </div>
  );
}
