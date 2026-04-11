"use client";

import { Bell, ChevronLeft, ChevronRight, Menu, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { APP_ROUTES } from "@/src/constants";
import { Input } from "@/src/components/ui/input";
import { SharedIconAction } from "@/src/features/shared";
import { useAuth } from "@/src/hooks/useAuth";
import { useUserAuth } from "@/src/features/auths/user";
import { AuthenticatedAvatarMenu } from "@/src/features/shared";
import { useUserProfile } from "@/src/features/users";

type UserDashboardTopbarProps = {
  onToggleSidebar: () => void;
  isSidebarCollapsed: boolean;
  onToggleSidebarCollapse: () => void;
};

export function UserDashboardTopbar({ onToggleSidebar, isSidebarCollapsed, onToggleSidebarCollapse }: UserDashboardTopbarProps) {
  const router = useRouter();
  const { name, email, avatar } = useAuth();
  const { logoutMutation } = useUserAuth();
  const { data: profile } = useUserProfile();

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
          <Input placeholder="Search dashboard..." className="h-10 bg-[#FFFFFF] pl-10" />
        </div>

        <div className="ml-auto flex items-center gap-2">
          <SharedIconAction icon={Bell} label="Notifications" />
          <AuthenticatedAvatarMenu
            role="USER"
            onLogout={() =>
              logoutMutation.mutate(undefined, {
                onSettled: () => {
                  router.push(APP_ROUTES.AUTH.LOGIN);
                },
              })
            }
            isLoggingOut={logoutMutation.isPending}
            name={profile?.name ?? name}
            email={profile?.email ?? email}
            avatarUrl={profile?.avatar ?? avatar}
          />
        </div>
      </div>
    </header>
  );
}
