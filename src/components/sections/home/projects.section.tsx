"use client";
import Image from "next/image";
import Link from "next/link";
import { useRevesProject } from "@/lib/hook";
import { pbUrl } from "@/lib/pocketbase.util";
import { Post } from "@/types";

const categoryColors: Record<string, string> = {
  "Education Outreach": "bg-[#3AF40C] text-gray-900",
  "Youth Leadership": "bg-blue-500 text-white",
  "Zero Hunger": "bg-orange-500 text-white",
  "Child Advocacy": "bg-blue-600 text-white",
};

const BentoCard = ({
  post,
  large = false,
}: {
  post: Post;
  large?: boolean;
}) => {
  const imageUrl = post.featuredImage
    ? `${pbUrl}api/files/${post.collectionId}/${post.id}/${post.featuredImage}`
    : null;

  const badgeClass =
    categoryColors[post.category ?? ""] ?? "bg-gray-500 text-white";

  return (
    <Link
      href={`/projects/${post.id}`}
      className={`group relative rounded-2xl overflow-hidden flex flex-col justify-end bg-gray-200 ${
        large
          ? "min-h-[320px] md:min-h-[380px]"
          : "min-h-[260px] md:min-h-[320px]"
      }`}
    >
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
          quality={85}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
      <div className="relative z-10 p-5 flex flex-col gap-2">
        {post.category && (
          <span
            className={`text-xs font-bold px-3 py-1 rounded-full w-max ${badgeClass}`}
          >
            {post.category}
          </span>
        )}
        <h3
          className={`font-bold text-white leading-tight ${large ? "text-2xl md:text-3xl" : "text-lg md:text-xl"}`}
        >
          {post.title}
        </h3>
        {post.description && (
          <p className="text-sm text-gray-300 line-clamp-2">
            {post.description}
          </p>
        )}
      </div>
    </Link>
  );
};

export default function ProjectsSection() {
  const { data: posts, error } = useRevesProject();

  if (error)
    return <section id="projects" className="text-center py-12 scroll-mt-28">Unable to load projects. Please refresh the page or <Link href="/#contact-us" className="underline">contact us</Link>.</section>;
  if (!posts) return <section id="projects" className="text-center py-12 scroll-mt-28">Loading projects...</section>;

  const [first, second, third, fourth, ...rest] = posts;

  return (
    <section className="bg-[#f4f6fb] py-16 scroll-mt-28" id="projects">
      <div className="text-center mb-10  px-4 md:px-8 max-w-2xl mx-auto">
        <p className="text-[#3AF40C] text-xs font-bold uppercase tracking-widest mb-3">
          Our Recent Impact
        </p>
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
          Transforming Lives in Real-Time
        </h2>
      </div>

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
        {first && (
          <div className="md:col-span-2">
            <BentoCard post={first} large />
          </div>
        )}
        {second && (
          <div className="md:col-span-1">
            <BentoCard post={second} />
          </div>
        )}
        {third && (
          <div className="md:col-span-1">
            <BentoCard post={third} />
          </div>
        )}
        {fourth && (
          <div className="md:col-span-2">
            <BentoCard post={fourth} large />
          </div>
        )}
        {rest.map((post) => (
          <div key={post.id} className="md:col-span-1">
            <BentoCard post={post} />
          </div>
        ))}
      </div>
    </section>
  );
}
