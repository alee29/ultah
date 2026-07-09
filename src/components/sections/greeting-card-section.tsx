"use client";

import { motion } from "framer-motion";

import { Card, CardContent } from "@/components/ui/card";
import type { SiteSettings } from "@/lib/mock-data";

type GreetingCardSectionProps = {
  settings: SiteSettings;
};

function formatBirthDate(isoDate: string) {
  return new Date(isoDate).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function GreetingCardSection({ settings }: GreetingCardSectionProps) {
  return (
    <section className="px-6 py-16 sm:py-20 lg:py-24">
      <motion.div
        className="mx-auto max-w-lg lg:max-w-xl"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        <Card className="border-none bg-card/80 py-10 shadow-xl ring-1 ring-primary/10 backdrop-blur lg:py-14">
          <CardContent className="px-8 text-center sm:px-10 lg:px-14">
            <motion.p
              className="font-heading text-sm tracking-widest text-primary uppercase lg:text-base"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {formatBirthDate(settings.birthDate)}
            </motion.p>
            <motion.h2
              className="font-heading mt-3 text-2xl font-semibold text-foreground italic sm:text-3xl lg:text-4xl"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: 0.35 }}
            >
              Selamat Ulang Tahun
            </motion.h2>
            <motion.p
              className="mt-6 text-pretty text-muted-foreground leading-relaxed lg:text-base lg:leading-loose"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {settings.mainGreeting}
            </motion.p>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
}
