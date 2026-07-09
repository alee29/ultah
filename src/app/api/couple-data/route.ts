import { eq } from "drizzle-orm";
import { NextResponse, type NextRequest } from "next/server";

import { db } from "@/db";
import { coupleData } from "@/db/schema";
import { isAdminRequestAuthenticated } from "@/lib/admin-pin";

export async function GET() {
  const [row] = await db
    .select()
    .from(coupleData)
    .where(eq(coupleData.id, "1"))
    .limit(1);

  if (!row) {
    return NextResponse.json(
      { error: "Data pasangan belum tersedia." },
      { status: 404 }
    );
  }

  return NextResponse.json(row);
}

export async function PUT(request: NextRequest) {
  if (!isAdminRequestAuthenticated(request)) {
    return NextResponse.json({ error: "Tidak diizinkan." }, { status: 401 });
  }

  let body: { partnerName?: unknown; birthDate?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Body request harus berupa JSON." },
      { status: 400 }
    );
  }

  const { partnerName, birthDate } = body;
  if (
    typeof partnerName !== "string" ||
    partnerName.trim() === "" ||
    typeof birthDate !== "string" ||
    birthDate.trim() === ""
  ) {
    return NextResponse.json(
      { error: "Nama panggilan dan tanggal ulang tahun wajib diisi." },
      { status: 400 }
    );
  }

  const [existing] = await db
    .select()
    .from(coupleData)
    .where(eq(coupleData.id, "1"))
    .limit(1);

  if (!existing) {
    const [created] = await db
      .insert(coupleData)
      .values({ id: "1", partnerName, birthDate })
      .returning();
    return NextResponse.json(created);
  }

  const [updated] = await db
    .update(coupleData)
    .set({ partnerName, birthDate })
    .where(eq(coupleData.id, "1"))
    .returning();

  return NextResponse.json(updated);
}
