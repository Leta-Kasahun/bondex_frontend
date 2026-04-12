"use client";

import { useCallback, useEffect, useState } from "react";

export type CookieConsentStatus = "accepted" | "rejected";

const COOKIE_CONSENT_KEY = "bondex-cookie-consent";

const readConsent = (): CookieConsentStatus | null => {
	if (typeof window === "undefined") {
		return null;
	}

	const value = window.localStorage.getItem(COOKIE_CONSENT_KEY);
	if (value === "accepted" || value === "rejected") {
		return value;
	}

	return null;
};

export const useCookieConsent = () => {
	const [status, setStatus] = useState<CookieConsentStatus | null>(null);
	const [isReady, setIsReady] = useState(false);

	useEffect(() => {
		const currentStatus = readConsent();
		setStatus(currentStatus);
		setIsReady(true);
	}, []);

	const saveConsent = useCallback((nextStatus: CookieConsentStatus) => {
		if (typeof window === "undefined") {
			return;
		}

		window.localStorage.setItem(COOKIE_CONSENT_KEY, nextStatus);
		setStatus(nextStatus);
	}, []);

	const acceptCookies = useCallback(() => {
		saveConsent("accepted");
	}, [saveConsent]);

	const rejectCookies = useCallback(() => {
		saveConsent("rejected");
	}, [saveConsent]);

	return {
		status,
		isReady,
		isVisible: isReady && status === null,
		acceptCookies,
		rejectCookies,
	};
};