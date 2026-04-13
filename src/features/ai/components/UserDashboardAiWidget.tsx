"use client";

import { requestPrivateAiMessage } from "../services";
import { AiAssistantWidget } from "./AiAssistantWidget";

const dashboardWelcomeText =
  "Hi, I am Bondex Bot. Ask me for quick tour, getting started, daily check-in, no leads tips, or dashboard help.";

const dashboardSampleQuestions = [
  "Give me a quick dashboard tour for sales ops",
  "How should I setup onboarding for my CRM workflow?",
  "Show me a daily check routine for pipeline health",
  "What should I do when there are no leads yet?",
  "Help me prioritize follow-up actions today",
];

export function UserDashboardAiWidget() {
  return (
    <AiAssistantWidget
      requestMessage={requestPrivateAiMessage}
      welcomeText={dashboardWelcomeText}
      sampleQuestions={dashboardSampleQuestions}
    />
  );
}
