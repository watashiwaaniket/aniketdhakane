"use client";

import Link from "next/link";
import { m, useReducedMotion } from "motion/react";
import { getProjectBySlug } from "@/lib/projects/projects";
import type { Project } from "@/lib/projects/project-types";
import {
  CardHoverFx,
  cardHoverFxClassName,
  cardHoverShadowClassName,
  cardSpotHandlers,
} from "./ui-components/CardHoverFx";

/** Home page only — explicit order, not the full projects catalog. */
const FEATURED_SLUGS = ["lfm", "liftw"] as const;

const hoverTransition = { duration: 0.15, ease: "easeOut" as const };

function FeaturedProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const prefersReducedMotion = useReducedMotion();
  const href = project.link ?? `/projects/${project.slug}`;
  const isExternal = Boolean(project.link);

  return (
    <m.div
      className="h-full min-w-0"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.4,
        delay: index * 0.1,
        ease: [0.21, 0.92, 0.25, 1],
      }}
    >
    <m.a
      href={href}
      {...(isExternal
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      className={`group relative flex h-full min-w-0 flex-col origin-center cursor-pointer overflow-hidden rounded-xl border-1 border-[var(--border)] bg-[var(--card)] ${cardHoverShadowClassName} ${cardHoverFxClassName}`}
      aria-label={`Open ${project.title}`}
      {...cardSpotHandlers(!prefersReducedMotion)}
      whileTap={prefersReducedMotion ? undefined : { scale: 0.96 }}
      transition={hoverTransition}
    >
      <CardHoverFx />

      <div className="relative z-10 flex flex-col gap-2 p-4 md:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="font-semibold text-lg tracking-tight text-balance text-[var(--foreground)]">
              {project.title}
            </h2>
            <p className="mt-1 text-sm text-[var(--text-muted)] text-pretty line-clamp-2">
              {project.preview}
            </p>
          </div>
          <span className="shrink-0 text-xs text-[var(--accent-blue)] pt-1">
            {isExternal ? "Open ↗" : "Read →"}
          </span>
        </div>

        {project.stack.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {project.stack.slice(0, 4).map((item) => (
              <span
                key={item}
                className="rounded-md bg-[var(--surface-muted)] px-2 py-0.5 text-[11px] text-[var(--text-muted)]"
              >
                {item}
              </span>
            ))}
          </div>
        )}
      </div>
    </m.a>
    </m.div>
  );
}

export default function FeaturedProjects() {
  const projects = FEATURED_SLUGS.map((slug) => getProjectBySlug(slug)).filter(
    (project): project is Project => Boolean(project),
  );

  if (projects.length === 0) return null;

  return (
    <section className="pb-8">
      <div className="flex items-baseline justify-between gap-3 pb-2">
        <h1 className="text-md font-bold">Featured Projects</h1>
        <Link
          href="/projects"
          className="text-xs text-[var(--accent-blue)] hover:underline"
        >
          View all →
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 px-2 py-1.5 sm:grid-cols-2 sm:gap-5">
        {projects.map((project, index) => (
          <FeaturedProjectCard
            key={project.slug}
            project={project}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
