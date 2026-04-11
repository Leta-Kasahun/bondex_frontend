"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { APP_ROUTES } from "@/src/constants";
import { AdminDashboardAiWidget } from "@/src/features/ai";
import { useUIStore } from "@/src/stores";
import { cn } from "@/src/utils/cn";
import { AdminDashboardOverview } from "./AdminDashboardOverview";
import { AdminDashboardSidebar } from "./AdminDashboardSidebar";
import { AdminDashboardTopbar } from "./AdminDashboardTopbar";
import { AdminSystemManagementPage } from "./systems";
import { AdminUserManagementPage } from "./users";

export function AdminDashboardShell() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const isSidebarCollapsed = useUIStore((state) => state.isSidebarCollapsed);
  const setSidebarCollapsed = useUIStore((state) => state.setSidebarCollapsed);

  const renderContent = () => {
    if (pathname.startsWith(APP_ROUTES.DASHBOARD.ADMIN.SYSTEM)) {
      return <AdminSystemManagementPage />;
    }

    if (pathname.startsWith(APP_ROUTES.DASHBOARD.ADMIN.USERS)) {
      return <AdminUserManagementPage />;
    }

    return <AdminDashboardOverview />;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex min-h-screen">
        <div className="hidden md:block">
          <AdminDashboardSidebar
            isCollapsed={isSidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed(!isSidebarCollapsed)}
          />
        </div>

        <div
          className={cn(
            "fixed inset-0 z-50 md:hidden",
            isSidebarOpen ? "pointer-events-auto" : "pointer-events-none"
          )}
        >
          <button
            type="button"
            className={cn(
              "absolute inset-0 bg-black/30 transition-opacity",
              isSidebarOpen ? "opacity-100" : "opacity-0"
            )}
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close sidebar overlay"
          />
          <div
            className={cn(
              "absolute left-0 top-0 h-full transition-transform",
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}
          >
            <AdminDashboardSidebar onClose={() => setIsSidebarOpen(false)} />
          </div>
        </div>

        <div className="flex min-h-screen flex-1 flex-col">
          <AdminDashboardTopbar
            onToggleSidebar={() => setIsSidebarOpen(true)}
            isSidebarCollapsed={isSidebarCollapsed}
            onToggleSidebarCollapse={() => setSidebarCollapsed(!isSidebarCollapsed)}
          />
          {renderContent()}
          <AdminDashboardAiWidget />
        </div>
      </div>
    </div>
  );
}
