"use client";

import { requestAdminAiMessage } from "../services";
import { AiAssistantWidget } from "./AiAssistantWidget";

const adminWelcomeText =
  "Hi, I am Bondex Admin AI. Ask me for system overview, AI performance summary, monitoring, or admin alerts guidance.";

const adminSampleQuestions = [
  "Give me system overview for executive operations",
  "Show AI performance summary with accuracy and latency",
  "What alert items need immediate action?",
  "Give me daily operational summary for leadership",
  "How should we improve monitoring and data quality?",
];

export function AdminDashboardAiWidget() {
  return (
    <AiAssistantWidget
      requestMessage={requestAdminAiMessage}
      welcomeText={adminWelcomeText}
      sampleQuestions={adminSampleQuestions}
    />
  );
}
