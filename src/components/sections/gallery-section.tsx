"use client";

import { motion } from "framer-motion";

import { PhotoCarousel } from "@/components/sections/photo-carousel";
import { PhotoFrame } from "@/components/sections/photo-frame";
import { cn } from "@/lib/utils";
import type { MemoryPhoto } from "@/lib/mock-data";

type GallerySectionProps = {
  photos: MemoryPhoto[];
};

const ROTATIONS = [-3, 2.5, -2, 3, -1.5, 2];

export function GallerySection({ photos }: GallerySectionProps) {
  const sortedPhotos = [...photos].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-lg px-6 text-center lg:max-w-2xl">
        <p className="font-heading text-sm tracking-widest text-primary uppercase lg:text-base">
          Galeri Kenangan
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
        <p className="mt-2 px-6 text-sm text-muted-foreground">
          Geser untuk melihat kenangan lainnya
        </p>

        <div className="mt-6">
          <PhotoCarousel photos={sortedPhotos} />
        </div>
      </div>
    </section>
  );
}
