import React from "react";
import Link from "next/link";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import useSWR from "swr";
import pbClient, { pbUrl } from "@/lib/pocketbase.util";
import { GetStaticProps } from "next";
import { Metadata } from "next";

// Define types for posts
interface Post {
  id: string;
  collectionId: string;
  title: string;
  description: string;
  featuredImage: string;
  author: string;
  publishDate: string;
}

// Fetch the posts during static generation
export const getStaticProps: GetStaticProps = async () => {
  let posts: Post[] = [];

  try {
    posts = await pbClient.collection("projects").getFullList<Post>({
      sort: "-created",
    });
  } catch (error) {
    console.error("Error fetching posts during static generation:", error);
  }

  return {
    props: {
      posts,
    },
    revalidate: 60, // Revalidate every 60 seconds
  };
};

// Use SWR for client-side revalidation and updating the posts
const fetcher = (url: string) =>
  pbClient.collection("projects").getFullList<Post>({ sort: "-created" });

export default function ProjectsSection({
  posts: initialPosts,
}: {
  posts: Post[];
}) {
  const { data: posts = initialPosts, error } = useSWR("projects", fetcher, {
    fallbackData: initialPosts, // Use the static data as fallback
    revalidateOnFocus: false, // Revalidate only on reload
  });

  if (error) {
    console.error("Error loading projects:", error);
    return <p>Error loading projects. Please try again later.</p>;
  }

  return (
    <section className="py-8 md:py-12 container" id="projects">
      <h1 className="text-3xl md:text-5xl text-center font-medium">
        Latest Projects
      </h1>

      {posts.length > 0 ? (
        <Marquee delay={2} pauseOnHover>
          <div className="flex my-8 w-full">
            {posts.map((post: Post, index: number) => (
              <div
                key={index}
                className="p-4 mr-4 rounded-xl shrink-0 flex flex-col justify-between gap-2 w-full max-w-xs border bg-white"
              >
                <div className="flex flex-col">
                  <div className="h-[10rem] md:h-[12rem] w-full overflow-hidden relative">
                    {post.featuredImage && (
                      <Image
                        src={`${pbUrl}api/files/${post.collectionId}/${post.id}/${post.featuredImage}`}
                        alt={post.title}
                        fill
                        quality={100}
                        className="h-full w-full object-cover rounded-xl"
                      />
                    )}
                  </div>
                  <h2 className="text-xl md:text-2xl leading-tight font-normal my-2 line-clamp-3">
                    {post.title}
                  </h2>
                  <p className="line-clamp-3">{post.description}</p>
                </div>

                <div className="flex justify-between text-sm mt-4 text-gray-500">
                  <div className="flex items-center gap-1">
                    <p className="font-semibold">{post.author}</p> |
                    <p className="">{post.publishDate}</p>
                  </div>

                  <Link href={`/blog/${post.id}`}>Read more</Link>
                </div>
              </div>
            ))}
          </div>
        </Marquee>
      ) : (
        <p>No projects available at the moment.</p>
      )}
    </section>
  );
}

// Dynamically generate metadata for SEO
export const generateMetadata = async (): Promise<Metadata> => {
  const posts: Post[] = await pbClient.collection("projects").getFullList({
    sort: "-created",
  });

  const latestPost = posts[0] || {
    title: "Latest Projects",
    description: "Explore our latest projects.",
  };

  return {
    title: latestPost.title,
    description: latestPost.description,
    openGraph: {
      title: latestPost.title,
      description: latestPost.description,
      images: [
        {
          url: `${pbUrl}api/files/${latestPost.collectionId}/${latestPost.id}/${latestPost.featuredImage}`,
          width: 1080,
          height: 920,
          alt: latestPost.title,
        },
      ],
    },
  };
};
