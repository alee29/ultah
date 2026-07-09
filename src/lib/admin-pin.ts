import { createHash } from "node:crypto";

import type { NextRequest } from "next/server";

export const ADMIN_PIN = "100705";
export const ADMIN_PIN_COOKIE = "admin_pin_ok";

function secret() {
  return process.env.ADMIN_PIN_SECRET ?? "dev-only-insecure-pin-secret";
}

export function computePinToken() {
  return createHash("sha256").update(`${ADMIN_PIN}:${secret()}`).digest("hex");
}

export function isValidPinToken(token: string | undefined | null) {
  return Boolean(token) && token === computePinToken();
}

export function isAdminRequestAuthenticated(request: NextRequest) {
  return isValidPinToken(request.cookies.get(ADMIN_PIN_COOKIE)?.value);
}
