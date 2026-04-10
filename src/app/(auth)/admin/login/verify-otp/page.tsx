import { AuthSplitPanel } from "@/src/features/auths/user/components";
import { AdminVerifyOtpForm } from "@/src/features/auths/admin";

export default function AdminVerifyOtpPage() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <AuthSplitPanel
        imageSrc="https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=1800&q=80"
        imageAlt="Admin OTP security verification"
        heading="Second-factor verification"
        description="Complete OTP verification to unlock your private admin dashboard."
      />
      <main className="flex items-center justify-center px-4 py-10 md:px-8">
        <AdminVerifyOtpForm />
      </main>
    </div>
  );
}
