import { Bell, ChevronLeft, ChevronRight, Menu, Search } from "lucide-react";
import { Avatar, AvatarFallback } from "@/src/components/ui/avatar";
import { Input } from "@/src/components/ui/input";
import { SharedIconAction } from "@/src/features/shared";

type AdminDashboardTopbarProps = {
  onToggleSidebar: () => void;
  isSidebarCollapsed: boolean;
  onToggleSidebarCollapse: () => void;
};

export function AdminDashboardTopbar({
  onToggleSidebar,
  isSidebarCollapsed,
  onToggleSidebarCollapse,
}: AdminDashboardTopbarProps) {
  return (
    <header className="border-b border-border/70 bg-[#FFFFFF] px-4 py-3 md:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleSidebar}
          aria-label="Open sidebar"
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-[#FFFFFF] md:hidden"
        >
          <Menu className="h-4 w-4" aria-hidden />
        </button>

        <button
          type="button"
          onClick={onToggleSidebarCollapse}
          aria-label={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="hidden h-9 w-9 items-center justify-center rounded-md border border-border bg-[#FFFFFF] md:inline-flex"
        >
          {isSidebarCollapsed ? <ChevronRight className="h-4 w-4" aria-hidden /> : <ChevronLeft className="h-4 w-4" aria-hidden />}
        </button>

        <div className="relative w-full max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
          <Input placeholder="Search admin dashboard..." className="h-10 bg-[#FFFFFF] pl-10" />
        </div>

        <div className="ml-auto flex items-center gap-2">
          <SharedIconAction icon={Bell} label="Notifications" />
          <Avatar size="lg">
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
