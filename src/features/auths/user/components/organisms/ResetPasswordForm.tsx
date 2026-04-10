"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Key, Lock, RotateCcw } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { APP_ROUTES } from "@/src/constants";
import { AuthInputField } from "../atoms/AuthInputField";
import { AuthSubmitButton } from "../atoms/AuthSubmitButton";
import { AuthErrorText } from "../molecules/AuthErrorText";
import { AuthFormFrame } from "../molecules/AuthFormFrame";
import { useUserAuth } from "../../hooks";

export function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = (searchParams.get("email") || "").trim();
  const { verifyResetOtpMutation, resetPasswordMutation } = useUserAuth();
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState("");

  const mutationError = useMemo(() => {
    if (verifyResetOtpMutation.error) {
      return verifyResetOtpMutation.error.message || "Invalid reset code.";
    }
    if (resetPasswordMutation.error) {
      return resetPasswordMutation.error.message || "Unable to reset password.";
    }
    return "";
  }, [verifyResetOtpMutation.error, resetPasswordMutation.error]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLocalError("");

    if (!email) {
      setLocalError("Missing email. Go back and request a reset code again.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setLocalError("Passwords do not match.");
      return;
    }

    verifyResetOtpMutation.mutate(
      { email, otp: otp.trim() },
      {
        onSuccess: () => {
          resetPasswordMutation.mutate(
            { newPassword, confirmPassword },
            {
              onSuccess: () => {
                router.push(APP_ROUTES.AUTH.LOGIN);
              },
            }
          );
        },
      }
    );
  };

  return (
    <AuthFormFrame
      topIcon={RotateCcw}
      title="Reset password"
      description="Verify your OTP and set a new password for your account."
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
          label="Reset code"
          value={otp}
          onChange={setOtp}
          placeholder="Enter 6 digit OTP"
          icon={Key}
          autoComplete="one-time-code"
        />
        <AuthInputField
          label="New password"
          type="password"
          value={newPassword}
          onChange={setNewPassword}
          placeholder="Enter new password"
          icon={Lock}
          autoComplete="new-password"
        />
        <AuthInputField
          label="Confirm password"
          type="password"
          value={confirmPassword}
          onChange={setConfirmPassword}
          placeholder="Re-enter new password"
          icon={Lock}
          autoComplete="new-password"
        />
        <AuthErrorText message={localError || mutationError} />
        <AuthSubmitButton
          label="Reset password"
          loadingLabel="Resetting..."
          isLoading={verifyResetOtpMutation.isPending || resetPasswordMutation.isPending}
        />
      </form>
    </AuthFormFrame>
  );
}
