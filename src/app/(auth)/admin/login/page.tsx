import { AuthSplitPanel } from "@/src/features/auths/user/components";
import { AdminLoginForm } from "@/src/features/auths/admin";

export default function AdminLoginPage() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <AuthSplitPanel
        imageSrc="https://images.unsplash.com/photo-1556155092-490a1ba16284?auto=format&fit=crop&w=1800&q=80"
        imageAlt="Private admin authentication"
        heading="Private admin access"
        description="Use secure admin credentials and OTP verification to access protected operations."
      />
      <main className="flex items-center justify-center px-4 py-10 md:px-8">
        <AdminLoginForm />
      </main>
    </div>
  );
}
