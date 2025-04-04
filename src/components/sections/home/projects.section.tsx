"use client";
import React from "react";
import Marquee from "react-fast-marquee";

import AllPosts from "../../allPosts";
import { useRevesProject } from "@/lib/hook";

export default function ProjectsSection() {
  const { data: posts, error } = useRevesProject();

  if (error) {
    console.error("Error loading projects:", error);
    return <p>Error loading projects. Please try again later.</p>;
  }

  if (!posts) {
    return <p>Loading...</p>;
  }

  return (
    <section className="container md:py-12" id="projects">
      <h1 className="text-3xl text-gray-700 md:text-5xl text-center font-semibold">
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
