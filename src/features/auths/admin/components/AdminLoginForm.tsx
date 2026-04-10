"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Mail, Lock, Shield } from "lucide-react";
import { useRouter } from "next/navigation";
import { APP_ROUTES } from "@/src/constants";
import { useAdminAuth } from "../hooks";
import { AuthInputField, AuthSubmitButton, AuthErrorText, AuthFormFrame } from "@/src/features/auths/user/components";

type AdminLoginState = {
  email: string;
  password: string;
};

const initialState: AdminLoginState = {
  email: "",
  password: "",
};

export function AdminLoginForm() {
  const router = useRouter();
  const { loginMutation } = useAdminAuth();
  const [form, setForm] = useState<AdminLoginState>(initialState);

  const mutationError = useMemo(() => {
    if (!loginMutation.error) return "";
    return loginMutation.error.message || "Unable to continue admin login.";
  }, [loginMutation.error]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    loginMutation.mutate(
      {
        email: form.email.trim(),
        password: form.password,
      },
      {
        onSuccess: (result) => {
          sessionStorage.setItem("bondex_admin_id", result.adminId);
          router.push(`/admin/login/verify-otp?adminId=${encodeURIComponent(result.adminId)}`);
        },
      }
    );
  };

  return (
    <AuthFormFrame
      topIcon={Shield}
      title="Admin sign in"
      description="Use your secured admin credentials to continue."
      headerClassName="text-center"
      titleClassName="text-[2.1rem] md:text-[2.25rem]"
      descriptionClassName="text-[17px]"
      topIconWrapClassName="mx-auto h-14 w-14"
      topIconClassName="h-7 w-7"
      footer={
        <p>
          User account? <Link href={APP_ROUTES.AUTH.LOGIN} className="font-medium text-primary hover:underline">Go to user login</Link>
        </p>
      }
    >
      <form className="space-y-4" onSubmit={onSubmit}>
        <AuthInputField
          label="Admin email"
          type="email"
          value={form.email}
          onChange={(value) => setForm((prev) => ({ ...prev, email: value }))}
          placeholder="admin@bondex.com"
          icon={Mail}
          autoComplete="email"
        />
        <AuthInputField
          label="Password"
          type="password"
          value={form.password}
          onChange={(value) => setForm((prev) => ({ ...prev, password: value }))}
          placeholder="Enter admin password"
          icon={Lock}
          autoComplete="current-password"
        />
        <AuthErrorText message={mutationError} />
        <AuthSubmitButton
          label="Continue"
          loadingLabel="Checking credentials..."
          isLoading={loginMutation.isPending}
        />
      </form>
    </AuthFormFrame>
  );
}
