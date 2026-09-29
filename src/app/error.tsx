"use client";
import Link from "next/link";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return <main className="max-w-3xl mx-auto px-6 py-24 text-center"><h1 className="text-3xl font-bold mb-6">We couldn’t load this page</h1><p className="mb-6">Please try again, or contact us if the problem continues.</p><button className="underline mr-6" onClick={reset}>Try again</button><Link className="underline" href="/#contact-us">Contact us</Link></main>;
}
