"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import { PhotoCarousel } from "@/components/sections/photo-carousel";
import { PhotoFrame } from "@/components/sections/photo-frame";
import { PhotoLightbox } from "@/components/sections/photo-lightbox";
import { cn } from "@/lib/utils";
import type { MemoryPhoto } from "@/lib/mock-data";

type FlankingSticker = {
  src: string;
  side: "left" | "right";
  top?: string;
  size?: number;
  rotate?: number;
};

type GallerySectionProps = {
  photos: MemoryPhoto[];
  flankingStickers?: FlankingSticker[];
};

const ROTATIONS = [-3, 2.5, -2, 3, -1.5, 2];

export function GallerySection({
  photos,
  flankingStickers,
}: GallerySectionProps) {
  const sortedPhotos = [...photos].sort((a, b) => a.sortOrder - b.sortOrder);
  const [selectedPhoto, setSelectedPhoto] = useState<MemoryPhoto | null>(null);

  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="relative mx-auto max-w-lg px-6 text-center lg:max-w-2xl">
        {flankingStickers?.map((sticker) => (
          <motion.img
            key={sticker.src}
            src={sticker.src}
            alt=""
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1, rotate: sticker.rotate ?? 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{
              width: sticker.size ?? 140,
              top: sticker.top ?? "10%",
              ...(sticker.side === "left" ? { left: -28 } : { right: -28 }),
            }}
            className="pointer-events-none absolute z-10 drop-shadow-md"
          />
        ))}

        <p className="font-heading text-sm tracking-widest text-primary uppercase lg:text-base">
          Galeri Ci Imoetz
        </p>

        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-12">
          {sortedPhotos.map((photo, index) => (
            <div
              key={photo.id}
              className={cn(index % 2 === 1 && "sm:translate-y-4")}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: "easeOut",
                }}
              >
                <PhotoFrame
                  imageUrl={photo.imageUrl}
                  caption={photo.caption}
                  rotate={ROTATIONS[index % ROTATIONS.length]}
                  onClick={() => setSelectedPhoto(photo)}
                />
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 text-center">
        <p className="font-heading text-sm tracking-widest text-primary uppercase lg:text-base">
          Album Geser
        </p>

        <div className="mt-6">
          <PhotoCarousel
            photos={sortedPhotos}
            onPhotoClick={setSelectedPhoto}
          />
        </div>
      </div>

      <PhotoLightbox
        photo={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
      />
    </section>
  );
}
