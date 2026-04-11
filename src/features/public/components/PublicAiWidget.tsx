"use client";

import { AiAssistantWidget } from "@/src/features/ai/components";
import { requestPublicAiMessage } from "../services";

const publicWelcomeText =
  "Hi, I am Bondex Bot. Ask me about Bondex overview, features, pricing value, or how it works.";

export function PublicAiWidget() {
  return <AiAssistantWidget requestMessage={requestPublicAiMessage} welcomeText={publicWelcomeText} />;
}
