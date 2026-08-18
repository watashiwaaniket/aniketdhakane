"use client";

import { m, useReducedMotion } from "motion/react";
import {
  CardHoverFx,
  cardHoverFxClassName,
  cardHoverShadowClassName,
  cardSpotHandlers,
} from "./CardHoverFx";

export interface CertificationCardProps {
  title: string;
  issuer: string;
  issued: string;
  expires: string;
  credentialId: string;
  verifyUrl: string;
}

const hoverTransition = { duration: 0.15, ease: "easeOut" as const };

export default function CertificationCard({
  title,
  issuer,
  issued,
  expires,
  credentialId,
  verifyUrl,
}: CertificationCardProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <m.a
      href={verifyUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative block origin-center cursor-pointer overflow-hidden rounded-xl border-1 border-[var(--border)] bg-[var(--card)] p-4 ${cardHoverShadowClassName} ${cardHoverFxClassName}`}
      aria-label={`View credential: ${title}`}
      {...cardSpotHandlers(!prefersReducedMotion)}
      whileTap={prefersReducedMotion ? undefined : { scale: 0.96 }}
      transition={hoverTransition}
    >
      <CardHoverFx />

      <div className="relative z-10 flex flex-col gap-1.5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold text-base leading-tight text-balance text-[var(--foreground)]">
            {title}
          </h3>
          <span className="text-[10px] uppercase tracking-[1px] text-[var(--accent-sage)] font-mono shrink-0 pt-0.5">
            Verified
          </span>
        </div>

        <p className="text-sm text-[var(--text-muted)]">{issuer}</p>

        <div className="flex flex-wrap items-center gap-x-2 text-xs text-[var(--text-muted)] mt-0.5">
          <span>
            Issued {issued} · Expires {expires}
          </span>
          <span className="text-[#b0b8b2]">•</span>
          <span className="font-mono">ID: {credentialId}</span>
        </div>

        <div className="mt-1 flex items-center gap-1 text-xs text-[var(--accent-blue)] group-hover:underline">
          View credential
          <span aria-hidden="true">↗</span>
        </div>
      </div>
    </m.a>
  );
}
