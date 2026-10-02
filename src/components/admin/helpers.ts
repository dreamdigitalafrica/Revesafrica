import { Post } from "@/types";
import { pbUrl } from "@/lib/pocketbase.util";
export async function request<T>(
  url: string,
  init: RequestInit = {},
): Promise<T> {
  const response = await fetch(url, { ...init, cache: "no-store" });
  const data = await response
    .json()
    .catch(() => ({
      error:
        "The server could not process this request. Try smaller photos or try again.",
    }));
  if (!response.ok)
    throw new Error(data.error || "The request failed. Please try again.");
  return data;
}
export function photoUrl(post: Post, filename: string) {
  return `${pbUrl}api/files/${post.collectionId}/${post.id}/${encodeURIComponent(filename)}`;
}
export function dateLabel(value: string) {
  return value
    ? new Date(value).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "No date";
}
export function localDate(value: string) {
  const date = value ? new Date(value) : new Date();
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 16);
}
export async function preparePhoto(file: File): Promise<File> {
  if (
    !["image/jpeg", "image/png", "image/webp", "image/gif"].includes(file.type)
  )
    throw new Error("Choose a JPG, PNG, WebP, or GIF photo.");
  if (file.size > 20000000)
    throw new Error("Choose a photo smaller than 20 MB.");
  if (file.type === "image/gif") {
    if (file.size > 3000000)
      throw new Error("GIF photos must be smaller than 3 MB.");
    return file;
  }
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, 2000 / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  const context = canvas.getContext("2d");
  if (!context) {
    bitmap.close();
    throw new Error(
      "This photo could not be prepared. Please try another file.",
    );
  }
  context.fillStyle = "#fff";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/jpeg", 0.86),
  );
  if (!blob || blob.size > 3000000)
    throw new Error("This photo is too large. Please choose a smaller image.");
  return new File([blob], `${file.name.replace(/\.[^.]+$/, "")}.jpg`, {
    type: "image/jpeg",
  });
}
