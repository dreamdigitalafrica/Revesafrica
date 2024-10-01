import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";

// Class name utility
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Root directory for blog posts
const rootDir = path.join(process.cwd(), "src", "projects");

// Fetch post by slug
export const getPostBySlug = async (slug: string) => {
  // Format the slug to remove unnecessary parts if any
  const formattedSlug = slug.replace(
    "https://d585tldpucybw.cloudfront.net/sfimages/default-source/blogs/2024/2024-07/.mdx$/",
    ""
  );

  const filePath = path.join(rootDir, `${formattedSlug}.mdx`); // Ensure .mdx extension
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  const fileContent = fs.readFileSync(filePath, { encoding: "utf8" });

  // Parse MDX with frontmatter
  const { frontmatter, content } = await compileMDX({
    source: fileContent,
    options: { parseFrontmatter: true },
  });

  // Ensure frontmatter contains required fields
  if (!frontmatter.title) {
    throw new Error(`Missing title in frontmatter for ${formattedSlug}`);
  }

  return { meta: { ...frontmatter, slug: formattedSlug }, content };
};

// Get metadata for all posts

// Function to fetch metadata for posts
export const getPostsMetaData = async () => {
  const rootDir = path.join(process.cwd(), "src", "projects");
  const files = fs.readdirSync(rootDir);
  const posts = [];

  for (const fileName of files) {
    if (fileName.endsWith(".mdx")) {
      const filePath = path.join(rootDir, fileName);
      const fileContent = fs.readFileSync(filePath, { encoding: "utf8" });
      const { frontmatter } = await compileMDX({
        source: fileContent,
        options: { parseFrontmatter: true },
      });
      posts.push({ ...frontmatter, slug: fileName.replace(".mdx", "") });
    }
  }

  return posts;
};
