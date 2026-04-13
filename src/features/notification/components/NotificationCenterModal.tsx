"use client";

import { useMemo, useState } from "react";
import { Bell, Check, MailWarning } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import {
  useMarkNotificationAsRead,
  useNotifications,
  useUnreadNotificationCount,
} from "../hooks";
import { formatRelativeTime } from "@/src/utils/dateFormatter";
import { cn } from "@/src/utils/cn";

type NotificationCenterModalProps = {
  backendEnabled?: boolean;
};

function NotificationTriggerButton({ unreadCount }: { unreadCount: number }) {
  return (
    <Button type="button" variant="outline" size="icon-sm" aria-label="Notifications" title="Notifications" className="relative">
      <Bell className="h-4 w-4" aria-hidden />
      {unreadCount > 0 ? (
        <span className="absolute -right-1 -top-1 inline-flex min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">
          {unreadCount > 99 ? "99+" : unreadCount}
        </span>
      ) : null}
    </Button>
  );
}

export function NotificationCenterModal({ backendEnabled = true }: NotificationCenterModalProps) {
  const [open, setOpen] = useState(false);

  const { data: notifications, isLoading, isError } = useNotifications({ limit: 20 }, backendEnabled);
  const { data: unread } = useUnreadNotificationCount(undefined, backendEnabled);
  const markAsReadMutation = useMarkNotificationAsRead();

  const inferredUnreadCount = (notifications ?? []).filter(
    (notification) => !(notification.read ?? Boolean(notification.readAt))
  ).length;

  const unreadCount = backendEnabled ? (unread?.unreadCount ?? inferredUnreadCount) : 0;

  const sortedNotifications = useMemo(
    () => (notifications ?? []).slice().sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)),
    [notifications]
  );

  return (
    <>
      {open ? <div className="pointer-events-none fixed inset-0 z-40 bg-black/5 backdrop-blur-[2px]" /> : null}

      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <span>
            <NotificationTriggerButton unreadCount={unreadCount} />
          </span>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" sideOffset={8} className="z-50 w-[min(28rem,calc(100vw-1rem))] bg-[#FFFFFF] p-3">
          <div className="mb-2">
            <h3 className="text-base font-medium text-foreground">Notifications</h3>
            <p className="text-sm text-muted-foreground">
              {!backendEnabled
                ? "Notification inbox is not enabled for this role yet."
                : unreadCount > 0
                  ? `${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}`
                  : "All caught up"}
            </p>
          </div>

          <div className="max-h-96 space-y-2 overflow-y-auto pr-1">
            {!backendEnabled ? (
              <div className="rounded-lg border border-border/70 bg-background/80 p-4 text-sm text-muted-foreground">
                No notifications available for this role.
              </div>
            ) : null}

            {isLoading ? (
              <div className="rounded-lg border border-border/70 bg-background/80 p-3 text-sm text-muted-foreground">Loading notifications...</div>
            ) : null}

            {!isLoading && isError ? (
              <div className="rounded-lg border border-border/70 bg-background/80 p-4 text-sm text-muted-foreground">
                Unable to load notifications right now.
              </div>
            ) : null}

            {!isLoading && !isError && sortedNotifications.length === 0 ? (
              <div className="rounded-lg border border-border/70 bg-background/80 p-4 text-sm text-muted-foreground">
                No notifications yet.
              </div>
            ) : null}

            {sortedNotifications.map((notification) => {
              const isRead = notification.read ?? Boolean(notification.readAt);
              return (
                <div
                  key={notification.id}
                  className={cn(
                    "rounded-lg border border-border/70 bg-background/90 p-3",
                    !isRead ? "ring-1 ring-primary/30" : ""
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground">{notification.title}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{notification.body}</p>
                      <p className="mt-2 text-xs text-muted-foreground">{formatRelativeTime(notification.createdAt)}</p>
                    </div>

                    {!isRead ? (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="shrink-0"
                        disabled={markAsReadMutation.isPending}
                        onClick={() => markAsReadMutation.mutate(notification.id)}
                        aria-label="Mark notification as read"
                      >
                        <Check className="h-3.5 w-3.5" aria-hidden />
                        Read
                      </Button>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                        <MailWarning className="h-3.5 w-3.5" aria-hidden />
                        Read
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
