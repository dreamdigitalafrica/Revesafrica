// import { getPostBySlug } from "@/util/util";
import { pbUrl } from "@/lib/pocketbase.util";
import { Metadata } from "next";
import Image from "next/image";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};

// const getPageData = async (slug: string) => {
//   const { meta, content } = await getPostBySlug(slug);
//   return { meta, content };
// };

// Generate metadata dynamically based on post data
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.id);

  return {
    title: `${post.title} - Reves African Foundation`,
    description: post.excerpt || post.content.slice(0, 160), // Use post excerpt or a slice of content
    openGraph: {
      title: post.title,
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

export default async function Post({ params }: Props) {
  const post = await getPost(params.id);

  return (
    <main className="py-12 min-h-[100vh] px-4">
      <div className="container rounded-xl !max-w-4xl bg-white py-8 px-4">
        <section className="">
          <Image
            src={`${pbUrl}api/files/${post.collectionId}/${post.id}/${post.featuredImage}`}
            height={920}
            width={1080}
            quality={100}
            className="h-80 w-full object-cover overflow-hidden rounded-lg mb-6"
            alt={post.title}
          />
          <div
            className="content prose min-w-full"
            dangerouslySetInnerHTML={{
              __html: post.content,
            }}
          />
        </section>
      </div>
    </main>
  );
}
