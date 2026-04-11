"use client";

import { useMemo, useState } from "react";
import { MessageSquareText, Tag, UserRound } from "lucide-react";
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
import { type Business } from "@/src/features/business";
import {
  type CreateLeadInput,
  type Lead,
  type LeadPriority,
  type LeadStatus,
  type UpdateLeadInput,
} from "../types/lead.types";
import { useCreateLead, useUpdateLead } from "../hooks";
import { leadPriorityOptions, leadStatusOptions } from "../constants/lead-ui.constants";

type LeadFormModalProps = {
  mode: "create" | "edit";
  lead?: Lead;
  businesses: Business[];
  defaultBusinessId?: string;
  triggerLabel?: string;
  triggerVariant?: "default" | "outline";
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

type FormState = {
  businessId: string;
  message: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  status: LeadStatus;
  priority: LeadPriority;
};

const defaultStatus: LeadStatus = "new";
const defaultPriority: LeadPriority = "medium";

const getInitialForm = (businessId?: string): FormState => ({
  businessId: businessId ?? "",
  message: "",
  customerName: "",
  customerEmail: "",
  customerPhone: "",
  status: defaultStatus,
  priority: defaultPriority,
});

export function LeadFormModal({
  mode,
  lead,
  businesses,
  defaultBusinessId,
  triggerLabel,
  triggerVariant = "default",
  open,
  onOpenChange,
}: LeadFormModalProps) {
  const notification = useNotification();
  const createLeadMutation = useCreateLead();
  const updateLeadMutation = useUpdateLead();
  const [internalOpen, setInternalOpen] = useState(false);
  const [form, setForm] = useState<FormState>(getInitialForm(defaultBusinessId));

  const isControlled = typeof open === "boolean";
  const isOpen = isControlled ? open : internalOpen;

  const initializeFormForOpen = () => {
    if (mode === "edit" && lead) {
      setForm({
        businessId: lead.businessId,
        message: lead.message,
        customerName: lead.customerName ?? "",
        customerEmail: lead.customerEmail ?? "",
        customerPhone: lead.customerPhone ?? "",
        status: lead.status,
        priority: lead.priority,
      });
      return;
    }

    const fallbackBusinessId = defaultBusinessId ?? businesses[0]?.id ?? "";
    setForm(getInitialForm(fallbackBusinessId));
  };

  const setOpen = (next: boolean) => {
    if (next) {
      initializeFormForOpen();
    }

    if (!isControlled) {
      setInternalOpen(next);
    }
    onOpenChange?.(next);
  };

  const isSubmitting = createLeadMutation.isPending || updateLeadMutation.isPending;
  const dialogMaxWidthClassName = mode === "create" ? "sm:max-w-4xl" : "sm:max-w-sm";

  const updateFormField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const modalTitle = useMemo(
    () => (mode === "create" ? "Create lead" : "Edit lead"),
    [mode]
  );

  const modalDescription = useMemo(
    () =>
      mode === "create"
        ? "Capture a new lead from your selected business workflow."
        : "Update lead details and keep your pipeline clean.",
    [mode]
  );

  const submit = () => {
    const businessId = form.businessId.trim();
    const message = form.message.trim();

    if (!businessId) {
      notification.error("Business is required", "Select a business before saving the lead.");
      return;
    }

    if (!message) {
      notification.error("Message is required", "Add the lead message or inquiry summary.");
      return;
    }

    const basePayload = {
      message,
      ...(form.customerName.trim() ? { customerName: form.customerName.trim() } : {}),
      ...(form.customerEmail.trim() ? { customerEmail: form.customerEmail.trim() } : {}),
      ...(form.customerPhone.trim() ? { customerPhone: form.customerPhone.trim() } : {}),
      ...(form.status ? { status: form.status } : {}),
      ...(form.priority ? { priority: form.priority } : {}),
    };

    if (mode === "create") {
      const payload: CreateLeadInput = {
        businessId,
        ...basePayload,
      };

      createLeadMutation.mutate(payload, {
        onSuccess: () => {
          notification.success("Lead created");
          setOpen(false);
        },
      });
      return;
    }

    if (!lead?.id) {
      notification.error("Lead not found");
      return;
    }

    const payload: UpdateLeadInput = {
      ...basePayload,
    };

    updateLeadMutation.mutate(
      { leadId: lead.id, payload },
      {
        onSuccess: () => {
          notification.success("Lead updated");
          setOpen(false);
        },
      }
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      {triggerLabel ? (
        <DialogTrigger asChild>
          <Button type="button" variant={triggerVariant} className="h-9">
            <UserRound className="h-4 w-4" aria-hidden />
            {triggerLabel}
          </Button>
        </DialogTrigger>
      ) : null}

      <DialogContent className={dialogMaxWidthClassName}>
        <DialogHeader>
          <DialogTitle>{modalTitle}</DialogTitle>
          <DialogDescription>{modalDescription}</DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <label className="block space-y-1">
            <span className="text-base font-medium text-foreground">Business</span>
            <Select
              value={form.businessId}
              onValueChange={(value) => updateFormField("businessId", value)}
              disabled={mode === "edit"}
            >
              <SelectTrigger className="h-11 w-full bg-[#FFFFFF] px-4 text-base">
                <SelectValue placeholder="Select business" />
              </SelectTrigger>
              <SelectContent>
                {businesses.map((business) => (
                  <SelectItem key={business.id} value={business.id}>
                    {business.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </label>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <label className="block space-y-1">
              <span className="text-base font-medium text-foreground">Status</span>
              <Select
                value={form.status}
                onValueChange={(value) => updateFormField("status", value as LeadStatus)}
              >
                <SelectTrigger className="h-11 w-full bg-[#FFFFFF] px-4 text-base">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {leadStatusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </label>

            <label className="block space-y-1">
              <span className="text-base font-medium text-foreground">Priority</span>
              <Select
                value={form.priority}
                onValueChange={(value) => updateFormField("priority", value as LeadPriority)}
              >
                <SelectTrigger className="h-11 w-full bg-[#FFFFFF] px-4 text-base">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  {leadPriorityOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </label>
          </div>

          <label className="block space-y-1">
            <span className="text-base font-medium text-foreground">Lead message</span>
            <div className="relative">
              <MessageSquareText className="pointer-events-none absolute left-4 top-3.5 h-4 w-4 text-muted-foreground" aria-hidden />
              <textarea
                value={form.message}
                onChange={(event) => updateFormField("message", event.target.value)}
                placeholder="Customer asked for pricing details and onboarding timeline..."
                className="min-h-28 w-full rounded-md border border-input bg-[#FFFFFF] py-3 pl-11 pr-4 text-base placeholder:text-sm outline-none ring-0 transition focus:border-ring focus-visible:ring-2 focus-visible:ring-ring/50"
              />
            </div>
          </label>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <label className="block space-y-1">
              <span className="text-base font-medium text-foreground">Customer name</span>
              <Input
                value={form.customerName}
                onChange={(event) => updateFormField("customerName", event.target.value)}
                placeholder="Abebe"
                className="h-11 bg-[#FFFFFF] px-4 text-base placeholder:text-sm"
              />
            </label>

            <label className="block space-y-1">
              <span className="text-base font-medium text-foreground">Customer email</span>
              <Input
                type="email"
                value={form.customerEmail}
                onChange={(event) => updateFormField("customerEmail", event.target.value)}
                placeholder="customer@domain.com"
                className="h-11 bg-[#FFFFFF] px-4 text-base placeholder:text-sm"
              />
            </label>
          </div>

          <label className="block space-y-1">
            <span className="inline-flex items-center gap-2 text-base font-medium text-foreground">
              <Tag className="h-4 w-4 text-muted-foreground" aria-hidden />
              Customer phone
            </span>
            <Input
              value={form.customerPhone}
              onChange={(event) => updateFormField("customerPhone", event.target.value)}
              placeholder="+2519xxxxxxxx"
              className="h-11 bg-[#FFFFFF] px-4 text-base placeholder:text-sm"
            />
          </label>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="button" onClick={submit} disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : mode === "create" ? "Create lead" : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
