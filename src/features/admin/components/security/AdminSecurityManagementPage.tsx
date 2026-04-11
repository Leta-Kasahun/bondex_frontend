"use client";

import { useMemo, useState } from "react";
import { ShieldCheck } from "lucide-react";
import { APP_CONSTANTS } from "@/src/constants";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { useDebounce, useNotification } from "@/src/hooks";
import {
  useAdminSystemStats,
  useAdminUserDetails,
  useAdminUsers,
  useBlockAdminUser,
  useUnblockAdminUser,
} from "../../hooks";
import { AdminUserDetailsModal } from "../users";
import { AdminSecurityFiltersBar } from "./AdminSecurityFiltersBar";
import { AdminSecurityStatsCards } from "./AdminSecurityStatsCards";
import { AdminSecurityUsersTable } from "./AdminSecurityUsersTable";

const FILTER_DEFAULTS = {
  search: "",
  status: "all",
  page: APP_CONSTANTS.PAGINATION.DEFAULT_PAGE,
  limit: APP_CONSTANTS.PAGINATION.DEFAULT_LIMIT,
} as const;

export function AdminSecurityManagementPage() {
  const notification = useNotification();
  const [search, setSearch] = useState(FILTER_DEFAULTS.search);
  const [status, setStatus] = useState(FILTER_DEFAULTS.status);
  const [page, setPage] = useState(FILTER_DEFAULTS.page);
  const [selectedUserId, setSelectedUserId] = useState<string | undefined>(undefined);

  const debouncedSearch = useDebounce(search, 350);

  const query = useMemo(
    () => ({
      page,
      limit: FILTER_DEFAULTS.limit,
      ...(debouncedSearch.trim() ? { search: debouncedSearch.trim() } : {}),
      ...(status === "all" ? {} : { isActive: status === "active" }),
    }),
    [page, debouncedSearch, status]
  );

  const { data: userResponse, isLoading: isUsersLoading, isFetching: isUsersFetching, isError: isUsersError } = useAdminUsers(query);
  const { data: systemStats, isLoading: isStatsLoading } = useAdminSystemStats();
  const { data: selectedUserDetails, isLoading: isDetailsLoading } = useAdminUserDetails(selectedUserId);

  const blockMutation = useBlockAdminUser();
  const unblockMutation = useUnblockAdminUser();

  const users = userResponse?.items ?? [];
  const meta = userResponse?.meta;
  const totalPages = meta ? Math.max(1, Math.ceil(meta.total / meta.limit)) : 1;

  const processingUserId =
    (blockMutation.variables as string | undefined) ??
    (unblockMutation.variables as string | undefined);

  const resetFilters = () => {
    setSearch(FILTER_DEFAULTS.search);
    setStatus(FILTER_DEFAULTS.status);
    setPage(FILTER_DEFAULTS.page);
  };

  const handleBlock = (userId: string) => {
    blockMutation.mutate(userId, {
      onSuccess: () => notification.success("User blocked successfully"),
    });
  };

  const handleUnblock = (userId: string) => {
    unblockMutation.mutate(userId, {
      onSuccess: () => notification.success("User unblocked successfully"),
    });
  };

  return (
    <main className="flex-1 space-y-6 bg-background p-4 md:p-6">
      <section className="relative overflow-hidden rounded-2xl border border-[#C3CDD6] bg-linear-to-br from-[#FFFFFF] via-[#F3F6FA] to-[#E6EEF5] p-5 shadow-sm">
        <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-[#8BAACF]/20 blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute -left-8 bottom-0 h-24 w-24 rounded-full bg-[#5F82AA]/20 blur-2xl" aria-hidden />

        <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="font-heading text-2xl font-semibold text-foreground md:text-3xl">Admin Security Control</h1>
            <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
              Review account posture, enforce access controls, and inspect user session history aligned to backend security workflows.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#8BAACF]/40 bg-[#FFFFFF] px-3 py-2 text-sm text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-primary" aria-hidden />
            Security governance mode
          </div>
        </div>
      </section>

      <AdminSecurityStatsCards stats={systemStats} users={users} />

      <AdminSecurityFiltersBar
        search={search}
        onSearchChange={(value) => {
          setSearch(value);
          setPage(FILTER_DEFAULTS.page);
        }}
        status={status}
        onStatusChange={(value) => {
          setStatus(value);
          setPage(FILTER_DEFAULTS.page);
        }}
        onReset={resetFilters}
      />

      {isStatsLoading || isUsersLoading || isUsersFetching ? (
        <Card className="border-border/70 bg-[#FFFFFF]">
          <CardContent className="pt-4 text-sm text-muted-foreground">Loading security policies and account data...</CardContent>
        </Card>
      ) : null}

      {isUsersError ? (
        <Card className="border-border/70 bg-[#FFFFFF]">
          <CardContent className="pt-4 text-sm text-muted-foreground">Unable to load admin security data right now.</CardContent>
        </Card>
      ) : null}

      {!isUsersLoading && !isUsersError ? (
        <Card className="border-border/70 bg-[#FFFFFF]">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Account access control list</CardTitle>
            <p className="text-xs text-muted-foreground">{meta ? `${meta.total} users in scope` : "0 users in scope"}</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {users.length === 0 ? (
              <p className="text-sm text-muted-foreground">No users matched the selected security filters.</p>
            ) : (
              <AdminSecurityUsersTable
                users={users}
                processingUserId={processingUserId}
                onViewDetails={setSelectedUserId}
                onBlock={handleBlock}
                onUnblock={handleUnblock}
              />
            )}

            <div className="flex flex-col gap-2 border-t border-border/70 pt-4 text-sm md:flex-row md:items-center md:justify-between">
              <p className="text-muted-foreground">
                Page {meta?.page ?? 1} of {totalPages}
              </p>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  disabled={(meta?.page ?? 1) <= 1}
                  onClick={() => setPage((current) => Math.max(1, current - 1))}
                >
                  Previous
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  disabled={(meta?.page ?? 1) >= totalPages}
                  onClick={() => setPage((current) => current + 1)}
                >
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : null}

      <AdminUserDetailsModal
        open={Boolean(selectedUserId)}
        user={selectedUserDetails}
        isLoading={isDetailsLoading}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedUserId(undefined);
          }
        }}
      />
    </main>
  );
}
