import React from "react";
import Link from "next/link";
import { getPostsMetaData } from "@/lib/utils";
import Image from "next/image";

type Props = {};

type PostMetaData = {
  title: string;
  author: string;
  publishDate: string;
  slug: string;
  featuredImg?: string;
};

export default async function ProjectsSection({}: Props) {
  const posts = (await getPostsMetaData()) as PostMetaData[];

  return (
    <section className="py-8 md:py-12 container">
      <h1 className="text-3xl text-center font-semibold">Latest Projects</h1>
      <div className="flex gap-4 my-8">
        {posts &&
          posts.map((post, index) => (
            <Link
              href={`/blog/${post.slug}`}
              key={index}
              className="p-4 rounded-xl flex flex-col gap-2 w-full max-w-sm border bg-white"
            >
              <div className="h-[16rem] w-full overflow-hidden relative">
                {post.featuredImg && (
                  <Image
                    src={post.featuredImg}
                    alt={post.title}
                    height={720}
                    width={720}
                    quality={75}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="font-medium">{post.author}</p>
              <p className="italic">{post.publishDate}</p>
            </Link>
          ))}
      </div>
    </section>
  );
}
