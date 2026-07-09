"use client";

import { Pause, Play } from "lucide-react";

import { Button } from "@/components/ui/button";
import { MusicStatusIndicator } from "@/components/sections/music-status-indicator";
import { useExperience } from "@/components/sections/experience-provider";
import type { SiteSettings } from "@/lib/mock-data";

type MusicPlayerBarProps = {
  settings: SiteSettings;
};

export function MusicPlayerBar({ settings }: MusicPlayerBarProps) {
  const { isPlaying, togglePlayback } = useExperience();

  return (
    <div
      className="sticky bottom-0 z-10 mt-auto border-t border-border/60 bg-card/90 px-4 pt-3 backdrop-blur sm:px-6 sm:pt-4"
      style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
    >
      <div className="mx-auto flex max-w-lg items-center gap-3 lg:max-w-xl">
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

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-foreground">
            {settings.musicTitle}
          </p>
          <p className="text-xs text-muted-foreground">
            {isPlaying ? "Sedang diputar" : "Lagu untukmu"}
          </p>
        </div>

        <MusicStatusIndicator isPlaying={isPlaying} />
      </div>
    </div>
  );
}
