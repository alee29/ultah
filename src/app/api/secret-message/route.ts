import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import { db } from "@/db";
import { secretMessages } from "@/db/schema";

export async function GET() {
  const [row] = await db
    .select()
    .from(secretMessages)
    .where(eq(secretMessages.id, "1"))
    .limit(1);

  if (!row) {
    return NextResponse.json(
      { error: "Pesan rahasia belum tersedia." },
      { status: 404 }
    );
  }

  return NextResponse.json(row);
}
