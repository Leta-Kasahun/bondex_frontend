"use client";

import { type ReactNode, useEffect } from "react";
import { clearAccessToken, setAccessToken } from "../lib/api/client";
import { useAuthStore } from "../stores/useAuthStore";

type AuthProviderProps = {
	children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const accessToken = useAuthStore((state) => state.accessToken);

	useEffect(() => {
		if (accessToken) {
			setAccessToken(accessToken);
			return;
		}

		clearAccessToken();
	}, [accessToken]);

	return <>{children}</>;
};
