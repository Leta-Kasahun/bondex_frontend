"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { MailCheck, ShieldCheck } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { APP_ROUTES } from "@/src/constants";
import { AuthInputField } from "../atoms/AuthInputField";
import { AuthSubmitButton } from "../atoms/AuthSubmitButton";
import { AuthErrorText } from "../molecules/AuthErrorText";
import { AuthFormFrame } from "../molecules/AuthFormFrame";
import { useUserAuth } from "../../hooks";

export function CompleteRegistrationForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = (searchParams.get("email") || "").trim();
  const [otp, setOtp] = useState("");
  const { verifyRegistrationOtpMutation } = useUserAuth();

  const mutationError = useMemo(() => {
    if (!verifyRegistrationOtpMutation.error) return "";
    return verifyRegistrationOtpMutation.error.message || "Invalid verification code.";
  }, [verifyRegistrationOtpMutation.error]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email) return;

    verifyRegistrationOtpMutation.mutate(
      {
        email,
        otp: otp.trim(),
      },
      {
        onSuccess: () => {
          router.push(APP_ROUTES.DASHBOARD.HOME);
        },
      }
    );
  };

  return (
    <AuthFormFrame
      title="Complete registration"
      description="Enter the OTP code sent to your email to activate your account."
      footer={
        <p>
          Back to <Link href={APP_ROUTES.AUTH.LOGIN} className="font-medium text-primary hover:underline">Sign in</Link>
        </p>
      }
    >
      <div className="rounded-lg border border-border/60 bg-accent/25 p-3 text-sm text-foreground">
        <p className="inline-flex items-center gap-2">
          <MailCheck className="h-4 w-4 text-primary" aria-hidden />
          Verification email: <span className="font-semibold">{email || "No email provided"}</span>
        </p>
      </div>

      <form className="space-y-4" onSubmit={onSubmit}>
        <AuthInputField
          label="Verification code"
          value={otp}
          onChange={setOtp}
          placeholder="Enter 6 digit OTP"
          icon={ShieldCheck}
          autoComplete="one-time-code"
        />
        <AuthErrorText message={mutationError} />
        <AuthSubmitButton
          label="Verify and continue"
          loadingLabel="Verifying..."
          isLoading={verifyRegistrationOtpMutation.isPending}
        />
      </form>
    </AuthFormFrame>
  );
}
