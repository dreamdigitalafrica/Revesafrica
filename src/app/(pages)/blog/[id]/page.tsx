// import { getPostBySlug } from "@/util/util";

import SupportUsSection from "@/components/shared/support.section";
import { Button } from "@/components/ui/button";
import { pbUrl } from "@/lib/pocketbase.util";
import { Post as P } from "@/types";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaLeftLong, FaRightLong } from "react-icons/fa6";

type Props = {
  params: {
    id: string;
  };
};

// Generate metadata dynamically based on post data
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.id);

  return {
    title: `${post.title} - Reves African Foundation`,
    description: post.excerpt || post.content.slice(0, 160), // Use post excerpt or a slice of content
    openGraph: {
      title: `${post.title} - Reves African Foundation`,
      description: post.excerpt || post.content.slice(0, 160),
      images: [
        {
          url: `${pbUrl}api/files/${post.collectionId}/${post.id}/${post.featuredImage}`,
          width: 1080,
          height: 920,
          alt: post.title,
        },
      ],
    },
  };
}

async function getPost(id: string) {
  const api = await fetch(`${pbUrl}/api/collections/projects/records/${id}`, {
    next: { revalidate: 10 },
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await api.json();

  return data;
}

// Fetch all posts to enable navigation
async function getAllPosts() {
  const api = await fetch(`${pbUrl}/api/collections/projects/records`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await api.json();
  return data.items;
}

export default async function Post({ params }: Props) {
  const post = await getPost(params.id);
  const posts = await getAllPosts();

  // Find the current post index
  const currentIndex = posts.findIndex((p: P) => p.id === params.id);

  // Determine the previous and next post IDs
  const prevPost = currentIndex > 0 ? posts[currentIndex - 1] : null;
  const nextPost =
    currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;

  return (
    <main
      className="pb-12 min-h-[100vh] bg-gray-100 bg-fixed bg-cover bg-no-repeat  bg-blend-overlay"
      style={{ backgroundImage: "url('/images/blog-bg.webp')" }}
    >
      <div className="!max-w-6xl mx-auto">
        <h2
          className="content py-6  md:py-12 text-3xl md:text-6xl px-6 text-center font-bold prose min-w-full"
          dangerouslySetInnerHTML={{
            __html: post.title,
          }}
        />
      </div>

      <section className="px-4">
        <Image
          src={`${pbUrl}api/files/${post.collectionId}/${post.id}/${post.featuredImage}`}
          height={920}
          width={1080}
          quality={100}
          className="h-80 border-gray-700 rounded-3xl border-8 md:h-[76vh] w-full object-cover overflow-hidden "
          alt={post.title}
        />
      </section>

      <div className="container rounded-xl !max-w-5xl mx-auto py-12 px-4">
        <section className="!bg-white p-4 md:p-8 rounded-xl">
          <div
            className="content prose min-w-full"
            dangerouslySetInnerHTML={{
              __html: post.content,
            }}
          />
        </section>

        {/* Previous and Next navigation */}
        <div className="pages-navigation gap-4 flex items-center justify-between w-full mt-8">
          {/* Previous Button */}
          {prevPost ? (
            <Button className="p-4 md:py-6 md:px-8 md:text-base h-max" asChild>
              <Link
                className="gap-4 flex text-wrap"
                href={`/blog/${prevPost.id}`}
              >
                <FaLeftLong /> {prevPost.title}
              </Link>
            </Button>
          ) : (
            <Button
              className="p-4 md:py-6 md:px-8 md:text-base h-max gap-4"
              disabled
            >
              <FaLeftLong /> Previous
            </Button>
          )}

          {/* Next Button */}
          {nextPost ? (
            <Button className="p-4 md:py-6 md:px-8 md:text-base h-max" asChild>
              <Link
                className="gap-4 flex text-wrap"
                href={`/blog/${nextPost.id}`}
              >
                {nextPost.title} <FaRightLong />
              </Link>
            </Button>
          ) : (
            <Button
              className="p-4 md:py-6 md:px-8 md:text-base h-max gap-4"
              disabled
            >
              Next <FaRightLong />
            </Button>
          )}
        </div>
      </div>

      <SupportUsSection />
    </main>
  );
}
