import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import {
  AdminError,
  failure,
  json,
  requireEditor,
  sameOrigin,
} from "@/lib/admin/server";
import { savePost } from "@/lib/admin/posts";
export const dynamic = "force-dynamic";
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    sameOrigin(request);
    const { token } = await requireEditor();
    if (Number(request.headers.get("content-length")) > 4000000)
      throw new AdminError(
        413,
        "Upload fewer photos at a time (under 4 MB in total).",
      );
    const post = await savePost(token, await request.formData(), params.id);
    revalidatePath("/", "layout");
    return json({ post });
  } catch (error) {
    return failure(error);
  }
}
