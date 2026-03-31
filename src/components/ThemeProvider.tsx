"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";

function Inner({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useTheme();
  const lastTriggerRef = React.useRef(0);

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const now = Date.now();

      // debounce (500ms)
      if (now - lastTriggerRef.current < 500) return;

      const target = e.target as HTMLElement;

      // ignore inputs / textarea / contenteditable
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }

      if (e.key === "t") {
        lastTriggerRef.current = now;
        setTheme(theme === "dark" ? "light" : "dark");
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [theme, setTheme]);

  return <>{children}</>;
}

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props}>
      <Inner>{children}</Inner>
    </NextThemesProvider>
  );
}
