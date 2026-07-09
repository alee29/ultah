"use client";

import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { PinPad } from "@/components/shared/pin-pad";

export default function AdminLoginPage() {
  const router = useRouter();

  async function handleSubmit(pin: string) {
    const response = await fetch("/api/admin-auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pin }),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => null);
      return {
        success: false,
        error: data?.error ?? "PIN salah, coba lagi ya.",
      };
    }

    return { success: true };
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-background px-6">
      <Heart className="mb-4 size-8 text-primary" fill="currentColor" />

      <Card className="w-full max-w-sm border-none shadow-xl ring-1 ring-primary/10">
        <CardContent className="px-8 py-10">
          <p className="font-heading text-center text-sm tracking-widest text-primary uppercase">
            Area Terbatas
          </p>

          <div className="mt-6 flex justify-center">
            <PinPad
              title="Masuk ke Pengaturan"
              subtitle="Masukkan PIN admin"
              onSubmit={handleSubmit}
              onSuccess={() => router.push("/admin/dashboard")}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
