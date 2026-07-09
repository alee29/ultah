"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import { PhotoFrame } from "@/components/sections/photo-frame";
import { cn } from "@/lib/utils";
import type { MemoryPhoto } from "@/lib/mock-data";

type PhotoCarouselProps = {
  photos: MemoryPhoto[];
};

export function PhotoCarousel({ photos }: PhotoCarouselProps) {
  const sortedPhotos = [...photos].sort((a, b) => a.sortOrder - b.sortOrder);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    function handleScroll() {
      if (!scroller) return;

      const children = Array.from(scroller.children) as HTMLElement[];
      const scrollerCenter =
        scroller.getBoundingClientRect().left + scroller.clientWidth / 2;

      let closestIndex = 0;
      let closestDistance = Infinity;
      children.forEach((child, index) => {
        const rect = child.getBoundingClientRect();
        const distance = Math.abs(
          rect.left + rect.width / 2 - scrollerCenter
        );
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });
      setActiveIndex(closestIndex);

      const maxScroll = scroller.scrollWidth - scroller.clientWidth;
      setAtEnd(scroller.scrollLeft >= maxScroll - 8);
    }

    handleScroll();
    scroller.addEventListener("scroll", handleScroll, { passive: true });
    return () => scroller.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-6 pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="region"
        aria-label="Album geser foto kenangan"
      >
        {sortedPhotos.map((photo, index) => (
          <div key={photo.id} className="w-56 shrink-0 snap-start sm:w-64">
            <motion.div
              animate={{
                scale: index === activeIndex ? 1 : 0.9,
                opacity: index === activeIndex ? 1 : 0.55,
              }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <PhotoFrame imageUrl={photo.imageUrl} caption={photo.caption} />
            </motion.div>
          </div>
        ))}
      </div>

      <div
        className={cn(
          "pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent transition-opacity duration-300",
          atEnd ? "opacity-0" : "opacity-100"
        )}
        aria-hidden="true"
      />

      <div
        className="mt-4 flex items-center justify-center gap-2"
        role="tablist"
        aria-label="Posisi foto pada album geser"
      >
        {sortedPhotos.map((photo, index) => (
          <span
            key={photo.id}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              index === activeIndex ? "w-5 bg-primary" : "w-1.5 bg-primary/25"
            )}
            aria-hidden="true"
          />
        ))}
      </div>
    </div>
  );
}
