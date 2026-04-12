const GOOGLE_IDENTITY_SCRIPT_SRC = "https://accounts.google.com/gsi/client";
const GOOGLE_AUTH_TIMEOUT_MS = 15000;
let cachedGoogleClientId: string | null = null;
let pendingGoogleIdTokenRequest: Promise<string> | null = null;
let initializedClientId: string | null = null;
let credentialHandler: ((response: { credential?: string }) => void) | null = null;

import { env } from "@/src/config/env";
import { getGoogleClientConfig } from "../services/user-auth.api";

declare global {
	interface Window {
		google?: {
			accounts?: {
				id?: {
					initialize: (options: {
						client_id: string;
						callback: (response: { credential?: string }) => void;
						auto_select?: boolean;
						cancel_on_tap_outside?: boolean;
					}) => void;
					prompt: (listener?: (notification: unknown) => void) => void;
				};
			};
		};
	}
}

let scriptLoadPromise: Promise<void> | null = null;

const buildGoogleOriginErrorMessage = (clientId: string): string => {
	const origin = typeof window === "undefined" ? "unknown" : window.location.origin;
	const clientIdSuffix = clientId.includes(".") ? clientId.split(".")[0] : clientId;

	return [
		"Google sign-in is not available right now.",
		`This app origin (${origin}) is not authorized for the configured Google client ID (${clientIdSuffix}).`,
		"Please add this exact origin in Google Cloud Console -> OAuth client -> Authorized JavaScript origins.",
	].join(" ");
};

const loadGoogleIdentityScript = (): Promise<void> => {
	if (typeof window === "undefined") {
		return Promise.reject(new Error("Google sign-in is currently unavailable. Please try again."));
	}

	if (window.google?.accounts?.id) {
		return Promise.resolve();
	}

	if (scriptLoadPromise) {
		return scriptLoadPromise;
	}

	scriptLoadPromise = new Promise<void>((resolve, reject) => {
		const existingScript = document.querySelector<HTMLScriptElement>(
			`script[src=\"${GOOGLE_IDENTITY_SCRIPT_SRC}\"]`
		);

		if (existingScript) {
			existingScript.addEventListener("load", () => resolve(), { once: true });
			existingScript.addEventListener(
				"error",
				() => reject(new Error("Google sign-in is currently unavailable. Please try again.")),
				{ once: true }
			);
			return;
		}

		const script = document.createElement("script");
		script.src = GOOGLE_IDENTITY_SCRIPT_SRC;
		script.async = true;
		script.defer = true;
		script.onload = () => resolve();
		script.onerror = () => reject(new Error("Google sign-in is currently unavailable. Please try again."));
		document.head.appendChild(script);
	});

	return scriptLoadPromise;
};

const resolveGoogleClientId = async (): Promise<string> => {
	if (cachedGoogleClientId) {
		return cachedGoogleClientId;
	}

	let resolvedClientId = "";

	try {
		const config = await getGoogleClientConfig();
		resolvedClientId = config.clientId?.trim() ?? "";
	} catch {
		// Fall back to public env when backend config endpoint is unavailable.
	}

	if (!resolvedClientId) {
		resolvedClientId = env.GOOGLE_CLIENT_ID?.trim() ?? "";
	}

	if (!resolvedClientId) {
		throw new Error("Google sign-in is currently unavailable. Please try again later.");
	}

	cachedGoogleClientId = resolvedClientId;
	return resolvedClientId;
};

const initializeGoogleIdentity = (clientId: string): void => {
	if (!window.google?.accounts?.id) {
		throw new Error("Google sign-in is currently unavailable. Please try again.");
	}

	if (initializedClientId === clientId) {
		return;
	}

	window.google.accounts.id.initialize({
		client_id: clientId,
		cancel_on_tap_outside: true,
		auto_select: false,
		callback: (response) => {
			credentialHandler?.(response);
		},
	});

	initializedClientId = clientId;
};

export const getGoogleIdToken = async (): Promise<string> => {
	if (pendingGoogleIdTokenRequest) {
		return pendingGoogleIdTokenRequest;
	}

	const clientId = await resolveGoogleClientId();

	await loadGoogleIdentityScript();

	if (!window.google?.accounts?.id) {
		throw new Error("Google sign-in is currently unavailable. Please try again.");
	}

	pendingGoogleIdTokenRequest = new Promise<string>((resolve, reject) => {
		let settled = false;

		const fail = (message: string) => {
			if (settled) {
				return;
			}

			settled = true;
			window.clearTimeout(timeout);
			pendingGoogleIdTokenRequest = null;
			credentialHandler = null;
			reject(new Error(message));
		};

		const succeed = (credential: string) => {
			if (settled) {
				return;
			}

			settled = true;
			window.clearTimeout(timeout);
			pendingGoogleIdTokenRequest = null;
			credentialHandler = null;
			resolve(credential);
		};

		const timeout = window.setTimeout(() => {
			fail("Google sign-in timed out. Please try again.");
		}, GOOGLE_AUTH_TIMEOUT_MS);

		initializeGoogleIdentity(clientId);

		credentialHandler = (response) => {
				if (!response.credential) {
					fail("Google sign-in failed. Please try again.");
					return;
				}

				succeed(response.credential);
		};

		window.google.accounts.id.prompt((notification: unknown) => {
			const promptNotification = notification as {
				isNotDisplayed?: () => boolean;
				getNotDisplayedReason?: () => string;
				isSkippedMoment?: () => boolean;
				getSkippedReason?: () => string;
			};

			if (promptNotification.isNotDisplayed?.()) {
				const reason = promptNotification.getNotDisplayedReason?.() ?? "unknown";
				const isOriginOrClientIssue =
					reason.includes("invalid_client") || reason.includes("unregistered_origin");

				if (isOriginOrClientIssue) {
					fail(buildGoogleOriginErrorMessage(clientId));
					return;
				}

				fail("Google sign-in is currently unavailable. Please try again.");
				return;
			}

			if (promptNotification.isSkippedMoment?.()) {
				const reason = promptNotification.getSkippedReason?.() ?? "unknown";
				if (reason.includes("invalid_client")) {
					fail(buildGoogleOriginErrorMessage(clientId));
					return;
				}

				fail("Google sign-in was cancelled. Please try again.");
			}
		});
	});

	return pendingGoogleIdTokenRequest;
};
