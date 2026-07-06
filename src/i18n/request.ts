/**
 * Per-request i18n config. Resolves the active locale from the matched
 * `[locale]` segment, falls back to the default when unsupported, and loads the
 * matching message bundle for server rendering.
 */
import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";

import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
