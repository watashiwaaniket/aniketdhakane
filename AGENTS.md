# AGENTS.md — aniketdhakane

Personal portfolio for Aniket Dhakane. Static Next.js 15 (App Router) site with React 19, Tailwind CSS v4, and Motion.

## Authoritative docs (read these)

| Doc | Path |
|-----|------|
| Architecture | [`.grok/architecture.md`](.grok/architecture.md) |
| Project structure | [`.grok/project-structure.md`](.grok/project-structure.md) |
| Short rules (auto-loaded) | [`.grok/rules/00-project-context.md`](.grok/rules/00-project-context.md) |

## Non-negotiables

- Keep **`output: "export"`** working — no server APIs, middleware, or server-only Next features.
- Prefer editing existing section components and `utils/lib.ts` over new frameworks or data layers.
- Preserve light-theme design tokens and reduced-motion / mobile animation behavior.
- Use Motion’s **`m`** components (LazyMotion strict), not full `motion` imports.

## Commands

```bash
npm run dev      # local dev
npm run build    # static export → out/
npm run lint
```
