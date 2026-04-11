import { MessageSquareText, Trash2 } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import { type Business } from "@/src/features/business";
import { type Lead } from "../types/lead.types";
import {
  formatLeadDate,
  formatLeadPlatform,
  leadPriorityClassName,
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
  return (
    <section className="grid grid-cols-1 gap-4 xl:grid-cols-2">
      {leads.map((lead) => (
        <Card key={lead.id} className="border-border/70 bg-[#FFFFFF]">
          <CardHeader className="space-y-2">
            <div className="flex items-center justify-between gap-3">
              <CardTitle className="text-base md:text-lg">{lead.customerName || "Unnamed customer"}</CardTitle>
              <span className={`rounded-full px-2 py-1 text-xs font-semibold ${leadPriorityClassName[lead.priority]}`}>
                {leadPriorityLabel[lead.priority]} priority
              </span>
            </div>
            <CardDescription className="inline-flex flex-wrap items-center gap-2">
              <span className="rounded-md bg-[#E2E8F0] px-2 py-1 text-xs font-medium text-[#334155]">
                {leadStatusLabel[lead.status]}
              </span>
              <span className="text-xs text-muted-foreground">Platform: {formatLeadPlatform(lead.platform)}</span>
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-3">
            <p className="line-clamp-2 text-sm text-muted-foreground">{lead.message}</p>

            <div className="grid grid-cols-1 gap-1 text-xs text-muted-foreground md:grid-cols-2">
              <span>Email: {lead.customerEmail || "-"}</span>
              <span>Phone: {lead.customerPhone || "-"}</span>
              <span>Created: {formatLeadDate(lead.createdAt)}</span>
              <span>Updated: {formatLeadDate(lead.updatedAt)}</span>
            </div>

            <div className="flex items-center gap-2">
              <LeadFormModal
                mode="edit"
                lead={lead}
                businesses={businesses}
                triggerLabel="Edit"
                triggerVariant="outline"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => onDelete(lead.id)}
                disabled={isDeleting}
              >
                <Trash2 className="h-4 w-4" aria-hidden />
                Delete
              </Button>
              <span className="ml-auto inline-flex items-center gap-1 text-xs text-muted-foreground">
                <MessageSquareText className="h-3.5 w-3.5" aria-hidden />
                {lead.aiReasoning ? "AI scored" : "Manual triage"}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
