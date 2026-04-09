import { create } from "zustand";
import { clearAccessToken, setAccessToken } from "../lib/api/client";

export type AuthRole = "USER" | "ADMIN";

type AuthState = {
	accessToken: string | null;
	role: AuthRole | null;
	isAuthenticated: boolean;
	setAuth: (accessToken: string, role: AuthRole) => void;
	clearAuth: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
	accessToken: null,
	role: null,
	isAuthenticated: false,
	setAuth: (accessToken, role) => {
		setAccessToken(accessToken);
		set({ accessToken, role, isAuthenticated: true });
	},
	clearAuth: () => {
		clearAccessToken();
		set({ accessToken: null, role: null, isAuthenticated: false });
	},
}));
