import { getAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminSidebar from "./AdminSidebar";

export const metadata = {
  title: "Admin CMS | JADE Coatings",
  description: "JADE Coatings Content Management System",
};

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = getAdminSession();

  if (!session.authenticated) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0A1017] flex">
      {/* Sidebar Component */}
      <AdminSidebar username={session.username || "admin"} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
