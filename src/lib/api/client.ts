import axios from "axios";
import { env } from "../../config/env";

const normalizePath = (path: string): string =>
	!path ? "" : path.startsWith("/") ? path : `/${path}`;

export const clientApi = axios.create({
	baseURL: env.API_BASE_URL,
	timeout: env.API_TIMEOUT_MS,
	withCredentials: true,
	headers: { "Content-Type": "application/json" },
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
