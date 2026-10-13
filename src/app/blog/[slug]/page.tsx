import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { articles } from "@/lib/blog/articles";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);

  return {
    title: article ? `${article.title} — Blog` : "Blog — Aniket Dhakane",
    description: article?.preview,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <article>
      <p className="text-sm text-[var(--docs-muted)]">Blog</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight text-balance">
        {article.title}
      </h1>
      {article.date ? (
        <time
          dateTime={article.date}
          className="mt-3 block text-sm text-[var(--docs-muted)] tabular-nums"
        >
          {article.date}
        </time>
      ) : null}
      <p className="mt-6 text-lg leading-relaxed text-[var(--docs-text)] text-pretty">
        {article.preview}
      </p>
    </article>
  );
}
