"use client"; // Make this component a client-side component

import React from "react";
import Marquee from "react-fast-marquee";
import useSWR from "swr"; // Import SWR for client-side fetching
import pbClient, { pbUrl } from "@/lib/pocketbase.util";
import AllPosts from "../allPosts";

// Define types for posts
export interface Post {
  id: string;
  collectionId: string;
  title: string;
  description: string;
  featuredImage: string;
  author: string;
  publishDate: string;
}

// Fetcher function for SWR
const fetcher = async () =>
  pbClient.collection("projects").getFullList<Post>({ sort: "-created" });

export default function ProjectsSection() {
  const { data: posts, error } = useSWR<Post[]>("projects", fetcher);

  if (error) {
    console.error("Error loading projects:", error);
    return <p>Error loading projects. Please try again later.</p>;
  }

  if (!posts) {
    return <p>Loading...</p>;
  }

  return (
    <section className="py-8 md:py-12 container" id="projects">
      <h1 className="text-3xl md:text-5xl text-center font-medium">
        Latest Projects
      </h1>

      <Marquee delay={2} pauseOnHover>
        <div className="flex my-8 w-full">
          <AllPosts posts={posts} />
        </div>
      </Marquee>
    </section>
  );
}
