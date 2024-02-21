import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

import { getToken } from "next-auth/jwt";
import { CustomMiddleware } from "./chain";
import { languages } from "@/app/i18n/settings";
import { protectedRoutes, DEFAULT_LOGIN_REDIRECT } from "@/routes";

function getProtectedRoutes(protectedPaths: string[], locales: Array<string>) {
	let protectedPathsWithLocale = [...protectedPaths];

	protectedPaths.forEach((route) => {
		locales.forEach(
			(locale) =>
				(protectedPathsWithLocale = [
					...protectedPathsWithLocale,
					`/${locale}${route}`,
				])
		);
	});

	return protectedPathsWithLocale;
}

export function authMiddleware(middleware: CustomMiddleware) {
	return async (request: NextRequest, event: NextFetchEvent) => {
		// Create a response object to pass down the chain
		const response = NextResponse.next();

		// const token = await getToken({ req: request });
		const secret = process.env.JWT_SECRET;
		const token = await getToken({
			req: request,
			secret: secret,
			cookieName: "next-auth.session-token",
		});

		// @ts-ignore
		request.nextauth = request.nextauth || {};
		// @ts-ignore
		request.nextauth.token = token;
		const pathname = request.nextUrl.pathname;

		const protectedPathsWithLocale = getProtectedRoutes(
			protectedRoutes,
			languages
		);

		if (!token && protectedPathsWithLocale.includes(pathname)) {
			const signInUrl = new URL("/auth/login", request.url);
			signInUrl.searchParams.set("callbackUrl", pathname);
			return NextResponse.redirect(signInUrl);
		}

		if (token && pathname.includes("/auth/login")) {
			const loginRedirectUrl = new URL(DEFAULT_LOGIN_REDIRECT, request.url);
			return NextResponse.redirect(loginRedirectUrl);
		}
		return middleware(request, event, response);
	};
}
