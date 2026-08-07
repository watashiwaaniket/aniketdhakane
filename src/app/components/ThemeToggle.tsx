"use client";

import { useCallback, useEffect, useState } from "react";
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
const tipSpring = { type: "spring" as const, duration: 0.45, bounce: 0.25 };

export function ThemeToggle() {
  const { theme, mounted, toggleTheme } = useTheme();
  const prefersReducedMotion = useReducedMotion();
  const isDark = theme === "dark";
  const [showTip, setShowTip] = useState(false);

  const dismissTip = useCallback(() => {
    setShowTip(false);
  }, []);

  // Every load: teach "press T" after a short settle delay
  useEffect(() => {
    if (!mounted) return;

    const showId = window.setTimeout(() => setShowTip(true), 700);
    const hideId = window.setTimeout(() => dismissTip(), 6500);

    return () => {
      window.clearTimeout(showId);
      window.clearTimeout(hideId);
    };
  }, [mounted, dismissTip]);

  // Dismiss when they actually use T (or any theme toggle via keyboard)
  useEffect(() => {
    if (!showTip) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "t" || event.key === "T") {
        dismissTip();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [showTip, dismissTip]);

  function handleToggle() {
    dismissTip();
    toggleTheme();
  }

  // Stable SSR + first client paint: no theme-specific labels/icons until mounted
  const label = !mounted
    ? "Toggle color theme"
    : isDark
      ? "Switch to light mode"
      : "Switch to dark mode";

  const title = !mounted
    ? "Theme (T)"
    : isDark
      ? "Light mode (T)"
      : "Dark mode (T)";

  return (
    <div className="relative inline-flex">
      <m.button
        type="button"
        onClick={handleToggle}
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

      {/* iMessage-style first-visit tip */}
      <AnimatePresence>
        {showTip && (
          <m.div
            role="status"
            initial={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, y: -6, scale: 0.92 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, y: -4, scale: 0.96 }
            }
            transition={prefersReducedMotion ? { duration: 0.15 } : tipSpring}
            className="pointer-events-auto absolute top-[calc(100%+8px)] right-0 z-50 w-max max-w-[min(220px,calc(100vw-2rem))]"
          >
            <button
              type="button"
              onClick={dismissTip}
              className="relative block w-full rounded-[18px] border border-[var(--border)] bg-[var(--card)] px-3.5 py-2.5 text-left shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.1)]"
            >
              {/* Tail pointing up toward the theme button */}
              <span
                aria-hidden
                className="absolute -top-[6px] right-3 h-3 w-3 rotate-45 border-l border-t border-[var(--border)] bg-[var(--card)]"
              />
              <p className="relative text-[13px] leading-snug text-[var(--foreground)] text-pretty">
                Press{" "}
                <kbd className="mx-0.5 inline-flex min-w-[1.35rem] items-center justify-center rounded-md border border-[var(--border)] bg-[var(--surface-muted)] px-1.5 py-0.5 font-mono text-[11px] font-semibold tabular-nums text-[var(--foreground)] shadow-[0_1px_0_rgba(0,0,0,0.06)]">
                  T
                </kbd>{" "}
                to toggle theme
              </p>
              <p className="relative mt-1 text-[11px] text-[var(--text-muted)]">
                Tap to dismiss
              </p>
            </button>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
