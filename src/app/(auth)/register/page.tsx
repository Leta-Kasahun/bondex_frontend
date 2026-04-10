import { AuthSplitPanel, UserRegisterForm } from "@/src/features/auths/user";

export default function RegisterPage() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <AuthSplitPanel
        imageSrc="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1800&q=80"
        imageAlt="Team onboarding into CRM workspace"
        heading="Create your Bondex account"
        description="Set up your user access and start organizing pipeline operations with secure onboarding."
      />
      <main className="flex items-center justify-center px-4 py-10 md:px-8">
        <UserRegisterForm />
      </main>
    </div>
  );
}
