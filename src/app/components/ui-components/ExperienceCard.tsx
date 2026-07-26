"use client";

import Image from "next/image";

export interface ExperienceCardProps {
  title: string;
  role: string;
  timeFrom: string;
  timeTo: string;
  image?: string;
  visualSide?: "left" | "right";
}

export default function ExperienceCard({
  title,
  role,
  timeFrom,
  timeTo,
  image,
  visualSide = "right",
}: ExperienceCardProps) {
  const isVisualRight = visualSide === "right";

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
    <div className="flex-1 rounded-2xl p-4 md:p-8">
      <h1 className="font-semibold text-lg tracking-tight text-[var(--foreground)]">
        {title}
      </h1>
      <p className="text-sm text-[var(--text-muted)] mt-0.5">{role}</p>
      <p className="text-xs text-[var(--text-muted)] mt-1.5">
        {timeFrom} — {timeTo}
      </p>

      <div className="mt-3 flex items-center gap-2 text-xs">
        <span className="px-2 py-0.5 rounded bg-[var(--surface-muted)] text-[var(--text-muted)]">
          {timeTo === "Present" ? "Current" : "Past"}
        </span>
        {title.includes("Myotrek") && (
          <a
            href="https://apps.apple.com/in/app/myotrek/id6747103153"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto inline-flex items-center gap-1 px-3 py-1 rounded bg-[var(--accent-blue)] text-white text-xs hover:brightness-95 transition"
          >
            View App
          </a>
        )}
      </div>
    </div>
  );

  return (
    <div className="bg-[var(--card)] border-1 border-[var(--border)] rounded-xl overflow-hidden">
      <div className="flex flex-col md:flex-row gap-4 items-start">
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
    </div>
  );
}