"use client";

import { useSyncExternalStore } from "react";

export const useMediaQuery = (query: string): boolean => {
	return useSyncExternalStore(
		(onStoreChange) => {
			if (typeof window === "undefined") {
				return () => undefined;
			}

			const media = window.matchMedia(query);
			media.addEventListener("change", onStoreChange);

			return () => media.removeEventListener("change", onStoreChange);
		},
		() => (typeof window !== "undefined" ? window.matchMedia(query).matches : false),
		() => false
	);
};
