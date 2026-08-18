"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { m, useReducedMotion } from "motion/react";
import {
  CardHoverFx,
  cardHoverFxClassName,
  cardHoverShadowClassName,
  cardSpotHandlers,
} from "./CardHoverFx";

export interface ExperienceCardProps {
  title: string;
  role: string;
  timeFrom: string;
  timeTo: string;
  image?: string;
  link?: string;
  visualSide?: "left" | "right";
}

const hoverTransition = { duration: 0.15, ease: "easeOut" as const };

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

  const body: ReactNode = (
    <>
      <CardHoverFx />
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

  const motionProps = {
    ...cardSpotHandlers(!prefersReducedMotion),
    ...(prefersReducedMotion
      ? {}
      : {
          whileTap: isClickable ? { scale: 0.96 } : undefined,
          transition: hoverTransition,
        }),
  };

  const className = [
    "group relative block origin-center overflow-hidden rounded-xl border-1 border-[var(--border)] bg-[var(--card)]",
    cardHoverFxClassName,
    isClickable
      ? `cursor-pointer ${cardHoverShadowClassName}`
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
