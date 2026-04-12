import { AuthSplitPanel, UserLoginForm } from "@/src/features/auths/user";

export default function LoginPage() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <AuthSplitPanel
        imageSrc="/auth_logo.png"
        imageAlt="Professional team login to workspace"
        heading="Sign in to Bondex"
        description="Access your CRM workflows, leads, and operations dashboard with one secure sign-in."
        showTextContent={false}
        showHighlights={false}
        imageFit="contain"
        imageClassName="object-center blur-0 scale-x-100 scale-y-100 saturate-110 brightness-100 contrast-105"
        overlayClassName="bg-[linear-gradient(135deg,rgba(244,247,251,0.14),rgba(221,231,242,0.22))]"
      />
      <main className="flex items-center justify-center px-4 py-10 md:px-8">
        <UserLoginForm />
      </main>
    </div>
  );
}
