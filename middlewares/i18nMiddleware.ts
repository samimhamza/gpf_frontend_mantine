// i18nMiddleware.js
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import acceptLanguage from "accept-language";
import { fallbackLng, languages, cookieName } from "@/app/i18n/settings";
import { CustomMiddleware } from "./chain";

// Initialize accept-language with supported languages
acceptLanguage.languages(languages);

export function i18nMiddleware(middleware: CustomMiddleware) {
	return async (request: NextRequest, event: NextFetchEvent) => {
		const response = NextResponse.next();

		if (
			request.nextUrl.pathname.indexOf("icon") > -1 ||
			request.nextUrl.pathname.indexOf("chrome") > -1
		) {
			// return response;
			return middleware(request, event, response);
		}

		let lng = request.cookies.has(cookieName)
			? acceptLanguage.get(request.cookies.get(cookieName)?.value)
			: fallbackLng
			? fallbackLng
			: acceptLanguage.get(request.headers.get("Accept-Language"));

		// Redirect if lng in path is not supported
		if (
			!languages.some((loc) =>
				request.nextUrl.pathname.startsWith(`/${loc}`)
			) &&
			!request.nextUrl.pathname.startsWith("/_next")
		) {
			return NextResponse.redirect(
				new URL(`/${lng}${request.nextUrl.pathname}`, request.url)
			);
		}

		if (request.headers.has("referer")) {
			const refererUrl = new URL(request.headers.get("referer") || "");
			const lngInReferer = languages.find((l) =>
				refererUrl.pathname.startsWith(`/${l}`)
			);
			if (lngInReferer) {
				response.cookies.set(cookieName, lngInReferer);
			}
			// return response;
			return middleware(request, event, response);
		}

		return middleware(request, event, response);
	};
}
