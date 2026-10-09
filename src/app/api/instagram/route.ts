import { NextResponse } from "next/server";

const profileUrl = "https://www.instagram.com/revesfoundation/";
const emptyFeed = { posts: [], profileUrl };

function safeUrl(value: unknown, image = false): value is string {
  if (typeof value !== "string") return false;
  try {
    const url = new URL(value);
    const hosts = image ? ["cdninstagram.com", "fbcdn.net"] : ["instagram.com"];
    return url.protocol === "https:" && hosts.some(host => url.hostname === host || url.hostname.endsWith(`.${host}`));
  } catch { return false; }
}

export async function GET() {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!token) return NextResponse.json({ ...emptyFeed, status: "not_connected" });
  try {
    const options = { headers: { Authorization: `Bearer ${token}` }, next: { revalidate: 3600 }, signal: AbortSignal.timeout(10000) };
    const [accountResponse, mediaResponse] = await Promise.all([
      fetch("https://graph.instagram.com/me?fields=username", options),
      fetch("https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&limit=12", options),
    ]);
    if (!accountResponse.ok || !mediaResponse.ok) throw new Error("Instagram unavailable");
    const [account, media] = await Promise.all([accountResponse.json(), mediaResponse.json()]);
    if (account.username?.toLowerCase() !== "revesfoundation") throw new Error("Account mismatch");
    const posts = (Array.isArray(media.data) ? media.data : []).flatMap((item: Record<string, unknown>) => {
      const imageUrl = item.media_type === "VIDEO" ? item.thumbnail_url : item.media_url;
      if (typeof item.id !== "string" || !safeUrl(imageUrl, true) || !safeUrl(item.permalink)) return [];
      return [{ id: item.id, imageUrl, permalink: item.permalink, caption: typeof item.caption === "string" ? item.caption.slice(0, 250) : "Reves Foundation on Instagram" }];
    }).slice(0, 6);
    return NextResponse.json({ posts, profileUrl, status: "connected" });
  } catch {
    // Never expose Meta responses or account credentials in a public error.
    return NextResponse.json({ ...emptyFeed, status: "unavailable" });
  }
}
