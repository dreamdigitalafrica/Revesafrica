"use client";
import Image from "next/image";
import Link from "next/link";
import { useRevesProject } from "@/lib/hook";
import { pbUrl } from "@/lib/pocketbase.util";
import { Post } from "@/types";
import { FaArrowRight } from "react-icons/fa";

const categoryColors: Record<string, string> = {
  Education: "bg-[#F7901E] text-gray-900",
  Nutrition: "bg-[#F7901E] text-gray-900",
  Health: "bg-teal-400 text-gray-900",
  Advocacy: "bg-purple-500 text-white",
};

const ProgramCard = ({ post }: { post: Post }) => {
  const imageUrl = post.featuredImage
    ? `${pbUrl}api/files/${post.collectionId}/${post.id}/${post.featuredImage}`
    : null;

  const badgeClass =
    categoryColors[post.category ?? ""] ?? "bg-gray-500 text-white";

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col">
      {/* Image */}
      <div className="relative h-44 w-full bg-gray-100">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 25vw"
            quality={85}
          />
        )}
        {post.category && (
          <span
            className={`absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full ${badgeClass}`}
          >
            {post.category}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <h3 className="font-bold text-gray-900 text-base leading-snug">
          {post.title}
        </h3>
        {post.description && (
          <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">
            {post.description}
          </p>
        )}
        <Link
          href={`/projects/${post.id}`}
          className="mt-auto inline-flex items-center gap-1.5 text-sm font-bold text-gray-900 hover:text-[#F7901E] transition-colors"
        >
          Learn More <FaArrowRight size={11} />
        </Link>
      </div>
    </div>
  );
};

const ProjectGrid = () => {
  const { data: posts, error } = useRevesProject();

  if (error)
    return <p className="text-center py-12">Error loading projects.</p>;
  if (!posts) return <p className="text-center py-12">Loading...</p>;

  return (
    <section>
      {/* Section header */}
      <div className="text-center mb-10">
        <p className="text-[#F7901E] text-xs font-bold uppercase tracking-widest mb-2">
          Our Core Initiatives
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Transformative Programs for Change
        </h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {posts.map((post, i) => (
          <ProgramCard key={post.title + i} post={post} />
        ))}
      </div>
    </section>
  );
};

export default ProjectGrid;
