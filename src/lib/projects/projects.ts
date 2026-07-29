import { projects as projectCatalog } from "./generated-projects";
import type { Project } from "./project-types";

export type { Project, ProjectGroup } from "./project-types";
export { formatProjectDate, groupProjectsByCategory } from "./project-utils";

export function getAllProjects(): Project[] {
  return projectCatalog;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projectCatalog.find((project) => project.slug === slug);
}
