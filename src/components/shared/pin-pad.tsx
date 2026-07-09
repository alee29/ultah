"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Delete, Lock } from "lucide-react";

const PIN_LENGTH = 6;
const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "back"];

type PinPadProps = {
  title: string;
  subtitle?: string;
  onSubmit: (
    pin: string
  ) => Promise<{ success: boolean; error?: string }> | {
    success: boolean;
    error?: string;
  };
  onSuccess: () => void;
};

export function PinPad({ title, subtitle, onSubmit, onSuccess }: PinPadProps) {
  const [digits, setDigits] = useState("");
  const [error, setError] = useState("");
  const [isChecking, setIsChecking] = useState(false);

  async function handleKeyPress(key: string) {
    if (isChecking) return;

    if (key === "back") {
      setDigits((prev) => prev.slice(0, -1));
      return;
    }
    if (key === "" || digits.length >= PIN_LENGTH) return;

    setError("");
    const next = digits + key;
    setDigits(next);

    if (next.length !== PIN_LENGTH) return;

    setIsChecking(true);
    const result = await onSubmit(next);
    setIsChecking(false);

    if (result.success) {
      onSuccess();
      return;
    }

    setError(result.error ?? "PIN salah, coba lagi ya.");
    setDigits("");
  }

  return (
    <div className="w-full max-w-xs">
      <Lock className="mx-auto size-8 text-primary" />
      <h2 className="font-heading mt-4 text-center text-xl font-semibold text-foreground italic">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-center text-sm text-muted-foreground">
          {subtitle}
        </p>
      )}

      <motion.div
        className="mt-6 flex justify-center gap-3"
        animate={error ? { x: [0, -8, 8, -8, 8, 0] } : {}}
        transition={{ duration: 0.4 }}
      >
        {Array.from({ length: PIN_LENGTH }, (_, index) => (
          <span
            key={index}
            className={`size-3 rounded-full border-2 transition-colors ${
              index < digits.length
                ? "border-primary bg-primary"
                : "border-border bg-transparent"
            }`}
          />
        ))}
      </motion.div>

      <p className="mt-2 h-4 text-center text-xs text-destructive">{error}</p>

      <div className="mt-4 grid grid-cols-3 gap-3">
        {KEYS.map((key, index) =>
          key === "" ? (
            <div key={`empty-${index}`} />
          ) : (
            <button
              key={key}
              type="button"
              onClick={() => handleKeyPress(key)}
              disabled={isChecking}
              aria-label={key === "back" ? "Hapus" : `Angka ${key}`}
              className="flex h-14 items-center justify-center rounded-full bg-card text-lg font-medium text-foreground shadow-sm ring-1 ring-primary/10 transition-colors active:bg-accent disabled:opacity-50"
            >
              {key === "back" ? <Delete className="size-5" /> : key}
            </button>
          )
        )}
      </div>
    </div>
  );
}
