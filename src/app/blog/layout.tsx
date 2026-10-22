import { articles } from "@/lib/blog/articles";
import { DocsShell } from "@/app/projects/_components/docs-shell";
import { BlogNav } from "./_components/blog-nav";

const navArticles = articles.map(({ slug, title, nav, preview }) => ({
  slug,
  title,
  nav,
  preview,
}));

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
