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
      className="block p-4 rounded-xl border border-gray-800 hover:border-gray-700 hover:bg-neutral-950/50 transition-all duration-200 group"
    >
      <div className="flex flex-col gap-1.5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold text-base leading-tight group-hover:text-white transition-colors">
            {title}
          </h3>
          <span className="text-[10px] uppercase tracking-[1px] text-emerald-400 font-mono shrink-0 pt-0.5">
            Verified
          </span>
        </div>

        <p className="text-sm text-neutral-400">{issuer}</p>

        <div className="flex flex-wrap items-center gap-x-2 text-xs text-neutral-500 mt-0.5">
          <span>
            Issued {issued} · Expires {expires}
          </span>
          <span className="text-neutral-700">•</span>
          <span className="font-mono">ID: {credentialId}</span>
        </div>

        <div className="mt-1 text-xs text-emerald-400 group-hover:underline flex items-center gap-1">
          View credential
          <span aria-hidden="true">↗</span>
        </div>
      </div>
    </a>
  );
}
