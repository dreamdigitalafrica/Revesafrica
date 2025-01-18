import useSWR from "swr";

import { Post } from "@/types";
import pbClient from "./pocketbase.util";

export const useRevesProject = () => {
  const fetcher = async () =>
    pbClient.collection("projects").getFullList<Post>({ sort: "-created" });

  return useSWR<Post[]>("projects", fetcher);
};
