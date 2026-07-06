/**
 * ThemeProvider — wraps the app in `next-themes` so `.dark` is toggled on
 * <html> (class strategy, matching the `@custom-variant dark` in globals.css).
 * Client component; mounted once in the root layout.
 */
"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

type ThemeProviderProps = React.ComponentProps<typeof NextThemesProvider>;

export const ThemeProvider = ({
  children,
  ...props
}: ThemeProviderProps): React.JSX.Element => (
  <NextThemesProvider {...props}>{children}</NextThemesProvider>
);
