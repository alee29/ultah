"use client";

import { motion } from "framer-motion";

const EJEK_STICKERS = [
  { src: "/stickers/ejek.webp", rotate: -12, size: 152, offsetY: 10 },
  { src: "/stickers/ejek2.webp", rotate: 8, size: 128, offsetY: -14 },
  { src: "/stickers/ejek3.webp", rotate: -6, size: 168, offsetY: 4 },
];

export function EjekClip() {
  return (
    <div className="mt-6 flex flex-wrap items-center justify-center gap-x-0">
      {EJEK_STICKERS.map((sticker, index) => (
        <motion.img
          key={sticker.src}
          src={sticker.src}
          alt="Stiker ejekan"
          initial={{ opacity: 0, scale: 0.6, y: 16, rotate: 0 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: sticker.offsetY,
            rotate: sticker.rotate,
          }}
          transition={{
            duration: 0.4,
            ease: "easeOut",
            delay: 0.3 + index * 0.15,
          }}
          style={{ width: sticker.size }}
          className="-mx-4 drop-shadow-md"
        />
      ))}
    </div>
  );
}
