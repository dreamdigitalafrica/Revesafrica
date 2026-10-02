// Run against an isolated PocketBase test instance, never a live content database.
// ADMIN_TEST_URL=http://localhost:3192 ADMIN_TEST_DATABASE=http://127.0.0.1:8192
// ADMIN_TEST_EMAIL=... ADMIN_TEST_PASSWORD=... node scripts/check-admin.mjs
import assert from "node:assert/strict";
const app = process.env.ADMIN_TEST_URL;
const database = process.env.ADMIN_TEST_DATABASE;
const email = process.env.ADMIN_TEST_EMAIL;
const password = process.env.ADMIN_TEST_PASSWORD;
for (const url of [app, database]) {
  assert.ok(
    url && ["localhost", "127.0.0.1"].includes(new URL(url).hostname),
    "Tests require explicit loopback-only app and database URLs.",
  );
}
assert.ok(
  email && password,
  "Set credentials for the disposable test database.",
);
let cookie = "";
let checks = 0;
const check = (actual, expected, label) => {
  assert.equal(actual, expected, label);
  console.log("PASS", label);
  checks++;
};
async function call(path, method = "GET", body, options = {}) {
  const headers = {
    Origin: app,
    ...(cookie ? { Cookie: cookie } : {}),
    ...options.headers,
  };
  if (body && !(body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
    body = JSON.stringify(body);
  }
  return fetch(app + path, { method, headers, body });
}
check(
  (await call("/api/admin/posts")).status,
  401,
  "Anonymous posts list denied",
);
check(
  (await call("/api/admin/posts", "POST", new FormData())).status,
  401,
  "Anonymous write denied",
);
check(
  (await call("/api/admin/setup", "POST")).status,
  401,
  "Anonymous setup denied",
);
check(
  (
    await call(
      "/api/admin/session",
      "POST",
      { email, password },
      { headers: { Origin: "https://attacker.example" } },
    )
  ).status,
  403,
  "Cross-origin sign-in denied",
);
check(
  (
    await call("/api/admin/session", "POST", {
      email,
      password: "wrong-password",
    })
  ).status,
  401,
  "Invalid password denied",
);
const login = await call("/api/admin/session", "POST", { email, password });
check(login.status, 200, "Administrator can sign in");
const setCookie = login.headers.get("set-cookie");
assert.match(setCookie, /HttpOnly/i);
assert.match(setCookie, /SameSite=strict/i);
assert.match(setCookie, /Secure/i);
cookie = setCookie.split(";")[0];
check(
  (await login.json()).token,
  undefined,
  "Token is never returned in the JSON response",
);
check(
  (await call("/api/admin/session")).status,
  200,
  "Authenticated session verified",
);
const before = await (
  await fetch(database + "/api/collections/projects/records")
).json();
check(
  (await call("/api/admin/setup", "POST")).status,
  200,
  "Actual PocketBase schema setup succeeds",
);
check(
  (await call("/api/admin/setup", "POST")).status,
  200,
  "Setup is safe to repeat",
);
check(
  (await (await call("/api/admin/setup")).json()).configured,
  true,
  "All editor fields and draft rules exist",
);
const after = await (
  await fetch(database + "/api/collections/projects/records")
).json();
check(
  after.totalItems,
  before.totalItems,
  "Setup preserves visibility of legacy stories",
);
check(
  (
    await call("/api/admin/posts", "POST", new FormData(), {
      headers: { Origin: "https://attacker.example" },
    })
  ).status,
  403,
  "Cross-origin write denied",
);
function form(overrides = {}) {
  const data = new FormData();
  Object.entries({
    title: "Editor integration story",
    description: "An original summary",
    author: "Test author",
    category: "Community",
    featuredImageAlt: "Test photo description",
    content:
      '<h2>Original heading</h2><p>Original text <strong>in bold</strong>.</p><script>alert(1)</script><img src="https://example.com/photo.jpg" onerror="alert(1)">',
    datePublished: "2024-10-01T12:00:00.000Z",
    websiteStatus: "draft",
    ...overrides,
  }).forEach(([key, value]) => data.set(key, value));
  return data;
}
const image = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+k5KkAAAAASUVORK5CYII=",
  "base64",
);
const data = form();
data.set(
  "featuredImage",
  new File([image], "cover.png", { type: "image/png" }),
);
data.append("photos", new File([image], "story.png", { type: "image/png" }));
let response = await call("/api/admin/posts", "POST", data);
check(
  response.status,
  201,
  "Draft created with actual cover and gallery uploads",
);
let { post } = await response.json();
assert.ok(post.featuredImage);
check(post.photos.length, 1, "Gallery filename persisted");
check(post.author, "Test author", "Author persisted");
check(
  post.datePublished,
  "2024-10-01 12:00:00.000Z",
  "Publication date persisted",
);
check(
  post.featuredImageAlt,
  "Test photo description",
  "Image description persisted",
);
check(post.content.includes("<script"), false, "Scripts stripped from story");
check(
  post.content.includes("onerror"),
  false,
  "Unsafe HTML attributes stripped",
);
check(
  (await fetch(database + "/api/collections/projects/records/" + post.id))
    .status,
  404,
  "Draft protected by actual PocketBase read rule",
);
const list = await (await call("/api/admin/posts")).json();
assert.ok(list.items.find((p) => p.id === post.id));
const badImage = form({ updated: post.updated });
badImage.set(
  "featuredImage",
  new File(["not a photo"], "fake.png", { type: "image/png" }),
);
check(
  (await call("/api/admin/posts/" + post.id, "PATCH", badImage)).status,
  400,
  "Disguised non-image upload rejected",
);
check(
  (
    await call(
      "/api/admin/posts/" + post.id,
      "PATCH",
      form({ updated: "stale" }),
    )
  ).status,
  409,
  "Stale edit detected",
);
check(
  (
    await call(
      "/api/admin/posts/" + post.id,
      "PATCH",
      form({ updated: post.updated, author: "" }),
    )
  ).status,
  400,
  "Required author validated",
);
const edit = form({
  updated: post.updated,
  websiteStatus: "published",
  title: "Updated title",
  author: "Updated author",
});
edit.append("photos", new File([image], "second.png", { type: "image/png" }));
response = await call("/api/admin/posts/" + post.id, "PATCH", edit);
check(response.status, 200, "Existing draft edited and published");
post = (await response.json()).post;
check(
  post.photos.length,
  2,
  "Adding a photo preserves earlier gallery uploads",
);
const published = await (
  await fetch(database + "/api/collections/projects/records/" + post.id)
).json();
check(published.title, "Updated title", "Public API returns updated title");
check(published.author, "Updated author", "Public API returns updated author");
check(
  (
    await fetch(database + "/api/collections/projects/records/" + post.id, {
      method: "PATCH",
      body: form({ title: "Unauthorized" }),
    })
  ).status,
  403,
  "Anonymous database write denied",
);
const remove = form({
  updated: post.updated,
  websiteStatus: "draft",
  removeCover: "true",
});
remove.append("removePhotos", post.photos[0]);
response = await call("/api/admin/posts/" + post.id, "PATCH", remove);
check(response.status, 200, "Can unpublish and remove photos");
post = (await response.json()).post;
check(post.featuredImage, "", "Cover removed");
check(post.photos.length, 1, "Only selected gallery photo removed");
check(
  (await fetch(database + "/api/collections/projects/records/" + post.id))
    .status,
  404,
  "Unpublished post immediately hidden at database",
);
check(
  (
    await call("/api/admin/session", "DELETE", undefined, {
      headers: { Origin: "https://attacker.example" },
    })
  ).status,
  403,
  "Cross-origin sign-out denied",
);
const logout = await call("/api/admin/session", "DELETE");
check(logout.status, 200, "Sign-out succeeds");
assert.match(logout.headers.get("set-cookie"), /Max-Age=0/);
cookie = "";
check(
  (await call("/api/admin/posts")).status,
  401,
  "Signed-out browser cannot read admin data",
);
console.log(
  `${checks} integration checks passed against real isolated PocketBase.`,
);
