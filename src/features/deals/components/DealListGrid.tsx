"use client";

import { useState } from "react";
import { CalendarClock, Save } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { useNotification } from "@/src/hooks";
import { useUpdateDealStage } from "../hooks";
import { dealStageClassName, dealStageLabel, dealStageOptions, formatDealDate } from "../constants/deal-ui.constants";
import { type Deal, type DealStage } from "../types/deal.types";

type DealListGridProps = {
  deals: Deal[];
};

export function DealListGrid({ deals }: DealListGridProps) {
  const notification = useNotification();
  const updateDealStageMutation = useUpdateDealStage();
  const [stageDrafts, setStageDrafts] = useState<Record<string, DealStage>>({});

  const setStageDraft = (dealId: string, stage: DealStage) => {
    setStageDrafts((prev) => ({ ...prev, [dealId]: stage }));
  };

  const handleUpdateStage = (deal: Deal) => {
    const nextStage = stageDrafts[deal.id] ?? deal.stage;
    if (nextStage === deal.stage) {
      return;
    }

    updateDealStageMutation.mutate(
      {
        dealId: deal.id,
        payload: {
          stage: nextStage,
          ...(deal.value !== null && deal.value !== undefined ? { value: deal.value } : {}),
        },
      },
      {
        onSuccess: () => notification.success("Deal stage updated"),
      }
    );
  };

  return (
    <section className="grid grid-cols-1 gap-4 xl:grid-cols-2">
      {deals.map((deal) => {
        const selectedStage = stageDrafts[deal.id] ?? deal.stage;

        return (
          <Card key={deal.id} className="border-border/70 bg-[#FFFFFF]">
            <CardHeader className="space-y-2">
              <div className="flex items-center justify-between gap-3">
                <CardTitle className="text-base md:text-lg">{deal.name}</CardTitle>
                <span className={`rounded-full px-2 py-1 text-xs font-semibold ${dealStageClassName[deal.stage]}`}>
                  {dealStageLabel[deal.stage]}
                </span>
              </div>
              <CardDescription className="text-xs text-muted-foreground">
                Deal ID: {deal.id}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 gap-1 text-xs text-muted-foreground md:grid-cols-2">
                <span>Value: {deal.value ? `$${deal.value.toLocaleString()}` : "-"}</span>
                <span>Created: {formatDealDate(deal.createdAt)}</span>
                <span>Updated: {formatDealDate(deal.updatedAt)}</span>
                <span>Closed: {deal.closedAt ? formatDealDate(deal.closedAt) : "-"}</span>
              </div>

              <div className="flex flex-col gap-2 md:flex-row md:items-center">
                <Select
                  value={selectedStage}
                  onValueChange={(value) => setStageDraft(deal.id, value as DealStage)}
                >
                  <SelectTrigger className="h-10 w-full bg-[#FFFFFF] px-4 text-sm md:max-w-55">
                    <SelectValue placeholder="Select stage" />
                  </SelectTrigger>
                  <SelectContent>
                    {dealStageOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleUpdateStage(deal)}
                  disabled={updateDealStageMutation.isPending || selectedStage === deal.stage}
                >
                  <Save className="h-4 w-4" aria-hidden />
                  Update stage
                </Button>

                <span className="ml-auto inline-flex items-center gap-1 text-xs text-muted-foreground">
                  <CalendarClock className="h-3.5 w-3.5" aria-hidden />
                  Workflow synced
                </span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </section>
  );
}
