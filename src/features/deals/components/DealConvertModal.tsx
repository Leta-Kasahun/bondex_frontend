"use client";

import { useMemo, useState } from "react";
import { CircleDollarSign, FileSpreadsheet, UserRound } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { Input } from "@/src/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { useNotification } from "@/src/hooks";
import { type Lead } from "@/src/features/leads";
import { useConvertLeadToDeal } from "../hooks";
import { type ConvertLeadToDealInput } from "../types/deal.types";

type DealConvertModalProps = {
  leads: Lead[];
  triggerLabel?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

type FormState = {
  leadId: string;
  name: string;
  value: string;
};

const getInitialForm = (leadId?: string): FormState => ({
  leadId: leadId ?? "",
  name: "",
  value: "",
});

export function DealConvertModal({ leads, triggerLabel = "Create deal", open, onOpenChange }: DealConvertModalProps) {
  const notification = useNotification();
  const convertMutation = useConvertLeadToDeal();
  const [internalOpen, setInternalOpen] = useState(false);
  const [form, setForm] = useState<FormState>(getInitialForm(leads[0]?.id));

  const isControlled = typeof open === "boolean";
  const isOpen = isControlled ? open : internalOpen;
  const isSubmitting = convertMutation.isPending;

  const selectedLead = useMemo(
    () => leads.find((lead) => lead.id === form.leadId),
    [leads, form.leadId]
  );

  const setOpen = (next: boolean) => {
    if (next) {
      setForm(getInitialForm(leads[0]?.id));
    }

    if (!isControlled) {
      setInternalOpen(next);
    }

    onOpenChange?.(next);
  };

  const updateForm = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const submit = () => {
    const leadId = form.leadId.trim();
    const name = form.name.trim();

    if (!leadId) {
      notification.error("Lead is required", "Select a lead to convert into a deal.");
      return;
    }

    if (!name) {
      notification.error("Deal name is required", "Add a clear name for this deal.");
      return;
    }

    const parsedValue = form.value.trim() ? Number(form.value) : undefined;
    if (parsedValue !== undefined && (!Number.isFinite(parsedValue) || parsedValue <= 0)) {
      notification.error("Invalid value", "Deal value must be a positive number.");
      return;
    }

    const payload: ConvertLeadToDealInput = {
      leadId,
      name,
      ...(parsedValue !== undefined ? { value: parsedValue } : {}),
    };

    convertMutation.mutate(payload, {
      onSuccess: () => {
        notification.success("Deal created");
        setOpen(false);
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" className="h-9">
          <FileSpreadsheet className="h-4 w-4" aria-hidden />
          {triggerLabel}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Create deal</DialogTitle>
          <DialogDescription>
            Convert an active lead into a tracked deal aligned with your sales workflow.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <label className="block space-y-1">
            <span className="text-base font-medium text-foreground">Lead</span>
            <Select value={form.leadId} onValueChange={(value) => updateForm("leadId", value)}>
              <SelectTrigger className="h-11 w-full bg-[#FFFFFF] px-4 text-base">
                <SelectValue placeholder="Select lead" />
              </SelectTrigger>
              <SelectContent>
                {leads.map((lead) => (
                  <SelectItem key={lead.id} value={lead.id}>
                    {(lead.customerName || "Unnamed customer") + " - " + lead.message.slice(0, 40)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </label>

          <label className="block space-y-1">
            <span className="inline-flex items-center gap-2 text-base font-medium text-foreground">
              <UserRound className="h-4 w-4 text-muted-foreground" aria-hidden /> Deal name
            </span>
            <Input
              value={form.name}
              onChange={(event) => updateForm("name", event.target.value)}
              placeholder={selectedLead?.customerName ? `Deal for ${selectedLead.customerName}` : "Quarterly contract"}
              className="h-11 bg-[#FFFFFF] px-4 text-base placeholder:text-sm"
            />
          </label>

          <label className="block space-y-1">
            <span className="inline-flex items-center gap-2 text-base font-medium text-foreground">
              <CircleDollarSign className="h-4 w-4 text-muted-foreground" aria-hidden /> Estimated value
            </span>
            <Input
              type="number"
              min={1}
              step="0.01"
              value={form.value}
              onChange={(event) => updateForm("value", event.target.value)}
              placeholder="5000"
              className="h-11 bg-[#FFFFFF] px-4 text-base placeholder:text-sm"
            />
          </label>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="button" onClick={submit} disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Create deal"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
