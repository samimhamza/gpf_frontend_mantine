import { chain } from "@/middlewares/chain";
import { authMiddleware } from "@/middlewares/authMiddleware";
import { i18nMiddleware } from "@/middlewares/i18nMiddleware";

export default chain([authMiddleware, i18nMiddleware]);

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)"],
	// "/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"
	// "/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)"
};
