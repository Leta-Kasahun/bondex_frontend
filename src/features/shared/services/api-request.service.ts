import { type AxiosRequestConfig, type AxiosResponse } from "axios";
import { clientApi } from "@/src/lib/api/client";

const unwrapData = <T>(response: AxiosResponse<unknown>): T => {
	const payload = response.data as { data?: T } & Partial<T>;
	return (payload.data ?? payload) as T;
};

export const requestGet = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
	const response = await clientApi.get(url, config);
	return unwrapData<T>(response);
};

export const requestPost = async <T, B = unknown>(
	url: string,
	body?: B,
	config?: AxiosRequestConfig
): Promise<T> => {
	const response = await clientApi.post(url, body, config);
	return unwrapData<T>(response);
};

export const requestPut = async <T, B = unknown>(
	url: string,
	body?: B,
	config?: AxiosRequestConfig
): Promise<T> => {
	const response = await clientApi.put(url, body, config);
	return unwrapData<T>(response);
};

export const requestPatch = async <T, B = unknown>(
	url: string,
	body?: B,
	config?: AxiosRequestConfig
): Promise<T> => {
	const response = await clientApi.patch(url, body, config);
	return unwrapData<T>(response);
};

export const requestDelete = async <T>(
	url: string,
	config?: AxiosRequestConfig
): Promise<T> => {
	const response = await clientApi.delete(url, config);
	return unwrapData<T>(response);
};
