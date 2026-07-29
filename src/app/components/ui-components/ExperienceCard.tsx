"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { m, useReducedMotion } from "motion/react";

export interface ExperienceCardProps {
  title: string;
  role: string;
  timeFrom: string;
  timeTo: string;
  image?: string;
  link?: string;
  visualSide?: "left" | "right";
}

const hoverTransition = { duration: 0.3 };

export default function ExperienceCard({
  title,
  role,
  timeFrom,
  timeTo,
  image,
  link,
  visualSide = "right",
}: ExperienceCardProps) {
  const isVisualRight = visualSide === "right";
  const isClickable = Boolean(link);
  const prefersReducedMotion = useReducedMotion();

  const visualBox = image ? (
    <div
      className={`relative w-full md:w-80 h-48 md:h-72 flex-shrink-0 overflow-hidden self-start rounded-2xl md:rounded-t-none ${isVisualRight ? "md:rounded-r-3xl" : "md:rounded-l-3xl"}`}
    >
      <Image
        src={image}
        alt={title}
        width={800}
        height={466}
        sizes="(max-width: 768px) 100vw, 320px"
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
  ) : null;

  const detailsBox = (
    <div className="relative z-10 flex-1 rounded-2xl p-4 md:p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h1 className="font-semibold text-lg tracking-tight text-balance text-[var(--foreground)]">
            {title}
          </h1>
          <p className="text-sm text-[var(--text-muted)] mt-0.5">{role}</p>
        </div>

        <div className="flex flex-col items-end gap-1.5 shrink-0 text-right">
          <p className="text-xs text-[var(--text-muted)] tabular-nums whitespace-nowrap">
            {timeFrom} — {timeTo}
          </p>
          <span className="px-2 py-0.5 rounded bg-[var(--surface-muted)] text-[var(--text-muted)] text-xs">
            {timeTo === "Present" ? "Current" : "Past"}
          </span>
        </div>
      </div>
    </div>
  );

  const sageGlow = (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[140%] opacity-25 transition-opacity duration-300 ease-out group-hover:opacity-100 motion-reduce:transition-none motion-reduce:group-hover:opacity-25"
      style={{
        background:
          "radial-gradient(ellipse 95% 90% at 50% 100%, color-mix(in srgb, var(--accent-sage) 58%, transparent) 0%, color-mix(in srgb, var(--accent-sage) 28%, transparent) 38%, color-mix(in srgb, var(--accent-sage) 10%, transparent) 62%, transparent 78%)",
      }}
    />
  );

  const body: ReactNode = (
    <>
      {sageGlow}
      <div className="relative z-10 flex flex-col md:flex-row gap-4 items-start">
        {isVisualRight ? (
          <>
            <div className="order-2 md:order-1 flex-1">{detailsBox}</div>
            <div className="order-1 md:order-2 w-full md:w-auto">{visualBox}</div>
          </>
        ) : (
          <>
            <div className="order-1 md:order-1 w-full md:w-auto">{visualBox}</div>
            <div className="order-2 md:order-2 flex-1">{detailsBox}</div>
          </>
        )}
      </div>
    </>
  );

  // Match Socials: Motion whileHover/whileTap instead of CSS scale transitions
  const motionProps = prefersReducedMotion
    ? {}
    : {
        whileHover: { scale: 1.02 },
        whileTap: isClickable
          ? { scale: 0.98, transition: { duration: 0.1 } }
          : undefined,
        transition: hoverTransition,
      };

  const className = [
    "group relative block origin-center overflow-hidden rounded-xl border-1 border-[var(--border)] bg-[var(--card)]",
    isClickable
      ? "cursor-pointer transition-[border-color,box-shadow] duration-300 ease-out hover:border-[color-mix(in_srgb,var(--accent-sage)_45%,var(--border))] hover:shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_color-mix(in_srgb,var(--accent-sage)_18%,transparent)]"
      : "cursor-default",
  ]
    .filter(Boolean)
    .join(" ");

  if (link) {
    return (
      <m.a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        aria-label={`Open ${title}`}
        {...motionProps}
      >
        {body}
      </m.a>
    );
  }

  return (
    <m.div className={className} {...motionProps}>
      {body}
    </m.div>
  );
}
