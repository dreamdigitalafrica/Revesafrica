// import { getPostBySlug } from "@/util/util";
import { getPostBySlug } from "@/lib/utils";
import React from "react";

type Props = {
  params: {
    slug: string;
  };
};

const getPageData = async (slug: string) => {
  const { meta, content } = await getPostBySlug(slug);
  return { meta, content };
};

export async function generateMetadata() {
  //   const { meta } = await getPageData(params.slug);
  //   TODO: Fix Meta title
  //   return { title: meta.title };
}

export default async function page({ params }: Props) {
  const { content } = await getPageData(params.slug);

  return (
    <section className="p-4">
      <div className="container py-4 prose">{content}</div>
    </section>
  );
}
