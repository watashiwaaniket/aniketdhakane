"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import type { ArticleMeta } from "@/lib/blog/articles";

type BlogNavProps = {
  articles: ArticleMeta[];
};

export function BlogNav({ articles }: BlogNavProps) {
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const normalized = query.trim().toLowerCase();

  const visible = useMemo(() => {
    if (!normalized) return articles;
    return articles.filter((article) =>
      `${article.title} ${article.nav} ${article.preview}`
        .toLowerCase()
        .includes(normalized),
    );
  }, [articles, normalized]);

  const overviewActive = pathname === "/blog";

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="shrink-0 px-3 pt-4">
        <label className="relative block">
          <span className="sr-only">Search articles</span>
          <svg
            aria-hidden
            className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[var(--docs-muted)]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"
            />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search"
            className="h-10 w-full rounded-lg border border-[var(--docs-border)] bg-[var(--docs-bg)] pr-3 pl-9 text-sm text-[var(--docs-text)] transition-[border-color,box-shadow] duration-150 placeholder:text-[var(--docs-muted)] focus:border-[var(--docs-accent)] focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--docs-accent)_18%,transparent)] focus:outline-none"
          />
        </label>
      </div>

      <nav aria-label="Blog" className="min-h-0 flex-1 overflow-y-auto px-3 py-4">
        <Link
          href="/blog"
          aria-current={overviewActive ? "page" : undefined}
          className={`flex min-h-10 items-center rounded-lg px-2.5 text-sm transition-[background-color,color] duration-150 focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-[var(--docs-accent)] ${
            overviewActive
              ? "bg-[var(--docs-active)] font-medium text-[var(--docs-text)]"
              : "text-[var(--docs-muted)] hover:bg-[var(--docs-hover)] hover:text-[var(--docs-text)]"
          }`}
        >
          Overview
        </Link>

        <section className="mt-6">
          <h2 className="px-2.5 pb-1 text-sm font-medium text-[var(--docs-text)]">
            Writing
          </h2>
          {visible.length === 0 ? (
            <p className="px-2.5 py-2 text-sm text-[var(--docs-muted)] text-pretty">
              No articles yet
            </p>
          ) : (
            <ul className="flex flex-col">
              {visible.map((article) => {
                const href = `/blog/${article.slug}`;
                const active = pathname === href;

                return (
                  <li key={article.slug}>
                    <Link
                      href={href}
                      aria-current={active ? "page" : undefined}
                      className={`flex min-h-10 items-center rounded-lg px-2.5 py-2 text-sm leading-snug transition-[background-color,color] duration-150 focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-[var(--docs-accent)] ${
                        active
                          ? "bg-[var(--docs-active)] font-medium text-[var(--docs-text)]"
                          : "text-[var(--docs-muted)] hover:bg-[var(--docs-hover)] hover:text-[var(--docs-text)]"
                      }`}
                    >
                      {article.nav}
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </nav>
    </div>
  );
}
