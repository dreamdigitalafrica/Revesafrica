"use client";

import Lenis from "lenis";
import { ReactNode, useEffect } from "react";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <main className="max-w-[100dvw] h-fit flex flex-col space-y-10 md:space-y-20">
      {children}
    </main>
  );
};

export default MainLayout;
