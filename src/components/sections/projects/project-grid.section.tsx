"use client";
import { useRevesProject } from "@/lib/hook";
import { pbUrl } from "@/lib/pocketbase.util";
import PostCard from "@/components/shared/post-card";

const ProjectGrid = () => {
  const { data: posts, error } = useRevesProject();

  if (error) {
    console.error("Error loading projects:", error);
    return <p>Error loading projects. Please try again later.</p>;
  }

  if (!posts) {
    return <p>Loading...</p>;
  }

  return (
    <section className="flex container flex-col space-y-5 md:flex-row md:pl-5 md:space-y-0 md:flex-wrap md:gap-y-5">
      {posts.map((post, i) => (
        <PostCard pbUrl={pbUrl} key={post.title + i} {...post} />
      ))}
    </section>
  );
};

export default ProjectGrid;
