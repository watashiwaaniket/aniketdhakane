import Link from "next/link";
import { articles } from "@/lib/blog/articles";

export default function BlogPage() {
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
              <h2 className="text-base font-medium text-balance">{article.title}</h2>
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
