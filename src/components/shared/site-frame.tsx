"use client";
import { usePathname } from "next/navigation";
import Header from "./header";
import Footer from "./footer";
export default function SiteFrame({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  if (path === "/admin" || path.startsWith("/admin/")) return <>{children}</>;
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
