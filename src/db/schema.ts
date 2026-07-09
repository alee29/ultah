import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const settings = sqliteTable("settings", {
  id: text("id").primaryKey().default("1"),
  partnerName: text("partner_name").notNull(),
  birthDate: text("birth_date").notNull(),
  mainGreeting: text("main_greeting").notNull(),
  musicUrl: text("music_url").notNull(),
});

export const secretMessages = sqliteTable("secret_messages", {
  id: text("id").primaryKey().default("1"),
  passcode: text("passcode").notNull(),
  letterContent: text("letter_content").notNull(),
  showNotification: integer("show_notification", { mode: "boolean" })
    .notNull()
    .default(true),
});

export const coupleData = sqliteTable("couple_data", {
  id: text("id").primaryKey().default("1"),
  partnerName: text("partner_name").notNull(),
  birthDate: text("birth_date").notNull(),
});

export const greetingText = sqliteTable("greeting_text", {
  id: text("id").primaryKey().default("1"),
  content: text("content").notNull(),
});

export const media = sqliteTable("media", {
  id: text("id").primaryKey(),
  type: text("type", { enum: ["music", "photo"] }).notNull(),
  url: text("url").notNull(),
  title: text("title"),
  sortOrder: integer("sort_order").notNull().default(0),
});
