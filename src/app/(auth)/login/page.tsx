import { AuthSplitPanel, UserLoginForm } from "@/src/features/auths/user";

export default function LoginPage() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <AuthSplitPanel
        imageSrc="https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1800&q=80"
        imageAlt="Professional team login to workspace"
        heading="Sign in to Bondex"
        description="Access your CRM workflows, leads, and operations dashboard with one secure sign-in."
      />
      <main className="flex items-center justify-center px-4 py-10 md:px-8">
        <UserLoginForm />
      </main>
    </div>
  );
}
