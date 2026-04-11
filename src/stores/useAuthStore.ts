import { create } from "zustand";
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

export const useAuthStore = create<AuthState>((set) => ({
	accessToken: null,
	role: null,
	name: null,
	email: null,
	avatar: null,
	isAuthenticated: false,
	setAuth: (accessToken, role, profile) => {
		setAccessToken(accessToken);
		set({
			accessToken,
			role,
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
}));
