export type Article = {
  slug: string;
  title: string;
  nav: string;
  date: string;
  author: string;
  preview: string;
  content: string;
  askLabel?: string;
  askPrompt?: string;
};

export type ArticleMeta = Pick<Article, "slug" | "title" | "nav" | "preview">;
