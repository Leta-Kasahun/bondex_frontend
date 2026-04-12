"use client";

import { Button } from "@/src/components/ui/button";
import { useCookieConsent } from "@/src/hooks";

export function CookieConsentBanner() {
	const { isVisible, acceptCookies, rejectCookies } = useCookieConsent();

	if (!isVisible) {
		return null;
	}

	return (
		<div className="fixed inset-x-0 bottom-3 z-70 px-3 md:px-4">
			<div className="mx-auto w-full max-w-7xl rounded-xl border border-primary/30 bg-linear-to-r from-primary/12 via-background/95 to-background/95 shadow-card-hover backdrop-blur-md">
				<div className="flex w-full flex-col gap-4 px-4 py-5 md:flex-row md:items-center md:justify-between md:px-6 md:py-5">
					<p className="text-sm leading-6 text-foreground">
					We use cookies to improve your experience, analytics, and security.
				</p>
					<div className="flex w-full gap-2 md:w-auto">
						<Button
							type="button"
							variant="outline"
							className="h-11 flex-1 border-primary/40 bg-background text-foreground hover:bg-primary/10 md:min-w-30 md:flex-none"
							onClick={rejectCookies}
						>
						Reject
					</Button>
						<Button
							type="button"
							className="h-11 flex-1 bg-primary text-primary-foreground hover:bg-primary/90 md:min-w-30 md:flex-none"
							onClick={acceptCookies}
						>
						Accept
					</Button>
					</div>
				</div>
			</div>
		</div>
	);
}