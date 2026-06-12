"use client";

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
      className={`relative w-80 h-48 flex-shrink-0 border-[var(--border)] ${isVisualRight ? "rounded-r-xl border-l-1" : "rounded-l-xl border-r-1"} overflow-hidden self-start group`}
    >
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
    </div>
  ) : null;

  const detailsBox = (
    <div className="flex-1 rounded-xl p-6">
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
    <div className="bg-[var(--card)] border-1 border-[var(--border)] rounded-xl">
      <div className="flex gap-4 items-start">
        {isVisualRight ? (
          <>
            {detailsBox}
            {visualBox}
          </>
        ) : (
          <>
            {visualBox}
            {detailsBox}
          </>
        )}
      </div>
    </div>
  );
}
