"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { APP_ROUTES } from "@/src/constants";
import { useAdminAuth } from "../hooks";
import { AuthInputField, AuthSubmitButton, AuthErrorText, AuthFormFrame } from "@/src/features/auths/user/components";

export function AdminVerifyOtpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryAdminId = (searchParams.get("adminId") || "").trim();
  const adminId = queryAdminId || sessionStorage.getItem("bondex_admin_id") || "";

  const { verifyOtpMutation } = useAdminAuth();
  const [otp, setOtp] = useState("");
  const [localError, setLocalError] = useState("");

  const mutationError = useMemo(() => {
    if (!verifyOtpMutation.error) return "";
    return verifyOtpMutation.error.message || "Invalid OTP code.";
  }, [verifyOtpMutation.error]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLocalError("");

    if (!adminId) {
      setLocalError("Missing admin session. Start login again.");
      return;
    }

    verifyOtpMutation.mutate(
      {
        adminId,
        otp: otp.trim(),
      },
      {
        onSuccess: () => {
          sessionStorage.removeItem("bondex_admin_id");
          router.push(APP_ROUTES.DASHBOARD.ADMIN_DASHBOARD);
        },
      }
    );
  };

  return (
    <AuthFormFrame
      topIcon={ShieldCheck}
      title="Verify admin OTP"
      description="Enter your one-time security code to access the admin dashboard."
      headerClassName="text-center"
      titleClassName="text-[2.1rem] md:text-[2.25rem]"
      descriptionClassName="text-[17px]"
      topIconWrapClassName="mx-auto h-14 w-14"
      topIconClassName="h-7 w-7"
      footer={
        <p>
          Back to <Link href="/admin/login" className="font-medium text-primary hover:underline">Admin login</Link>
        </p>
      }
    >
      <form className="space-y-4" onSubmit={onSubmit}>
        <AuthInputField
          label="One-time password"
          value={otp}
          onChange={setOtp}
          placeholder="Enter OTP"
          icon={ShieldCheck}
          autoComplete="one-time-code"
        />
        <AuthErrorText message={localError || mutationError} />
        <AuthSubmitButton
          label="Verify and access"
          loadingLabel="Verifying OTP..."
          isLoading={verifyOtpMutation.isPending}
        />
      </form>
    </AuthFormFrame>
  );
}
