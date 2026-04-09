export const API_ROUTES = {
	AUTH: {
		USER: {
			BASE: "/auth/user",
			REGISTER: "/auth/user/register",
			REGISTER_VERIFY_OTP: "/auth/user/register/verify-otp",
			GOOGLE_SIGNUP: "/auth/user/register/google-signup",
			LOGIN: "/auth/user/login",
			GOOGLE_LOGIN: "/auth/user/login/google",
			FORGOT_PASSWORD: "/auth/user/login/forgot-password",
			VERIFY_RESET_OTP: "/auth/user/login/verify-reset-otp",
			RESET_PASSWORD: "/auth/user/login/reset-password",
			LOGOUT: "/auth/user/logout",
		},
		ADMIN: {
			LOGIN: "/admin/auth/login",
			VERIFY_OTP: "/admin/auth/verify-otp",
			LOGOUT: "/admin/auth/logout",
		},
	},
	BUSINESSES: {
		BASE: "/businesses",
	},
	LEADS: {
		BASE: "/leads",
	},
	DEALS: {
		BASE: "/deals",
	},
	NOTIFICATIONS: {
		BASE: "/notifications",
	},
	AI: {
		BASE: "/ai",
	},
	USERS: {
		BASE: "/users",
		PROFILE: "/users/profile",
		STATS: "/users/stats",
		REQUEST_EMAIL_CHANGE: "/users/email/request",
		CONFIRM_EMAIL_CHANGE: "/users/email/confirm",
	},
	ADMIN: {
		BASE: "/admin",
	},
	TELEGRAM: {
		BASE: "/telegram",
	},
	GMAIL: {
		BASE: "/gmail",
	},
	PUBLIC: {
		BASE: "/public",
	},
} as const;
