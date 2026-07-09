import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import { db } from "@/db";
import { secretMessages } from "@/db/schema";

export async function GET() {
  const [row] = await db
    .select({ showNotification: secretMessages.showNotification })
    .from(secretMessages)
    .where(eq(secretMessages.id, "1"))
    .limit(1);

  return NextResponse.json({ showNotification: row?.showNotification ?? false });
}
