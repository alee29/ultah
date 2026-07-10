"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import type { MemoryPhoto } from "@/lib/mock-data";

// the funniest/cutest ones from the pack, skips the static birthday photo
// which gets its own spotlight elsewhere
const FUN_STICKERS = [
  "/stickers/ejek.webp",
  "/stickers/ejek2.webp",
  "/stickers/ejek3.webp",
  "/stickers/sticker-01.webp",
  "/stickers/sticker-02.webp",
  "/stickers/sticker-03.webp",
  "/stickers/sticker-04.webp",
  "/stickers/sticker-05.webp",
  "/stickers/sticker-06.webp",
  "/stickers/sticker-07.webp",
  "/stickers/sticker-08.webp",
  "/stickers/sticker-09.webp",
];

const STICKER_SLOTS = [
  { className: "-top-8 -left-8", rotate: -10 },
  { className: "-bottom-8 -right-8", rotate: 12 },
  { className: "-bottom-8 -left-8", rotate: -8 },
];

function pickRandomStickers() {
  const shuffled = [...FUN_STICKERS].sort(() => Math.random() - 0.5);
  const count = Math.random() < 0.5 ? 2 : 3;
  return shuffled.slice(0, count);
}

type PhotoLightboxProps = {
  photo: MemoryPhoto | null;
  onClose: () => void;
};

export function PhotoLightbox({ photo, onClose }: PhotoLightboxProps) {
  const [stickers, setStickers] = useState<string[]>([]);

  useEffect(() => {
    if (!photo) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- random stickers must be picked client-only, fresh each time a photo opens
    setStickers(pickRandomStickers());
  }, [photo]);

  useEffect(() => {
    if (!photo) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [photo, onClose]);

  return (
    <AnimatePresence>
      {photo && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={photo.caption || "Foto kenangan"}
        >
          <motion.div
            className="relative w-full max-w-lg"
            initial={{ opacity: 0, scale: 0.92, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup"
              className="absolute -top-3 -right-3 z-10 flex size-9 items-center justify-center rounded-full bg-card text-foreground shadow-lg ring-1 ring-primary/10 hover:bg-muted"
            >
              <X className="size-4" />
            </button>

            {stickers.map((src, index) => {
              const slot = STICKER_SLOTS[index % STICKER_SLOTS.length];
              return (
                <motion.img
                  key={src}
                  src={src}
                  alt=""
                  aria-hidden="true"
                  initial={{ opacity: 0, scale: 0.6, rotate: 0 }}
                  animate={{ opacity: 1, scale: 1, rotate: slot.rotate }}
                  transition={{
                    duration: 0.35,
                    ease: "easeOut",
                    delay: 0.1 + index * 0.1,
                  }}
                  className={cn(
                    "pointer-events-none absolute z-10 w-20 drop-shadow-md sm:w-24",
                    slot.className
                  )}
                />
              );
            })}

            <div className="overflow-hidden rounded-2xl bg-card p-3 pb-6 shadow-2xl ring-1 ring-primary/10">
              <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-muted">
                <Image
                  src={photo.imageUrl}
                  alt={photo.caption}
                  fill
                  sizes="(min-width: 640px) 32rem, 100vw"
                  className="object-cover"
                />
              </div>
              {photo.caption && (
                <p className="mt-4 text-center text-sm text-muted-foreground">
                  {photo.caption}
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
