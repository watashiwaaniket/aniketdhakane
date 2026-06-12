"use client";

import Link from "next/link";

export interface CertificationCardProps {
  title: string;
  issuer: string;
  issued: string;
  expires: string;
  credentialId: string;
  verifyUrl: string;
}

export default function CertificationCard({
  title,
  issuer,
  issued,
  expires,
  credentialId,
  verifyUrl,
}: CertificationCardProps) {
  return (
    <a
      href={verifyUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-4 rounded-xl border border-[var(--border)] hover:border-[var(--accent-sage)] hover:bg-[#f0f4ee] transition-all duration-200 group bg-[var(--card)]"
    >
      <div className="flex flex-col gap-1.5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold text-base leading-tight group-hover:text-[var(--foreground)] transition-colors">
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

        <div className="mt-1 text-xs text-[var(--accent-blue)] group-hover:underline flex items-center gap-1">
          View credential
          <span aria-hidden="true">↗</span>
        </div>
      </div>
    </a>
  );
}
