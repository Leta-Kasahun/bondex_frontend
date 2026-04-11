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
		BUSINESSES: "/businesses",
		LEADS: "/leads",
		LEAD_DETAIL: (id: string) => `/leads/${id}`,
		DEALS: "/deals",
		NOTIFICATIONS: "/notifications",
		SETTINGS: {
			PROFILE: "/settings/profile",
			BUSINESS: "/settings/business",
			INTEGRATIONS: {
				BASE: "/settings/integrations",
				TELEGRAM: "/settings/integrations/telegram",
				GMAIL: "/settings/integrations/gmail",
				WEBFORM: "/settings/integrations/webform",
			},
		},
		ADMIN: {
			DASHBOARD: "/admin/dashboard",
			USERS: "/admin/users",
			SYSTEM: "/admin/system",
			SECURITY: "/admin/security",
			NOTIFICATIONS: "/admin/notifications",
			SETTINGS: "/admin/settings",
		},
		ADMIN_DASHBOARD: "/admin/dashboard",
	},
	PUBLIC: {
		HOME: "/",
		BUSINESS_DETAIL: (id: string) => `/business/${id}`,
	},
} as const;
