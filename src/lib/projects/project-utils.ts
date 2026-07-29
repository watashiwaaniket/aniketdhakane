import type { Project, ProjectGroup } from "./project-types";

const CATEGORY_ORDER = ["Fullstack", "Frontend", "Misc", "Other"];

export function buildPreview(content: string): string {
  const plain = content
    .replace(/^#+\s+/gm, "")
    .replace(/[*_`>#-]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  return plain.length > 120 ? `${plain.slice(0, 120)}…` : plain;
}

export function groupProjectsByCategory(projects: Project[]): ProjectGroup[] {
  const ordered: ProjectGroup[] = [];

  const featured = projects.filter((project) => project.featured);
  if (featured.length > 0) {
    ordered.push({ label: "Featured", projects: featured });
  }

  const byCategory = new Map<string, Project[]>();

  for (const project of projects) {
    // Featured also appears in its category so the list stays complete
    // without burying it only at the top — skip duplicates in categories.
    if (project.featured) continue;
    const label = project.category || "Other";
    const existing = byCategory.get(label) ?? [];
    existing.push(project);
    byCategory.set(label, existing);
  }

  for (const label of CATEGORY_ORDER) {
    const items = byCategory.get(label);
    if (items?.length) {
      ordered.push({ label, projects: items });
      byCategory.delete(label);
    }
  }

  for (const [label, items] of byCategory) {
    ordered.push({ label, projects: items });
  }

  return ordered;
}

export function formatProjectDate(
  date: string,
  style: "short" | "long" = "short",
) {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;

  if (style === "long") {
    return parsed.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  return parsed.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
}
