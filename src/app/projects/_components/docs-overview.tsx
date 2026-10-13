import Link from "next/link";
import type { Project } from "@/lib/projects/project-types";
import { groupProjectsForNav } from "@/lib/projects/project-utils";

type DocsOverviewProps = {
  projects: Project[];
};

export function DocsOverview({ projects }: DocsOverviewProps) {
  const groups = groupProjectsForNav(projects);

  return (
    <div>
      <h1 className="text-4xl font-semibold tracking-tight text-balance">
        Projects
      </h1>
      <p className="mt-3 max-w-2xl text-lg leading-relaxed text-[var(--docs-muted)] text-pretty">
        Write-ups for what I shipped: why it exists, the stack underneath, and
        what I would do differently.
      </p>

      {groups.map((group) => (
        <section key={group.label} className="mt-10">
          <h2 className="text-sm font-medium text-[var(--docs-text)]">
            {group.label}
          </h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {group.projects.map((project) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="block rounded-xl border border-[var(--docs-border)] bg-[var(--docs-card)] p-4 transition-[background-color] duration-150 hover:bg-[var(--docs-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--docs-accent)]"
              >
                <p className="text-xs font-medium text-[var(--docs-muted)]">
                  {project.status}
                  {project.featured ? " · Featured" : ""}
                </p>
                <h3 className="mt-1 text-base font-medium text-balance">
                  {project.title}
                </h3>
                <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-[var(--docs-muted)] text-pretty">
                  {project.preview}
                </p>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
