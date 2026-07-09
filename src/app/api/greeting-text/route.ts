import { eq } from "drizzle-orm";
import { NextResponse, type NextRequest } from "next/server";

import { db } from "@/db";
import { greetingText } from "@/db/schema";
import { isAdminRequestAuthenticated } from "@/lib/admin-pin";

export async function GET() {
  const [row] = await db
    .select()
    .from(greetingText)
    .where(eq(greetingText.id, "1"))
    .limit(1);

  if (!row) {
    return NextResponse.json(
      { error: "Teks ucapan belum tersedia." },
      { status: 404 }
    );
  }

  return NextResponse.json(row);
}

export async function PUT(request: NextRequest) {
  if (!isAdminRequestAuthenticated(request)) {
    return NextResponse.json({ error: "Tidak diizinkan." }, { status: 401 });
  }

  let body: { content?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Body request harus berupa JSON." },
      { status: 400 }
    );
  }

  const { content } = body;
  if (typeof content !== "string" || content.trim() === "") {
    return NextResponse.json(
      { error: "Teks ucapan wajib diisi." },
      { status: 400 }
    );
  }

  const [existing] = await db
    .select()
    .from(greetingText)
    .where(eq(greetingText.id, "1"))
    .limit(1);

  if (!existing) {
    const [created] = await db
      .insert(greetingText)
      .values({ id: "1", content })
      .returning();
    return NextResponse.json(created);
  }

  const [updated] = await db
    .update(greetingText)
    .set({ content })
    .where(eq(greetingText.id, "1"))
    .returning();

  return NextResponse.json(updated);
}
