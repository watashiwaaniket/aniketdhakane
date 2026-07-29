import Link from "next/link";
import type { Project } from "@/lib/projects/project-types";
import { formatProjectDate } from "@/lib/projects/project-utils";

type ProjectListItemProps = {
  project: Project;
  isActive: boolean;
};

export function ProjectListItem({ project, isActive }: ProjectListItemProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`notes-list-item block rounded-lg px-3 py-2.5 transition-colors duration-150 active:scale-[0.98] ${
        isActive ? "notes-list-item-active" : ""
      }`}
    >
      <div className="flex items-baseline justify-between gap-2">
        <div className="flex min-w-0 items-center gap-1.5">
          <h3 className="truncate text-[15px] font-semibold">{project.title}</h3>
          {project.featured && (
            <span className="notes-chip shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[var(--notes-accent)]">
              Featured
            </span>
          )}
        </div>
        <time
          dateTime={project.date}
          className="notes-muted shrink-0 text-[13px] tabular-nums"
        >
          {formatProjectDate(project.date)}
        </time>
      </div>
      <div className="mt-0.5 flex items-center gap-1.5">
        <span className="notes-muted shrink-0 text-[11px] font-medium uppercase tracking-wide">
          {project.status}
        </span>
        <span className="notes-muted text-[11px]" aria-hidden>
          ·
        </span>
        <p className="notes-muted min-w-0 truncate text-[13px] leading-snug">
          {project.preview}
        </p>
      </div>
    </Link>
  );
}
