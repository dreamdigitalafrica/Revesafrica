import "server-only";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// A separate URL override is useful for isolated integration tests, never sent to the browser.
const base =
  process.env.POCKETBASE_ADMIN_URL || "https://revesfoundation.pockethost.io";
export const sessionCookie = "reves_editor";
export const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  path: "/",
  maxAge: 60 * 60 * 8,
};
export class AdminError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}
export type Session = { token: string; kind: "admins" | "superusers" };
export async function backend(
  path: string,
  init: RequestInit = {},
  token?: string,
) {
  const headers = new Headers(init.headers);
  if (token) headers.set("Authorization", token);
  try {
    return await fetch(`${base}/api/${path}`, {
      ...init,
      headers,
      cache: "no-store",
      signal: AbortSignal.timeout(20000),
    });
  } catch {
    throw new AdminError(
      503,
      "The content service is unavailable. Your changes have not been saved. Please try again.",
    );
  }
}
export function authPath(kind: Session["kind"]) {
  return kind === "admins" ? "admins" : "collections/_superusers";
}
export async function requireEditor(): Promise<Session> {
  const raw = cookies().get(sessionCookie)?.value;
  if (!raw) throw new AdminError(401, "Please sign in to continue.");
  let session: Session;
  try {
    session = JSON.parse(raw);
  } catch {
    throw new AdminError(401, "Please sign in again.");
  }
  if (!session.token || !["admins", "superusers"].includes(session.kind))
    throw new AdminError(401, "Please sign in again.");
  const result = await backend(
    `${authPath(session.kind)}/auth-refresh`,
    { method: "POST" },
    session.token,
  );
  if (!result.ok)
    throw new AdminError(
      result.status >= 500 ? 503 : 401,
      result.status >= 500
        ? "The content service is unavailable. Please try again."
        : "Your session has expired. Sign in again to continue.",
    );
  // Verify the token with PocketBase on every request; never trust a decoded token or a client-side role.
  return session;
}
export function sameOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  const expected = new URL(request.url).origin;
  if (!origin || origin !== expected)
    throw new AdminError(
      403,
      "This request could not be verified. Reload the page and try again.",
    );
}
export function json(data: unknown, status = 200) {
  return NextResponse.json(data, {
    status,
    headers: {
      "Cache-Control": "no-store, private",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
export function failure(error: unknown) {
  return json(
    {
      error:
        error instanceof AdminError
          ? error.message
          : "Something went wrong. Your changes were not saved. Please try again.",
    },
    error instanceof AdminError ? error.status : 500,
  );
}
export async function collection(token: string) {
  const response = await backend("collections/projects", {}, token);
  if (!response.ok)
    throw new AdminError(502, "Unable to read the post collection settings.");
  return response.json();
}
export const extraFields = [
  "websiteStatus",
  "featuredImageAlt",
  "category",
  "photos",
];
export function isConfigured(schema: {
  fields?: { name: string }[];
  schema?: { name: string }[];
  listRule?: string;
  viewRule?: string;
  createRule?: string | null;
  updateRule?: string | null;
  deleteRule?: string | null;
}) {
  const fields = schema.fields || schema.schema || [];
  return (
    extraFields.every((name) => fields.some((field) => field.name === name)) &&
    [schema.listRule, schema.viewRule].every(
      (rule) =>
        typeof rule === "string" && rule.includes('websiteStatus != "draft"'),
    ) &&
    [schema.createRule, schema.updateRule, schema.deleteRule].every(
      (rule) => rule === null,
    )
  );
}
export function validId(id: string) {
  if (!/^[a-z0-9]{15}$/.test(id)) throw new AdminError(400, "Invalid post.");
}
