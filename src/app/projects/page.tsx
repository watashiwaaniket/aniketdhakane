import { getAllProjects } from "@/lib/projects/projects";
import { DocsOverview } from "./_components/docs-overview";

export default function ProjectsPage() {
  return <DocsOverview projects={getAllProjects()} />;
}
