import type { Metadata } from "next";
import { getAllProjects } from "@/lib/projects/projects";
import { projectsConfig } from "@/lib/projects/projects-config";
import { NotesBackground } from "./_components/notes-background";
import { NotesShell } from "./_components/notes-shell";
import "./notes.css";

export const metadata: Metadata = {
  title: "Projects — Aniket Dhakane",
  description:
    "Project notes — write-ups, stack, and demos in an Apple Notes–style viewer.",
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const projects = getAllProjects();

  return (
    <div className="projects-notes">
      {projectsConfig.backgroundImage && (
        <link
          rel="preload"
          as="image"
          href={projectsConfig.backgroundImage}
          type="image/webp"
        />
      )}
      <NotesBackground>
        <NotesShell projects={projects}>{children}</NotesShell>
      </NotesBackground>
    </div>
  );
}
