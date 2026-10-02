import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import {
  AdminError,
  backend,
  failure,
  json,
  requireEditor,
  sameOrigin,
} from "@/lib/admin/server";
import { savePost } from "@/lib/admin/posts";
export const dynamic = "force-dynamic";
export async function GET() {
  try {
    const { token } = await requireEditor();
    const url = new URLSearchParams({ perPage: "100", sort: "-updated" });
    const items = [];
    for (let page = 1; ; page++) {
      url.set("page", String(page));
      const response = await backend(
        `collections/projects/records?${url}`,
        {},
        token,
      );
      if (!response.ok)
        throw new AdminError(502, "Unable to load posts. Please try again.");
      const result = await response.json();
      items.push(...result.items);
      if (page >= result.totalPages) break;
    }
    return json({ items });
  } catch (error) {
    return failure(error);
  }
}
export async function POST(request: NextRequest) {
  try {
    sameOrigin(request);
    const { token } = await requireEditor();
    if (Number(request.headers.get("content-length")) > 4000000)
      throw new AdminError(
        413,
        "Upload fewer photos at a time (under 4 MB in total).",
      );
    const post = await savePost(token, await request.formData());
    revalidatePath("/", "layout");
    return json({ post }, 201);
  } catch (error) {
    return failure(error);
  }
}
