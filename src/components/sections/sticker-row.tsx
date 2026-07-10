"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

type Sticker = {
  src: string;
  rotate?: number;
  size?: number;
  offsetY?: number;
};

type StickerRowProps = {
  stickers: Sticker[];
  className?: string;
};

export function StickerRow({ stickers, className }: StickerRowProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-x-0 py-2",
        className
      )}
      aria-hidden="true"
    >
      {stickers.map((sticker, index) => (
        <motion.img
          key={sticker.src}
          src={sticker.src}
          alt=""
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{
            opacity: 1,
            scale: 1,
            rotate: sticker.rotate ?? 0,
          }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.12 }}
          style={{
            width: sticker.size ?? 132,
            marginTop: sticker.offsetY ?? 0,
          }}
          className="-mx-4 drop-shadow-md"
        />
      ))}
    </div>
  );
}
