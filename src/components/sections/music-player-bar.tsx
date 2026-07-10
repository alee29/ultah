"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ListMusic, Pause, Play } from "lucide-react";

import { Button } from "@/components/ui/button";
import { MusicStatusIndicator } from "@/components/sections/music-status-indicator";
import { useExperience } from "@/components/sections/experience-provider";
import { cn } from "@/lib/utils";

export function MusicPlayerBar() {
  const { isPlaying, togglePlayback, playlist, currentTrack, selectTrack } =
    useExperience();
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isPickerOpen) return;

    function handlePointerDown(event: MouseEvent) {
      if (!pickerRef.current?.contains(event.target as Node)) {
        setIsPickerOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsPickerOpen(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isPickerOpen]);

  return (
    <div
      className="sticky bottom-0 z-10 mt-auto border-t border-border/60 bg-card/90 px-4 pt-3 backdrop-blur sm:px-6 sm:pt-4"
      style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
    >
      <div
        ref={pickerRef}
        className="relative mx-auto flex max-w-lg items-center gap-3 lg:max-w-xl"
      >
        <Button
          variant="secondary"
          size="icon-lg"
          className="shrink-0 rounded-full"
          aria-label={isPlaying ? "Jeda musik" : "Putar musik"}
          onClick={togglePlayback}
        >
          {isPlaying ? (
            <Pause className="size-4" />
          ) : (
            <Play className="size-4" />
          )}
        </Button>

        <button
          type="button"
          onClick={() => setIsPickerOpen((open) => !open)}
          className="min-w-0 flex-1 text-left"
          aria-haspopup="listbox"
          aria-expanded={isPickerOpen}
        >
          <p className="truncate text-sm font-medium text-foreground">
            {currentTrack.title}
          </p>
          <p className="text-xs text-muted-foreground">
            {isPlaying ? "Sedang diputar" : "Lagu untukmu"}
          </p>
        </button>

        <MusicStatusIndicator isPlaying={isPlaying} />

        <Button
          variant="ghost"
          size="icon-lg"
          className="shrink-0 rounded-full"
          aria-label="Pilih lagu"
          aria-haspopup="listbox"
          aria-expanded={isPickerOpen}
          onClick={() => setIsPickerOpen((open) => !open)}
        >
          <ListMusic className="size-4" />
        </Button>

        <AnimatePresence>
          {isPickerOpen && (
            <motion.div
              role="listbox"
              aria-label="Daftar lagu"
              initial={{ opacity: 0, y: 8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.97 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute right-0 bottom-full mb-3 w-64 overflow-hidden rounded-xl bg-card p-1.5 shadow-2xl ring-1 ring-primary/10"
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
                      setIsPickerOpen(false);
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
    </div>
  );
}
