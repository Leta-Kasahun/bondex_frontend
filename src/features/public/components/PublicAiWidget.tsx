"use client";

import { useRef, useState } from "react";
import { Bot, ChevronDown, ChevronUp, Gem, Minimize2, SendHorizontal, Sparkles, X } from "lucide-react";
import { requestPublicAiMessage } from "../services";
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

const welcomeMessage: ChatMessage = {
  id: "initial-bot-msg",
  sender: "bot",
  text: "Hi, I am Bondex Bot. Ask me about Bondex overview, features, pricing value, or how it works.",
};

const iconPrompts = [
  { prompt: "Bondex overview", top: "top-0", right: "right-2", delay: "0ms" },
  { prompt: "Features summary", top: "top-4", right: "right-12", delay: "120ms" },
  { prompt: "How it works", top: "top-1", right: "right-22", delay: "240ms" },
  { prompt: "Value proposition", top: "top-5", right: "right-32", delay: "360ms" },
];

export function PublicAiWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([welcomeMessage]);
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
      const data = await requestPublicAiMessage(trimmed);

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
    <div className="pointer-events-none fixed bottom-4 right-4 z-70">
      {isOpen ? (
        <Card
          className={cn(
            "pointer-events-auto border border-primary/30 bg-white/90 shadow-card-hover backdrop-blur-xl",
            isExpanded ? "h-136 w-md md:w-124" : "h-116 w-96 md:w-108"
          )}
        >
          <CardHeader className="border-b border-border/70 pb-3">
            <div className="flex items-center justify-between gap-2">
              <CardTitle className="inline-flex items-center gap-2 text-base">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <Bot className="h-4 w-4" aria-hidden />
                </span>
                Bondex Bot
                <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/10 px-2 py-0.5 text-blue-600">
                  <Gem className="h-3.5 w-3.5" aria-hidden />
                </span>
              </CardTitle>
              <div className="flex items-center gap-1">
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
            <div className="relative h-10">
              {iconPrompts.map((item) => (
                <button
                  key={item.prompt}
                  type="button"
                  onClick={() => void sendPrompt(item.prompt)}
                  title={item.prompt}
                  aria-label={item.prompt}
                  className={cn(
                    "absolute inline-flex h-7 w-7 items-center justify-center rounded-full border border-blue-400/35 bg-blue-500/10 text-blue-600 shadow-sm backdrop-blur-sm",
                    "transition-transform hover:scale-105",
                    "animate-pulse",
                    item.top,
                    item.right
                  )}
                  style={{ animationDelay: item.delay }}
                >
                  <Sparkles className="h-3.5 w-3.5" aria-hidden />
                </button>
              ))}
            </div>

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
        className="pointer-events-auto mt-3 inline-flex h-12 items-center gap-2 rounded-full border border-primary/20 bg-primary px-4 text-primary-foreground shadow-card-hover"
        aria-label="Open Bondex AI assistant"
      >
        {isOpen ? <Minimize2 className="h-4 w-4" aria-hidden /> : <Gem className="h-4 w-4" aria-hidden />}
        Bondex Bot
      </Button>
    </div>
  );
}
