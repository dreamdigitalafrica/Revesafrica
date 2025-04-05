import Loading from "@/components/shared/loading";
import { pbUrl } from "@/lib/pocketbase.util";
import { TeamMember } from "@/types";
import { Metadata } from "next";
import Image from "next/image";
import React, { Suspense } from "react";

type Props = {
  params: {
    teamId: string;
  };
};

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const teamMember = await getTeamMember(params.teamId);

  if (!teamMember) {
    return {
      title: "Team Member Not Found",
      description: "The requested team member could not be found.",
    };
  }

  return {
    title: `${teamMember.name} - Our Team (RAYCD)`,
    description: teamMember.bio
      ? `${teamMember.name}'s bio: ${teamMember.bio.slice(0, 160)}...`
      : `Learn more about ${teamMember.name}, ${
          teamMember.role || "a member"
        } of our team.`,
    openGraph: {
      title: `${teamMember.name} - Our Team`,
      description: teamMember.bio
        ? `${teamMember.name}'s bio: ${teamMember.bio.slice(0, 160)}...`
        : `Learn more about ${teamMember.name}, ${
            teamMember.role || "a member"
          } of our team.`,
      images: teamMember.profile_image ? [teamMember.profile_image] : undefined,
    },
  };
}

async function getTeamMember(teamId: string): Promise<TeamMember | null> {
  try {
    const api = await fetch(
      `${pbUrl}/api/collections/team/records?filter=(username='${teamId}')`,
      {
        next: { revalidate: 10 }, // Revalidate every 10 seconds
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!api.ok) {
      throw new Error(`Failed to fetch team member: ${api.statusText}`);
    }

    const data = await api.json();

    // PocketBase returns a list of records in the "items" array
    const teamMember = data.items?.[0];

    if (!teamMember) {
      return null; // Team member not found
    }

    // Map the PocketBase record to TeamMember type
    return {
      id: teamMember.id,
      username: teamMember.username,
      name: teamMember.name,
      bio: teamMember.bio,
      role: teamMember.role,
      profile_image: teamMember.profile_image
        ? `${pbUrl}api/files/${teamMember.collectionId}/${teamMember.id}/${teamMember.profile_image}`
        : undefined, // Construct the full image URL for PocketBase file
    };
  } catch (error) {
    console.error("Error fetching team member:", error);
    return null;
  }
}

export default async function TeamMemberPage({ params }: Props) {
  const teamMember = await getTeamMember(params.teamId);

  if (!teamMember) {
    return (
      <main className="min-h-96 w-full">
        <section className="py-12">
          <div className="mx-auto max-w-6xl px-6 md:px-14">
            <h2 className="text-4xl mb-12 font-bold md:text-5xl text-center">
              Our <span className="text-green-400">Team</span>
            </h2>
            <p className="text-center text-gray-600">Team member not found.</p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-96 w-full">
      <section className="py-12">
        <div className="mx-auto max-w-6xl px-6 md:px-14">
          <h2 className="text-4xl mb-12 font-medium italic md:text-5xl  text-center">
            Our <span className=" font-bold text-green-400">Team</span>
          </h2>

          {/*  */}
          <Suspense fallback={<Loading />}>
            <div className="flex flex-col w-full mb-12 gap-8 md:gap-12 h-full md:flex-row">
              {/* Image Container */}
              <div className="min-h-96 md:h-[95vh] md:max-w-md w-full overflow-hidden rounded-3xl shadow-md drop-shadow-md bg-gray-200 shrink-0">
                {teamMember?.profile_image ? (
                  <Image
                    src={teamMember.profile_image}
                    alt={`${teamMember.name} image`}
                    height={1080}
                    width={1080}
                    quality={75}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}
              </div>

              <div className="flex flex-col">
                <h2 className="text-3xl md:text-4xl font-semibold mb-4 md:mb-6">
                  {teamMember.name}
                </h2>

                {/* Bio Content */}
                <div
                  className="content prose flex-1 text-xl " // Removed min-w-full, added flex-1
                  dangerouslySetInnerHTML={{
                    __html: teamMember.bio || "No bio available.",
                  }}
                />
              </div>
            </div>
          </Suspense>
        </div>
      </section>
    </main>
  );
}
