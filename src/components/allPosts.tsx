import { Post } from "./sections/home/projects.section";
import Image from "next/image";
import Link from "next/link";
import { pbUrl } from "@/lib/pocketbase.util";

interface AllPostsProps {
  posts: Post[];
}

const AllPosts = ({ posts }: AllPostsProps) => {
  return posts.map((post, index) => (
    <div
      key={index}
      className="p-4 mr-4 rounded-xl shrink-0 flex flex-col justify-between gap-2 w-full max-w-xs border bg-white"
    >
      <div className="flex flex-col">
        <div className="h-[10rem] md:h-[12rem] w-full overflow-hidden relative">
          {post.featuredImage && (
            <Image
              src={`${pbUrl}api/files/${post.collectionId}/${post.id}/${post.featuredImage}`}
              alt={post.title}
              fill
              quality={100}
              className="h-full w-full object-cover rounded-xl"
            />
          )}
        </div>
        <h2 className="text-xl md:text-2xl leading-tight font-normal my-2 line-clamp-3">
          {post.title}
        </h2>
        <p className="line-clamp-3">{post.description}</p>
      </div>

      <div className="flex justify-between text-sm mt-4 text-gray-500">
        <div className="flex items-center gap-1">
          <p className="font-semibold">{post.author}</p> |
          <p className="">{post.publishDate}</p>
        </div>
        <Link href={`/blog/${post.id}`}>Read more</Link>
      </div>
    </div>
  ));
};

export default AllPosts;
