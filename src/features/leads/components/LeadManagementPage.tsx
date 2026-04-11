"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Building2, Filter } from "lucide-react";
import { APP_ROUTES } from "@/src/constants";
import { APP_CONSTANTS } from "@/src/constants/config";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import { useBusinesses } from "@/src/features/business";
import { useAuth, useDebounce, useNotification } from "@/src/hooks";
import { useDeleteLead, useLeads } from "../hooks";
import { type LeadPriority, type LeadStatus } from "../types/lead.types";
import { LeadFormModal } from "./LeadFormModal";
import { LeadFiltersBar } from "./LeadFiltersBar";
import { LeadListGrid } from "./LeadListGrid";
import { LeadStatsCards } from "./LeadStatsCards";

export function LeadManagementPage() {
  const notification = useNotification();
  const { isAuthenticated, isUser, accessToken } = useAuth();
  const canLoadData = isUser && (isAuthenticated || Boolean(accessToken));

  const { data: businesses, isLoading: isBusinessesLoading, isError: isBusinessesError } = useBusinesses(undefined, canLoadData);
  const businessList = useMemo(() => businesses ?? [], [businesses]);

  const [selectedBusinessId, setSelectedBusinessId] = useState<string>("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const debouncedSearch = useDebounce(search, 350);

  const effectiveBusinessId = selectedBusinessId || businessList[0]?.id || "";

  const query = useMemo(() => {
    if (!effectiveBusinessId) {
      return undefined;
    }

    return {
      businessId: effectiveBusinessId,
      ...(debouncedSearch.trim() ? { search: debouncedSearch.trim() } : {}),
      ...(statusFilter !== "all" ? { status: statusFilter as LeadStatus } : {}),
      ...(priorityFilter !== "all" ? { priority: priorityFilter as LeadPriority } : {}),
      page: APP_CONSTANTS.PAGINATION.DEFAULT_PAGE,
      limit: APP_CONSTANTS.PAGINATION.DEFAULT_LIMIT,
    };
  }, [effectiveBusinessId, debouncedSearch, statusFilter, priorityFilter]);

  const { data: leads, isLoading: isLeadsLoading, isFetching, isError: isLeadsError } = useLeads(
    query,
    canLoadData && Boolean(query)
  );

  const deleteMutation = useDeleteLead();
  const leadList = useMemo(() => leads ?? [], [leads]);

  const stats = useMemo(() => {
    return {
      total: leadList.length,
      highPriority: leadList.filter((lead) => lead.priority === APP_CONSTANTS.LEAD_PRIORITY.HIGH).length,
      converted: leadList.filter((lead) => lead.status === APP_CONSTANTS.LEAD_STATUS.CONVERTED).length,
      pending: leadList.filter((lead) => lead.status === APP_CONSTANTS.LEAD_STATUS.NEW || lead.status === APP_CONSTANTS.LEAD_STATUS.CONTACTED).length,
    };
  }, [leadList]);

  const handleDelete = (leadId: string) => {
    deleteMutation.mutate(leadId, {
      onSuccess: () => {
        notification.success("Lead deleted");
      },
    });
  };

  return (
    <main className="flex-1 space-y-6 bg-background p-4 md:p-6">
      <section className="relative overflow-hidden rounded-2xl border border-[#C3CDD6] bg-linear-to-br from-[#FFFFFF] via-[#F3F6FA] to-[#E6EEF5] p-5 shadow-sm">
        <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-[#8BAACF]/20 blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute -left-8 bottom-0 h-24 w-24 rounded-full bg-[#5F82AA]/20 blur-2xl" aria-hidden />

        <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="font-heading text-2xl font-semibold text-foreground md:text-3xl">Leads Management</h1>
            <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
              Track customer intent, prioritize follow-ups, and convert conversations into revenue.
            </p>
          </div>

          <LeadFormModal
            mode="create"
            businesses={businessList}
              defaultBusinessId={effectiveBusinessId}
            triggerLabel="Create lead"
          />
        </div>
      </section>

      {!canLoadData ? (
        <Card className="border-border/70 bg-[#FFFFFF]">
          <CardContent className="pt-4 text-sm text-muted-foreground">Session not ready. Please log in again.</CardContent>
        </Card>
      ) : null}

      {canLoadData && isBusinessesLoading ? (
        <Card className="border-border/70 bg-[#FFFFFF]">
          <CardContent className="pt-4 text-sm text-muted-foreground">Loading business workspaces...</CardContent>
        </Card>
      ) : null}

      {canLoadData && isBusinessesError ? (
        <Card className="border-border/70 bg-[#FFFFFF]">
          <CardContent className="pt-4 text-sm text-muted-foreground">Unable to load businesses needed for leads.</CardContent>
        </Card>
      ) : null}

      {canLoadData && !isBusinessesLoading && !isBusinessesError && businessList.length === 0 ? (
        <Card className="border-border/70 bg-[#FFFFFF]">
          <CardHeader>
            <CardTitle className="inline-flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" aria-hidden />
              Create a business first
            </CardTitle>
            <CardDescription>
              Leads are linked to a business workflow. Add one business profile to start pipeline tracking.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href={APP_ROUTES.DASHBOARD.BUSINESSES}>Go to Businesses</Link>
            </Button>
          </CardContent>
        </Card>
      ) : null}

      {canLoadData && businessList.length > 0 ? (
        <>
          <LeadStatsCards stats={stats} />

          <LeadFiltersBar
            search={search}
            onSearchChange={setSearch}
            businessId={effectiveBusinessId}
            businesses={businessList}
            onBusinessChange={setSelectedBusinessId}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            priorityFilter={priorityFilter}
            onPriorityFilterChange={setPriorityFilter}
          />

          {isLeadsLoading || isFetching ? (
            <Card className="border-border/70 bg-[#FFFFFF]">
              <CardContent className="pt-4 text-sm text-muted-foreground">Loading leads...</CardContent>
            </Card>
          ) : null}

          {isLeadsError ? (
            <Card className="border-border/70 bg-[#FFFFFF]">
              <CardContent className="pt-4 text-sm text-muted-foreground">Unable to load leads right now.</CardContent>
            </Card>
          ) : null}

          {!isLeadsLoading && !isLeadsError && leadList.length === 0 ? (
            <Card className="border-border/70 bg-[#FFFFFF]">
              <CardHeader>
                <CardTitle className="inline-flex items-center gap-2">
                  <Filter className="h-5 w-5 text-primary" aria-hidden />
                  No leads found
                </CardTitle>
                <CardDescription>
                  Try changing filters or create a new lead for this business.
                </CardDescription>
              </CardHeader>
            </Card>
          ) : null}

          {!isLeadsLoading && !isLeadsError && leadList.length > 0 ? (
            <LeadListGrid
              leads={leadList}
              businesses={businessList}
              isDeleting={deleteMutation.isPending}
              onDelete={handleDelete}
            />
          ) : null}
        </>
      ) : null}
    </main>
  );
}
