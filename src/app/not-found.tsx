import Link from "next/link";
export default function NotFound() {
  return <main className="max-w-3xl mx-auto px-6 py-24 text-center"><h1 className="text-4xl font-bold mb-6">Page not found</h1><p className="mb-6">This page may have moved or is no longer available.</p><Link className="underline mr-6" href="/">Go home</Link><Link className="underline" href="/projects">Explore our projects</Link></main>;
}
