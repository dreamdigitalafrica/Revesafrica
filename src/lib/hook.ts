import useSWR from "swr";

import { Post, TeamMember } from "@/types";
import pbClient from "./pocketbase.util";

export const useRevesProject = () => {
  const fetcher = async () =>
    pbClient.collection("projects").getFullList<Post>({ sort: "-created" });

  return useSWR<Post[]>("projects", fetcher);
};

export const useTeam = () => {
  const fetcher = async () =>
    pbClient.collection("team").getFullList<TeamMember>({ });

  return useSWR<TeamMember[]>("team", fetcher);
};
