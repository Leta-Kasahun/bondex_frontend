"use client";

import { requestAdminAiMessage } from "../services";
import { AiAssistantWidget } from "./AiAssistantWidget";

const adminWelcomeText =
  "Hi, I am Bondex Admin AI. Ask me for system overview, AI performance summary, monitoring, or admin alerts guidance.";

export function AdminDashboardAiWidget() {
  return <AiAssistantWidget requestMessage={requestAdminAiMessage} welcomeText={adminWelcomeText} />;
}
