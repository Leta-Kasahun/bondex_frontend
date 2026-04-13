"use client";

import { AiAssistantWidget } from "@/src/features/ai/components";
import { requestPublicAiMessage } from "../services";

const publicWelcomeText =
  "Hi, I am Bondex Bot. Ask me about Bondex overview, features, pricing value, or how it works.";

const publicSampleQuestions = [
  "What is Bondex overview for enterprise teams?",
  "Show me key Bondex features for sales and support",
  "How does Bondex work across lead-to-deal operations?",
  "What business value does Bondex provide to operations leaders?",
  "Why choose Bondex for enterprise CRM operations?",
];

export function PublicAiWidget() {
  return (
    <AiAssistantWidget
      requestMessage={requestPublicAiMessage}
      welcomeText={publicWelcomeText}
      sampleQuestions={publicSampleQuestions}
    />
  );
}
