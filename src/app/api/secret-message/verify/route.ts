import { eq } from "drizzle-orm";
import { NextResponse, type NextRequest } from "next/server";

import { db } from "@/db";
import { secretMessages } from "@/db/schema";

export async function POST(request: NextRequest) {
  let body: { passcode?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Body request harus berupa JSON." },
      { status: 400 }
    );
  }

  if (typeof body.passcode !== "string" || body.passcode.trim() === "") {
    return NextResponse.json({ error: "Kode wajib diisi." }, { status: 400 });
  }

  const [row] = await db
    .select()
    .from(secretMessages)
    .where(eq(secretMessages.id, "1"))
    .limit(1);

  if (!row || body.passcode !== row.passcode) {
    return NextResponse.json(
      { valid: false, error: "Kode salah, coba lagi." },
      { status: 401 }
    );
  }

  return NextResponse.json({
    valid: true,
    letterContent: row.letterContent,
  });
}
