"use client";

import { requestPrivateAiMessage } from "../services";
import { AiAssistantWidget } from "./AiAssistantWidget";

const dashboardWelcomeText =
  "Hi, I am Bondex Bot. Ask me for quick tour, getting started, daily check-in, no leads tips, or dashboard help.";

export function UserDashboardAiWidget() {
  return <AiAssistantWidget requestMessage={requestPrivateAiMessage} welcomeText={dashboardWelcomeText} />;
}
