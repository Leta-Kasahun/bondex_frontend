"use client";

import { useState } from "react";
import { UserDashboardAiWidget } from "@/src/features/ai";
import { useUIStore } from "@/src/stores";
import { cn } from "@/src/utils/cn";
import { UserDashboardSidebar } from "./UserDashboardSidebar";
import { UserDashboardTopbar } from "./UserDashboardTopbar";
import { UserDashboardOverview } from "./UserDashboardOverview";

export function UserDashboardShell() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isSidebarCollapsed = useUIStore((state) => state.isSidebarCollapsed);
  const setSidebarCollapsed = useUIStore((state) => state.setSidebarCollapsed);

  return (
    <div className="min-h-screen bg-background">
      <div className="flex min-h-screen">
        <div className="hidden md:block">
          <UserDashboardSidebar
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
            <UserDashboardSidebar onClose={() => setIsSidebarOpen(false)} />
          </div>
        </div>

        <div className="flex min-h-screen flex-1 flex-col">
          <UserDashboardTopbar
            onToggleSidebar={() => setIsSidebarOpen(true)}
            isSidebarCollapsed={isSidebarCollapsed}
            onToggleSidebarCollapse={() => setSidebarCollapsed(!isSidebarCollapsed)}
          />
          <UserDashboardOverview />
          <UserDashboardAiWidget />
        </div>
      </div>
    </div>
  );
}
