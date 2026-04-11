import Link from "next/link";
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
  { label: "Dashboard", href: APP_ROUTES.DASHBOARD.ADMIN_DASHBOARD, icon: LayoutDashboard, active: true },
  { label: "Users", href: APP_ROUTES.DASHBOARD.ADMIN_DASHBOARD, icon: Users },
  { label: "System", href: APP_ROUTES.DASHBOARD.ADMIN_DASHBOARD, icon: Activity },
  { label: "Security", href: APP_ROUTES.DASHBOARD.ADMIN_DASHBOARD, icon: ShieldCheck },
  { label: "Notifications", href: APP_ROUTES.DASHBOARD.ADMIN_DASHBOARD, icon: Bell },
  { label: "Settings", href: APP_ROUTES.DASHBOARD.ADMIN_DASHBOARD, icon: Settings },
];

export function AdminDashboardSidebar({
  onClose,
  isCollapsed = false,
  onToggleCollapse,
}: AdminDashboardSidebarProps) {
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
