import crypto from "crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE_NAME = "jade_admin_session";
const SESSION_MAX_AGE_SEC = 60 * 60 * 24 * 7; // 7 days

function getSecretKey(): string {
  return (
    process.env.ADMIN_SESSION_SECRET ||
    "jade_coatings_secret_session_key_2026_super_secure_token"
  );
}

export function getAdminCredentials() {
  const username = process.env.ADMIN_USERNAME || "admin";
  const password = process.env.ADMIN_PASSWORD || "adminjade2026";
  return { username, password };
}

/**
 * Creates a signed HMAC session token: username:timestamp:expiresAt.signature
 */
export function createSessionToken(username: string): string {
  const secret = getSecretKey();
  const timestamp = Date.now();
  const expiresAt = timestamp + SESSION_MAX_AGE_SEC * 1000;
  const payload = `${username}:${timestamp}:${expiresAt}`;
  
  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(payload);
  const signature = hmac.digest("hex");
  
  return `${Buffer.from(payload).toString("base64url")}.${signature}`;
}

/**
 * Verifies a signed HMAC session token
 */
export function verifySessionToken(token: string): { valid: boolean; username?: string } {
  if (!token) return { valid: false };

  try {
    const [encodedPayload, signature] = token.split(".");
    if (!encodedPayload || !signature) return { valid: false };

    const payload = Buffer.from(encodedPayload, "base64url").toString("utf-8");
    const [username, , expiresAtStr] = payload.split(":");
    const expiresAt = Number(expiresAtStr);

    if (!username || isNaN(expiresAt)) return { valid: false };
    if (Date.now() > expiresAt) return { valid: false };

    const secret = getSecretKey();
    const hmac = crypto.createHmac("sha256", secret);
    hmac.update(payload);
    const expectedSignature = hmac.digest("hex");

    // Timing-safe comparison to prevent timing attacks
    const sigBuf = Buffer.from(signature);
    const expectedBuf = Buffer.from(expectedSignature);
    if (sigBuf.length !== expectedBuf.length) return { valid: false };
    if (!crypto.timingSafeEqual(sigBuf, expectedBuf)) return { valid: false };

    return { valid: true, username };
  } catch {
    return { valid: false };
  }
}

/**
 * Checks admin authentication from Next.js server context cookies
 */
export function getAdminSession(): { authenticated: boolean; username?: string } {
  try {
    const cookieStore = cookies();
    const sessionCookie = cookieStore.get(ADMIN_COOKIE_NAME);
    if (!sessionCookie || !sessionCookie.value) {
      return { authenticated: false };
    }
    const result = verifySessionToken(sessionCookie.value);
    return { authenticated: result.valid, username: result.username };
  } catch {
    return { authenticated: false };
  }
}
