"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/app/components/ThemeProvider";

function SunIcon() {
  return (
    <svg
      aria-hidden
      className="h-3.5 w-3.5 text-[var(--notes-toggle-icon)]"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <circle cx="12" cy="12" r="4" />
      <path
        strokeLinecap="round"
        d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      aria-hidden
      className="h-3.5 w-3.5 text-[var(--notes-toggle-icon)]"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M12.1 2.2a9 9 0 107.7 14.1A7 7 0 0112.1 2.2z" />
    </svg>
  );
}

/** Notes-styled toggle wired to the portfolio theme. */
export function NotesThemeToggle() {
  const { theme, mounted, toggleTheme } = useTheme();
  const [animateIcons, setAnimateIcons] = useState(false);
  const isDark = theme === "dark";

  useEffect(() => {
    if (!mounted) return;
    const frame = requestAnimationFrame(() => setAnimateIcons(true));
    return () => cancelAnimationFrame(frame);
  }, [mounted]);

  if (!mounted) {
    return (
      <div
        aria-hidden
        className="theme-toggle h-[31px] w-[51px] shrink-0 rounded-full"
      />
    );
  }

  const iconMotion = animateIcons
    ? "theme-toggle-icon"
    : "theme-toggle-icon-static";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggleTheme}
      className="theme-toggle relative h-[31px] w-[51px] shrink-0 rounded-full"
    >
      <span
        aria-hidden
        className={`theme-toggle-thumb absolute top-[2px] left-[2px] flex h-[27px] w-[27px] items-center justify-center rounded-full ${
          isDark ? "translate-x-[20px]" : "translate-x-0"
        }`}
      >
        <span className="relative flex items-center justify-center">
          <span
            className={`absolute inset-0 flex items-center justify-center ${iconMotion} ${
              isDark
                ? "scale-100 opacity-100 blur-0"
                : "scale-[0.25] opacity-0 blur-[4px]"
            }`}
          >
            <MoonIcon />
          </span>
          <span
            className={`flex items-center justify-center ${iconMotion} ${
              isDark
                ? "scale-[0.25] opacity-0 blur-[4px]"
                : "scale-100 opacity-100 blur-0"
            }`}
          >
            <SunIcon />
          </span>
        </span>
      </span>
    </button>
  );
}
