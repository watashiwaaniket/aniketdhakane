"use client";

import Image from "next/image";

export interface ProjectCardProps {
  image: string;
  title: string;
  desc: string;
  link: string;
  visualSide?: "left" | "right";
}

export function ProjectCard({
  image,
  title,
  desc,
  link,
  visualSide = "right",
}: ProjectCardProps) {
  const isVisualRight = visualSide === "right";

  const visualBox = image ? (
    <div
      className={`relative w-full md:w-80 h-48 flex-shrink-0 border-[var(--border)] overflow-hidden self-start group rounded-t-xl md:rounded-t-none ${
        isVisualRight
          ? "md:rounded-r-xl md:border-l-1"
          : "md:rounded-l-xl md:border-r-1"
      }`}
    >
      <Image
        src={image}
        alt={title}
        width={800}
        height={466}
        sizes="(max-width: 768px) 100vw, 320px"
        className="w-full h-full object-cover outline outline-1 outline-[var(--image-outline)] group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
      />
    </div>
  ) : null;

  const detailsBox = (
    <div className="flex-1 rounded-xl p-4 md:p-6">
      <h1 className="font-semibold text-lg tracking-tight text-[var(--foreground)]">
        {title}
      </h1>
      <p className="text-sm text-[var(--text-muted)] mt-1">{desc}</p>

      <div className="mt-4">
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-[var(--accent-blue)] hover:underline transition"
        >
          View Project
        </a>
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
