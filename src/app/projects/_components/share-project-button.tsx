"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type ShareProjectButtonProps = {
  title: string;
  slug: string;
};

function ShareIcon() {
  return (
    <svg
      aria-hidden
      className="h-[17px] w-[17px]"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 14V4" />
      <path d="M8.5 7.5 12 4l3.5 3.5" />
      <path d="M7 14h10a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      aria-hidden
      className="h-[17px] w-[17px]"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

const iconTransition =
  "transition-[opacity,transform,filter] duration-300 ease-[cubic-bezier(0.2,0,0,1)]";

const TOAST_VISIBLE_MS = 1600;
const TOAST_FADE_MS = 300;

function CopyToast({ visible }: { visible: boolean }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`pointer-events-none fixed bottom-8 left-1/2 z-50 -translate-x-1/2 rounded-full bg-[var(--notes-toast-bg)] px-4 py-2.5 text-[15px] font-medium text-[var(--notes-toast-text)] shadow-[0_4px_24px_var(--notes-shadow-lg)] backdrop-blur-sm transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.2,0,0,1)] ${
        visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
      }`}
    >
      Link copied
    </div>
  );
}

export function ShareProjectButton({ title, slug }: ShareProjectButtonProps) {
  const [status, setStatus] = useState<"idle" | "copied">("idle");
  const [toastMounted, setToastMounted] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [portalReady, setPortalReady] = useState(false);
  const timersRef = useRef<number[]>([]);
  const isCopied = status === "copied";

  useEffect(() => {
    setPortalReady(true);
    return () => {
      timersRef.current.forEach(clearTimeout);
    };
  }, []);

  function clearTimers() {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }

  function scheduleTimer(callback: () => void, delay: number) {
    const id = window.setTimeout(callback, delay);
    timersRef.current.push(id);
  }

  function showCopiedFeedback() {
    clearTimers();
    setStatus("copied");
    setToastMounted(true);
    setToastVisible(false);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => setToastVisible(true));
    });

    scheduleTimer(() => setToastVisible(false), TOAST_VISIBLE_MS);
    scheduleTimer(() => {
      setToastMounted(false);
      setStatus("idle");
    }, TOAST_VISIBLE_MS + TOAST_FADE_MS);
  }

  async function handleShare() {
    const url = `${window.location.origin}/projects/${slug}`;

    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ title, url });
        return;
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      showCopiedFeedback();
    } catch {
      window.prompt("Copy this link:", url);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={handleShare}
        aria-label={isCopied ? "Link copied" : "Share project"}
        className="notes-toolbar-btn relative flex h-8 w-8 items-center justify-center rounded-full transition-transform duration-150 ease-out before:absolute before:-inset-1 before:content-[''] active:scale-[0.96]"
      >
        <span className="relative flex h-[17px] w-[17px] items-center justify-center">
          <span
            className={`absolute inset-0 flex items-center justify-center ${iconTransition} ${
              isCopied
                ? "scale-[0.25] opacity-0 blur-[4px]"
                : "scale-100 opacity-100 blur-0"
            }`}
          >
            <ShareIcon />
          </span>
          <span
            className={`flex items-center justify-center ${iconTransition} ${
              isCopied
                ? "scale-100 opacity-100 blur-0"
                : "scale-[0.25] opacity-0 blur-[4px]"
            }`}
          >
            <CheckIcon />
          </span>
        </span>
      </button>

      {portalReady &&
        toastMounted &&
        createPortal(
          // class keeps notes toast tokens when portaled outside the shell
          <div className="projects-notes">
            <CopyToast visible={toastVisible} />
          </div>,
          document.body,
        )}
    </>
  );
}
