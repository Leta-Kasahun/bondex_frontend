"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Key, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { APP_ROUTES } from "@/src/constants";
import { AuthInputField } from "../atoms/AuthInputField";
import { AuthSubmitButton } from "../atoms/AuthSubmitButton";
import { AuthErrorText } from "../molecules/AuthErrorText";
import { AuthFormFrame } from "../molecules/AuthFormFrame";
import { useUserAuth } from "../../hooks";

export function ForgotPasswordForm() {
  const router = useRouter();
  const { forgotPasswordMutation } = useUserAuth();
  const [email, setEmail] = useState("");

  const mutationError = useMemo(() => {
    if (!forgotPasswordMutation.error) return "";
    return forgotPasswordMutation.error.message || "Unable to send reset code.";
  }, [forgotPasswordMutation.error]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    forgotPasswordMutation.mutate(
      { email: email.trim() },
      {
        onSuccess: () => {
          router.push(`${APP_ROUTES.AUTH.RESET_PASSWORD}?email=${encodeURIComponent(email.trim())}`);
        },
      }
    );
  };

  return (
    <AuthFormFrame
      topIcon={Key}
      title="Forgot password"
      description="Enter your email to receive an OTP code for password reset."
      headerClassName="text-center"
      titleClassName="text-3xl md:text-4xl"
      descriptionClassName="text-base"
      topIconWrapClassName="mx-auto h-14 w-14"
      topIconClassName="h-7 w-7"
      footer={
        <p>
          Back to <Link href={APP_ROUTES.AUTH.LOGIN} className="font-medium text-primary hover:underline">Sign in</Link>
        </p>
      }
    >
      <form className="space-y-4" onSubmit={onSubmit}>
        <AuthInputField
          label="Work email"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="you@company.com"
          icon={Mail}
          autoComplete="email"
        />
        <AuthErrorText message={mutationError} />
        <AuthSubmitButton
          label="Send reset code"
          loadingLabel="Sending code..."
          isLoading={forgotPasswordMutation.isPending}
        />
      </form>
    </AuthFormFrame>
  );
}
