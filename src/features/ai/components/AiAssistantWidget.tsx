"use client";

import { useRef, useState } from "react";
import { ChevronDown, ChevronUp, SendHorizontal, Sparkles, X } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { cn } from "@/src/utils/cn";

type Sender = "user" | "bot";

type ChatMessage = {
  id: string;
  sender: Sender;
  text: string;
};

type AiWidgetResponse = {
  success?: boolean;
  message?: string;
  data?: {
    output?: string;
  };
};

type AiAssistantWidgetProps = {
  requestMessage: (message: string) => Promise<AiWidgetResponse>;
  welcomeText: string;
};

export function AiAssistantWidget({ requestMessage, welcomeText }: AiAssistantWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "initial-bot-msg",
      sender: "bot",
      text: welcomeText,
    },
  ]);
  const listRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    if (!listRef.current) return;
    listRef.current.scrollTop = listRef.current.scrollHeight;
  };

  const addMessage = (sender: Sender, text: string) => {
    const msg: ChatMessage = {
      id: `${sender}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      sender,
      text,
    };
    setMessages((prev) => [...prev, msg]);
    requestAnimationFrame(scrollToBottom);
  };

  const sendPrompt = async (prompt: string) => {
    const trimmed = prompt.trim();
    if (!trimmed || isSending) return;

    addMessage("user", trimmed);
    setInput("");
    setIsSending(true);

    try {
      const data = await requestMessage(trimmed);

      if (!data?.success) {
        const serverMessage = data?.message?.trim();
        addMessage("bot", serverMessage || "AI service is temporarily unavailable.");
        return;
      }

      const output = data?.data?.output?.trim() || "I could not generate a response right now.";
      addMessage("bot", output);
    } catch {
      addMessage("bot", "Connection issue. Please try again in a moment.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="pointer-events-none fixed bottom-8 right-4 z-70">
      {isOpen ? (
        <Card
          className={cn(
            "pointer-events-auto border border-primary/30 bg-white/90 shadow-card-hover backdrop-blur-xl",
            isExpanded ? "h-136 w-md md:w-124" : "h-116 w-96 md:w-108"
          )}
        >
          <CardHeader className="border-b border-border/70 pb-3">
            <div className="relative flex items-center justify-center gap-2">
              <CardTitle className="inline-flex -ml-1 items-center gap-2 text-base font-semibold text-blue-600">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-white">
                  <Sparkles className="h-3.5 w-3.5" aria-hidden />
                </span>
                Bondex Assistance AI
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-white">
                  <Sparkles className="h-3.5 w-3.5" aria-hidden />
                </span>
              </CardTitle>
              <div className="absolute right-0 flex items-center gap-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  className="h-8 w-8"
                  onClick={() => setIsExpanded((prev) => !prev)}
                  aria-label={isExpanded ? "Collapse AI modal" : "Expand AI modal"}
                >
                  {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  className="h-8 w-8"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close AI modal"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="flex h-[calc(100%-4.5rem)] flex-col gap-3 p-3">
            <div
              ref={listRef}
              className="flex-1 space-y-2 overflow-y-auto rounded-lg border border-border/70 bg-background/65 p-2"
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "max-w-[90%] rounded-xl px-3 py-2 text-sm leading-6",
                    msg.sender === "user"
                      ? "ml-auto bg-primary text-primary-foreground"
                      : "bg-card text-card-foreground ring-1 ring-border"
                  )}
                >
                  {msg.text}
                </div>
              ))}
              {isSending ? (
                <div className="inline-flex items-center gap-2 rounded-lg bg-card px-3 py-2 text-xs text-muted-foreground ring-1 ring-border">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                  Bondex Bot is typing...
                </div>
              ) : null}
            </div>

            <form
              className="flex items-center gap-2"
              onSubmit={(event) => {
                event.preventDefault();
                void sendPrompt(input);
              }}
            >
              <Input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Send a message to Bondex Bot"
                className="h-10 rounded-xl border-primary/30 bg-white/80 text-sm"
              />
              <Button
                type="submit"
                className="h-10 w-10 rounded-xl"
                disabled={isSending || !input.trim()}
                aria-label="Send message"
              >
                <SendHorizontal className="h-4 w-4" aria-hidden />
              </Button>
            </form>
          </CardContent>
        </Card>
      ) : null}

      <Button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="pointer-events-auto mt-3 inline-flex h-14 w-14 items-center justify-center rounded-full border border-blue-400/40 bg-blue-500 text-white shadow-card-hover"
        aria-label="Open Bondex AI assistant"
      >
        <span className="relative inline-flex h-8 w-8 items-center justify-center">
          <span className="absolute inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white">
            <Sparkles className="h-5 w-5" aria-hidden />
          </span>
          <span className="absolute -top-1 -right-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-blue-400 text-white">
            <Sparkles className="h-2.5 w-2.5" aria-hidden />
          </span>
        </span>
      </Button>
    </div>
  );
}
