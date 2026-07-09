"use client";

import { useEffect, useState } from "react";
import { Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/admin/toast-provider";
import { mockSettings } from "@/lib/mock-data";

export function PartnerDataForm() {
  const { showToast } = useToast();
  const [name, setName] = useState(mockSettings.partnerName);
  const [date, setDate] = useState(mockSettings.birthDate);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/couple-data")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (cancelled || !data) return;
        setName(data.partnerName);
        setDate(data.birthDate);
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

    const response = await fetch("/api/couple-data", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ partnerName: name, birthDate: date }),
    });

    setIsSaving(false);

    if (!response.ok) {
      showToast("Gagal menyimpan data pasangan.");
      return;
    }

    showToast("Data pasangan tersimpan.");
  }

  const formattedDate = date
    ? new Date(date).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  return (
    <div className="space-y-5">
      <div>
        <label
          htmlFor="partner-name"
          className="text-sm font-medium text-foreground"
        >
          Nama Panggilan
        </label>
        <input
          id="partner-name"
          type="text"
          value={name}
          disabled={isLoading}
          onChange={(event) => setName(event.target.value)}
          className="mt-1.5 w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none focus:border-primary disabled:opacity-60"
        />
      </div>

      <div>
        <label
          htmlFor="partner-date"
          className="text-sm font-medium text-foreground"
        >
          Tanggal Ulang Tahun
        </label>
        <input
          id="partner-date"
          type="date"
          value={date}
          disabled={isLoading}
          onChange={(event) => setDate(event.target.value)}
          className="mt-1.5 w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none focus:border-primary disabled:opacity-60"
        />
      </div>

      <div className="rounded-xl bg-accent/30 p-4 text-center">
        <p className="text-xs tracking-widest text-muted-foreground uppercase">
          Pratinjau
        </p>
        <p className="font-heading mt-2 text-lg text-foreground italic">
          Untuk {name || "..."}
        </p>
        <p className="text-xs text-muted-foreground">{formattedDate}</p>
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
