import type { Metadata } from "next";
import { getAllProjects } from "@/lib/projects/projects";
import { DocsNav } from "./_components/docs-nav";
import { DocsShell } from "./_components/docs-shell";

export const metadata: Metadata = {
  title: "Projects — Aniket Dhakane",
  description:
    "Project documentation — write-ups, stack, and notes on what shipped.",
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DocsShell
      section="Projects"
      sectionHref="/projects"
      nav={<DocsNav projects={getAllProjects()} />}
    >
      {children}
    </DocsShell>
  );
}
