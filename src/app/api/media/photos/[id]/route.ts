import { and, eq } from "drizzle-orm";
import { NextResponse, type NextRequest } from "next/server";

import { db } from "@/db";
import { media } from "@/db/schema";
import { isAdminRequestAuthenticated } from "@/lib/admin-pin";
import { deleteUploadedPhoto } from "@/lib/storage";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAdminRequestAuthenticated(request)) {
    return NextResponse.json({ error: "Tidak diizinkan." }, { status: 401 });
  }

  const { id } = await params;

  const [row] = await db
    .select()
    .from(media)
    .where(and(eq(media.id, id), eq(media.type, "photo")))
    .limit(1);

  if (!row) {
    return NextResponse.json(
      { error: "Foto tidak ditemukan." },
      { status: 404 }
    );
  }

  await db.delete(media).where(eq(media.id, id));
  await deleteUploadedPhoto(row.url);

  return NextResponse.json({ success: true });
}
