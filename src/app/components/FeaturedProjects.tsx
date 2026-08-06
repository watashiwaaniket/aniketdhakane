"use client";

import Link from "next/link";
import { m, useReducedMotion } from "motion/react";
import { getProjectBySlug } from "@/lib/projects/projects";
import type { Project } from "@/lib/projects/project-types";

/** Home page only — explicit order, not the full projects catalog. */
const FEATURED_SLUGS = ["lfm", "liftw"] as const;

const hoverTransition = { duration: 0.3 };

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
      initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.55,
        delay: index * 0.08,
        ease: [0.21, 0.92, 0.25, 1],
      }}
    >
    <m.a
      href={href}
      {...(isExternal
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      className="group relative flex h-full min-w-0 flex-col origin-center cursor-pointer overflow-hidden rounded-xl border-1 border-[var(--border)] bg-[var(--card)] transition-[border-color,box-shadow] duration-300 ease-out hover:border-[color-mix(in_srgb,var(--accent-sage)_45%,var(--border))] hover:shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_color-mix(in_srgb,var(--accent-sage)_18%,transparent)]"
      aria-label={`Open ${project.title}`}
      whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
      whileTap={
        prefersReducedMotion
          ? undefined
          : { scale: 0.98, transition: { duration: 0.1 } }
      }
      transition={hoverTransition}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[140%] opacity-25 transition-opacity duration-300 ease-out group-hover:opacity-100 motion-reduce:transition-none motion-reduce:group-hover:opacity-25"
        style={{
          background:
            "radial-gradient(ellipse 95% 90% at 50% 100%, color-mix(in srgb, var(--accent-sage) 58%, transparent) 0%, color-mix(in srgb, var(--accent-sage) 28%, transparent) 38%, color-mix(in srgb, var(--accent-sage) 10%, transparent) 62%, transparent 78%)",
        }}
      />

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
