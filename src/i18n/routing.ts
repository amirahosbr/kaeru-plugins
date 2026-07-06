/**
 * i18n routing config — the single source of truth for supported locales.
 * Consumed by the proxy, the request config, and the navigation wrappers.
 */
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "ja"],
  defaultLocale: "en",
});

export type Locale = (typeof routing.locales)[number];
