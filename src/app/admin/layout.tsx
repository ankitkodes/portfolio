import type { Metadata } from "next";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Toaster } from "react-hot-toast";
import "@/app/admin/admin.css";

export const metadata: Metadata = {
  title: "Admin Dashboard | Portfolio CMS",
  robots: "noindex, nofollow",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-root">
      <AdminSidebar />
      <main className="admin-main">
        {children}
      </main>
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#1D1D1F",
            color: "#F5F5F7",
            borderRadius: "10px",
            fontSize: "14px",
            fontFamily: "Inter, sans-serif",
            padding: "12px 16px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
          },
          success: { iconTheme: { primary: "#34C759", secondary: "#fff" } },
          error: { iconTheme: { primary: "#FF3B30", secondary: "#fff" } },
        }}
      />
    </div>
  );
}
