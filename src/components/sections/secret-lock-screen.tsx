"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PinPad } from "@/components/shared/pin-pad";

type SecretLockScreenProps = {
  passcode: string;
  onClose: () => void;
  onUnlock: () => void;
};

export function SecretLockScreen({
  passcode,
  onClose,
  onUnlock,
}: SecretLockScreenProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 px-6 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-6 right-6 rounded-full"
        aria-label="Tutup"
        onClick={onClose}
      >
        <X className="size-5" />
      </Button>

      <motion.div
        className="w-full max-w-sm rounded-2xl bg-card p-8 shadow-xl ring-1 ring-primary/10"
        initial={{ opacity: 0, scale: 0.9, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <PinPad
          title="Pesan Rahasia"
          subtitle="Masukkan PIN rahasia kita"
          onSubmit={(pin) =>
            pin === passcode
              ? { success: true }
              : { success: false, error: "PIN salah, coba lagi ya." }
          }
          onSuccess={onUnlock}
        />
      </motion.div>
    </motion.div>
  );
}
