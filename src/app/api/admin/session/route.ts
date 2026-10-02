import { NextRequest } from "next/server";
import {
  AdminError,
  authPath,
  backend,
  cookieOptions,
  failure,
  json,
  requireEditor,
  sameOrigin,
  sessionCookie,
  Session,
} from "@/lib/admin/server";
export const dynamic = "force-dynamic";
// Best-effort per-instance throttle; PocketHost's own protections also apply.
const attempts = new Map<string, { count: number; until: number }>();
export async function POST(request: NextRequest) {
  try {
    sameOrigin(request);
    const key =
      request.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
    const now = Date.now();
    attempts.forEach((entry, key) => {
      if (entry.until < now) attempts.delete(key);
    });
    if (attempts.size > 5000)
      throw new AdminError(
        429,
        "Please wait a few minutes before trying again.",
      );
    const attempt = attempts.get(key) || { count: 0, until: now + 600000 };
    if (attempt.count >= 8)
      throw new AdminError(
        429,
        "Too many sign-in attempts. Please wait 10 minutes.",
      );
    attempt.count++;
    attempts.set(key, attempt);
    const { email, password } = await request.json();
    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      !email.trim() ||
      email.length > 254 ||
      password.length > 1024
    )
      throw new AdminError(400, "Enter your email and password.");
    let kind: Session["kind"] = "admins";
    const init = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identity: email.trim(), password }),
    };
    let response = await backend(`${authPath(kind)}/auth-with-password`, init);
    if (response.status === 404) {
      kind = "superusers";
      response = await backend(`${authPath(kind)}/auth-with-password`, init);
    }
    if (!response.ok)
      throw new AdminError(
        response.status === 429 ? 429 : response.status >= 500 ? 503 : 401,
        response.status === 429
          ? "Too many attempts. Please try again later."
          : response.status >= 500
            ? "The content service is unavailable. Please try again."
            : "Sign-in failed. Use your existing PocketBase administrator email and password.",
      );
    const data = await response.json();
    if (!data.token || !(data.admin || data.record))
      throw new AdminError(401, "Unable to verify your administrator account.");
    attempts.delete(key);
    const result = json({ signedIn: true });
    result.cookies.set(
      sessionCookie,
      JSON.stringify({ token: data.token, kind }),
      cookieOptions,
    );
    return result;
  } catch (error) {
    return failure(error);
  }
}
export async function GET() {
  try {
    await requireEditor();
    return json({ signedIn: true });
  } catch (error) {
    return failure(error);
  }
}
export async function DELETE(request: NextRequest) {
  try {
    sameOrigin(request);
    const result = json({ signedIn: false });
    result.cookies.set(sessionCookie, "", { ...cookieOptions, maxAge: 0 });
    return result;
  } catch (error) {
    return failure(error);
  }
}
