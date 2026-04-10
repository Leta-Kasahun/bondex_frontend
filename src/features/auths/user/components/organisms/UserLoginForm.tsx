"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Mail, Lock } from "lucide-react";
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
  email: string;
  password: string;
};

const initialState: FormState = {
  email: "",
  password: "",
};

export function UserLoginForm() {
  const router = useRouter();
  const { loginMutation } = useUserAuth();
  const [form, setForm] = useState<FormState>(initialState);

  const mutationError = useMemo(() => {
    if (!loginMutation.error) return "";
    return loginMutation.error.message || "Unable to sign in.";
  }, [loginMutation.error]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    loginMutation.mutate(
      {
        email: form.email.trim(),
        password: form.password,
      },
      {
        onSuccess: () => {
          router.push(APP_ROUTES.DASHBOARD.HOME);
        },
      }
    );
  };

  const onGoogleLogin = () => {
    window.location.assign(createApiUrl(API_ROUTES.AUTH.USER.GOOGLE_LOGIN));
  };

  return (
    <AuthFormFrame
      title="Welcome back"
      description="Sign in to continue managing your Bondex workspace."
      footer={
        <p>
          New to Bondex? <Link href={APP_ROUTES.AUTH.REGISTER} className="font-medium text-primary hover:underline">Create account</Link>
        </p>
      }
    >
      <form className="space-y-4" onSubmit={onSubmit}>
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
          placeholder="Enter your password"
          icon={Lock}
          autoComplete="current-password"
        />
        <div className="flex justify-end">
          <Link href={APP_ROUTES.AUTH.FORGOT_PASSWORD} className="text-[15px] text-primary hover:underline">
            Forgot password?
          </Link>
        </div>
        <AuthErrorText message={mutationError} />
        <AuthSubmitButton
          label="Sign in"
          loadingLabel="Signing in..."
          isLoading={loginMutation.isPending}
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

      <AuthGoogleButton label="Continue with Google" onClick={onGoogleLogin} />
    </AuthFormFrame>
  );
}
