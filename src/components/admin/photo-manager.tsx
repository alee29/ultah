"use client";

import { useEffect, useState, type ChangeEvent } from "react";
import { Save, Trash2, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/admin/toast-provider";
import { cn } from "@/lib/utils";

type PhotoMedia = {
  id: string;
  url: string;
  title: string | null;
  sortOrder: number;
};

export function PhotoManager() {
  const { showToast } = useToast();
  const [photos, setPhotos] = useState<PhotoMedia[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/media/photos")
      .then((res) => (res.ok ? res.json() : []))
      .then((data: PhotoMedia[]) => {
        if (cancelled) return;
        setPhotos(data);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/media/photos", {
      method: "POST",
      body: formData,
    });

    setIsUploading(false);

    if (!response.ok) {
      const data = await response.json().catch(() => null);
      showToast(data?.error ?? "Gagal mengunggah foto.");
      return;
    }

    const created: PhotoMedia = await response.json();
    setPhotos((prev) => [...prev, created]);
    showToast("Foto diunggah.");
  }

  async function handleDelete(id: string) {
    const response = await fetch(`/api/media/photos/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      showToast("Gagal menghapus foto.");
      return;
    }

    setPhotos((prev) => prev.filter((photo) => photo.id !== id));
    showToast("Foto dihapus.");
  }

  function handleDrop(targetIndex: number) {
    if (dragIndex === null || dragIndex === targetIndex) {
      setDragIndex(null);
      return;
    }

    setPhotos((prev) => {
      const next = [...prev];
      const [moved] = next.splice(dragIndex, 1);
      next.splice(targetIndex, 0, moved);
      return next;
    });
    setDragIndex(null);
  }

  async function handleSaveOrder() {
    setIsSaving(true);

    const response = await fetch("/api/media/photos", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ order: photos.map((photo) => photo.id) }),
    });

    setIsSaving(false);

    if (!response.ok) {
      showToast("Gagal menyimpan urutan foto.");
      return;
    }

    showToast("Foto tersimpan.");
  }

  return (
    <div className="space-y-4">
      <label className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border py-6 text-sm text-muted-foreground hover:border-primary hover:text-primary">
        <Upload className="size-4" />
        {isUploading ? "Mengunggah..." : "Unggah foto baru"}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          disabled={isUploading}
          onChange={handleFileChange}
        />
      </label>

      {isLoading ? (
        <p className="text-sm text-muted-foreground italic">Memuat foto...</p>
      ) : (
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              draggable
              onDragStart={() => setDragIndex(index)}
              onDragOver={(event) => event.preventDefault()}
              onDrop={() => handleDrop(index)}
              className={cn(
                "group relative aspect-square cursor-grab overflow-hidden rounded-lg ring-1 ring-border active:cursor-grabbing",
                dragIndex === index && "opacity-50"
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- uploaded photos served from local/blob storage, not optimizable by next/image config */}
              <img
                src={photo.url}
                alt={photo.title ?? "Foto kenangan"}
                className="size-full object-cover"
              />
              <button
                type="button"
                onClick={() => handleDelete(photo.id)}
                aria-label={`Hapus ${photo.title ?? "foto"}`}
                className="absolute top-1 right-1 flex size-6 items-center justify-center rounded-full bg-destructive/90 text-white opacity-0 transition-opacity group-hover:opacity-100"
              >
                <Trash2 className="size-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      <p className="text-xs text-muted-foreground">
        Seret untuk mengubah urutan, sentuh ikon hapus untuk menghapus foto.
      </p>

      <Button
        onClick={handleSaveOrder}
        disabled={isSaving || isLoading || photos.length === 0}
        className="gap-2 rounded-full"
      >
        <Save className="size-4" />
        {isSaving ? "Menyimpan..." : "Simpan"}
      </Button>
    </div>
  );
}
