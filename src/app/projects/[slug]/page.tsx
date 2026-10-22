import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllProjects, getProjectBySlug } from "@/lib/projects/projects";
import { socialMeta } from "@/lib/seo";
import { ProjectDetail } from "../_components/project-detail";

export function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return socialMeta({
      title: "Project — Aniket Dhakane",
      description:
        "Write-ups for what I shipped: why it exists, the stack underneath, and what I would do differently.",
      path: "/projects",
      image: "projects",
    });
  }

  return socialMeta({
    title: `${project.title} — Projects`,
    description: project.preview,
    path: `/projects/${project.slug}`,
    image: `projects/${project.slug}`,
    alt: project.title,
  });
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetail project={project} />;
}
