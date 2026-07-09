"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

type HeartNotificationProps = {
  onClick: () => void;
};

export function HeartNotification({ onClick }: HeartNotificationProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className="fixed right-4 z-40 flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl sm:right-6"
      style={{ bottom: "calc(6rem + env(safe-area-inset-bottom))" }}
      aria-label="Ada pesan rahasia menunggu untuk dibuka"
      animate={{ scale: [1, 1.15, 1] }}
      transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
      whileTap={{ scale: 0.9 }}
    >
      <Heart className="size-6" fill="currentColor" />
      <span className="absolute -top-0.5 -right-0.5 flex size-3.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive/70" />
        <span className="relative inline-flex size-3.5 rounded-full bg-destructive ring-2 ring-background" />
      </span>
    </motion.button>
  );
}
