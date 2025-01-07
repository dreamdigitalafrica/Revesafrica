import Hero from "@/components/home-sections/hero";
import MainLayout from "../layout/MainLayout";

export default async function Home() {
  return (
    <MainLayout>
      <Hero />
    </MainLayout>
  );
}
