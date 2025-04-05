import useSWR from "swr";

import { Post, TeamMember } from "@/types";
import pbClient, { pbUrl } from "./pocketbase.util";

export const useRevesProject = () => {
  const fetcher = async () =>
    pbClient.collection("projects").getFullList<Post>({ sort: "-created" });

  return useSWR<Post[]>("projects", fetcher);
};

const fetchTeamMembers = async (): Promise<TeamMember[]> => {
  const response = await fetch(
    `${pbUrl}/api/collections/team/records?perPage=100`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch team members");
  }

  const data = await response.json();

  return data.items.map((item: TeamMember) => ({
    id: item.id,
    username: item.username,
    name: item.name,
    bio: item.bio,
    role: item.role,
    profile_image: item.profile_image
      ? `${pbUrl}/api/files/${item.collectionId}/${item.id}/${item.profile_image}`
      : undefined,
  }));
};

export function useTeam() {
  return useSWR<TeamMember[], Error>("team-members", fetchTeamMembers, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    refreshInterval: 60000, // Refresh every 60 seconds
  });
}
