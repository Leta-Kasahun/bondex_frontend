"use client";

import { useEffect, useMemo, useState } from "react";
import { Building2, Image, Tag, Type } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { useNotification } from "@/src/hooks";
import { type Business, type CreateBusinessInput, type UpdateBusinessInput } from "../types/business.types";
import { useCreateBusiness, useUpdateBusiness } from "../hooks";

type BusinessFormModalProps = {
  mode: "create" | "edit";
  business?: Business;
  triggerLabel?: string;
  triggerVariant?: "default" | "outline";
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

type FormState = {
  name: string;
  type: string;
  description: string;
  logo: string;
};

const emptyForm: FormState = {
  name: "",
  type: "",
  description: "",
  logo: "",
};

export function BusinessFormModal({
  mode,
  business,
  triggerLabel,
  triggerVariant = "default",
  open,
  onOpenChange,
}: BusinessFormModalProps) {
  const notification = useNotification();
  const createBusinessMutation = useCreateBusiness();
  const updateBusinessMutation = useUpdateBusiness();
  const [internalOpen, setInternalOpen] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm);

  const isControlled = typeof open === "boolean";
  const isOpen = isControlled ? open : internalOpen;

  const setOpen = (next: boolean) => {
    if (!isControlled) {
      setInternalOpen(next);
    }
    onOpenChange?.(next);
  };

  useEffect(() => {
    if (!isOpen) return;

    if (mode === "edit" && business) {
      setForm({
        name: business.name,
        type: business.type ?? "",
        description: business.description ?? "",
        logo: business.logo ?? "",
      });
      return;
    }

    setForm(emptyForm);
  }, [isOpen, mode, business]);

  const isSubmitting = createBusinessMutation.isPending || updateBusinessMutation.isPending;

  const title = useMemo(() => (mode === "create" ? "Create business" : "Edit business"), [mode]);

  const description = useMemo(
    () =>
      mode === "create"
        ? "Add your business profile to organize leads, deals, and integrations."
        : "Update your business details to keep operations accurate.",
    [mode]
  );

  const submit = () => {
    const name = form.name.trim();
    if (name.length < 2) {
      notification.error("Business name is required", "Use at least 2 characters.");
      return;
    }

    const payload: CreateBusinessInput | UpdateBusinessInput = {
      name,
      ...(form.type.trim() ? { type: form.type.trim() } : {}),
      ...(form.description.trim() ? { description: form.description.trim() } : {}),
      ...(form.logo.trim() ? { logo: form.logo.trim() } : {}),
    };

    if (mode === "create") {
      createBusinessMutation.mutate(payload as CreateBusinessInput, {
        onSuccess: () => {
          notification.success("Business created");
          setOpen(false);
        },
      });
      return;
    }

    if (!business?.id) {
      notification.error("Business not found");
      return;
    }

    updateBusinessMutation.mutate(
      { businessId: business.id, payload: payload as UpdateBusinessInput },
      {
        onSuccess: () => {
          notification.success("Business updated");
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
            <Building2 className="h-4 w-4" aria-hidden />
            {triggerLabel}
          </Button>
        </DialogTrigger>
      ) : null}

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-lg">{title}</DialogTitle>
          <DialogDescription className="text-base">{description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <label className="block space-y-1">
            <span className="text-base font-medium text-foreground">Name</span>
            <div className="relative">
              <Type className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
              <Input
                value={form.name}
                onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                placeholder="Acme Inc"
                className="h-10 pl-10 text-base"
              />
            </div>
          </label>

          <label className="block space-y-1">
            <span className="text-base font-medium text-foreground">Type</span>
            <div className="relative">
              <Tag className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
              <Input
                value={form.type}
                onChange={(event) => setForm((prev) => ({ ...prev, type: event.target.value }))}
                placeholder="SaaS"
                className="h-10 pl-10 text-base"
              />
            </div>
          </label>

          <label className="block space-y-1">
            <span className="text-base font-medium text-foreground">Description</span>
            <Input
              value={form.description}
              onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
              placeholder="Short business description"
              className="h-10 text-base"
            />
          </label>

          <label className="block space-y-1">
            <span className="text-base font-medium text-foreground">Logo URL</span>
            <div className="relative">
              <Image className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
              <Input
                value={form.logo}
                onChange={(event) => setForm((prev) => ({ ...prev, logo: event.target.value }))}
                placeholder="https://..."
                className="h-10 pl-10 text-base"
              />
            </div>
          </label>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="button" onClick={submit} disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : mode === "create" ? "Create" : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
