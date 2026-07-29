"use client";

import { m, useReducedMotion } from "motion/react";

export interface CertificationCardProps {
  title: string;
  issuer: string;
  issued: string;
  expires: string;
  credentialId: string;
  verifyUrl: string;
}

const hoverTransition = { duration: 0.3 };

export default function CertificationCard({
  title,
  issuer,
  issued,
  expires,
  credentialId,
  verifyUrl,
}: CertificationCardProps) {
  const prefersReducedMotion = useReducedMotion();

  const motionProps = prefersReducedMotion
    ? {}
    : {
        whileHover: { scale: 1.02 },
        whileTap: { scale: 0.98, transition: { duration: 0.1 } },
        transition: hoverTransition,
      };

  return (
    <m.a
      href={verifyUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block origin-center cursor-pointer overflow-hidden rounded-xl border-1 border-[var(--border)] bg-[var(--card)] p-4 transition-[border-color,box-shadow] duration-300 ease-out hover:border-[color-mix(in_srgb,var(--accent-sage)_45%,var(--border))] hover:shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_color-mix(in_srgb,var(--accent-sage)_18%,transparent)]"
      aria-label={`View credential: ${title}`}
      {...motionProps}
    >
      {/* Rising-sun sage glow — same treatment as ExperienceCard */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[140%] opacity-25 transition-opacity duration-300 ease-out group-hover:opacity-100 motion-reduce:transition-none motion-reduce:group-hover:opacity-25"
        style={{
          background:
            "radial-gradient(ellipse 95% 90% at 50% 100%, color-mix(in srgb, var(--accent-sage) 58%, transparent) 0%, color-mix(in srgb, var(--accent-sage) 28%, transparent) 38%, color-mix(in srgb, var(--accent-sage) 10%, transparent) 62%, transparent 78%)",
        }}
      />

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
