/**
 * Next.js proxy (formerly `middleware.ts`, renamed in Next 16).
 * Delegates to next-intl so locale detection and prefixing run on every
 * matched request.
 */
import createMiddleware from "next-intl/middleware";

import { routing } from "@/i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Skip `/api`, `/trpc`, Next internals, and any path containing a dot.
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
