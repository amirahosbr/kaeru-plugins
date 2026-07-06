/**
 * Locale-aware navigation wrappers. Import `Link`, `redirect`, `usePathname`,
 * `useRouter`, and `getPathname` from here instead of `next/navigation` so the
 * active locale prefix is handled automatically.
 */
import { createNavigation } from "next-intl/navigation";

import { routing } from "./routing";

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
