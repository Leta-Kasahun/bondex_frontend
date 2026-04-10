"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Mail, Lock, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { createApiUrl } from "@/src/lib/api/client";
import { API_ROUTES } from "@/src/config/api";
import { APP_ROUTES } from "@/src/constants";
import { AuthGoogleButton } from "../atoms/AuthGoogleButton";
import { AuthInputField } from "../atoms/AuthInputField";
import { AuthSubmitButton } from "../atoms/AuthSubmitButton";
import { AuthErrorText } from "../molecules/AuthErrorText";
import { AuthFormFrame } from "../molecules/AuthFormFrame";
import { useUserAuth } from "../../hooks";

type FormState = {
  name: string;
  email: string;
  password: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  password: "",
};

export function UserRegisterForm() {
  const router = useRouter();
  const { registerMutation } = useUserAuth();
  const [form, setForm] = useState<FormState>(initialState);
  const [localError, setLocalError] = useState<string>("");

  const mutationError = useMemo(() => {
    if (!registerMutation.error) return "";
    return registerMutation.error.message || "Unable to complete registration.";
  }, [registerMutation.error]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLocalError("");

    if (!form.name.trim()) {
      setLocalError("Name is required.");
      return;
    }

    registerMutation.mutate(
      {
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
      },
      {
        onSuccess: () => {
          const emailQuery = encodeURIComponent(form.email.trim());
          router.push(`${APP_ROUTES.AUTH.REGISTER}/complete?email=${emailQuery}`);
        },
      }
    );
  };

  const onGoogleSignup = () => {
    window.location.assign(createApiUrl(API_ROUTES.AUTH.USER.GOOGLE_LOGIN));
  };

  return (
    <AuthFormFrame
      title="Create your user account"
      description="Set up your Bondex workspace access in minutes."
      footer={
        <p>
          Already have an account? <Link href={APP_ROUTES.AUTH.LOGIN} className="font-medium text-primary hover:underline">Sign in</Link>
        </p>
      }
    >
      <form className="space-y-4" onSubmit={onSubmit}>
        <AuthInputField
          label="Full name"
          value={form.name}
          onChange={(value) => setForm((prev) => ({ ...prev, name: value }))}
          placeholder="Enter your full name"
          icon={User}
          autoComplete="name"
        />
        <AuthInputField
          label="Work email"
          type="email"
          value={form.email}
          onChange={(value) => setForm((prev) => ({ ...prev, email: value }))}
          placeholder="you@company.com"
          icon={Mail}
          autoComplete="email"
        />
        <AuthInputField
          label="Password"
          type="password"
          value={form.password}
          onChange={(value) => setForm((prev) => ({ ...prev, password: value }))}
          placeholder="Create a strong password"
          icon={Lock}
          autoComplete="new-password"
        />
        <AuthErrorText message={localError || mutationError} />
        <AuthSubmitButton
          label="Create account"
          loadingLabel="Creating account..."
          isLoading={registerMutation.isPending}
        />
      </form>

      <div className="relative py-1">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border/60" />
        </div>
        <div className="relative flex justify-center text-sm uppercase">
          <span className="bg-[#FFFFFF] px-2 text-muted-foreground">or</span>
        </div>
      </div>

      <AuthGoogleButton label="Sign up with Google" onClick={onGoogleSignup} />
    </AuthFormFrame>
  );
}
