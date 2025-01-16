import { Post } from "@/types";
import PostCard from "./shared/post-card";
import { pbUrl } from "@/lib/pocketbase.util";

interface AllPostsProps {
  posts: Post[];
}

const AllPosts = ({ posts }: AllPostsProps) => {
  return posts.map((post, index) => (
    <PostCard pbUrl={pbUrl} key={index} {...post} />
  ));
};

export default AllPosts;
