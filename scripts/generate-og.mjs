import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import matter from "gray-matter";
import React from "react";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outDir = path.join(root, "public/og");
const width = 1200;
const height = 630;

const fonts = [
  {
    name: "Rubik",
    data: fs.readFileSync(
      path.join(
        root,
        "node_modules/@fontsource/rubik/files/rubik-latin-400-normal.woff",
      ),
    ),
    weight: 400,
    style: "normal",
  },
  {
    name: "Rubik",
    data: fs.readFileSync(
      path.join(
        root,
        "node_modules/@fontsource/rubik/files/rubik-latin-600-normal.woff",
      ),
    ),
    weight: 600,
    style: "normal",
  },
  {
    name: "Geist Mono",
    data: fs.readFileSync(
      path.join(
        root,
        "node_modules/@fontsource/geist-mono/files/geist-mono-latin-400-normal.woff",
      ),
    ),
    weight: 400,
    style: "normal",
  },
];

const avatar = `data:image/png;base64,${fs
  .readFileSync(path.join(__dirname, "og/avatar.png"))
  .toString("base64")}`;

function clean(value, max) {
  const plain = String(value ?? "")
    .replace(/[*_`>#]/g, "")
    .replace(/[—–]/g, "-")
    .replace(/\s+/g, " ")
    .trim();
  if (plain.length <= max) return plain;
  const cut = plain.slice(0, max);
  const last = cut.lastIndexOf(" ");
  return `${(last > 24 ? cut.slice(0, last) : cut).trim()}…`;
}

function titleSize(title) {
  if (title.length > 90) return 44;
  if (title.length > 68) return 50;
  if (title.length > 46) return 56;
  if (title.length > 28) return 64;
  return 76;
}

function card({ eyebrow, title, subtitle, pathLabel, accent }) {
  const size = titleSize(title);
  return React.createElement(
    "div",
    {
      style: {
        width,
        height,
        display: "flex",
        background: "#0a0a0a",
        color: "#e8eee9",
        fontFamily: "Rubik",
        position: "relative",
        overflow: "hidden",
      },
    },
    React.createElement("div", {
      style: {
        position: "absolute",
        top: -190,
        right: -110,
        width: 480,
        height: 480,
        borderRadius: 240,
        background: accent,
        opacity: 0.22,
        display: "flex",
      },
    }),
    React.createElement("div", {
      style: {
        position: "absolute",
        bottom: -210,
        left: -90,
        width: 420,
        height: 420,
        borderRadius: 210,
        background: "#9bbb9b",
        opacity: 0.12,
        display: "flex",
      },
    }),
    React.createElement("div", {
      style: {
        position: "absolute",
        top: 28,
        right: 28,
        bottom: 28,
        left: 28,
        border: "1px solid rgba(232,238,233,0.12)",
        borderRadius: 28,
        display: "flex",
      },
    }),
    React.createElement(
      "div",
      {
        style: {
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width,
          height,
          padding: "58px 72px 52px",
          boxSizing: "border-box",
        },
      },
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          },
        },
        React.createElement(
          "div",
          { style: { display: "flex", alignItems: "center" } },
          React.createElement("img", {
            src: avatar,
            width: 64,
            height: 64,
            style: {
              borderRadius: 18,
              border: "1px solid rgba(232,238,233,0.16)",
            },
          }),
          React.createElement(
            "div",
            {
              style: {
                display: "flex",
                marginLeft: 18,
                fontSize: 26,
                fontWeight: 600,
                letterSpacing: -0.4,
              },
            },
            "Aniket Dhakane",
          ),
        ),
        React.createElement(
          "div",
          {
            style: {
              display: "flex",
              fontFamily: "Geist Mono",
              fontSize: 18,
              letterSpacing: 2.4,
              color: accent,
            },
          },
          eyebrow,
        ),
      ),
      React.createElement(
        "div",
        { style: { display: "flex", flexDirection: "column" } },
        React.createElement(
          "div",
          {
            style: {
              display: "flex",
              fontSize: size,
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: -1.6,
              maxWidth: 1000,
            },
          },
          title,
        ),
        subtitle
          ? React.createElement(
              "div",
              {
                style: {
                  display: "flex",
                  marginTop: 22,
                  fontSize: 28,
                  lineHeight: 1.35,
                  color: "#9aaba3",
                  maxWidth: 980,
                },
              },
              subtitle,
            )
          : null,
      ),
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            fontFamily: "Geist Mono",
            fontSize: 20,
            color: "#8aafc4",
          },
        },
        pathLabel,
      ),
    ),
  );
}

function readMarkdownDir(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const { data, content } = matter(raw);
      const slug = String(data.slug || file.replace(/\.md$/, ""));
      return { data, content, slug };
    });
}

function cards() {
  const items = [
    {
      file: "home.png",
      eyebrow: "PORTFOLIO",
      title: "Aniket Dhakane",
      subtitle: "Fullstack developer in Pune. Interfaces, and the systems behind them.",
      pathLabel: "aniketdhakane.xyz",
      accent: "#9bbb9b",
    },
    {
      file: "blog.png",
      eyebrow: "BLOG",
      title: "Notes from the work",
      subtitle: "Articles, notes, and things learned along the way.",
      pathLabel: "aniketdhakane.xyz/blog",
      accent: "#8aafc4",
    },
    {
      file: "projects.png",
      eyebrow: "PROJECTS",
      title: "Things I shipped",
      subtitle:
        "Write-ups for what I shipped: why it exists, the stack underneath, and what I would do differently.",
      pathLabel: "aniketdhakane.xyz/projects",
      accent: "#9bbb9b",
    },
    {
      file: "wall.png",
      eyebrow: "WALL",
      title: "Coming soon",
      subtitle: "A quieter place for shorter notes. Not open yet.",
      pathLabel: "aniketdhakane.xyz/wall",
      accent: "#d7c4a3",
    },
  ];

  for (const article of readMarkdownDir(path.join(root, "content/blog"))) {
    const title = clean(article.data.title || article.slug, 110);
    items.push({
      file: path.join("blog", `${article.slug}.png`),
      eyebrow: "BLOG",
      title,
      subtitle: clean(article.data.preview || article.content, 150),
      pathLabel: `aniketdhakane.xyz/blog/${article.slug}`,
      accent: "#8aafc4",
    });
  }

  for (const project of readMarkdownDir(path.join(root, "content/projects"))) {
    const category = clean(project.data.category || "Project", 24).toUpperCase();
    items.push({
      file: path.join("projects", `${project.slug}.png`),
      eyebrow: `PROJECT · ${category}`,
      title: clean(project.data.title || project.slug, 80),
      subtitle: clean(project.data.preview || project.content, 150),
      pathLabel: `aniketdhakane.xyz/projects/${project.slug}`,
      accent: "#9bbb9b",
    });
  }

  return items;
}

async function renderOne(item) {
  const svg = await satori(
    card({
      eyebrow: item.eyebrow,
      title: item.title,
      subtitle: item.subtitle,
      pathLabel: item.pathLabel,
      accent: item.accent,
    }),
    { width, height, fonts },
  );
  const png = new Resvg(svg, {
    fitTo: { mode: "width", value: width },
  })
    .render()
    .asPng();
  const target = path.join(outDir, item.file);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, png);
}

fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

const items = cards();
for (const item of items) {
  await renderOne(item);
}

console.log(`Generated ${items.length} Open Graph image(s) -> public/og`);
