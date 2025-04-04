"use client";

import { useParams } from "next/navigation";
import React from "react";

export default function TeamMemberPage() {
  const { teamId } = useParams();

  return (
    <main className="min-h-96">
      <section>
        <div className="container py-8 md:py-12">
          <h2>Team Member Page</h2>
        </div>
      </section>
    </main>
  );
}
