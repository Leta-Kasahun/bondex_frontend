"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Mail, PlugZap, SendHorizonal, Unplug } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { APP_ROUTES } from "@/src/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { useBusinesses } from "@/src/features/business";
import { IntegrationPageIntro, IntegrationSectionCard } from "@/src/features/shared";
import { useAuth, useNotification } from "@/src/hooks";
import { useDisconnectGmail, useGmailConnectionStatus, useSendGmailReply } from "../hooks";

type ReplyFormState = {
  leadId: string;
  message: string;
};

export function GmailIntegrationPage() {
  const notification = useNotification();
  const { isAuthenticated, isUser, accessToken } = useAuth();
  const canLoadData = isUser && (isAuthenticated || Boolean(accessToken));

  const { data: businesses, isLoading: isBusinessesLoading, isError: isBusinessesError } = useBusinesses(undefined, canLoadData);
  const businessList = useMemo(() => businesses ?? [], [businesses]);

  const [selectedBusinessId, setSelectedBusinessId] = useState("");
  const [replyForm, setReplyForm] = useState<ReplyFormState>({ leadId: "", message: "" });

  const effectiveBusinessId = selectedBusinessId || businessList[0]?.id || "";

  const {
    data: status,
    isLoading: isStatusLoading,
    isError: isStatusError,
  } = useGmailConnectionStatus(effectiveBusinessId || undefined);

  const disconnectMutation = useDisconnectGmail();
  const sendReplyMutation = useSendGmailReply();

  const disconnect = () => {
    if (!effectiveBusinessId) {
      notification.error("Business is required", "Select a business first.");
      return;
    }

    disconnectMutation.mutate(
      { businessId: effectiveBusinessId },
      {
        onSuccess: () => notification.success("Gmail disconnected"),
      }
    );
  };

  const sendReply = () => {
    const leadId = replyForm.leadId.trim();
    const message = replyForm.message.trim();

    if (!leadId) {
      notification.error("Lead id is required", "Enter the lead id for this Gmail reply.");
      return;
    }

    if (!message) {
      notification.error("Message is required", "Write a reply before sending.");
      return;
    }

    sendReplyMutation.mutate(
      { leadId, message },
      {
        onSuccess: () => {
          notification.success("Reply sent");
          setReplyForm((prev) => ({ ...prev, message: "" }));
        },
      }
    );
  };

  return (
    <main className="flex-1 space-y-6 bg-background p-4 md:p-6">
      <IntegrationPageIntro
        icon={Mail}
        title="Gmail Integration"
        description="Monitor Gmail connectivity and send lead replies through your backend Gmail workflow."
      />

      {!canLoadData ? (
        <IntegrationSectionCard title="Session" description="Authentication required for integration actions.">
          <p className="text-sm text-muted-foreground">Session not ready. Please log in again.</p>
        </IntegrationSectionCard>
      ) : null}

      {canLoadData ? (
        <IntegrationSectionCard title="Workspace" description="Select the business workspace for integration actions.">
          {isBusinessesLoading ? <p className="text-sm text-muted-foreground">Loading businesses...</p> : null}
          {isBusinessesError ? <p className="text-sm text-muted-foreground">Unable to load businesses.</p> : null}

          {!isBusinessesLoading && !isBusinessesError && businessList.length > 0 ? (
            <Select value={effectiveBusinessId} onValueChange={setSelectedBusinessId}>
              <SelectTrigger className="h-11 w-full bg-[#FFFFFF] px-4 text-base md:max-w-md">
                <SelectValue placeholder="Select business" />
              </SelectTrigger>
              <SelectContent>
                {businessList.map((business) => (
                  <SelectItem key={business.id} value={business.id}>
                    {business.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : null}
        </IntegrationSectionCard>
      ) : null}

      {canLoadData && businessList.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          <IntegrationSectionCard title="Connection Status" description="Live backend status for this business mailbox.">
            {isStatusLoading ? <p className="text-sm text-muted-foreground">Checking connection...</p> : null}
            {isStatusError ? <p className="text-sm text-muted-foreground">Unable to fetch Gmail status.</p> : null}

            {!isStatusLoading && !isStatusError && status ? (
              <>
                <div className="rounded-lg border border-border bg-[#F8FAFC] p-3 text-sm">
                  <p className="text-foreground">
                    Connected: <strong>{status.connected ? "Yes" : "No"}</strong>
                  </p>
                  <p className="text-muted-foreground">Email: {status.email || "Not linked"}</p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={disconnect}
                  disabled={disconnectMutation.isPending || !status.connected}
                >
                  <Unplug className="h-4 w-4" aria-hidden />
                  {disconnectMutation.isPending ? "Disconnecting..." : "Disconnect Gmail"}
                </Button>
              </>
            ) : null}
          </IntegrationSectionCard>

          <IntegrationSectionCard title="Send Reply" description="Send a Gmail reply using your backend lead reply endpoint.">
            <label className="block space-y-1">
              <span className="text-sm font-medium text-foreground">Lead id</span>
              <Input
                value={replyForm.leadId}
                onChange={(event) => setReplyForm((prev) => ({ ...prev, leadId: event.target.value }))}
                placeholder="Lead id"
                className="h-11 bg-[#FFFFFF] px-4 text-base placeholder:text-sm"
              />
            </label>

            <label className="block space-y-1">
              <span className="text-sm font-medium text-foreground">Message</span>
              <textarea
                value={replyForm.message}
                onChange={(event) => setReplyForm((prev) => ({ ...prev, message: event.target.value }))}
                placeholder="Write reply"
                className="min-h-28 w-full rounded-md border border-input bg-[#FFFFFF] px-4 py-3 text-base placeholder:text-sm outline-none transition focus:border-ring focus-visible:ring-2 focus-visible:ring-ring/50"
              />
            </label>

            <Button type="button" onClick={sendReply} disabled={sendReplyMutation.isPending}>
              <SendHorizonal className="h-4 w-4" aria-hidden />
              {sendReplyMutation.isPending ? "Sending..." : "Send Gmail reply"}
            </Button>
          </IntegrationSectionCard>
        </div>
      ) : null}

      {canLoadData && !isBusinessesLoading && !isBusinessesError && businessList.length === 0 ? (
        <IntegrationSectionCard title="No Business" description="Create a business profile first.">
          <p className="text-sm text-muted-foreground">You need a business workspace before configuring Gmail integration.</p>
          <Button type="button" variant="outline" asChild>
            <Link href={APP_ROUTES.DASHBOARD.BUSINESSES}>
            <PlugZap className="h-4 w-4" aria-hidden />
            Create business profile first
            </Link>
          </Button>
        </IntegrationSectionCard>
      ) : null}
    </main>
  );
}
