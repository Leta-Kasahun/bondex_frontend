"use client";

import { useMemo, useState } from "react";
import { Mail, ShieldCheck, UserRound } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import { useNotification } from "@/src/hooks";
import {
  useConfirmUserEmailChange,
  useRequestUserEmailChange,
  useUpdateUserProfile,
  useUserProfile,
} from "../hooks";

const OTP_REGEX = /^\d{6}$/;

type EmailChangeForm = {
  email: string;
  otp: string;
};

export function UserSettingsProfilePage() {
  const notification = useNotification();

  const { data: profile, isLoading: isProfileLoading, isError: isProfileError } = useUserProfile();
  const updateProfileMutation = useUpdateUserProfile();
  const requestEmailChangeMutation = useRequestUserEmailChange();
  const confirmEmailChangeMutation = useConfirmUserEmailChange();

  const [name, setName] = useState("");
  const [emailForm, setEmailForm] = useState<EmailChangeForm>({ email: "", otp: "" });

  const displayName = useMemo(() => {
    if (name.trim()) {
      return name;
    }
    return profile?.name ?? "";
  }, [name, profile?.name]);

  const isSavingProfile = updateProfileMutation.isPending;
  const isRequestingOtp = requestEmailChangeMutation.isPending;
  const isConfirmingEmail = confirmEmailChangeMutation.isPending;

  const updateProfile = () => {
    const trimmedName = displayName.trim();

    if (trimmedName.length < 2) {
      notification.error("Name is required", "Use at least 2 characters for your profile name.");
      return;
    }

    updateProfileMutation.mutate(
      { name: trimmedName },
      {
        onSuccess: () => {
          notification.success("Profile updated");
          setName("");
        },
      }
    );
  };

  const requestEmailOtp = () => {
    const email = emailForm.email.trim().toLowerCase();

    if (!email) {
      notification.error("Email is required", "Enter the new email address.");
      return;
    }

    requestEmailChangeMutation.mutate(
      { email },
      {
        onSuccess: () => {
          notification.success("OTP sent", "Check your new inbox for the verification code.");
        },
      }
    );
  };

  const confirmEmailChange = () => {
    const email = emailForm.email.trim().toLowerCase();
    const otp = emailForm.otp.trim();

    if (!email) {
      notification.error("Email is required", "Enter the same email used for OTP request.");
      return;
    }

    if (!OTP_REGEX.test(otp)) {
      notification.error("Invalid OTP", "OTP must be a 6 digit code.");
      return;
    }

    confirmEmailChangeMutation.mutate(
      { email, otp },
      {
        onSuccess: () => {
          notification.success("Email updated");
          setEmailForm({ email: "", otp: "" });
        },
      }
    );
  };

  return (
    <main className="flex-1 space-y-6 bg-background p-4 md:p-6">
      <section className="relative overflow-hidden rounded-2xl border border-[#C3CDD6] bg-linear-to-br from-[#FFFFFF] via-[#F3F6FA] to-[#E6EEF5] p-5 shadow-sm">
        <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-[#8BAACF]/20 blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute -left-8 bottom-0 h-24 w-24 rounded-full bg-[#5F82AA]/20 blur-2xl" aria-hidden />

        <div className="relative">
          <h1 className="font-heading text-2xl font-semibold text-foreground md:text-3xl">Profile Settings</h1>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
            Keep your account profile current and securely verify email updates with OTP confirmation.
          </p>
        </div>
      </section>

      {isProfileLoading ? (
        <Card className="border-border/70 bg-[#FFFFFF]">
          <CardContent className="pt-4 text-sm text-muted-foreground">Loading profile...</CardContent>
        </Card>
      ) : null}

      {isProfileError ? (
        <Card className="border-border/70 bg-[#FFFFFF]">
          <CardContent className="pt-4 text-sm text-muted-foreground">Unable to load profile right now.</CardContent>
        </Card>
      ) : null}

      {!isProfileLoading && !isProfileError ? (
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          <Card className="border-border/70 bg-[#FFFFFF]">
            <CardHeader>
              <CardTitle className="inline-flex items-center gap-2 text-lg">
                <UserRound className="h-5 w-5 text-primary" aria-hidden />
                Profile
              </CardTitle>
              <CardDescription>Update your display name for dashboard and notifications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <label className="block space-y-1">
                <span className="text-sm font-medium text-foreground">Current email</span>
                <Input value={profile?.email ?? ""} disabled className="h-11 bg-[#F8FAFC] px-4 text-base" />
              </label>

              <label className="block space-y-1">
                <span className="text-sm font-medium text-foreground">Display name</span>
                <Input
                  value={displayName}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Your name"
                  className="h-11 bg-[#FFFFFF] px-4 text-base placeholder:text-sm"
                />
              </label>

              <Button type="button" onClick={updateProfile} disabled={isSavingProfile}>
                {isSavingProfile ? "Saving..." : "Save profile"}
              </Button>
            </CardContent>
          </Card>

          <Card className="border-border/70 bg-[#FFFFFF]">
            <CardHeader>
              <CardTitle className="inline-flex items-center gap-2 text-lg">
                <ShieldCheck className="h-5 w-5 text-primary" aria-hidden />
                Change Email (OTP)
              </CardTitle>
              <CardDescription>
                Step 1: request OTP to your new email. Step 2: confirm with that OTP.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <label className="block space-y-1">
                <span className="inline-flex items-center gap-2 text-sm font-medium text-foreground">
                  <Mail className="h-4 w-4 text-muted-foreground" aria-hidden />
                  New email
                </span>
                <Input
                  type="email"
                  value={emailForm.email}
                  onChange={(event) => setEmailForm((prev) => ({ ...prev, email: event.target.value }))}
                  placeholder="new-email@domain.com"
                  className="h-11 bg-[#FFFFFF] px-4 text-base placeholder:text-sm"
                />
              </label>

              <Button type="button" variant="outline" onClick={requestEmailOtp} disabled={isRequestingOtp}>
                {isRequestingOtp ? "Requesting..." : "Request OTP"}
              </Button>

              <label className="block space-y-1">
                <span className="text-sm font-medium text-foreground">OTP code</span>
                <Input
                  inputMode="numeric"
                  value={emailForm.otp}
                  onChange={(event) => setEmailForm((prev) => ({ ...prev, otp: event.target.value }))}
                  placeholder="6 digit code"
                  className="h-11 bg-[#FFFFFF] px-4 text-base placeholder:text-sm"
                />
              </label>

              <Button type="button" onClick={confirmEmailChange} disabled={isConfirmingEmail}>
                {isConfirmingEmail ? "Confirming..." : "Confirm email change"}
              </Button>
            </CardContent>
          </Card>
        </div>
      ) : null}
    </main>
  );
}
