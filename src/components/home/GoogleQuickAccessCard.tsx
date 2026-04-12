"use client";

import { Loader2 } from "lucide-react";
import { AuthGoogleButton } from "@/src/features/auths/user/components";
import { useGoogleQuickAuth } from "@/src/hooks";

export function GoogleQuickAccessCard() {
	const { googleEmail, isDetectingEmail, isSubmitting, loginWithGoogle, registerWithGoogle } =
		useGoogleQuickAuth();

	const onLogin = () => {
		if (isSubmitting) {
			return;
		}

		void loginWithGoogle();
	};

	const onRegister = () => {
		if (isSubmitting) {
			return;
		}

		void registerWithGoogle();
	};

	return (
		<div className="mt-5 rounded-2xl border border-border/60 bg-white/70 p-4 backdrop-blur-md">
			<p className="text-xs font-semibold uppercase tracking-wide text-primary">Google quick access</p>
			<p className="mt-1 text-sm text-muted-foreground">
				{googleEmail ? `Email: ${googleEmail}` : "Email: loading..."}
			</p>
			<div className="mt-3 grid gap-3 sm:grid-cols-2">
				<AuthGoogleButton label="Google Login" onClick={onLogin} />
				<AuthGoogleButton label="Google Register" onClick={onRegister} />
			</div>
			{(isDetectingEmail || isSubmitting) ? (
				<div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
					<Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden />
					<span>Preparing Google access...</span>
				</div>
			) : null}
		</div>
	);
}