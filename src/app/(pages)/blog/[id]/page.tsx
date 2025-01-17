// import { getPostBySlug } from "@/util/util";

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
    <main className="pb-12 min-h-[100vh]">
      <section className="">
        <Image
          src={`${pbUrl}api/files/${post.collectionId}/${post.id}/${post.featuredImage}`}
          height={920}
          width={1080}
          quality={100}
          className="h-80 md:h-[76vh] w-full object-cover overflow-hidden mb-6"
          alt={post.title}
        />
      </section>
      <div className="container rounded-xl  px-4">
        <section className="">
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
            <Button className="py-2 h-max" asChild>
              <Link
                className="gap-4 flex text-wrap"
                href={`/blog/${prevPost.id}`}
              >
                <FaLeftLong /> {prevPost.title}
              </Link>
            </Button>
          ) : (
            <Button className="gap-4" disabled>
              <FaLeftLong /> Previous
            </Button>
          )}

          {/* Next Button */}
          {nextPost ? (
            <Button className="py-2 h-max" asChild>
              <Link
                className="gap-4 flex text-wrap"
                href={`/blog/${nextPost.id}`}
              >
                {nextPost.title} <FaRightLong />
              </Link>
            </Button>
          ) : (
            <Button className="gap-4" disabled>
              Next <FaRightLong />
            </Button>
          )}
        </div>
      </div>
    </main>
  );
}
