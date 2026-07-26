"use client";

import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { useTheme } from "./ThemeProvider";

function SunIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[18px] w-[18px]"
      aria-hidden
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[18px] w-[18px]"
      aria-hidden
    >
      <path d="M21 14.5A8.5 8.5 0 0 1 9.5 3 7 7 0 1 0 21 14.5z" />
    </svg>
  );
}

const iconTransition = { type: "spring" as const, duration: 0.3, bounce: 0 };

export function ThemeToggle() {
  const { theme, mounted, toggleTheme } = useTheme();
  const prefersReducedMotion = useReducedMotion();
  const isDark = theme === "dark";

  // Stable SSR + first client paint: no theme-specific labels/icons until mounted
  const label = !mounted
    ? "Toggle color theme"
    : isDark
      ? "Switch to light mode"
      : "Switch to dark mode";

  const title = !mounted ? "Theme" : isDark ? "Light mode" : "Dark mode";

  return (
    <m.button
      type="button"
      onClick={toggleTheme}
      disabled={!mounted}
      aria-label={label}
      title={title}
      whileHover={
        !mounted || prefersReducedMotion ? undefined : { scale: 1.12 }
      }
      whileTap={
        !mounted || prefersReducedMotion ? undefined : { scale: 0.96 }
      }
      transition={{ type: "spring", stiffness: 400, damping: 18 }}
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-[var(--foreground)] cursor-pointer hover:bg-[var(--surface-hover)] disabled:cursor-default"
    >
      <span className="relative flex h-5 w-5 items-center justify-center overflow-visible">
        {!mounted ? (
          // Neutral placeholder — matches server HTML, avoids icon mismatch
          <span
            className="h-[18px] w-[18px] rounded-full border border-[var(--border)] bg-[var(--surface-muted)]"
            aria-hidden
          />
        ) : (
          <AnimatePresence mode="popLayout" initial={false}>
            <m.span
              key={isDark ? "sun" : "moon"}
              initial={
                prefersReducedMotion
                  ? false
                  : { opacity: 0, scale: 0.25, filter: "blur(4px)" }
              }
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={
                prefersReducedMotion
                  ? undefined
                  : { opacity: 0, scale: 0.25, filter: "blur(4px)" }
              }
              transition={iconTransition}
              className="absolute inset-0 flex items-center justify-center text-[var(--accent-blue)]"
            >
              {isDark ? <SunIcon /> : <MoonIcon />}
            </m.span>
          </AnimatePresence>
        )}
      </span>
    </m.button>
  );
}
