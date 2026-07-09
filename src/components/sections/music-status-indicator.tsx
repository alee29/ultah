"use client";

import { motion } from "framer-motion";
import { Music } from "lucide-react";

type MusicStatusIndicatorProps = {
  isPlaying: boolean;
};

const BAR_DELAYS = [0, 0.15, 0.3, 0.15];

export function MusicStatusIndicator({ isPlaying }: MusicStatusIndicatorProps) {
  if (!isPlaying) {
    return (
      <Music
        className="size-4 shrink-0 text-muted-foreground"
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      className="flex h-4 shrink-0 items-end gap-0.5"
      role="status"
      aria-label="Musik sedang diputar"
    >
      {BAR_DELAYS.map((delay, index) => (
        <motion.span
          key={index}
          className="w-0.5 rounded-full bg-primary"
          initial={{ height: "20%" }}
          animate={{ height: ["25%", "100%", "45%", "80%", "25%"] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut",
            delay,
          }}
        />
      ))}
    </div>
  );
}
