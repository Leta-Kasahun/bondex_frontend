"use client";

import Link from "next/link";
import { ChevronDown, LayoutDashboard, LogOut, Mail, Settings, ShieldCheck, User, UserCog } from "lucide-react";
import { APP_ROUTES } from "@/src/constants";
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { cn } from "@/src/utils/cn";

type AuthenticatedAvatarMenuProps = {
  role: "USER" | "ADMIN";
  onLogout: () => void;
  isLoggingOut?: boolean;
  fullWidth?: boolean;
  name?: string | null;
  email?: string | null;
  avatarUrl?: string | null;
};

const roleContent = {
  USER: {
    label: "User Workspace",
    short: "UB",
    dashboardRoute: APP_ROUTES.DASHBOARD.USERS,
    profileRoute: APP_ROUTES.DASHBOARD.SETTINGS.PROFILE,
  },
  ADMIN: {
    label: "Admin Workspace",
    short: "AD",
    dashboardRoute: APP_ROUTES.DASHBOARD.ADMIN_DASHBOARD,
    profileRoute: APP_ROUTES.DASHBOARD.ADMIN_DASHBOARD,
  },
} as const;

export function AuthenticatedAvatarMenu({
  role,
  onLogout,
  isLoggingOut = false,
  fullWidth = false,
  name,
  email,
  avatarUrl,
}: AuthenticatedAvatarMenuProps) {
  const content = roleContent[role];
  const displayName = name?.trim() || content.label;
  const displayEmail = email?.trim() || (role === "ADMIN" ? "admin@bondex" : "user@bondex");
  const fallbackInitials = displayName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || content.short;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="Open account menu"
          className={cn(
            "inline-flex h-10 items-center gap-2 rounded-lg border border-border/70 bg-background/90 px-2.5",
            fullWidth ? "w-full justify-between" : ""
          )}
        >
          <span className="inline-flex items-center gap-2">
            <Avatar size="lg">
              {avatarUrl ? <AvatarImage src={avatarUrl} alt={displayName} /> : null}
              <AvatarFallback>{fallbackInitials}</AvatarFallback>
              <AvatarBadge>
                <ShieldCheck aria-hidden />
              </AvatarBadge>
            </Avatar>
            <span className="hidden text-sm font-medium text-foreground lg:inline">{displayName}</span>
          </span>
          <ChevronDown className="h-4 w-4 text-muted-foreground" aria-hidden />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex items-center gap-2">
          <UserCog className="h-4 w-4" aria-hidden />
          {content.label}
        </DropdownMenuLabel>
        <DropdownMenuLabel className="flex items-center gap-2">
          <User className="h-4 w-4" aria-hidden />
          {displayName}
        </DropdownMenuLabel>
        <DropdownMenuLabel className="flex items-center gap-2">
          <Mail className="h-4 w-4" aria-hidden />
          {displayEmail}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={content.profileRoute} className="cursor-pointer">
            <Settings className="h-4 w-4" aria-hidden />
            Profile settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={content.dashboardRoute} className="cursor-pointer">
            <LayoutDashboard className="h-4 w-4" aria-hidden />
            Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={onLogout}
          disabled={isLoggingOut}
          variant="destructive"
          className="cursor-pointer"
        >
          <LogOut className="h-4 w-4" aria-hidden />
          {isLoggingOut ? "Signing out..." : "Sign out"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
