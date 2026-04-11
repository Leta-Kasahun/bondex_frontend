import axios from "axios";
import { env } from "../../config/env";

type PersistedAuthState = {
	state?: {
		accessToken?: string | null;
	};
};

const normalizePath = (path: string): string =>
	!path ? "" : path.startsWith("/") ? path : `/${path}`;

export const clientApi = axios.create({
	baseURL: env.API_BASE_URL,
	timeout: env.API_TIMEOUT_MS,
	withCredentials: true,
	headers: { "Content-Type": "application/json" },
});

clientApi.interceptors.request.use((config) => {
	if (typeof window === "undefined") {
		return config;
	}

	const existingAuthHeader = config.headers?.Authorization ?? config.headers?.authorization;
	if (existingAuthHeader) {
		return config;
	}

	const persistedRaw = window.localStorage.getItem("bondex-auth");
	if (!persistedRaw) {
		return config;
	}

	try {
		const persisted = JSON.parse(persistedRaw) as PersistedAuthState;
		const accessToken = persisted?.state?.accessToken;
		if (!accessToken) {
			return config;
		}

		config.headers = config.headers ?? {};
		config.headers.Authorization = `Bearer ${accessToken}`;
	} catch {
		return config;
	}

	return config;
});

export const createApiUrl = (path: string): string =>
	`${env.API_BASE_URL}${normalizePath(path)}`;

export const setAccessToken = (accessToken: string | null): void => {
	if (!accessToken) {
		delete clientApi.defaults.headers.common.Authorization;
		return;
	}
	clientApi.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
};

export const clearAccessToken = (): void => {
	delete clientApi.defaults.headers.common.Authorization;
};
