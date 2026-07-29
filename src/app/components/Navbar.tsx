"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import GradientText from "./ui-components/GradientText";
import { ThemeToggle } from "./ThemeToggle";

type NavItem = {
  href: string;
  label: string;
  external?: boolean;
  accent?: boolean;
};

const navItems: NavItem[] = [
  { href: "/wall", label: "wall" },
  { href: "/projects", label: "projects" },
  { href: "https://blogs.aniketdhakane.xyz", label: "blog", external: false },
  { href: "/aniketdhakane.pdf", label: "resume", accent: true },
];

const springHover = { type: "spring" as const, stiffness: 400, damping: 12 };
const menuTransition = { type: "spring" as const, duration: 0.3, bounce: 0 };
const iconTransition = { type: "spring" as const, duration: 0.3, bounce: 0 };

function MenuIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

function DesktopNavLink({ item }: { item: NavItem }) {
  const prefersReducedMotion = useReducedMotion();
  const motionProps = prefersReducedMotion
    ? {}
    : {
        whileHover: { scale: 1.12 },
        whileTap: { scale: 0.96 },
        transition: springHover,
      };

  if (item.accent) {
    return (
      <m.div
        {...motionProps}
        className="cursor-pointer border border-[var(--border)] rounded-xl px-2 bg-[var(--nav-accent)] text-lg"
      >
        <GradientText
          colors={[
            "var(--accent-sage)",
            "var(--accent-blue)",
            "var(--accent-sage)",
            "var(--accent-blue)",
            "var(--accent-sage)",
          ]}
          animationSpeed={3}
          showBorder={false}
          className="custom-class"
        >
          <Link href={item.href}>{item.label}</Link>
        </GradientText>
      </m.div>
    );
  }

  return (
    <Link
      href={item.href}
      {...(item.external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
    >
      <m.p
        className="border px-4 border-[var(--border)] rounded-xl hover:bg-[var(--surface-hover)] cursor-pointer text-lg"
        {...motionProps}
      >
        {item.label}
      </m.p>
    </Link>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const menuId = useId();
  const rootRef = useRef<HTMLDivElement>(null);

  // Close on outside click / Escape
  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;
      if (rootRef.current && target && !rootRef.current.contains(target)) {
        setOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  // Close if viewport grows to desktop
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => {
      if (mq.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <div
      ref={rootRef}
      className="relative flex w-full items-center justify-end gap-2 py-4 text-sm md:gap-4 md:p-6"
    >
      {/* Desktop chips */}
      <nav
        aria-label="Primary"
        className="hidden items-center gap-4 md:flex"
      >
        {navItems.map((item) => (
          <DesktopNavLink key={item.href} item={item} />
        ))}
      </nav>

      <ThemeToggle />

      {/* Mobile menu toggle */}
      <m.button
        type="button"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[var(--foreground)] hover:bg-[var(--surface-hover)] md:hidden"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((v) => !v)}
        whileHover={prefersReducedMotion ? undefined : { scale: 1.08 }}
        whileTap={prefersReducedMotion ? undefined : { scale: 0.96 }}
        transition={{ type: "spring", stiffness: 400, damping: 18 }}
      >
        <span className="relative flex h-5 w-5 items-center justify-center">
          <AnimatePresence mode="popLayout" initial={false}>
            <m.span
              key={open ? "close" : "menu"}
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
              className="absolute inset-0 flex items-center justify-center"
            >
              {open ? <CloseIcon /> : <MenuIcon />}
            </m.span>
          </AnimatePresence>
        </span>
      </m.button>

      {/* Mobile dropdown */}
      <AnimatePresence initial={false}>
        {open && (
          <m.nav
            id={menuId}
            aria-label="Mobile"
            initial={
              prefersReducedMotion
                ? { opacity: 1 }
                : { opacity: 0, y: -8, filter: "blur(4px)" }
            }
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, y: -8, filter: "blur(4px)" }
            }
            transition={
              prefersReducedMotion
                ? { duration: 0.12 }
                : menuTransition
            }
            className="absolute top-full right-0 z-50 mt-1 w-52 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] p-1.5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_32px_rgba(0,0,0,0.08)] md:hidden"
          >
            <ul className="flex flex-col gap-0.5">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    {...(item.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    onClick={() => setOpen(false)}
                    className={[
                      "flex min-h-10 items-center rounded-xl px-3 text-base transition-[background-color] duration-200 ease-out",
                      item.accent
                        ? "bg-[var(--nav-accent)] font-medium text-[var(--accent-sage)]"
                        : "text-[var(--foreground)] hover:bg-[var(--surface-hover)]",
                    ].join(" ")}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </m.nav>
        )}
      </AnimatePresence>
    </div>
  );
}
