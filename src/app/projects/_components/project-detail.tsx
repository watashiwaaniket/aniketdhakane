import Link from "next/link";
import ReactMarkdown from "react-markdown";
import type { Project } from "@/lib/projects/project-types";
import { getAllProjects } from "@/lib/projects/projects";
import {
  formatProjectDate,
  getAdjacentProjects,
} from "@/lib/projects/project-utils";
import { ShareProjectButton } from "./share-project-button";

type ProjectDetailProps = {
  project: Project;
};

function NeighborLink({
  label,
  project,
  align,
}: {
  label: string;
  project?: Project;
  align: "start" | "end";
}) {
  if (!project) return <div />;

  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`flex min-h-16 flex-col justify-center rounded-xl border border-[var(--docs-border)] px-4 py-3 transition-[background-color] duration-150 hover:bg-[var(--docs-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--docs-accent)] ${
        align === "end" ? "items-end text-right" : "items-start"
      }`}
    >
      <span className="text-xs font-medium text-[var(--docs-muted)]">{label}</span>
      <span className="mt-0.5 text-sm font-medium text-balance">{project.title}</span>
    </Link>
  );
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  const { previous, next } = getAdjacentProjects(getAllProjects(), project.slug);

  return (
    <article>
      <p className="flex flex-wrap items-center gap-1.5 text-sm text-[var(--docs-muted)]">
        <Link
          href="/projects"
          className="transition-colors duration-150 hover:text-[var(--docs-text)]"
        >
          Projects
        </Link>
        <span aria-hidden>/</span>
        <span>{project.category}</span>
      </p>

      <div className="mt-3 flex items-start justify-between gap-4">
        <h1 className="min-w-0 text-4xl font-semibold tracking-tight text-balance">
          {project.title}
        </h1>
        <div className="flex shrink-0 items-center gap-1.5">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-[var(--docs-border)] pr-2.5 pl-3 text-sm font-medium transition-[background-color,transform] duration-150 hover:bg-[var(--docs-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--docs-accent)] active:scale-[0.96]"
            >
              Open
              <span aria-hidden className="text-xs">
                ↗
              </span>
            </a>
          )}
          <ShareProjectButton title={project.title} slug={project.slug} />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-[var(--docs-muted)]">
        <time dateTime={project.date} className="tabular-nums">
          {formatProjectDate(project.date, "long")}
        </time>
        <span aria-hidden>·</span>
        <span>{project.status}</span>
        {project.featured && (
          <>
            <span aria-hidden>·</span>
            <span className="text-[var(--docs-accent)]">Featured</span>
          </>
        )}
      </div>

      <ul className="mt-4 flex flex-wrap gap-2">
        {project.stack.map((item) => (
          <li
            key={item}
            className="rounded-md bg-[var(--docs-code-bg)] px-2 py-1 text-xs font-medium text-[var(--docs-muted)]"
          >
            {item}
          </li>
        ))}
      </ul>

      <div className="docs-prose mt-8 border-t border-[var(--docs-border)] pt-8">
        <ReactMarkdown>{project.content}</ReactMarkdown>
      </div>

      <nav
        aria-label="Adjacent projects"
        className="mt-12 grid grid-cols-2 gap-3 border-t border-[var(--docs-border)] pt-6"
      >
        <NeighborLink label="Previous" project={previous} align="start" />
        <NeighborLink label="Next" project={next} align="end" />
      </nav>
    </article>
  );
}
