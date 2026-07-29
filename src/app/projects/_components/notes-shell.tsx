"use client";

import { usePathname } from "next/navigation";
import type { Project } from "@/lib/projects/project-types";
import { ProjectSidebar } from "./project-sidebar";

type NotesShellProps = {
  projects: Project[];
  children: React.ReactNode;
};

function EmptyDetail() {
  return (
    <div className="notes-surface-bg flex h-full min-h-0 flex-col items-center justify-center px-8 text-center">
      <div className="max-w-sm">
        <p className="notes-text text-[17px] font-medium">Select a project</p>
        <p className="notes-muted mt-2 text-[15px] leading-relaxed text-pretty">
          Choose a project note from the list to read the write-up, stack, and
          links.
        </p>
      </div>
    </div>
  );
}

export function NotesShell({ projects, children }: NotesShellProps) {
  const pathname = usePathname();
  const activeSlug = pathname.startsWith("/projects/")
    ? pathname.split("/projects/")[1]?.split("/")[0]
    : undefined;
  const isDetailView = Boolean(activeSlug);
  const showSidebar = !isDetailView;
  const showDetailOnMobile = isDetailView;

  return (
    <div className="notes-app notes-app-bg mx-auto flex h-dvh w-full max-w-6xl overflow-hidden md:h-full md:rounded-2xl">
      <div
        className={`${
          showSidebar ? "flex" : "hidden"
        } notes-border-r h-full w-full shrink-0 flex-col md:flex md:w-[min(100%,320px)] lg:w-[340px]`}
      >
        <ProjectSidebar projects={projects} activeSlug={activeSlug} />
      </div>

      <main
        className={`${
          showDetailOnMobile ? "flex" : "hidden"
        } notes-surface-bg h-full min-w-0 flex-1 flex-col md:flex`}
      >
        {isDetailView ? children : <EmptyDetail />}
      </main>
    </div>
  );
}
