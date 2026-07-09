import { eq } from "drizzle-orm";
import { NextResponse, type NextRequest } from "next/server";

import { db } from "@/db";
import { settings } from "@/db/schema";

const EDITABLE_FIELDS = [
  "partnerName",
  "birthDate",
  "mainGreeting",
  "musicUrl",
] as const;

type EditableField = (typeof EDITABLE_FIELDS)[number];
type SettingsInput = Partial<Record<EditableField, unknown>>;

export async function GET() {
  const [row] = await db
    .select()
    .from(settings)
    .where(eq(settings.id, "1"))
    .limit(1);

  if (!row) {
    return NextResponse.json(
      { error: "Pengaturan belum tersedia." },
      { status: 404 }
    );
  }

  return NextResponse.json(row);
}

export async function PUT(request: NextRequest) {
  return handleUpdate(request, { requireAll: true });
}

export async function PATCH(request: NextRequest) {
  return handleUpdate(request, { requireAll: false });
}

async function handleUpdate(
  request: NextRequest,
  { requireAll }: { requireAll: boolean }
) {
  let body: SettingsInput;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Body request harus berupa JSON." },
      { status: 400 }
    );
  }

  try {
    const fields = extractFields(body, requireAll);

    if (Object.keys(fields).length === 0) {
      return NextResponse.json(
        { error: "Tidak ada field untuk diperbarui." },
        { status: 400 }
      );
    }

    const updated = await upsertSettings(fields);
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    );
  }
}

function extractFields(body: SettingsInput, requireAll: boolean) {
  const fields: Partial<Record<EditableField, string>> = {};
  const missing: string[] = [];

  for (const field of EDITABLE_FIELDS) {
    const value = body[field];

    if (value === undefined) {
      if (requireAll) missing.push(field);
      continue;
    }

    if (typeof value !== "string" || value.trim() === "") {
      throw new Error(`Field "${field}" harus berupa teks yang tidak kosong.`);
    }

    fields[field] = value;
  }

  if (missing.length > 0) {
    throw new Error(`Field wajib diisi: ${missing.join(", ")}.`);
  }

  return fields;
}

async function upsertSettings(fields: Partial<Record<EditableField, string>>) {
  const [existing] = await db
    .select()
    .from(settings)
    .where(eq(settings.id, "1"))
    .limit(1);

  if (!existing) {
    const complete = EDITABLE_FIELDS.every((field) => fields[field] !== undefined);
    if (!complete) {
      throw new Error(
        "Pengaturan belum ada. Semua field wajib diisi untuk membuatnya."
      );
    }

    const [created] = await db
      .insert(settings)
      .values({ id: "1", ...fields } as typeof settings.$inferInsert)
      .returning();
    return created;
  }

  const [updated] = await db
    .update(settings)
    .set(fields)
    .where(eq(settings.id, "1"))
    .returning();
  return updated;
}
