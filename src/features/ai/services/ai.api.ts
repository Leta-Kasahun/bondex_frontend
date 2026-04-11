import { API_ROUTES } from "@/src/config/api";
import { requestPost } from "@/src/features/shared/services";

const AI_PUBLIC_BASE = `${API_ROUTES.AI.BASE}/public`;
const AI_PRIVATE_BASE = `${API_ROUTES.AI.BASE}/private`;
const AI_ADMIN_BASE = `${API_ROUTES.AI.BASE}/admin`;

type AiWidgetResponse = {
	success: boolean;
	message?: string;
	data?: {
		output?: string;
	};
};

export const generateWelcomeBot = <T>(payload: { businessName?: string; customerName?: string }) =>
	requestPost<T>(`${AI_PUBLIC_BASE}/welcome-bot`, payload);

export const generateBondexOverview = <T>() =>
	requestPost<T>(`${AI_PUBLIC_BASE}/bondex-overview`);

export const generateFeaturesSummary = <T>() =>
	requestPost<T>(`${AI_PUBLIC_BASE}/features-summary`);

export const generateHowItWorks = <T>() => requestPost<T>(`${AI_PUBLIC_BASE}/how-it-works`);

export const generateValueProposition = <T>() =>
	requestPost<T>(`${AI_PUBLIC_BASE}/value-proposition`);

const resolvePrivateAiEndpoint = (
	message: string
): { path: string; payload?: Record<string, string | number> } => {
	const text = message.toLowerCase();

	if (text.includes("daily") || text.includes("check")) {
		return {
			path: `${AI_PRIVATE_BASE}/daily-check-in`,
			payload: { businessName: "Bondex", leadCount: 0 },
		};
	}

	if (text.includes("tour")) {
		return {
			path: `${AI_PRIVATE_BASE}/quick-tour`,
			payload: { businessName: "Bondex" },
		};
	}

	if (text.includes("start") || text.includes("setup") || text.includes("onboard")) {
		return {
			path: `${AI_PRIVATE_BASE}/getting-started`,
			payload: { businessName: "Bondex" },
		};
	}

	if ((text.includes("lead") && text.includes("no")) || text.includes("no leads")) {
		return {
			path: `${AI_PRIVATE_BASE}/no-leads-yet`,
			payload: { businessName: "Bondex" },
		};
	}

	return { path: `${AI_PRIVATE_BASE}/help-message` };
};

export const requestPrivateAiMessage = (message: string) => {
	const endpoint = resolvePrivateAiEndpoint(message);
	return requestPost<AiWidgetResponse, Record<string, string | number>>(
		endpoint.path,
		endpoint.payload ?? {}
	);
};

const resolveAdminAiEndpoint = (
	message: string
): { path: string; payload?: Record<string, string | number> } => {
	const text = message.toLowerCase();

	if (text.includes("performance") || text.includes("latency") || text.includes("accuracy")) {
		return {
			path: `${AI_ADMIN_BASE}/ai-performance-summary`,
			payload: { responseTime: 240, accuracy: 98, alerts: 3 },
		};
	}

	if (text.includes("monitor") || text.includes("monitoring") || text.includes("data")) {
		return { path: `${AI_ADMIN_BASE}/data-monitoring` };
	}

	if (text.includes("daily")) {
		return {
			path: `${AI_ADMIN_BASE}/daily-summary`,
			payload: { totalLeads: 1284, highPriorityLeads: 86, alerts: 3 },
		};
	}

	if (text.includes("weekly")) {
		return {
			path: `${AI_ADMIN_BASE}/weekly-summary`,
			payload: { totalLeads: 8920, avgAccuracy: 97, alerts: 12 },
		};
	}

	if (text.includes("alert") || text.includes("configure")) {
		return { path: `${AI_ADMIN_BASE}/alert-configuration-guide` };
	}

	if (text.includes("system") && text.includes("performance")) {
		return {
			path: `${AI_ADMIN_BASE}/system-performance-overview`,
			payload: { uptime: 99.9, responseTime: 220, criticalAlerts: 0 },
		};
	}

	return { path: `${AI_ADMIN_BASE}/system-overview` };
};

export const requestAdminAiMessage = (message: string) => {
	const endpoint = resolveAdminAiEndpoint(message);
	return requestPost<AiWidgetResponse, Record<string, string | number>>(
		endpoint.path,
		endpoint.payload ?? {}
	);
};
