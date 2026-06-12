"use client";

export interface ExperienceCardProps {
  title: string;
  role: string;
  timeFrom: string;
  timeTo: string;
  visualVideo?: string;
  visualSide?: "left" | "right";
}

export default function ExperienceCard({
  title,
  role,
  timeFrom,
  timeTo,
  visualVideo,
  visualSide = "right",
}: ExperienceCardProps) {
  const isVisualRight = visualSide === "right";

  const visualBox = visualVideo ? (
    <div
      className={`relative w-90 h-72 flex-shrink-0 ${isVisualRight ? "rounded-r-3xl" : "rounded-l-3xl"} overflow-hidden self-start`}
    >
      <video
        src={visualVideo}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
      />
    </div>
  ) : null;

  const detailsBox = (
    <div className="flex-1 rounded-2xl p-8">
      <h1 className="font-semibold text-lg tracking-tight text-[var(--foreground)]">
        {title}
      </h1>
      <p className="text-sm text-[var(--text-muted)] mt-0.5">{role}</p>
      <p className="text-xs text-[var(--text-muted)] mt-1.5">
        {timeFrom} — {timeTo}
      </p>

      <div className="mt-3 flex items-center gap-2 text-xs">
        <span className="px-2 py-0.5 rounded bg-[#e6ede5] text-[var(--text-muted)]">
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
    <div className="bg-[var(--card)] border-1 border-[var(--border)] rounded-3xl">
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
