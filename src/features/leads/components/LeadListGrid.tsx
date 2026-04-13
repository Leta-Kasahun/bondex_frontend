"use client";

import { useState } from "react";
import { PencilLine, Trash2 } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { type Business } from "@/src/features/business";
import { type Lead } from "../types/lead.types";
import {
  formatLeadDate,
  formatLeadPlatform,
  leadPriorityLabel,
  leadStatusLabel,
} from "../constants/lead-ui.constants";
import { LeadFormModal } from "./LeadFormModal";

type LeadListGridProps = {
  leads: Lead[];
  businesses: Business[];
  isDeleting: boolean;
  onDelete: (leadId: string) => void;
};

export function LeadListGrid({ leads, businesses, isDeleting, onDelete }: LeadListGridProps) {
  const [editingLead, setEditingLead] = useState<Lead | null>(null);

  const priorityBrandClassName: Record<Lead["priority"], string> = {
    low: "bg-[#E9EEF3] text-[#2C4E6F]",
    medium: "bg-[#D5DEE7] text-[#2C4E6F]",
    high: "bg-[#FDECEC] text-[#B91C1C]",
  };

  return (
    <Card className="border-border/70 bg-[#FFFFFF]">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left" style={{ minWidth: 920 }}>
            <thead className="bg-[#F3F6FA] text-xs uppercase tracking-wide text-[#4F647A]">
              <tr>
                <th className="px-4 py-3 font-semibold">Customer</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Priority</th>
                <th className="px-4 py-3 font-semibold">Platform</th>
                <th className="px-4 py-3 font-semibold">Email</th>
                <th className="px-4 py-3 font-semibold">Phone</th>
                <th className="px-4 py-3 font-semibold">Created</th>
                <th className="px-4 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr
                  key={lead.id}
                  className="border-t border-border transition-colors hover:bg-sidebar-primary/5"
                >
                  <td className="px-4 py-2.5 align-middle">
                    <div className="max-w-64">
                      <p className="truncate text-sm font-semibold text-foreground">{lead.customerName || "Unnamed customer"}</p>
                      <p className="truncate text-xs text-muted-foreground">{lead.message}</p>
                    </div>
                  </td>
                  <td className="px-4 py-2.5 align-middle text-sm text-foreground">{leadStatusLabel[lead.status]}</td>
                  <td className="px-4 py-2.5 align-middle">
                    <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${priorityBrandClassName[lead.priority]}`}>
                      {leadPriorityLabel[lead.priority]}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 align-middle text-sm text-foreground">{formatLeadPlatform(lead.platform)}</td>
                  <td className="px-4 py-2.5 align-middle text-sm text-muted-foreground">{lead.customerEmail || "-"}</td>
                  <td className="px-4 py-2.5 align-middle text-sm text-muted-foreground">{lead.customerPhone || "-"}</td>
                  <td className="px-4 py-2.5 align-middle text-sm text-muted-foreground">{formatLeadDate(lead.createdAt)}</td>
                  <td className="px-4 py-2.5 align-middle">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="text-sidebar-primary hover:bg-sidebar-primary/10 hover:text-sidebar-primary"
                        onClick={() => setEditingLead(lead)}
                        aria-label={`Edit ${lead.customerName || "lead"}`}
                      >
                        <PencilLine className="h-5 w-5" aria-hidden />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                        onClick={() => onDelete(lead.id)}
                        disabled={isDeleting}
                        aria-label={`Delete ${lead.customerName || "lead"}`}
                      >
                        <Trash2 className="h-5 w-5" aria-hidden />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <LeadFormModal
          mode="edit"
          lead={editingLead ?? undefined}
          businesses={businesses}
          open={Boolean(editingLead)}
          onOpenChange={(open) => {
            if (!open) {
              setEditingLead(null);
            }
          }}
        />
      </CardContent>
    </Card>
  );
}
