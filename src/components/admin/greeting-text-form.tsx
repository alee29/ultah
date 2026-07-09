"use client";

import { useEffect, useState } from "react";
import { Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/admin/toast-provider";
import { mockSettings } from "@/lib/mock-data";

export function GreetingTextForm() {
  const { showToast } = useToast();
  const [greeting, setGreeting] = useState(mockSettings.mainGreeting);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/greeting-text")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (cancelled || !data) return;
        setGreeting(data.content);
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

    const response = await fetch("/api/greeting-text", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: greeting }),
    });

    setIsSaving(false);

    if (!response.ok) {
      showToast("Gagal menyimpan teks ucapan.");
      return;
    }

    showToast("Teks ucapan tersimpan.");
  }

  return (
    <div className="space-y-5">
      <div>
        <label
          htmlFor="greeting-text"
          className="text-sm font-medium text-foreground"
        >
          Kartu Ucapan
        </label>
        <textarea
          id="greeting-text"
          rows={6}
          value={greeting}
          disabled={isLoading}
          onChange={(event) => setGreeting(event.target.value)}
          className="mt-1.5 w-full resize-none rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none focus:border-primary disabled:opacity-60"
        />
      </div>

      <div className="rounded-xl bg-card p-6 text-center shadow-lg ring-1 ring-primary/10">
        <p className="text-xs tracking-widest text-muted-foreground uppercase">
          Pratinjau
        </p>
        <h3 className="font-heading mt-2 text-lg font-semibold text-foreground italic">
          Selamat Ulang Tahun
        </h3>
        <p className="mt-3 text-pretty text-sm leading-relaxed whitespace-pre-line text-muted-foreground">
          {greeting || "..."}
        </p>
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
