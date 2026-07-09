"use client";

import { useEffect, useState } from "react";
import { Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/admin/toast-provider";
import { mockSettings } from "@/lib/mock-data";

export function MusicSettingsForm() {
  const { showToast } = useToast();
  const [musicUrl, setMusicUrl] = useState(mockSettings.musicUrl);
  const [musicTitle, setMusicTitle] = useState(mockSettings.musicTitle);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/media/music")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (cancelled || !data) return;
        setMusicUrl(data.url);
        setMusicTitle(data.title ?? "");
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  async function handleSave() {
    setIsSaving(true);

    const response = await fetch("/api/media/music", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: musicUrl, title: musicTitle }),
    });

    setIsSaving(false);

    if (!response.ok) {
      showToast("Gagal menyimpan musik.");
      return;
    }

    showToast("Musik tersimpan.");
  }

  return (
    <div className="space-y-5">
      <div>
        <label
          htmlFor="music-title"
          className="text-sm font-medium text-foreground"
        >
          Judul Lagu
        </label>
        <input
          id="music-title"
          type="text"
          value={musicTitle}
          disabled={isLoading}
          onChange={(event) => setMusicTitle(event.target.value)}
          className="mt-1.5 w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none focus:border-primary disabled:opacity-60"
        />
      </div>

      <div>
        <label
          htmlFor="music-url"
          className="text-sm font-medium text-foreground"
        >
          URL Lagu
        </label>
        <input
          id="music-url"
          type="text"
          value={musicUrl}
          disabled={isLoading}
          onChange={(event) => setMusicUrl(event.target.value)}
          placeholder="/audio/lagu-baru.mp3"
          className="mt-1.5 w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none focus:border-primary disabled:opacity-60"
        />
      </div>

      <div className="rounded-xl bg-accent/30 p-4">
        <p className="text-xs tracking-widest text-muted-foreground uppercase">
          Pratinjau Pemutar
        </p>
        <audio key={musicUrl} controls className="mt-3 w-full" src={musicUrl}>
          Peramban tidak mendukung pemutar audio.
        </audio>
      </div>

      <Button
        onClick={handleSave}
        disabled={isSaving || isLoading}
        className="gap-2 rounded-full"
      >
        <Save className="size-4" />
        {isSaving ? "Menyimpan..." : "Simpan"}
      </Button>
    </div>
  );
}
