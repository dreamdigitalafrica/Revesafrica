import { NextRequest } from "next/server";
import { randomBytes } from "node:crypto";
import {
  AdminError,
  backend,
  collection,
  failure,
  isConfigured,
  json,
  requireEditor,
  sameOrigin,
} from "@/lib/admin/server";
export const dynamic = "force-dynamic";
export async function GET() {
  try {
    const { token } = await requireEditor();
    return json({ configured: isConfigured(await collection(token)) });
  } catch (error) {
    return failure(error);
  }
}
export async function POST(request: NextRequest) {
  try {
    sameOrigin(request);
    const { token } = await requireEditor();
    const current = await collection(token);
    if (isConfigured(current)) return json({ configured: true });
    const modern = Array.isArray(current.fields);
    const definitions = [
      {
        name: "websiteStatus",
        type: "select",
        options: { maxSelect: 1, values: ["published", "draft"] },
      },
      {
        name: "featuredImageAlt",
        type: "text",
        options: { min: 0, max: 300, pattern: "" },
      },
      {
        name: "category",
        type: "text",
        options: { min: 0, max: 100, pattern: "" },
      },
      {
        name: "photos",
        type: "file",
        options: {
          maxSelect: 20,
          maxSize: 3000000,
          mimeTypes: ["image/jpeg", "image/png", "image/webp", "image/gif"],
          thumbs: [],
          protected: false,
        },
      },
    ];
    const fields = [...(modern ? current.fields : current.schema)];
    for (const definition of definitions) {
      if (fields.some((field) => field.name === definition.name)) continue;
      const { options, ...rest } = definition;
      const common = {
        ...rest,
        id: randomBytes(5).toString("hex"),
        required: false,
      };
      fields.push(
        modern
          ? { ...common, ...options }
          : {
              ...common,
              options,
              system: false,
              presentable: false,
              unique: false,
            },
      );
    }
    // Empty status preserves all stories currently visible on the website.
    const restrict = (rule: string | null) =>
      rule === null
        ? null
        : rule?.includes('websiteStatus != "draft"')
          ? rule
          : `${rule ? `(${rule}) && ` : ""}websiteStatus != "draft"`;
    const response = await backend(
      "collections/projects",
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          [modern ? "fields" : "schema"]: fields,
          listRule: restrict(current.listRule),
          viewRule: restrict(current.viewRule),
          createRule: null,
          updateRule: null,
          deleteRule: null,
        }),
      },
      token,
    );
    if (!response.ok)
      throw new AdminError(
        502,
        "Setup could not finish. Your existing stories are unchanged. Try again or check your PocketBase collection settings.",
      );
    if (!isConfigured(await collection(token)))
      throw new AdminError(
        502,
        "The collection needs public read rules with draft protection. Check the PocketBase collection settings before continuing.",
      );
    return json({ configured: true });
  } catch (error) {
    return failure(error);
  }
}
