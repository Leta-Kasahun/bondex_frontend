import Link from "next/link";
import { BarChart3, Bell, ChevronLeft, ChevronRight, LayoutDashboard, Link2, Settings, Users, X } from "lucide-react";
import { APP_ROUTES } from "@/src/constants";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/utils/cn";

type UserDashboardSidebarProps = {
  onClose?: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
};

const navItems = [
  { label: "Dashboard", href: APP_ROUTES.DASHBOARD.USERS, icon: LayoutDashboard, active: true },
  { label: "Leads", href: APP_ROUTES.DASHBOARD.LEADS, icon: Users },
  { label: "Deals", href: APP_ROUTES.DASHBOARD.DEALS, icon: BarChart3 },
  { label: "Integrations", href: APP_ROUTES.DASHBOARD.SETTINGS.INTEGRATIONS.TELEGRAM, icon: Link2 },
  { label: "Notifications", href: APP_ROUTES.DASHBOARD.NOTIFICATIONS, icon: Bell },
  { label: "Settings", href: APP_ROUTES.DASHBOARD.SETTINGS.PROFILE, icon: Settings },
];

export function UserDashboardSidebar({ onClose, isCollapsed = false, onToggleCollapse }: UserDashboardSidebarProps) {
  return (
    <aside className={cn("h-full border-r border-sidebar-border bg-sidebar p-4", isCollapsed ? "w-20" : "w-72")}>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-heading text-lg font-semibold text-sidebar-foreground">{isCollapsed ? "B" : "Bondex User"}</h2>
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
            className={cn(item.active ? "sidebar-link active" : "sidebar-link", isCollapsed ? "justify-center px-2" : "")}
          >
            <item.icon className="icon h-4 w-4" aria-hidden />
            {!isCollapsed ? <span>{item.label}</span> : null}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
