import { API_ROUTES } from "@/src/config/api";
import { requestPost } from "@/src/features/shared/services";

const AI_PUBLIC_BASE = `${API_ROUTES.AI.BASE}/public`;

export const generateWelcomeBot = <T>(payload: { businessName?: string; customerName?: string }) =>
	requestPost<T>(`${AI_PUBLIC_BASE}/welcome-bot`, payload);

export const generateBondexOverview = <T>() =>
	requestPost<T>(`${AI_PUBLIC_BASE}/bondex-overview`);

export const generateFeaturesSummary = <T>() =>
	requestPost<T>(`${AI_PUBLIC_BASE}/features-summary`);

export const generateHowItWorks = <T>() => requestPost<T>(`${AI_PUBLIC_BASE}/how-it-works`);

export const generateValueProposition = <T>() =>
	requestPost<T>(`${AI_PUBLIC_BASE}/value-proposition`);
