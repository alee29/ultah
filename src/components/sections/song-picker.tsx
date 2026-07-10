"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Music } from "lucide-react";

import { useExperience } from "@/components/sections/experience-provider";
import { cn } from "@/lib/utils";

type SongPickerProps = {
  className?: string;
};

export function SongPicker({ className }: SongPickerProps) {
  const { playlist, currentTrack, selectTrack } = useExperience();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    function handlePointerDown(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className={cn("relative inline-block", className)}>
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className="inline-flex items-center gap-2 rounded-full bg-card px-4 py-2 text-sm font-medium text-foreground shadow-sm ring-1 ring-primary/10 transition-colors hover:bg-muted"
      >
        <Music className="size-4 text-primary" aria-hidden="true" />
        {currentTrack.title}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="listbox"
            aria-label="Daftar lagu"
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute top-full left-1/2 z-20 mt-2 w-64 -translate-x-1/2 overflow-hidden rounded-xl bg-card p-1.5 shadow-2xl ring-1 ring-primary/10"
          >
            {playlist.map((track) => {
              const isActive = track.id === currentTrack.id;
              return (
                <button
                  key={track.id}
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  onClick={() => {
                    selectTrack(track.id);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-left text-sm transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-foreground hover:bg-muted"
                  )}
                >
                  <span className="truncate">{track.title}</span>
                  {isActive && <Check className="size-4 shrink-0" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
