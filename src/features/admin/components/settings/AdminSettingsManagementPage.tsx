"use client";

import { Cog } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { APP_CONSTANTS } from "@/src/constants";
import { useAdminSystemStats, useAdminUsers } from "../../hooks";
import { AdminSettingsGovernancePanel } from "./AdminSettingsGovernancePanel";
import { AdminSettingsSnapshotCards } from "./AdminSettingsSnapshotCards";

export function AdminSettingsManagementPage() {
  const { data: stats, isLoading: isStatsLoading, isError: isStatsError } = useAdminSystemStats();
  const { data: usersResponse, isLoading: isUsersLoading, isError: isUsersError } = useAdminUsers({
    page: APP_CONSTANTS.PAGINATION.DEFAULT_PAGE,
    limit: 5,
  });

  const recentUsers = usersResponse?.items ?? [];

  return (
    <main className="flex-1 space-y-6 bg-background p-4 md:p-6">
      <section className="relative overflow-hidden rounded-2xl border border-[#C3CDD6] bg-linear-to-br from-[#FFFFFF] via-[#F3F6FA] to-[#E6EEF5] p-5 shadow-sm">
        <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-[#8BAACF]/20 blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute -left-8 bottom-0 h-24 w-24 rounded-full bg-[#5F82AA]/20 blur-2xl" aria-hidden />

        <div className="relative flex flex-col gap-2">
          <h1 className="inline-flex items-center gap-2 font-heading text-2xl font-semibold text-foreground md:text-3xl">
            <Cog className="h-6 w-6 text-primary" aria-hidden />
            Admin Settings Center
          </h1>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Configure governance posture and operational defaults using backend-aligned admin controls.
          </p>
        </div>
      </section>

      {isStatsLoading || isUsersLoading ? (
        <Card className="border-border/70 bg-[#FFFFFF]">
          <CardContent className="pt-4 text-sm text-muted-foreground">Loading admin settings context...</CardContent>
        </Card>
      ) : null}

      {isStatsError || isUsersError ? (
        <Card className="border-border/70 bg-[#FFFFFF]">
          <CardContent className="pt-4 text-sm text-muted-foreground">Unable to load admin settings data right now.</CardContent>
        </Card>
      ) : null}

      {!isStatsLoading && !isUsersLoading && !isStatsError && !isUsersError ? (
        <>
          <AdminSettingsSnapshotCards stats={stats} />
          <AdminSettingsGovernancePanel stats={stats} />

          <Card className="border-border/70 bg-[#FFFFFF]">
            <CardHeader>
              <CardTitle className="text-base">Recent accounts in settings scope</CardTitle>
            </CardHeader>
            <CardContent>
              {recentUsers.length === 0 ? (
                <p className="text-sm text-muted-foreground">No accounts available for current settings snapshot.</p>
              ) : (
                <div className="space-y-2">
                  {recentUsers.map((user) => (
                    <div key={user.id} className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border/70 p-3 text-sm">
                      <div className="flex flex-col">
                        <span className="font-medium text-foreground">{user.name}</span>
                        <span className="text-muted-foreground">{user.email}</span>
                      </div>
                      <span className={user.isActive ? "rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700" : "rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-700"}>
                        {user.isActive ? "Active" : "Blocked"}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </>
      ) : null}
    </main>
  );
}
