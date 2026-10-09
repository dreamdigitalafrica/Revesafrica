/** @type {import('next').NextConfig} */

import nextMDX from "@next/mdx";

const withMDX = nextMDX();

const nextConfig = {
  // Configure `pageExtensions` to include MDX files
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  async redirects() {
    return [
      { source: "/our-mission", destination: "/about#mission", permanent: true },
      { source: "/impact", destination: "/#projects", permanent: true },
      { source: "/donate", destination: "https://flutterwave.com/donate/fqla2cajv8yi", permanent: false },
    ];
  },
  images: {
    domains: ["revesfoundation.pockethost.io"],
  },
};

export default withMDX(nextConfig);
