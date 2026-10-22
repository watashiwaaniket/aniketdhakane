import type { Metadata } from "next";
import { articles } from "@/lib/blog/articles";
import { DocsShell } from "@/app/projects/_components/docs-shell";
import { BlogNav } from "./_components/blog-nav";

const navArticles = articles.map(({ slug, title, nav, preview }) => ({
  slug,
  title,
  nav,
  preview,
}));

export const metadata: Metadata = {
  title: "Blog — Aniket Dhakane",
  description: "Articles, notes, and things learned along the way.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DocsShell
      section="Blog"
      sectionHref="/blog"
      nav={<BlogNav articles={navArticles} />}
    >
      {children}
    </DocsShell>
  );
}
