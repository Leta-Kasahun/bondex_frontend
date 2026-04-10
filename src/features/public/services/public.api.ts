import { API_ROUTES } from "@/src/config/api";
import { requestGet, requestPost } from "@/src/features/shared/services";
import {
	type MessageResponse,
	type PublicAiResponse,
	type PublicBusiness,
	type PublicContactInput,
} from "../types/public.types";

export const listPublicBusinesses = (params?: Record<string, unknown>) =>
	requestGet<PublicBusiness[]>(`${API_ROUTES.PUBLIC.BASE}/businesses`, { params });

export const getPublicBusinessById = (businessId: string) =>
	requestGet<PublicBusiness>(`${API_ROUTES.PUBLIC.BASE}/businesses/${businessId}`);

export const submitPublicContact = (payload: PublicContactInput) =>
	requestPost<MessageResponse, PublicContactInput>(`${API_ROUTES.PUBLIC.BASE}/contact`, payload);

const resolvePublicAiEndpoint = (
	message: string
): { path: string; payload?: Record<string, string> } => {
	const text = message.toLowerCase();

	if (text.includes("feature")) {
		return { path: `${API_ROUTES.AI.BASE}/public/features-summary` };
	}

	if (text.includes("how") && text.includes("work")) {
		return { path: `${API_ROUTES.AI.BASE}/public/how-it-works` };
	}

	if (text.includes("value") || text.includes("benefit") || text.includes("why")) {
		return { path: `${API_ROUTES.AI.BASE}/public/value-proposition` };
	}

	if (text.includes("overview") || text.includes("what is bondex") || text.includes("about bondex")) {
		return { path: `${API_ROUTES.AI.BASE}/public/bondex-overview` };
	}

	return {
		path: `${API_ROUTES.AI.BASE}/public/welcome-bot`,
		payload: { businessName: "Bondex", customerName: message.slice(0, 80) },
	};
};

export const requestPublicAiMessage = (message: string) => {
	const endpoint = resolvePublicAiEndpoint(message);
	return requestPost<PublicAiResponse, Record<string, string>>(
		endpoint.path,
		endpoint.payload ?? {}
	);
};
