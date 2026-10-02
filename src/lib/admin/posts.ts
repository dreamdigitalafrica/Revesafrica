import "server-only";
import {
  AdminError,
  backend,
  collection,
  isConfigured,
  validId,
} from "./server";
import { cleanStory, plainText } from "./content";
import { Post } from "@/types";

export async function readPost(token: string, id: string): Promise<Post> {
  validId(id);
  const response = await backend(
    `collections/projects/records/${id}`,
    {},
    token,
  );
  if (!response.ok)
    throw new AdminError(
      response.status === 404 ? 404 : 502,
      "Unable to load this post. Refresh the list and try again.",
    );
  return response.json();
}
async function checkImage(file: File) {
  if (file.size > 3000000)
    throw new AdminError(400, "Each photo must be smaller than 3 MB.");
  const bytes = new Uint8Array(await file.slice(0, 12).arrayBuffer());
  const png =
    bytes[0] === 137 && bytes[1] === 80 && bytes[2] === 78 && bytes[3] === 71;
  const jpg = bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255;
  const gif = String.fromCharCode(...Array.from(bytes.slice(0, 6))).match(
    /^GIF8[79]a$/,
  );
  const webp =
    String.fromCharCode(...Array.from(bytes.slice(0, 4))) === "RIFF" &&
    String.fromCharCode(...Array.from(bytes.slice(8, 12))) === "WEBP";
  if (!(
    (png && file.type === "image/png") ||
    (jpg && file.type === "image/jpeg") ||
    (gif && file.type === "image/gif") ||
    (webp && file.type === "image/webp")
  ))
    throw new AdminError(400, "Please choose a JPG, PNG, WebP, or GIF photo.");
}
export async function savePost(token: string, input: FormData, id?: string) {
  if (!isConfigured(await collection(token)))
    throw new AdminError(
      409,
      "Finish the one-time editor setup before saving posts.",
    );
  const original = id ? await readPost(token, id) : undefined;
  if (original && input.get("updated") !== original.updated)
    throw new AdminError(
      409,
      "This post changed since you opened it. Keep a copy of your edits, then reopen the latest version.",
    );
  const data = new FormData();
  const limits: Record<string, number> = {
    title: 300,
    description: 2000,
    author: 150,
    category: 100,
    featuredImageAlt: 300,
    content: 250000,
  };
  for (const [field, limit] of Object.entries(limits)) {
    const value = input.get(field);
    if (typeof value !== "string" || value.length > limit)
      throw new AdminError(
        400,
        `Please check ${field}. Maximum length: ${limit} characters.`,
      );
    data.set(field, field === "content" ? cleanStory(value) : value.trim());
  }
  if (
    !data.get("title") ||
    !data.get("author") ||
    !plainText(String(data.get("content")))
  )
    throw new AdminError(400, "Add a title, author, and story before saving.");
  const date = input.get("datePublished");
  if (typeof date !== "string" || !date || !Number.isFinite(Date.parse(date)))
    throw new AdminError(400, "Choose a valid publication date.");
  data.set("datePublished", new Date(date).toISOString());
  const status = input.get("websiteStatus");
  if (status !== "published" && status !== "draft")
    throw new AdminError(400, "Choose published or draft.");
  data.set("websiteStatus", status);
  data.set("isPublished", String(status === "published"));
  const cover = input.get("featuredImage");
  if (
    original?.featuredImage &&
    String(data.get("content")).includes(original.featuredImage) &&
    ((cover instanceof File && cover.size) ||
      input.get("removeCover") === "true")
  )
    throw new AdminError(
      400,
      "This cover photo is also used in the story. Remove it from the story before replacing or deleting the photo.",
    );
  if (cover instanceof File && cover.size) {
    await checkImage(cover);
    data.set("featuredImage", cover);
  } else if (input.get("removeCover") === "true") data.set("featuredImage", "");
  const uploads = input
    .getAll("photos")
    .filter((file): file is File => file instanceof File && file.size > 0);
  const removed = input
    .getAll("removePhotos")
    .filter((name): name is string => typeof name === "string");
  if (removed.some((name) => !original?.photos?.includes(name)))
    throw new AdminError(
      400,
      "A photo could not be found. Reopen the post and try again.",
    );
  if ((original?.photos?.length || 0) - removed.length + uploads.length > 20)
    throw new AdminError(400, "A post can have up to 20 additional photos.");
  for (const file of uploads) {
    await checkImage(file);
    data.append("photos", file);
  }
  for (const name of removed) {
    if (String(data.get("content")).includes(encodeURIComponent(name)))
      throw new AdminError(
        400,
        "Remove a photo from the story before deleting it from Photos.",
      );
  }
  for (const name of removed) data.append("photos-", name);
  const response = await backend(
    `collections/projects/records${id ? `/${id}` : ""}`,
    { method: id ? "PATCH" : "POST", body: data },
    token,
  );
  if (!response.ok) {
    const details = await response.json().catch(() => ({}));
    const fields = Object.keys(details.data || {}).filter(
      (name) =>
        name in limits ||
        ["datePublished", "featuredImage", "photos"].includes(name),
    );
    throw new AdminError(
      response.status === 400 ? 400 : 502,
      fields.length
        ? `The content service rejected these fields: ${fields.join(", ")}. Check their values and try again.`
        : "The post could not be saved. Your edits are still in the editor. Please try again.",
    );
  }
  return response.json();
}
