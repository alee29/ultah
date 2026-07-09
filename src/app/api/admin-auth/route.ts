import { NextResponse, type NextRequest } from "next/server";

import { ADMIN_PIN, ADMIN_PIN_COOKIE, computePinToken } from "@/lib/admin-pin";

const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

export async function POST(request: NextRequest) {
  let body: { pin?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Body request harus berupa JSON." },
      { status: 400 }
    );
  }

  if (body.pin !== ADMIN_PIN) {
    return NextResponse.json(
      { success: false, error: "PIN salah, coba lagi ya." },
      { status: 401 }
    );
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set(ADMIN_PIN_COOKIE, computePinToken(), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: COOKIE_MAX_AGE_SECONDS,
  });
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete(ADMIN_PIN_COOKIE);
  return response;
}
