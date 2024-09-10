import React from "react";
// import { getPostsMetaData } from "@/util/util";
import Link from "next/link";
import { getPostsMetaData } from "@/lib/utils";

type PostMetaData = {
  title: string;
  author: string;
  publishDate: string;
  slug: string;
};

export default async function page() {
  const posts = (await getPostsMetaData()) as PostMetaData[];

  return (
    <section className="p-4">
      <h1 className="text-3xl font-semibold">My Blog Posts</h1>
      <div className="flex gap-4 my-8">
        {posts &&
          posts.map((post, index) => (
            <Link
              href={`/blog/${post.slug}`}
              key={index}
              className="p-8 border"
            >
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="font-medium">{post.author}</p>
              <p className="italic">{post.publishDate}</p>
            </Link>
          ))}
      </div>
    </section>
  );
}
