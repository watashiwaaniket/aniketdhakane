export type Project = {
  slug: string;
  title: string;
  date: string;
  category: string;
  status: string;
  featured: boolean;
  link: string | null;
  stack: string[];
  preview: string;
  content: string;
};

export type ProjectGroup = {
  label: string;
  projects: Project[];
};
