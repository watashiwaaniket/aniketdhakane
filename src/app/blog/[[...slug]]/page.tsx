import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, type Article } from "@/lib/blog/articles";

export function generateStaticParams() {
  return [
    { slug: [] },
    ...articles.map((article) => ({ slug: [article.slug] })),
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const article = await findArticle(params);

  if (!article) {
    return {
      title: "Blog — Aniket Dhakane",
      description: "Articles, notes, and things learned along the way.",
    };
  }

  return {
    title: `${article.title} — Blog`,
    description: article.preview,
  };
}

async function findArticle(
  params: Promise<{ slug?: string[] }>,
): Promise<Article | undefined> {
  const { slug } = await params;
  if (!slug || slug.length !== 1) return undefined;
  return articles.find((item) => item.slug === slug[0]);
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  const segments = slug ?? [];

  if (segments.length > 1) {
    notFound();
  }

  if (segments.length === 1) {
    const article = articles.find((item) => item.slug === segments[0]);
    if (!article) notFound();
    return <ArticleView article={article} />;
  }

  return <BlogIndex />;
}

function BlogIndex() {
  return (
    <div>
      <h1 className="text-4xl font-semibold tracking-tight text-balance">
        Blog
      </h1>
      <p className="mt-3 max-w-2xl text-lg leading-relaxed text-[var(--docs-muted)] text-pretty">
        Articles, notes, and things I learn. New pieces will show up here.
      </p>

      {articles.length === 0 ? (
        <div className="mt-10 flex items-center gap-4 rounded-3xl border border-dashed border-[var(--docs-border)] p-3">
          <img
            src="/ascii-catto.png"
            alt="ASCII drawing of a cat"
            width={144}
            height={144}
            className="h-28 w-28 shrink-0 rounded-xl object-cover shadow-[inset_0_0_0_1px_var(--image-outline)] sm:h-36 sm:w-36"
          />
          <div className="min-w-0 pr-2">
            <p className="text-base font-medium">No articles yet</p>
            <p className="mt-1 text-sm leading-relaxed text-[var(--docs-muted)] text-pretty">
              Nothing published yet. The first piece will show up in the sidebar.
            </p>
          </div>
        </div>
      ) : (
        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="block rounded-xl border border-[var(--docs-border)] bg-[var(--docs-card)] p-4 transition-[background-color] duration-150 hover:bg-[var(--docs-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--docs-accent)]"
            >
              <h2 className="text-base font-medium text-balance">
                {article.title}
              </h2>
              <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-[var(--docs-muted)] text-pretty">
                {article.preview}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function ArticleView({ article }: { article: Article }) {
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
