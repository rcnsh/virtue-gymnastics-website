import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes/dist/types";
import * as React from "react";

/**
 * Provides the theme for the application.
 *
 * @param children - The child components to be wrapped by the theme provider.
 * @param props - Additional props to be passed to the underlying NextThemesProvider component.
 * @returns The rendered NextThemesProvider component with the provided children.
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
	return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
