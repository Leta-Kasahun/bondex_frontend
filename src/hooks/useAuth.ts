"use client";

import { useMemo } from "react";
import { APP_CONSTANTS } from "../constants/config";
import { type AuthRole, useAuthStore } from "../stores/useAuthStore";

export const useAuth = () => {
	const { accessToken, role, name, email, avatar, isAuthenticated, setAuth, clearAuth } = useAuthStore();

	return useMemo(
		() => ({
			accessToken,
			role,
			name,
			email,
			avatar,
			isAuthenticated,
			isAdmin: role === APP_CONSTANTS.AUTH_SUBJECT.ADMIN,
			isUser: role === APP_CONSTANTS.AUTH_SUBJECT.USER,
			requireRole: (requiredRole: AuthRole) => role === requiredRole,
			setAuth,
			clearAuth,
		}),
		[accessToken, role, name, email, avatar, isAuthenticated, setAuth, clearAuth]
	);
};
