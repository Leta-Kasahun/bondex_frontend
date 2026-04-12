"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { APP_ROUTES } from "@/src/constants";
import { useAuth } from "@/src/hooks/useAuth";
import { useUserAuth } from "@/src/features/auths/user";
import { getGoogleIdToken } from "@/src/features/auths/user/utils/google-auth.client";

type GoogleTokenPayload = {
	email?: string;
};

const readEmailFromGoogleToken = (idToken: string): string | null => {
	try {
		const [, payloadSegment] = idToken.split(".");
		if (!payloadSegment) {
			return null;
		}

		const base64 = payloadSegment.replace(/-/g, "+").replace(/_/g, "/");
		const paddedBase64 = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
		const payload = JSON.parse(atob(paddedBase64)) as GoogleTokenPayload;
		return payload.email?.trim() || null;
	} catch {
		return null;
	}
};

export const useGoogleQuickAuth = () => {
	const router = useRouter();
	const { email: authEmail } = useAuth();
	const { googleLoginMutation, signupWithGoogleMutation } = useUserAuth();
	const [googleEmail, setGoogleEmail] = useState<string>(authEmail ?? "");
	const [cachedIdToken, setCachedIdToken] = useState<string | null>(null);
	const [isDetectingEmail, setIsDetectingEmail] = useState(false);
	const hasAttemptedPrefetch = useRef(false);

	useEffect(() => {
		if (authEmail) {
			setGoogleEmail(authEmail);
		}
	}, [authEmail]);

	const resolveGoogleIdentity = useCallback(async (): Promise<string> => {
		const idToken = await getGoogleIdToken();
		setCachedIdToken(idToken);

		const detectedEmail = readEmailFromGoogleToken(idToken);
		if (detectedEmail) {
			setGoogleEmail(detectedEmail);
		}

		return idToken;
	}, []);

	const preloadGoogleEmail = useCallback(async () => {
		if (authEmail) {
			setGoogleEmail(authEmail);
			return;
		}

		setIsDetectingEmail(true);
		try {
			await resolveGoogleIdentity();
		} catch {
			// Do not block home page interaction when Google prompt is dismissed.
		} finally {
			setIsDetectingEmail(false);
		}
	}, [authEmail, resolveGoogleIdentity]);

	useEffect(() => {
		if (hasAttemptedPrefetch.current) {
			return;
		}

		hasAttemptedPrefetch.current = true;
		void preloadGoogleEmail();
	}, [preloadGoogleEmail]);

	const loginWithGoogle = useCallback(async () => {
		const idToken = cachedIdToken ?? (await resolveGoogleIdentity());

		googleLoginMutation.mutate(
			{ idToken },
			{
				onSuccess: () => {
					router.push(APP_ROUTES.DASHBOARD.USERS);
				},
			}
		);
	}, [cachedIdToken, googleLoginMutation, resolveGoogleIdentity, router]);

	const registerWithGoogle = useCallback(async () => {
		const idToken = cachedIdToken ?? (await resolveGoogleIdentity());

		signupWithGoogleMutation.mutate(
			{ idToken },
			{
				onSuccess: () => {
					router.push(APP_ROUTES.DASHBOARD.USERS);
				},
			}
		);
	}, [cachedIdToken, resolveGoogleIdentity, router, signupWithGoogleMutation]);

	return {
		googleEmail,
		isDetectingEmail,
		isSubmitting: googleLoginMutation.isPending || signupWithGoogleMutation.isPending,
		loginWithGoogle,
		registerWithGoogle,
	};
};