import type { Metadata } from "next";
import OurWork from "@/components/sections/programs/our-work";

export const metadata: Metadata = {
  title: "Our Work and Programs | Reves Foundation",
  description: "Explore Reves Foundation programs in education, health and well-being, poverty reduction, and nutrition.",
};

export default function ProgramsPage() { return <OurWork />; }
