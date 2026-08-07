"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  /** False until after mount — use to avoid theme-dependent SSR mismatches */
  mounted: boolean;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const STORAGE_KEY = "theme";

const ThemeContext = createContext<ThemeContextValue | null>(null);

function isTheme(value: string | null | undefined): value is Theme {
  return value === "light" || value === "dark";
}

function getSystemTheme(): Theme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

/** Explicit user choice, or system when nothing is stored. */
export function resolveTheme(): Theme {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (isTheme(stored)) return stored;
  } catch {
    // private mode / blocked storage
  }
  return getSystemTheme();
}

export function applyTheme(theme: Theme, { persist }: { persist: boolean }) {
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(theme);
  root.setAttribute("data-theme", theme);
  root.style.colorScheme = theme;

  if (!persist) return;
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // private mode / blocked storage
  }
}

/**
 * Runs before paint. Uses saved preference if present, otherwise system
 * prefers-color-scheme (never forces light).
 */
export const themeInitScript = `(function(){try{var k=${JSON.stringify(STORAGE_KEY)};var t=localStorage.getItem(k);if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";}var r=document.documentElement;r.classList.remove("light","dark");r.classList.add(t);r.setAttribute("data-theme",t);r.style.colorScheme=t;}catch(e){}})();`;

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Fixed SSR default — never read window/localStorage during useState init
  const [theme, setThemeState] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    applyTheme(next, { persist: true });
  }, []);

  const toggleTheme = useCallback(() => {
    // Read the applied DOM theme so an early click (before state sync) stays correct
    const current =
      typeof document !== "undefined" &&
      document.documentElement.getAttribute("data-theme") === "dark"
        ? "dark"
        : typeof document !== "undefined" &&
            document.documentElement.getAttribute("data-theme") === "light"
          ? "light"
          : theme;
    const next: Theme = current === "light" ? "dark" : "light";
    setThemeState(next);
    applyTheme(next, { persist: true });
  }, [theme]);

  useEffect(() => {
    const resolved = resolveTheme();
    setThemeState(resolved);
    // Re-apply without overwriting storage when following system default
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      applyTheme(resolved, { persist: isTheme(stored) });
    } catch {
      applyTheme(resolved, { persist: false });
    }
    setMounted(true);

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onSystemChange = () => {
      try {
        // Only track the OS while the user has not picked a theme
        if (isTheme(localStorage.getItem(STORAGE_KEY))) return;
      } catch {
        return;
      }
      const next = media.matches ? "dark" : "light";
      setThemeState(next);
      applyTheme(next, { persist: false });
    };
    media.addEventListener("change", onSystemChange);

    const onStorage = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY) return;
      if (event.newValue === null) {
        const next = getSystemTheme();
        setThemeState(next);
        applyTheme(next, { persist: false });
        return;
      }
      if (!isTheme(event.newValue)) return;
      setThemeState(event.newValue);
      applyTheme(event.newValue, { persist: false });
    };
    window.addEventListener("storage", onStorage);

    return () => {
      media.removeEventListener("change", onSystemChange);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  // Press "T" to toggle theme (site-wide; ignore typing + modifier combos)
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (event.key !== "t" && event.key !== "T") return;

      const target = event.target;
      if (target instanceof HTMLElement) {
        const tag = target.tagName;
        if (
          tag === "INPUT" ||
          tag === "TEXTAREA" ||
          tag === "SELECT" ||
          target.isContentEditable
        ) {
          return;
        }
      }

      event.preventDefault();
      toggleTheme();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [toggleTheme]);

  const value = useMemo(
    () => ({ theme, mounted, setTheme, toggleTheme }),
    [theme, mounted, setTheme, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}
