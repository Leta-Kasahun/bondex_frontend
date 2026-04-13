"use client";

import { useState } from "react";
import { Save, Trash2 } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { useNotification } from "@/src/hooks";
import { useDeleteDeal, useUpdateDealStage } from "../hooks";
import { dealStageOptions, formatDealDate } from "../constants/deal-ui.constants";
import { type Deal, type DealStage } from "../types/deal.types";

type DealListGridProps = {
  deals: Deal[];
};

export function DealListGrid({ deals }: DealListGridProps) {
  const notification = useNotification();
  const updateDealStageMutation = useUpdateDealStage();
  const deleteDealMutation = useDeleteDeal();
  const [stageDrafts, setStageDrafts] = useState<Record<string, DealStage>>({});
  const [updatingDealId, setUpdatingDealId] = useState<string | null>(null);

  const setStageDraft = (dealId: string, stage: DealStage) => {
    setStageDrafts((prev) => ({ ...prev, [dealId]: stage }));
  };

  const handleUpdateStage = (deal: Deal, nextStage: DealStage) => {
    if (nextStage === deal.stage) {
      return;
    }

    setUpdatingDealId(deal.id);
    updateDealStageMutation.mutate(
      {
        dealId: deal.id,
        payload: {
          stage: nextStage,
          ...(typeof deal.value === "number" && deal.value > 0 ? { value: deal.value } : {}),
        },
      },
      {
        onSuccess: () => notification.success("Deal stage updated"),
        onError: () => notification.error("Unable to update deal stage"),
        onSettled: () => setUpdatingDealId(null),
      }
    );
  };

  const handleDeleteDeal = (dealId: string) => {
    deleteDealMutation.mutate(dealId, {
      onSuccess: () => notification.success("Deal deleted"),
      onError: () => notification.error("Unable to delete deal"),
    });
  };

  return (
    <Card className="border-border/70 bg-[#FFFFFF]">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left" style={{ minWidth: 980 }}>
            <thead className="bg-[#F3F6FA] text-xs uppercase tracking-wide text-[#4F647A]">
              <tr>
                <th className="px-4 py-3 font-semibold">Deal</th>
                <th className="px-4 py-3 font-semibold">Stage</th>
                <th className="px-4 py-3 font-semibold">Value</th>
                <th className="px-4 py-3 font-semibold">Closed</th>
                <th className="px-4 py-3 font-semibold">Created</th>
                <th className="px-4 py-3 font-semibold">Lead ID</th>
                <th className="px-4 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {deals.map((deal) => {
                const selectedStage = stageDrafts[deal.id] ?? deal.stage;

                return (
                  <tr key={deal.id} className="border-t border-border transition-colors hover:bg-sidebar-primary/5">
                    <td className="px-4 py-2.5 align-middle">
                      <div className="max-w-64">
                        <p className="truncate text-sm font-semibold text-foreground">{deal.name}</p>
                        <p className="truncate text-xs text-muted-foreground">{deal.id}</p>
                      </div>
                    </td>
                    <td className="px-4 py-2.5 align-middle">
                      <Select
                        value={selectedStage}
                        onValueChange={(value) => {
                          const next = value as DealStage;
                          setStageDraft(deal.id, next);
                          handleUpdateStage(deal, next);
                        }}
                        disabled={updatingDealId === deal.id}
                      >
                        <SelectTrigger className="h-8 w-36 bg-[#FFFFFF] text-sm">
                          <SelectValue placeholder="Stage" />
                        </SelectTrigger>
                        <SelectContent>
                          {dealStageOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="px-4 py-2.5 align-middle text-sm text-muted-foreground">
                      {deal.value ? `$${deal.value.toLocaleString()}` : "-"}
                    </td>
                    <td className="px-4 py-2.5 align-middle text-sm text-muted-foreground">
                      {deal.closedAt ? formatDealDate(deal.closedAt) : "-"}
                    </td>
                    <td className="px-4 py-2.5 align-middle text-sm text-muted-foreground">{formatDealDate(deal.createdAt)}</td>
                    <td className="px-4 py-2.5 align-middle text-sm text-muted-foreground">{deal.leadId}</td>
                    <td className="px-4 py-2.5 align-middle">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="text-sidebar-primary hover:bg-sidebar-primary/10 hover:text-sidebar-primary"
                          onClick={() => handleUpdateStage(deal, selectedStage)}
                          disabled={updatingDealId === deal.id || selectedStage === deal.stage}
                          aria-label={`Update ${deal.name}`}
                        >
                          <Save className="h-5 w-5" aria-hidden />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                          onClick={() => handleDeleteDeal(deal.id)}
                          disabled={deleteDealMutation.isPending}
                          aria-label={`Delete ${deal.name}`}
                        >
                          <Trash2 className="h-5 w-5" aria-hidden />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
