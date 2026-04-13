"use client";

import { useMemo, useState } from "react";
import { Building2, PencilLine, Trash2 } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import { useNotification } from "@/src/hooks";
import { useAuth } from "@/src/hooks/useAuth";
import { useBusinesses, useDeleteBusiness } from "../hooks";
import { BusinessFormModal } from "./BusinessFormModal";
import { type Business } from "../types/business.types";

export function BusinessManagementPage() {
  const notification = useNotification();
  const { isAuthenticated, isUser, accessToken } = useAuth();
  const canLoadBusinesses = isUser && (isAuthenticated || Boolean(accessToken));
  const { data: businesses, isLoading, isFetching, isError } = useBusinesses(undefined, canLoadBusinesses);
  const deleteMutation = useDeleteBusiness();
  const [editingBusiness, setEditingBusiness] = useState<Business | null>(null);

  const list = useMemo(() => businesses ?? [], [businesses]);

  const onDelete = (businessId: string) => {
    deleteMutation.mutate(businessId, {
      onSuccess: () => {
        notification.success("Business deleted");
      },
    });
  };

  return (
    <main className="flex-1 space-y-6 bg-background p-4 md:p-6">
      <section className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-semibold text-foreground md:text-3xl">Businesses</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage your business profiles used across CRM workflows.</p>
        </div>
        <BusinessFormModal mode="create" triggerLabel="Create business" />
      </section>

      {canLoadBusinesses && (isLoading || isFetching) ? (
        <Card className="border-border/70 bg-[#FFFFFF]">
          <CardContent className="pt-4 text-sm text-muted-foreground">Loading businesses...</CardContent>
        </Card>
      ) : null}

      {!canLoadBusinesses ? (
        <Card className="border-border/70 bg-[#FFFFFF]">
          <CardContent className="pt-4 text-sm text-muted-foreground">Session not ready. Please log in again.</CardContent>
        </Card>
      ) : null}

      {canLoadBusinesses && isError ? (
        <Card className="border-border/70 bg-[#FFFFFF]">
          <CardContent className="pt-4 text-sm text-muted-foreground">Unable to load businesses right now.</CardContent>
        </Card>
      ) : null}

      {canLoadBusinesses && !isLoading && !isError && list.length === 0 ? (
        <Card className="border-border/70 bg-[#FFFFFF]">
          <CardHeader>
            <CardTitle className="inline-flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" aria-hidden />
              No businesses yet
            </CardTitle>
            <CardDescription>Create your first business profile to start organizing lead pipelines.</CardDescription>
          </CardHeader>
        </Card>
      ) : null}

      {canLoadBusinesses && !isLoading && !isError && list.length > 0 ? (
        <section className="space-y-3">
          {list.map((business) => (
            <Card key={business.id} className="w-full border-border/70 bg-[#FFFFFF]">
              <CardContent className="py-2.5">
                <div className="flex w-full items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="truncate text-base font-semibold text-foreground md:text-lg">{business.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{business.type ?? "Business"}</p>
                  </div>

                  <div className="shrink-0 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                        onClick={() => onDelete(business.id)}
                        disabled={deleteMutation.isPending}
                        aria-label={`Delete ${business.name}`}
                      >
                        <Trash2 className="h-5 w-5" aria-hidden />
                      </Button>

                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="text-sidebar-primary hover:bg-sidebar-primary/10 hover:text-sidebar-primary"
                        onClick={() => setEditingBusiness(business)}
                        aria-label={`Edit ${business.name}`}
                      >
                        <PencilLine className="h-5 w-5" aria-hidden />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <BusinessFormModal
            mode="edit"
            business={editingBusiness ?? undefined}
            open={Boolean(editingBusiness)}
            onOpenChange={(open) => {
              if (!open) {
                setEditingBusiness(null);
              }
            }}
          />
        </section>
      ) : null}
    </main>
  );
}
