"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  Bell,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Settings,
  ShieldCheck,
  Users,
  X,
} from "lucide-react";
import { APP_ROUTES } from "@/src/constants";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/utils/cn";

type AdminDashboardSidebarProps = {
  onClose?: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
};

const navItems = [
  {
    label: "Dashboard",
    href: APP_ROUTES.DASHBOARD.ADMIN.DASHBOARD,
    icon: LayoutDashboard,
    matcher: (path: string) => path === APP_ROUTES.DASHBOARD.ADMIN.DASHBOARD,
  },
  {
    label: "Users",
    href: APP_ROUTES.DASHBOARD.ADMIN.USERS,
    icon: Users,
    matcher: (path: string) => path.startsWith(APP_ROUTES.DASHBOARD.ADMIN.USERS),
  },
  {
    label: "System",
    href: APP_ROUTES.DASHBOARD.ADMIN.SYSTEM,
    icon: Activity,
    matcher: (path: string) => path.startsWith(APP_ROUTES.DASHBOARD.ADMIN.SYSTEM),
  },
  {
    label: "Security",
    href: APP_ROUTES.DASHBOARD.ADMIN.SECURITY,
    icon: ShieldCheck,
    matcher: (path: string) => path.startsWith(APP_ROUTES.DASHBOARD.ADMIN.SECURITY),
  },
  {
    label: "Notifications",
    href: APP_ROUTES.DASHBOARD.ADMIN.NOTIFICATIONS,
    icon: Bell,
    matcher: (path: string) => path.startsWith(APP_ROUTES.DASHBOARD.ADMIN.NOTIFICATIONS),
  },
  {
    label: "Settings",
    href: APP_ROUTES.DASHBOARD.ADMIN.SETTINGS,
    icon: Settings,
    matcher: (path: string) => path.startsWith(APP_ROUTES.DASHBOARD.ADMIN.SETTINGS),
  },
];

export function AdminDashboardSidebar({
  onClose,
  isCollapsed = false,
  onToggleCollapse,
}: AdminDashboardSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className={cn("h-full border-r border-sidebar-border bg-sidebar p-4", isCollapsed ? "w-20" : "w-72")}>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-heading text-lg font-semibold text-sidebar-foreground">{isCollapsed ? "A" : "Bondex Admin"}</h2>
        {onToggleCollapse ? (
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="hidden md:inline-flex"
            onClick={onToggleCollapse}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" aria-hidden /> : <ChevronLeft className="h-4 w-4" aria-hidden />}
          </Button>
        ) : null}
        {onClose ? (
          <Button type="button" variant="ghost" size="icon-sm" className="md:hidden" onClick={onClose} aria-label="Close sidebar">
            <X className="h-4 w-4" aria-hidden />
          </Button>
        ) : null}
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            onClick={onClose}
            className={cn(item.matcher(pathname) ? "sidebar-link active" : "sidebar-link", isCollapsed ? "justify-center px-2" : "")}
          >
            <item.icon className="icon h-4 w-4" aria-hidden />
            {!isCollapsed ? <span>{item.label}</span> : null}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
