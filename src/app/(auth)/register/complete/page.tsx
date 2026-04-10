import { AuthSplitPanel, CompleteRegistrationForm } from "@/src/features/auths/user";

export default function CompleteRegistrationPage() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <AuthSplitPanel
        imageSrc="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1800&q=80"
        imageAlt="Security verification workflow"
        heading="Verify your account"
        description="Confirm your one-time code to complete Bondex registration and unlock your workspace."
      />
      <main className="flex items-center justify-center px-4 py-10 md:px-8">
        <CompleteRegistrationForm />
      </main>
    </div>
  );
}
