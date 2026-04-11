export const APP_ROUTES = {
	ROOT: "/",
	AUTH: {
		LOGIN: "/login",
		REGISTER: "/register",
		FORGOT_PASSWORD: "/forgot-password",
		RESET_PASSWORD: "/reset-password",
	},
	DASHBOARD: {
		HOME: "/users",
		USERS: "/users",
		LEADS: "/leads",
		LEAD_DETAIL: (id: string) => `/leads/${id}`,
		DEALS: "/deals",
		NOTIFICATIONS: "/notifications",
		SETTINGS: {
			PROFILE: "/settings/profile",
			BUSINESS: "/settings/business",
			INTEGRATIONS: {
				TELEGRAM: "/settings/integrations/telegram",
				GMAIL: "/settings/integrations/gmail",
				WEBFORM: "/settings/integrations/webform",
			},
		},
		ADMIN_DASHBOARD: "/admin/dashboard",
	},
	PUBLIC: {
		HOME: "/",
		BUSINESS_DETAIL: (id: string) => `/business/${id}`,
	},
} as const;
