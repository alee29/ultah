import { and, eq } from "drizzle-orm";
import { NextResponse, type NextRequest } from "next/server";

import { db } from "@/db";
import { media } from "@/db/schema";
import { isAdminRequestAuthenticated } from "@/lib/admin-pin";

const MUSIC_ID = "music";

export async function GET() {
  const [row] = await db
    .select()
    .from(media)
    .where(and(eq(media.id, MUSIC_ID), eq(media.type, "music")))
    .limit(1);

  if (!row) {
    return NextResponse.json(
      { error: "Musik belum tersedia." },
      { status: 404 }
    );
  }

  return NextResponse.json(row);
}

export async function PUT(request: NextRequest) {
  if (!isAdminRequestAuthenticated(request)) {
    return NextResponse.json({ error: "Tidak diizinkan." }, { status: 401 });
  }

  let body: { url?: unknown; title?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Body request harus berupa JSON." },
      { status: 400 }
    );
  }

  const { url, title } = body;
  if (typeof url !== "string" || url.trim() === "") {
    return NextResponse.json(
      { error: "URL lagu wajib diisi." },
      { status: 400 }
    );
  }
  if (typeof title !== "string" || title.trim() === "") {
    return NextResponse.json(
      { error: "Judul lagu wajib diisi." },
      { status: 400 }
    );
  }

  const [existing] = await db
    .select()
    .from(media)
    .where(and(eq(media.id, MUSIC_ID), eq(media.type, "music")))
    .limit(1);

  if (!existing) {
    const [created] = await db
      .insert(media)
      .values({ id: MUSIC_ID, type: "music", url, title, sortOrder: 0 })
      .returning();
    return NextResponse.json(created);
  }

  const [updated] = await db
    .update(media)
    .set({ url, title })
    .where(and(eq(media.id, MUSIC_ID), eq(media.type, "music")))
    .returning();

  return NextResponse.json(updated);
}
