"use client";

import { useMemo } from "react";
import { Building2, PencilLine, Trash2 } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import { useNotification } from "@/src/hooks";
import { useAuth } from "@/src/hooks/useAuth";
import { useBusinesses, useDeleteBusiness } from "../hooks";
import { BusinessFormModal } from "./BusinessFormModal";

export function BusinessManagementPage() {
  const notification = useNotification();
  const { isAuthenticated, isUser, accessToken } = useAuth();
  const canLoadBusinesses = isUser && (isAuthenticated || Boolean(accessToken));
  const { data: businesses, isLoading, isFetching, isError } = useBusinesses(undefined, canLoadBusinesses);
  const deleteMutation = useDeleteBusiness();

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
        <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {list.map((business) => (
            <Card key={business.id} className="border-border/70 bg-[#FFFFFF]">
              <CardHeader>
                <CardTitle>{business.name}</CardTitle>
                <CardDescription>{business.type ?? "Business"}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">{business.description || "No description provided."}</p>
                <div className="flex items-center gap-2">
                  <BusinessFormModal
                    mode="edit"
                    business={business}
                    triggerLabel="Edit"
                    triggerVariant="outline"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="h-9"
                    onClick={() => onDelete(business.id)}
                    disabled={deleteMutation.isPending}
                  >
                    <Trash2 className="h-4 w-4" aria-hidden />
                    Delete
                  </Button>
                  <span className="ml-auto inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <PencilLine className="h-3.5 w-3.5" aria-hidden />
                    Updated {new Date(business.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>
      ) : null}
    </main>
  );
}
