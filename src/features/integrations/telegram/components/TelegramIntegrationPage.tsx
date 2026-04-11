"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { MessageCircle, PlugZap, SendHorizonal, Unplug } from "lucide-react";
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
import {
  useConnectTelegram,
  useDisconnectTelegram,
  useSendTelegramReply,
  useTelegramThread,
} from "../hooks";

type ConnectFormState = {
  botToken: string;
};

type ReplyFormState = {
  leadId: string;
  message: string;
};

export function TelegramIntegrationPage() {
  const notification = useNotification();
  const { isAuthenticated, isUser, accessToken } = useAuth();
  const canLoadData = isUser && (isAuthenticated || Boolean(accessToken));

  const { data: businesses, isLoading: isBusinessesLoading, isError: isBusinessesError } = useBusinesses(undefined, canLoadData);
  const businessList = useMemo(() => businesses ?? [], [businesses]);

  const [selectedBusinessId, setSelectedBusinessId] = useState("");
  const [connectForm, setConnectForm] = useState<ConnectFormState>({ botToken: "" });
  const [replyForm, setReplyForm] = useState<ReplyFormState>({ leadId: "", message: "" });
  const [threadLeadIdInput, setThreadLeadIdInput] = useState("");
  const [threadLeadId, setThreadLeadId] = useState("");

  const effectiveBusinessId = selectedBusinessId || businessList[0]?.id || "";

  const { data: thread, isLoading: isThreadLoading, isError: isThreadError } = useTelegramThread(
    threadLeadId || undefined
  );

  const connectMutation = useConnectTelegram();
  const disconnectMutation = useDisconnectTelegram();
  const sendReplyMutation = useSendTelegramReply();

  const connect = () => {
    const botToken = connectForm.botToken.trim();

    if (!effectiveBusinessId) {
      notification.error("Business is required", "Select a business first.");
      return;
    }

    if (!botToken) {
      notification.error("Bot token is required", "Enter Telegram bot token to connect.");
      return;
    }

    connectMutation.mutate(
      { businessId: effectiveBusinessId, botToken },
      {
        onSuccess: () => {
          notification.success("Telegram connected");
          setConnectForm({ botToken: "" });
        },
      }
    );
  };

  const disconnect = () => {
    if (!effectiveBusinessId) {
      notification.error("Business is required", "Select a business first.");
      return;
    }

    disconnectMutation.mutate(
      { businessId: effectiveBusinessId },
      {
        onSuccess: () => notification.success("Telegram disconnected"),
      }
    );
  };

  const sendReply = () => {
    const leadId = replyForm.leadId.trim();
    const message = replyForm.message.trim();

    if (!leadId) {
      notification.error("Lead id is required", "Enter lead id for Telegram reply.");
      return;
    }

    if (!message) {
      notification.error("Message is required", "Write a reply message.");
      return;
    }

    sendReplyMutation.mutate(
      { leadId, message },
      {
        onSuccess: () => {
          notification.success("Reply sent");
          setReplyForm((prev) => ({ ...prev, message: "" }));
          setThreadLeadId(leadId);
        },
      }
    );
  };

  return (
    <main className="flex-1 space-y-6 bg-background p-4 md:p-6">
      <IntegrationPageIntro
        icon={MessageCircle}
        title="Telegram Integration"
        description="Connect your bot, reply to leads, and inspect conversation threads from backend Telegram workflows."
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
          <IntegrationSectionCard title="Bot Connection" description="Connect or disconnect Telegram bot token via backend endpoints.">
            <label className="block space-y-1">
              <span className="text-sm font-medium text-foreground">Bot token</span>
              <Input
                value={connectForm.botToken}
                onChange={(event) => setConnectForm({ botToken: event.target.value })}
                placeholder="123456:ABC..."
                className="h-11 bg-[#FFFFFF] px-4 text-base placeholder:text-sm"
              />
            </label>

            <div className="flex flex-wrap items-center gap-2">
              <Button type="button" onClick={connect} disabled={connectMutation.isPending}>
                <PlugZap className="h-4 w-4" aria-hidden />
                {connectMutation.isPending ? "Connecting..." : "Connect Telegram"}
              </Button>
              <Button type="button" variant="outline" onClick={disconnect} disabled={disconnectMutation.isPending}>
                <Unplug className="h-4 w-4" aria-hidden />
                {disconnectMutation.isPending ? "Disconnecting..." : "Disconnect"}
              </Button>
            </div>
          </IntegrationSectionCard>

          <IntegrationSectionCard title="Send Reply" description="Send Telegram reply message through backend lead reply workflow.">
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
              {sendReplyMutation.isPending ? "Sending..." : "Send Telegram reply"}
            </Button>
          </IntegrationSectionCard>

          <IntegrationSectionCard
            title="Thread Viewer"
            description="Load Telegram thread messages for a specific lead id."
            className="border-border/70 bg-[#FFFFFF] xl:col-span-2"
          >
            <div className="flex flex-col gap-2 md:flex-row">
              <Input
                value={threadLeadIdInput}
                onChange={(event) => setThreadLeadIdInput(event.target.value)}
                placeholder="Lead id"
                className="h-11 bg-[#FFFFFF] px-4 text-base placeholder:text-sm md:max-w-md"
              />
              <Button type="button" variant="outline" onClick={() => setThreadLeadId(threadLeadIdInput.trim())}>
                Load thread
              </Button>
            </div>

            {isThreadLoading ? <p className="text-sm text-muted-foreground">Loading thread...</p> : null}
            {isThreadError ? <p className="text-sm text-muted-foreground">Unable to load thread.</p> : null}

            {!isThreadLoading && !isThreadError && thread && thread.length > 0 ? (
              <div className="space-y-2">
                {thread.map((message) => (
                  <div key={message.id} className="rounded-lg border border-border bg-[#F8FAFC] p-3 text-sm">
                    <p className="font-medium text-foreground">{message.direction}</p>
                    <p className="text-muted-foreground">{message.message}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{new Date(message.createdAt).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            ) : null}

            {!isThreadLoading && !isThreadError && threadLeadId && (!thread || thread.length === 0) ? (
              <p className="text-sm text-muted-foreground">No thread messages found for this lead.</p>
            ) : null}
          </IntegrationSectionCard>
        </div>
      ) : null}

      {canLoadData && !isBusinessesLoading && !isBusinessesError && businessList.length === 0 ? (
        <IntegrationSectionCard title="No Business" description="Create a business profile first.">
          <p className="text-sm text-muted-foreground">You need a business workspace before configuring Telegram integration.</p>
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
