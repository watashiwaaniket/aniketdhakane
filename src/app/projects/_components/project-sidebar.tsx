"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Project } from "@/lib/projects/project-types";
import { groupProjectsByCategory } from "@/lib/projects/project-utils";
import { NotesThemeToggle } from "./notes-theme-toggle";
import { ProjectListItem } from "./project-list-item";

type ProjectSidebarProps = {
  projects: Project[];
  activeSlug?: string;
};

export function ProjectSidebar({ projects, activeSlug }: ProjectSidebarProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return projects;

    return projects.filter(
      (project) =>
        project.title.toLowerCase().includes(normalized) ||
        project.preview.toLowerCase().includes(normalized) ||
        project.category.toLowerCase().includes(normalized) ||
        project.status.toLowerCase().includes(normalized) ||
        project.stack.some((item) => item.toLowerCase().includes(normalized)),
    );
  }, [projects, query]);

  const groups = groupProjectsByCategory(filtered);

  return (
    <aside className="notes-sidebar-bg flex h-full min-h-0 flex-col">
      <header className="notes-border-b shrink-0 px-4 pb-3 pt-5">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <Link
                href="/"
                className="notes-muted text-[13px] transition-colors duration-150 hover:text-[var(--notes-accent)]"
              >
                ← Home
              </Link>
            </div>
            <h1 className="notes-text mt-1 text-[22px] font-bold tracking-tight text-balance">
              Projects
            </h1>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="notes-muted text-[13px] tabular-nums">
              {projects.length}{" "}
              {projects.length === 1 ? "note" : "notes"}
            </span>
            <NotesThemeToggle />
          </div>
        </div>
        <label className="relative mt-3 block">
          <span className="sr-only">Search projects</span>
          <svg
            aria-hidden
            className="notes-muted pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"
            />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search"
            className="notes-search-input w-full rounded-lg py-2 pl-9 pr-3 text-[15px] shadow-[0_1px_2px_var(--notes-shadow-sm)] transition-[box-shadow,border-color] duration-150"
          />
        </label>
      </header>

      <nav className="min-h-0 flex-1 overflow-y-auto px-2 py-3">
        {groups.length === 0 ? (
          <p className="notes-muted px-3 py-8 text-center text-[15px]">
            No projects found
          </p>
        ) : (
          groups.map((group) => (
            <section key={group.label} className="mb-4">
              <h2 className="notes-muted px-3 pb-1 text-[13px] font-semibold uppercase tracking-wide">
                {group.label}
              </h2>
              <ul className="space-y-0.5">
                {group.projects.map((project) => (
                  <li key={project.slug}>
                    <ProjectListItem
                      project={project}
                      isActive={project.slug === activeSlug}
                    />
                  </li>
                ))}
              </ul>
            </section>
          ))
        )}
      </nav>
    </aside>
  );
}
