// components/sections/projects.section.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function ProjectsSection({ posts }: { posts: PostMetaData[] }) {
  return (
    <section className="py-8 md:py-12 container">
      <h1 className="text-3xl text-center font-semibold">Latest Projects</h1>

      <div className="overflow-x-auto py-2">
        <div className="flex gap-4 my-8 w-full">
          {posts &&
            posts.map((post, index) => (
              <Link
                href={`/blog/${post.slug}`}
                key={index}
                className="p-4 rounded-xl shrink-0 flex flex-col gap-2 w-full max-w-xs md:max-w-sm border bg-white"
              >
                <div className="h-[12rem] md:h-[16rem] w-full overflow-hidden relative">
                  {post.featuredImg && (
                    <Image
                      src={post.featuredImg}
                      alt={post.title}
                      fill
                      quality={75}
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
                <h2 className="text-xl font-semibold mb-2 line-clamp-2">{post.title}</h2>
                <p className="font-medium">{post.author}</p>
                <p className="italic">{post.publishDate}</p>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}
