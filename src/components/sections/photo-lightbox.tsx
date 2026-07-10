"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";

import type { MemoryPhoto } from "@/lib/mock-data";

type PhotoLightboxProps = {
  photo: MemoryPhoto | null;
  onClose: () => void;
};

export function PhotoLightbox({ photo, onClose }: PhotoLightboxProps) {
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
          aria-label={photo.caption}
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
              <p className="mt-4 text-center text-sm text-muted-foreground">
                {photo.caption}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
