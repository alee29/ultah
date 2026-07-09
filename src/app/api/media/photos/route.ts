import { randomUUID } from "node:crypto";

import { and, asc, eq } from "drizzle-orm";
import { NextResponse, type NextRequest } from "next/server";

import { db } from "@/db";
import { media } from "@/db/schema";
import { isAdminRequestAuthenticated } from "@/lib/admin-pin";
import { saveUploadedPhoto, UploadValidationError } from "@/lib/storage";

export async function GET() {
  const rows = await db
    .select()
    .from(media)
    .where(eq(media.type, "photo"))
    .orderBy(asc(media.sortOrder));

  return NextResponse.json(rows);
}

export async function POST(request: NextRequest) {
  if (!isAdminRequestAuthenticated(request)) {
    return NextResponse.json({ error: "Tidak diizinkan." }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json(
      { error: "File foto wajib diunggah." },
      { status: 400 }
    );
  }

  let url: string;
  try {
    url = await saveUploadedPhoto(file);
  } catch (error) {
    if (error instanceof UploadValidationError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    throw error;
  }

  const existing = await db
    .select({ sortOrder: media.sortOrder })
    .from(media)
    .where(eq(media.type, "photo"));
  const nextSortOrder =
    existing.reduce((max, row) => Math.max(max, row.sortOrder), 0) + 1;

  const [created] = await db
    .insert(media)
    .values({
      id: randomUUID(),
      type: "photo",
      url,
      title: file.name,
      sortOrder: nextSortOrder,
    })
    .returning();

  return NextResponse.json(created, { status: 201 });
}

export async function PATCH(request: NextRequest) {
  if (!isAdminRequestAuthenticated(request)) {
    return NextResponse.json({ error: "Tidak diizinkan." }, { status: 401 });
  }

  let body: { order?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Body request harus berupa JSON." },
      { status: 400 }
    );
  }

  if (
    !Array.isArray(body.order) ||
    !body.order.every((id) => typeof id === "string")
  ) {
    return NextResponse.json(
      { error: 'Field "order" harus berupa array id foto.' },
      { status: 400 }
    );
  }

  const order = body.order as string[];
  await Promise.all(
    order.map((id, index) =>
      db
        .update(media)
        .set({ sortOrder: index + 1 })
        .where(and(eq(media.id, id), eq(media.type, "photo")))
    )
  );

  const rows = await db
    .select()
    .from(media)
    .where(eq(media.type, "photo"))
    .orderBy(asc(media.sortOrder));

  return NextResponse.json(rows);
}
