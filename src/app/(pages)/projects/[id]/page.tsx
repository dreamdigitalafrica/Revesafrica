import { cleanStory, plainText } from "@/lib/admin/content";
import CTASection from "@/components/sections/home/cta.section";
import { pbUrl } from "@/lib/pocketbase.util";
import { Post as P } from "@/types";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

type Props = {
  params: { id: string };
};

async function getPost(id: string): Promise<P> {
  if (!/^[a-z0-9]{15}$/.test(id)) notFound();
  const res = await fetch(`${pbUrl}api/collections/projects/records/${id}`, {
    next: { revalidate: 10 },
  });
  if (res.status === 404) notFound();
  if (!res.ok) throw new Error("Unable to load this project. Please try again.");
  const post: P = await res.json();
  if (post.websiteStatus === "draft") notFound();
  return post;
}

async function getAllPosts(): Promise<P[]> {
  const res = await fetch(`${pbUrl}api/collections/projects/records?perPage=500&sort=-datePublished`, { next: { revalidate: 10 } });
  if (!res.ok) throw new Error("Unable to load projects. Please try again.");
  const data = await res.json();
  return (data.items || []).filter((post: P) => post.websiteStatus !== "draft");
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.id);
  const imageUrl = post.featuredImage ? `${pbUrl}api/files/${post.collectionId}/${post.id}/${post.featuredImage}` : "/images/projects/project-1.jpg";

  return {
    title: `${post.title} — Reves African Foundation`,
    description: (post.description || plainText(post.content)).slice(0, 160),
    openGraph: {
      title: `${post.title} — Reves African Foundation`,
      description: (post.description || plainText(post.content)).slice(0, 160),
      images: [{ url: imageUrl, width: 1080, height: 920, alt: post.title }],
    },
  };
}

export default async function ProjectPost({ params }: Props) {
  const [post, posts] = await Promise.all([getPost(params.id), getAllPosts()]);

  const currentIndex = posts.findIndex((p) => p.id === params.id);
  const prevPost = currentIndex > 0 ? posts[currentIndex - 1] : null;
  const nextPost =
    currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;
  const imageUrl = post.featuredImage ? `${pbUrl}api/files/${post.collectionId}/${post.id}/${post.featuredImage}` : "/images/projects/project-1.jpg";

  return (
    <main className="w-full bg-[#f4f6fb] min-h-screen">
      {/* Hero */}
      <section className="relative w-full h-[50vh] md:h-[65vh] overflow-hidden">
        <Image
          src={imageUrl}
          alt={post.featuredImageAlt || post.title}
          fill
          priority
          quality={100}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />

        {/* Back link */}
        <Link
          href="/projects"
          className="absolute top-6 left-6 z-10 inline-flex items-center gap-2 text-white text-sm font-semibold bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full hover:bg-white/20 transition-all"
        >
          <FaArrowLeft size={12} /> All Projects
        </Link>

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 z-10 px-6 pb-10 md:px-16 max-w-5xl mx-auto">
          {post.category && (
            <span className="inline-block mb-3 px-3 py-1 rounded-full bg-[#0C529C] text-white text-xs font-bold">
              {post.category}
            </span>
          )}
          <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight max-w-3xl">
            {post.title}
          </h1>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 md:px-6 py-14">
        <article className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-12">
          <p className="mb-8 text-sm text-gray-600">
            {post.author && <span>By {post.author} · </span>}
            {post.datePublished && <time dateTime={new Date(post.datePublished).toISOString()}>{new Date(post.datePublished).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "Africa/Lagos" })}</time>}
          </p>
          <div
            className="prose prose-lg prose-gray max-w-none
              prose-headings:font-bold prose-headings:text-gray-900
              prose-p:text-gray-600 prose-p:leading-relaxed
              prose-a:text-[#0C529C] prose-a:no-underline hover:prose-a:underline
              prose-img:rounded-2xl prose-img:shadow-md
              prose-blockquote:border-l-[#0C529C] prose-blockquote:text-gray-500"
            dangerouslySetInnerHTML={{ __html: cleanStory(post.content) }}
          />
        </article>

        {/* Prev / Next navigation */}
        <div className="mt-10 grid grid-cols-2 gap-4">
          {prevPost ? (
            <Link
              href={`/projects/${prevPost.id}`}
              className="group flex flex-col gap-1 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all"
            >
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-400 uppercase tracking-widest group-hover:text-[#0C529C] transition-colors">
                <FaArrowLeft size={10} /> Previous
              </span>
              <span className="text-sm font-semibold text-gray-900 line-clamp-2 mt-1">
                {prevPost.title}
              </span>
            </Link>
          ) : (
            <div />
          )}

          {nextPost ? (
            <Link
              href={`/projects/${nextPost.id}`}
              className="group flex flex-col items-end gap-1 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all text-right"
            >
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-400 uppercase tracking-widest group-hover:text-[#0C529C] transition-colors">
                Next <FaArrowRight size={10} />
              </span>
              <span className="text-sm font-semibold text-gray-900 line-clamp-2 mt-1">
                {nextPost.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>

      <CTASection />
    </main>
  );
}
