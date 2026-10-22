import type { Metadata } from "next";
import { getAllProjects } from "@/lib/projects/projects";
import { socialMeta } from "@/lib/seo";
import { DocsNav } from "./_components/docs-nav";
import { DocsShell } from "./_components/docs-shell";

export const metadata: Metadata = socialMeta({
  title: "Projects — Aniket Dhakane",
  description:
    "Write-ups for what I shipped: why it exists, the stack underneath, and what I would do differently.",
  path: "/projects",
  image: "projects",
  alt: "Projects by Aniket Dhakane",
});

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
