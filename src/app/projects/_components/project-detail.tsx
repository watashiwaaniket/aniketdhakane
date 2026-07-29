import Link from "next/link";
import ReactMarkdown from "react-markdown";
import type { Project } from "@/lib/projects/project-types";
import { formatProjectDate } from "@/lib/projects/project-utils";
import { ShareProjectButton } from "./share-project-button";

type ProjectDetailProps = {
  project: Project;
  showBackButton?: boolean;
};

export function ProjectDetail({
  project,
  showBackButton = false,
}: ProjectDetailProps) {
  return (
    <article className="notes-surface-bg flex h-full min-h-0 flex-col">
      <header className="notes-border-b shrink-0 px-4 py-3 md:px-8 md:py-4">
        <div className="flex items-start gap-3">
          {showBackButton && (
            <Link
              href="/projects"
              className="notes-toolbar notes-toolbar-btn mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-[transform,background-color] duration-150 active:scale-[0.96] md:hidden"
              aria-label="Back to projects"
            >
              <svg
                aria-hidden
                className="h-5 w-5 text-[var(--notes-accent)]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </Link>
          )}

          <div className="flex min-w-0 flex-1 items-start justify-between gap-4">
            <div className="min-w-0">
              <h1 className="notes-text min-w-0 text-[28px] font-bold leading-tight tracking-tight text-balance md:text-[34px]">
                {project.title}
              </h1>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span className="notes-chip rounded-full px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide">
                  {project.status}
                </span>
                <span className="notes-chip rounded-full px-2 py-0.5 text-[11px] font-medium">
                  {project.category}
                </span>
                {project.stack.map((item) => (
                  <span
                    key={item}
                    className="notes-chip rounded-full px-2 py-0.5 text-[11px]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-3 pt-1 md:pt-2">
              <time
                dateTime={project.date}
                className="notes-muted hidden text-[13px] tabular-nums sm:block"
              >
                {formatProjectDate(project.date, "long")}
              </time>
              <div className="notes-toolbar relative flex items-center rounded-full p-0.5">
                {project.link && (
                  <>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="notes-toolbar-btn flex h-8 items-center gap-1 rounded-full px-2.5 text-[13px] font-medium text-[var(--notes-accent)] transition-transform duration-150 active:scale-[0.96]"
                    >
                      Open
                      <span aria-hidden>↗</span>
                    </a>
                    <div
                      aria-hidden
                      className="notes-toolbar-divider mx-0.5 h-4 w-px"
                    />
                  </>
                )}
                <ShareProjectButton
                  title={project.title}
                  slug={project.slug}
                />
              </div>
            </div>
          </div>
        </div>

        <time
          dateTime={project.date}
          className="notes-muted mt-2 block text-[13px] tabular-nums sm:hidden"
        >
          {formatProjectDate(project.date, "long")}
        </time>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-6 md:px-8 md:py-8">
        <div className="prose-notes mx-auto max-w-2xl">
          <ReactMarkdown>{project.content}</ReactMarkdown>
        </div>
      </div>
    </article>
  );
}
