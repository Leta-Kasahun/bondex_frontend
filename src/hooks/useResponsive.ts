"use client";

import { useMediaQuery } from "./useMediaQuery";

export const useResponsive = () => {
	const isSmUp = useMediaQuery("(min-width: 640px)");
	const isMdUp = useMediaQuery("(min-width: 768px)");
	const isLgUp = useMediaQuery("(min-width: 1024px)");
	const isXlUp = useMediaQuery("(min-width: 1280px)");

	return {
		isMobile: !isMdUp,
		isTablet: isMdUp && !isLgUp,
		isDesktop: isLgUp,
		isSmUp,
		isMdUp,
		isLgUp,
		isXlUp,
	};
};
