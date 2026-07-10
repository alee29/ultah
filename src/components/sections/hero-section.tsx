"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Gift, Heart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useExperience } from "@/components/sections/experience-provider";
import { SongPicker } from "@/components/sections/song-picker";
import type { SiteSettings } from "@/lib/mock-data";

type HeroSectionProps = {
  settings: SiteSettings;
};

export function HeroSection({ settings }: HeroSectionProps) {
  const { isOpened, openGift } = useExperience();

  return (
    <section className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-accent/40 via-background to-background" />

      <Heart
        className="mb-6 size-10 text-primary sm:size-12 lg:size-14"
        fill="currentColor"
      />

      <p className="font-heading text-lg text-muted-foreground italic sm:text-xl">
        Untuk
      </p>
      <h1 className="font-heading mt-2 text-4xl font-semibold text-balance text-foreground sm:text-5xl lg:text-6xl">
        {settings.partnerName}
      </h1>

      <AnimatePresence mode="wait">
        {isOpened ? (
          <motion.p
            key="opened"
            className="mt-4 max-w-sm text-sm text-muted-foreground sm:max-w-md sm:text-base"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Hadiahmu sudah terbuka. Gulir ke bawah untuk melihatnya, sayang.
          </motion.p>
        ) : (
          <motion.div
            key="closed"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
          >
            <p className="mt-4 max-w-sm text-sm text-muted-foreground sm:max-w-md sm:text-base">
              Ada sesuatu yang spesial menantimu di dalam. Sentuh tombol di
              bawah untuk membukanya.
            </p>

            <div className="mt-6 flex flex-col items-center gap-1.5">
              <p className="text-xs text-muted-foreground">
                pilihh laguu
              </p>
              <SongPicker />
            </div>

            <Button
              size="lg"
              className="mt-10 gap-2 rounded-full px-8 shadow-lg sm:h-11 sm:px-10 sm:text-base"
              onClick={openGift}
            >
              <Gift className="size-5" />
              Sentuh untuk Buka Hadiah
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
