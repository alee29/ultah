"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import { HeartNotification } from "@/components/sections/heart-notification";
import { LetterBox } from "@/components/sections/letter-box";
import { SecretLockScreen } from "@/components/sections/secret-lock-screen";
import type { SecretMessage } from "@/lib/mock-data";

type SecretMessageSectionProps = {
  secret: SecretMessage;
};

export function SecretMessageSection({ secret }: SecretMessageSectionProps) {
  const [isLockOpen, setIsLockOpen] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  return (
    <section className="flex flex-col items-center gap-4 px-6 py-16 text-center sm:py-20">
      <p className="font-heading text-sm tracking-widest text-primary uppercase lg:text-base">
        Pesan Rahasia
      </p>

      {isUnlocked ? (
        <LetterBox letterContent={secret.letterContent} />
      ) : (
        <p className="max-w-sm text-sm text-muted-foreground">
          Ada pesan rahasia yang menunggu untuk dibuka. Sentuh ikon hati yang
          berdetak di pojok layar.
        </p>
      )}

      {secret.showNotification && !isUnlocked && (
        <HeartNotification onClick={() => setIsLockOpen(true)} />
      )}

      <AnimatePresence>
        {isLockOpen && !isUnlocked && (
          <SecretLockScreen
            passcode={secret.passcode}
            onClose={() => setIsLockOpen(false)}
            onUnlock={() => {
              setIsUnlocked(true);
              setIsLockOpen(false);
            }}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
