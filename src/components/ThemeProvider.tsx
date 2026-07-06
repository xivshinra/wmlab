"use client";

import * as React from "react";

type ThemeOption = "light" | "dark" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: ThemeOption;
  enableSystem?: boolean;
};

type ThemeContextValue = {
  theme: ThemeOption;
  resolvedTheme: "light" | "dark";
  setTheme: (theme: ThemeOption) => void;
};

const ThemeContext = React.createContext<ThemeContextValue | undefined>(
  undefined,
);
const STORAGE_KEY = "theme";
const COLOR_SCHEME_QUERY = "(prefers-color-scheme: dark)";

function getSystemTheme() {
  return window.matchMedia(COLOR_SCHEME_QUERY).matches ? "dark" : "light";
}

function applyTheme(theme: "light" | "dark") {
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(theme);
  root.style.colorScheme = theme;
}

function getStoredTheme(defaultTheme: ThemeOption) {
  try {
    const stored = localStorage.getItem(STORAGE_KEY) as ThemeOption | null;
    return stored ?? defaultTheme;
  } catch {
    return defaultTheme;
  }
}

function resolveTheme(theme: ThemeOption, enableSystem: boolean) {
  if (theme === "system") {
    return enableSystem ? getSystemTheme() : "light";
  }
  return theme;
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  enableSystem = true,
}: ThemeProviderProps) {
  const [theme, setThemeState] = React.useState<ThemeOption>(defaultTheme);
  const [resolvedTheme, setResolvedTheme] = React.useState<"light" | "dark">(
    defaultTheme === "system" ? "light" : defaultTheme,
  );

  React.useEffect(() => {
    const stored = getStoredTheme(defaultTheme);
    const nextResolved = resolveTheme(stored, enableSystem);
    setThemeState(stored);
    setResolvedTheme(nextResolved);
    applyTheme(nextResolved);
  }, [defaultTheme, enableSystem]);

  React.useEffect(() => {
    const nextResolved = resolveTheme(theme, enableSystem);
    setResolvedTheme(nextResolved);
    applyTheme(nextResolved);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // ignore write errors
    }
  }, [theme, enableSystem]);

  React.useEffect(() => {
    if (!enableSystem) return;

    const mediaQuery = window.matchMedia(COLOR_SCHEME_QUERY);
    const handleChange = (event: MediaQueryListEvent) => {
      if (theme !== "system") return;
      const nextResolved = event.matches ? "dark" : "light";
      setResolvedTheme(nextResolved);
      applyTheme(nextResolved);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme, enableSystem]);

  const setTheme = React.useCallback((nextTheme: ThemeOption) => {
    setThemeState(nextTheme);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
