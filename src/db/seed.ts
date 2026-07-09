import { eq } from "drizzle-orm";

import { db } from "@/db";
import { settings } from "@/db/schema";

const defaultSettings = {
  id: "1",
  partnerName: "Sazkia Aurelia",
  birthDate: "2005-07-10",
  mainGreeting:
    "Selamat ulang tahun, sayangku. Setiap hari yang kulewati bersamamu terasa seperti hadiah, dan hari ini adalah harimu untuk dirayakan sepenuh hati. Semoga tahun ini membawa lebih banyak tawa, kejutan manis, dan mimpi-mimpi yang jadi nyata. Terima kasih sudah menjadi alasan aku tersenyum setiap hari. Aku mencintaimu, lebih dari yang bisa diucapkan kata-kata.",
  musicUrl: "/audio/happy-birthday.wav",
} satisfies typeof settings.$inferInsert;

async function seed() {
  const [existing] = await db
    .select()
    .from(settings)
    .where(eq(settings.id, "1"))
    .limit(1);

  if (existing) {
    await db
      .update(settings)
      .set(defaultSettings)
      .where(eq(settings.id, "1"));
    console.log("Settings default sudah diperbarui.");
    return;
  }

  await db.insert(settings).values(defaultSettings);
  console.log("Settings default berhasil ditambahkan.");
}

seed()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Gagal seeding settings:", error);
    process.exit(1);
  });
