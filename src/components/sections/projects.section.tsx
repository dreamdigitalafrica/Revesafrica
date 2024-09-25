// components/sections/projects.section.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function ProjectsSection({ posts }: { posts: PostMetaData[] }) {
  return (
    <section className="py-8 md:py-12 container">
      <h1 className="text-4xl text-center font-mediumv">Latest Projects</h1>

      <div className="overflow-x-auto py-2">
        <div className="flex gap-4 my-8 w-full">
          {posts &&
            posts.map((post, index) => (
              <Link
                href={`/blog/${post.slug}`}
                key={index}
                className="py-2 px-4 rounded-xl shrink-0 flex flex-col justify-between gap-2 w-full max-w-xs  border bg-[#ededed]"
              >
                <div className="flex flex-col">
                  <div className="h-[10rem] md:h-[12rem] w-full overflow-hidden relative">
                    {post.featuredImg && (
                      <Image
                        src={post.featuredImg}
                        alt={post.title}
                        fill
                        quality={100}
                        className="h-full w-full object-cover rounded-xl"
                      />
                    )}
                  </div>
                  <h2 className="text-xl font-medium my-2 line-clamp-2">
                    {post.title}
                  </h2>
                </div>

                <div className="flex justify-between text-sm mt-4 text-gray-500">
                  <p className="font-medium">{post.author}</p>
                  <p className="italic">{post.publishDate}</p>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}
