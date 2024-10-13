/** @type {import('next').NextConfig} */

import nextMDX from "@next/mdx";

const withMDX = nextMDX();

const nextConfig = {
  // Configure `pageExtensions` to include MDX files
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  images: {
    domains: ["revesfoundation.pockethost.io"],
  },
};

export default withMDX(nextConfig);
