import { NextRequest, NextResponse } from "next/server";
import { APP_CONSTANTS } from "./constants/config";

const USER_COOKIE = APP_CONSTANTS.AUTH_COOKIE_NAME.USER_REFRESH;
const ADMIN_COOKIE = APP_CONSTANTS.AUTH_COOKIE_NAME.ADMIN_REFRESH;

const isPath = (pathname: string, route: string): boolean =>
	pathname === route || pathname.startsWith(`${route}/`);

const PUBLIC_ROUTES = ["/", "/ai", "/public", "/business"];
const AUTH_ROUTES = ["/login", "/register", "/forgot-password", "/admin/login"];
const USER_ROUTES = ["/dashboard", "/users", "/leads", "/deals", "/notifications", "/settings"];
const ADMIN_ROUTES = ["/admin/dashboard"];

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	const hasUserSession = Boolean(request.cookies.get(USER_COOKIE)?.value);
	const hasAdminSession = Boolean(request.cookies.get(ADMIN_COOKIE)?.value);
	const isAuthenticated = hasUserSession || hasAdminSession;

	if (isPath(pathname, "/dashboard")) {
		if (hasAdminSession) {
			return NextResponse.redirect(new URL("/admin/dashboard", request.url));
		}

		if (hasUserSession) {
			return NextResponse.redirect(new URL("/users", request.url));
		}

		return NextResponse.redirect(new URL("/login", request.url));
	}

	if (PUBLIC_ROUTES.some((route) => isPath(pathname, route))) {
		return NextResponse.next();
	}

	if (AUTH_ROUTES.some((route) => isPath(pathname, route))) {
		if (!isAuthenticated) {
			return NextResponse.next();
		}

		if (hasAdminSession) {
			return NextResponse.redirect(new URL("/admin/dashboard", request.url));
		}

		return NextResponse.redirect(new URL("/users", request.url));
	}

	if (ADMIN_ROUTES.some((route) => isPath(pathname, route))) {
		if (hasAdminSession) {
			return NextResponse.next();
		}

		if (hasUserSession) {
			return NextResponse.redirect(new URL("/users", request.url));
		}

		return NextResponse.redirect(new URL("/admin/login", request.url));
	}

	if (USER_ROUTES.some((route) => isPath(pathname, route))) {
		if (hasUserSession || hasAdminSession) {
			return NextResponse.next();
		}

		return NextResponse.redirect(new URL("/login", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
