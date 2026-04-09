export const APP_CONSTANTS = {
	LEAD_STATUS: {
		NEW: "new",
		CONTACTED: "contacted",
		CONVERTED: "converted",
		IGNORED: "ignored",
	},
	LEAD_PRIORITY: {
		HIGH: "high",
		MEDIUM: "medium",
		LOW: "low",
	},
	DEAL_STAGE: {
		QUALIFIED: "qualified",
		PROPOSAL: "proposal",
		NEGOTIATION: "negotiation",
		WON: "won",
		LOST: "lost",
	},
	PLATFORM: {
		TELEGRAM: "telegram",
		GMAIL: "gmail",
		FACEBOOK: "facebook",
		INSTAGRAM: "instagram",
		WEBSITE_FORM: "website_form",
		DIRECT_CHAT: "direct_chat",
		MANUAL: "manual",
		EMAIL: "email",
		WEBSITE: "website",
	},
	AUTH_SUBJECT: {
		USER: "USER",
		ADMIN: "ADMIN",
	},
	AUTH_COOKIE_NAME: {
		USER_REFRESH: "userRefreshToken",
		ADMIN_REFRESH: "adminRefreshToken",
	},
	PAGINATION: {
		DEFAULT_PAGE: 1,
		DEFAULT_LIMIT: 10,
		MAX_LIMIT: 50,
	},
	REFRESH_COOKIE_DAYS_FALLBACK: 7,
} as const;
