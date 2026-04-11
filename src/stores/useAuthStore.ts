import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { clearAccessToken, setAccessToken } from "../lib/api/client";

export type AuthRole = "USER" | "ADMIN";

type AuthProfile = {
	name?: string | null;
	email?: string | null;
	avatar?: string | null;
};

type AuthState = {
	accessToken: string | null;
	role: AuthRole | null;
	name: string | null;
	email: string | null;
	avatar: string | null;
	isAuthenticated: boolean;
	setAuth: (accessToken: string, role: AuthRole, profile?: AuthProfile) => void;
	clearAuth: () => void;
};

const normalizeRole = (role: string | null | undefined): AuthRole | null => {
	if (role === "USER" || role === "user") {
		return "USER";
	}

	if (role === "ADMIN" || role === "admin") {
		return "ADMIN";
	}

	return null;
};

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			accessToken: null,
			role: null,
			name: null,
			email: null,
			avatar: null,
			isAuthenticated: false,
			setAuth: (accessToken, role, profile) => {
				const normalizedRole = normalizeRole(role);
				setAccessToken(accessToken);
				set({
					accessToken,
					role: normalizedRole,
					name: profile?.name ?? null,
					email: profile?.email ?? null,
					avatar: profile?.avatar ?? null,
					isAuthenticated: true,
				});
			},
			clearAuth: () => {
				clearAccessToken();
				set({ accessToken: null, role: null, name: null, email: null, avatar: null, isAuthenticated: false });
			},
		}),
		{
			name: "bondex-auth",
			storage: createJSONStorage(() => localStorage),
			onRehydrateStorage: () => (state) => {
				const token = state?.accessToken ?? null;
				const role = normalizeRole(state?.role ?? null);

				if (token) {
					setAccessToken(token);
				} else {
					clearAccessToken();
				}

				if (state) {
					state.role = role;
					state.isAuthenticated = Boolean(token);
				}
			},
		}
	)
);
