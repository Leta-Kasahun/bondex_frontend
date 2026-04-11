"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Building2, Filter } from "lucide-react";
import { APP_ROUTES } from "@/src/constants";
import { APP_CONSTANTS } from "@/src/constants/config";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import { useBusinesses } from "@/src/features/business";
import { useLeads } from "@/src/features/leads";
import { useAuth, useDebounce } from "@/src/hooks";
import { useDeals } from "../hooks";
import { type DealStage } from "../types/deal.types";
import { DealConvertModal } from "./DealConvertModal";
import { DealFiltersBar } from "./DealFiltersBar";
import { DealListGrid } from "./DealListGrid";
import { DealStatsCards } from "./DealStatsCards";

export function DealManagementPage() {
  const { isAuthenticated, isUser, accessToken } = useAuth();
  const canLoadData = isUser && (isAuthenticated || Boolean(accessToken));

  const { data: businesses, isLoading: isBusinessesLoading, isError: isBusinessesError } = useBusinesses(undefined, canLoadData);
  const businessList = useMemo(() => businesses ?? [], [businesses]);

  const [selectedBusinessId, setSelectedBusinessId] = useState<string>("");
  const [search, setSearch] = useState("");
  const [stageFilter, setStageFilter] = useState<string>("all");
  const debouncedSearch = useDebounce(search, 350);

  const effectiveBusinessId = selectedBusinessId || businessList[0]?.id || "";

  const dealQuery = useMemo(() => {
    if (!effectiveBusinessId) {
      return undefined;
    }

    return {
      businessId: effectiveBusinessId,
      ...(debouncedSearch.trim() ? { search: debouncedSearch.trim() } : {}),
      ...(stageFilter !== "all" ? { stage: stageFilter as DealStage } : {}),
      page: APP_CONSTANTS.PAGINATION.DEFAULT_PAGE,
      limit: APP_CONSTANTS.PAGINATION.DEFAULT_LIMIT,
    };
  }, [effectiveBusinessId, debouncedSearch, stageFilter]);

  const { data: deals, isLoading: isDealsLoading, isFetching, isError: isDealsError } = useDeals(
    dealQuery,
    canLoadData && Boolean(dealQuery)
  );

  const leadQuery = useMemo(() => {
    if (!effectiveBusinessId) {
      return undefined;
    }

    return {
      businessId: effectiveBusinessId,
      page: APP_CONSTANTS.PAGINATION.DEFAULT_PAGE,
      limit: APP_CONSTANTS.PAGINATION.MAX_LIMIT,
    };
  }, [effectiveBusinessId]);

  const { data: leads } = useLeads(leadQuery, canLoadData && Boolean(leadQuery));

  const dealList = useMemo(() => deals ?? [], [deals]);
  const availableLeads = useMemo(() => {
    const dealLeadIdSet = new Set(dealList.map((deal) => deal.leadId));
    return (leads ?? []).filter(
      (lead) => lead.status !== APP_CONSTANTS.LEAD_STATUS.IGNORED && !dealLeadIdSet.has(lead.id)
    );
  }, [leads, dealList]);

  const stats = useMemo(() => {
    const activeDeals = dealList.filter((deal) => deal.stage !== APP_CONSTANTS.DEAL_STAGE.WON && deal.stage !== APP_CONSTANTS.DEAL_STAGE.LOST);
    const wonDeals = dealList.filter((deal) => deal.stage === APP_CONSTANTS.DEAL_STAGE.WON);
    const pipelineValue = dealList.reduce((sum, deal) => sum + (deal.value ?? 0), 0);

    return {
      total: dealList.length,
      active: activeDeals.length,
      won: wonDeals.length,
      pipelineValue,
    };
  }, [dealList]);

  return (
    <main className="flex-1 space-y-6 bg-background p-4 md:p-6">
      <section className="relative overflow-hidden rounded-2xl border border-[#C3CDD6] bg-linear-to-br from-[#FFFFFF] via-[#F3F6FA] to-[#E6EEF5] p-5 shadow-sm">
        <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-[#8BAACF]/20 blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute -left-8 bottom-0 h-24 w-24 rounded-full bg-[#5F82AA]/20 blur-2xl" aria-hidden />

        <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="font-heading text-2xl font-semibold text-foreground md:text-3xl">Deals Management</h1>
            <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
              Manage pipeline progression from qualified opportunities to won outcomes.
            </p>
          </div>

          <DealConvertModal leads={availableLeads} />
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
          <CardContent className="pt-4 text-sm text-muted-foreground">Unable to load businesses needed for deals.</CardContent>
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
              Deals are scoped to a business. Add one profile before managing pipeline stages.
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
          <DealStatsCards stats={stats} />

          <DealFiltersBar
            search={search}
            onSearchChange={setSearch}
            businessId={effectiveBusinessId}
            businesses={businessList}
            onBusinessChange={setSelectedBusinessId}
            stageFilter={stageFilter}
            onStageFilterChange={setStageFilter}
          />

          {isDealsLoading || isFetching ? (
            <Card className="border-border/70 bg-[#FFFFFF]">
              <CardContent className="pt-4 text-sm text-muted-foreground">Loading deals...</CardContent>
            </Card>
          ) : null}

          {isDealsError ? (
            <Card className="border-border/70 bg-[#FFFFFF]">
              <CardContent className="pt-4 text-sm text-muted-foreground">Unable to load deals right now.</CardContent>
            </Card>
          ) : null}

          {!isDealsLoading && !isDealsError && dealList.length === 0 ? (
            <Card className="border-border/70 bg-[#FFFFFF]">
              <CardHeader>
                <CardTitle className="inline-flex items-center gap-2">
                  <Filter className="h-5 w-5 text-primary" aria-hidden />
                  No deals found
                </CardTitle>
                <CardDescription>
                  Try changing filters or convert a lead into your first deal.
                </CardDescription>
              </CardHeader>
            </Card>
          ) : null}

          {!isDealsLoading && !isDealsError && dealList.length > 0 ? (
            <DealListGrid deals={dealList} />
          ) : null}
        </>
      ) : null}
    </main>
  );
}
