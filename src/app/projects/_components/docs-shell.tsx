"use client";

import { Dialog } from "@base-ui/react/dialog";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/app/components/ThemeToggle";
import "../docs.css";

type DocsShellProps = {
  section: string;
  sectionHref: string;
  nav: React.ReactNode;
  children: React.ReactNode;
};

function MenuIcon() {
  return (
    <svg
      aria-hidden
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      aria-hidden
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function DocsShell({
  section,
  sectionHref,
  nav,
  children,
}: DocsShellProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <div className="projects-docs min-h-dvh">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-2 border-b border-[var(--docs-border)] bg-[var(--docs-bg)] px-3 md:px-5">
          <Dialog.Trigger
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-[var(--docs-text)] transition-[background-color,transform] duration-150 hover:bg-[var(--docs-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--docs-accent)] active:scale-[0.96] md:hidden"
            aria-label="Open navigation"
          >
            <MenuIcon />
          </Dialog.Trigger>

          <Link
            href="/"
            className="inline-flex min-h-10 items-center rounded-lg px-2 text-sm font-semibold tracking-tight text-[var(--docs-text)] transition-colors duration-150 hover:text-[var(--docs-accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--docs-accent)]"
          >
            Aniket
          </Link>
          <span aria-hidden className="text-[var(--docs-muted)]">
            /
          </span>
          <Link
            href={sectionHref}
            className="inline-flex min-h-10 items-center rounded-lg px-1 text-sm text-[var(--docs-muted)] transition-colors duration-150 hover:text-[var(--docs-text)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--docs-accent)]"
          >
            {section}
          </Link>

          <div className="ml-auto">
            <ThemeToggle />
          </div>
        </header>

        <div className="mx-auto flex w-full max-w-[90rem]">
          <aside className="sticky top-14 hidden h-[calc(100dvh-3.5rem)] w-72 shrink-0 border-r border-[var(--docs-border)] md:block">
            {nav}
          </aside>
          <main className="min-w-0 flex-1">
            <div className="mx-auto w-full max-w-3xl px-5 py-10 md:px-10 md:py-12">
              {children}
            </div>
          </main>
        </div>
      </div>

      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-40 bg-black/50 transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 md:hidden" />
        <Dialog.Popup className="projects-docs fixed top-0 left-0 z-50 flex h-dvh w-[min(100%,18rem)] flex-col border-r border-[var(--docs-border)] outline-none transition-[transform,opacity] duration-200 ease-[cubic-bezier(0.2,0,0,1)] data-ending-style:-translate-x-3 data-ending-style:opacity-0 data-starting-style:-translate-x-3 data-starting-style:opacity-0 md:hidden">
          <Dialog.Title className="sr-only">{section} navigation</Dialog.Title>
          <Dialog.Description className="sr-only">
            Browse {section.toLowerCase()}.
          </Dialog.Description>
          <div className="flex h-14 shrink-0 items-center justify-between border-b border-[var(--docs-border)] px-2">
            <p className="px-2 text-sm font-semibold">{section}</p>
            <Dialog.Close
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg transition-[background-color,transform] duration-150 hover:bg-[var(--docs-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--docs-accent)] active:scale-[0.96]"
              aria-label="Close navigation"
            >
              <CloseIcon />
            </Dialog.Close>
          </div>
          {nav}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
