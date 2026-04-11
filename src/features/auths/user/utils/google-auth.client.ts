const GOOGLE_IDENTITY_SCRIPT_SRC = "https://accounts.google.com/gsi/client";
const GOOGLE_AUTH_TIMEOUT_MS = 15000;
let cachedGoogleClientId: string | null = null;

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
					prompt: () => void;
				};
			};
		};
	}
}

let scriptLoadPromise: Promise<void> | null = null;

const loadGoogleIdentityScript = (): Promise<void> => {
	if (typeof window === "undefined") {
		return Promise.reject(new Error("Google auth is only available in the browser."));
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
				() => reject(new Error("Unable to load Google authentication script.")),
				{ once: true }
			);
			return;
		}

		const script = document.createElement("script");
		script.src = GOOGLE_IDENTITY_SCRIPT_SRC;
		script.async = true;
		script.defer = true;
		script.onload = () => resolve();
		script.onerror = () => reject(new Error("Unable to load Google authentication script."));
		document.head.appendChild(script);
	});

	return scriptLoadPromise;
};

const resolveGoogleClientId = async (): Promise<string> => {
	if (cachedGoogleClientId) {
		return cachedGoogleClientId;
	}

	if (env.GOOGLE_CLIENT_ID) {
		cachedGoogleClientId = env.GOOGLE_CLIENT_ID;
		return cachedGoogleClientId;
	}

	const config = await getGoogleClientConfig();
	if (!config.clientId) {
		throw new Error(
			"Google sign-in is not configured. Set NEXT_PUBLIC_GOOGLE_CLIENT_ID or backend GOOGLE_CLIENT_ID."
		);
	}

	cachedGoogleClientId = config.clientId;
	return config.clientId;
};

export const getGoogleIdToken = async (): Promise<string> => {
	const clientId = await resolveGoogleClientId();

	await loadGoogleIdentityScript();

	if (!window.google?.accounts?.id) {
		throw new Error("Google authentication is unavailable right now.");
	}

	return new Promise<string>((resolve, reject) => {
		const timeout = window.setTimeout(() => {
			reject(new Error("Google authentication timed out. Please try again."));
		}, GOOGLE_AUTH_TIMEOUT_MS);

		window.google.accounts.id.initialize({
			client_id: clientId,
			cancel_on_tap_outside: true,
			auto_select: false,
			callback: (response) => {
				window.clearTimeout(timeout);
				if (!response.credential) {
					reject(new Error("Google authentication failed. Please try again."));
					return;
				}
				resolve(response.credential);
			},
		});

		window.google.accounts.id.prompt();
	});
};
