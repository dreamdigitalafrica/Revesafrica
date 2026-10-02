import { Metadata } from "next";
import AdminWorkspace from "@/components/admin/workspace";
import "./admin.css";
export const metadata: Metadata = {
  title: "Content admin | Reves Foundation",
  robots: { index: false, follow: false },
};
export default function AdminPage() {
  return <AdminWorkspace />;
}
