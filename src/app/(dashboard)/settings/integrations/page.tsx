import Link from "next/link";
import { Mail, MessageCircle } from "lucide-react";
import { APP_ROUTES } from "@/src/constants";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import { IntegrationPageIntro } from "@/src/features/shared";
import { UserDashboardShell } from "@/src/features/users";

export default function SettingsIntegrationsPage() {
  return (
    <UserDashboardShell>
      <main className="flex-1 space-y-6 bg-background p-4 md:p-6">
        <IntegrationPageIntro
          icon={MessageCircle}
          title="Integrations"
          description="Manage provider connections and workflows for Gmail and Telegram from one place."
        />

        <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card className="border-border/70 bg-[#FFFFFF]">
            <CardHeader>
              <CardTitle className="inline-flex items-center gap-2 text-lg">
                <Mail className="h-5 w-5 text-primary" aria-hidden />
                Gmail
              </CardTitle>
              <CardDescription>
                Monitor mailbox connection status and send lead replies via backend Gmail workflow.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild>
                <Link href={APP_ROUTES.DASHBOARD.SETTINGS.INTEGRATIONS.GMAIL}>Open Gmail Integration</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-border/70 bg-[#FFFFFF]">
            <CardHeader>
              <CardTitle className="inline-flex items-center gap-2 text-lg">
                <MessageCircle className="h-5 w-5 text-primary" aria-hidden />
                Telegram
              </CardTitle>
              <CardDescription>
                Connect bot token, send replies, and inspect lead threads through backend Telegram workflow.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild>
                <Link href={APP_ROUTES.DASHBOARD.SETTINGS.INTEGRATIONS.TELEGRAM}>Open Telegram Integration</Link>
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>
    </UserDashboardShell>
  );
}
