# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```shell
pnpm dev       # generate MDX component index, then start dev server
pnpm build     # generate MDX component index, then build for production
pnpm start     # serve production build
```

`dev` and `build` both run `pnpm run generate-mdx-components` first — this auto-generates `app/components/mdxComponents/index.ts` from all `.tsx`/`.jsx` files in `app/components/mdxComponents/`. If you add a new MDX component file, the index is regenerated automatically on next `dev` or `build`.

There are no lint or test scripts defined.

## Architecture

### Content model

- **Blog posts** live in `/posts/*.mdx`
- **Notes** live in `/notes/*.mdx`
- `not_posts/` holds drafts or unpublished files

MDX frontmatter fields:
```yaml
---
title: string
publishedAt: YYYY-MM-DD
summary: string
image?: string        # OG image override
draft?: boolean
tags?: string[]
---
```

Posts with `draft: true` are still loaded by `getBlogPosts()` / `getNotePosts()` — filter them in the UI if needed.

### Routing (App Router)

```
app/
  layout.tsx              # root layout: Navbar, Footer, theme init script, Analytics
  (site)/                 # route group with max-w-3xl centering layout
    layout.tsx
    page.tsx              # home — shows 3 recent blog posts + 3 notes
    blog/
      page.tsx            # full post list
      [slug]/page.tsx     # individual post with generateStaticParams
    note/
      [slug]/page.tsx     # individual note
      tag/                # tag-filtered note list
  api/
    og/                   # edge route — generates OG images via next/og
    get-views/            # Redis-backed view counter
    increment-view/
```

Path alias `@/*` maps to `app/*` (see `tsconfig.json`).

### MDX rendering pipeline

1. `app/utils/blog.ts` — filesystem utilities (`getBlogPosts`, `getNotePosts`) that parse frontmatter without any external library (custom regex parser).
2. `app/components/mdx.tsx` — exports `CustomMDX` (wraps `next-mdx-remote/rsc`). Defines built-in MDX components: headings with anchor links, `Code` (syntax highlighted via `sugar-high`), `Table`, `ImageWithCaption`, `Highlight`, `Info`, `Tip`, `Warn`, `QA`.
3. `app/components/mdxComponents/` — per-post interactive/visual components (Flex demos, Grid demos, OG card preview). **Never edit `index.ts` manually** — it is code-generated.
4. `scripts/generate-mdx-components.ts` — scans `mdxComponents/` recursively, converts filenames to PascalCase, and writes the barrel `index.ts`.

### Theme system

Dark mode is implemented without a library. `app/utils/themeScript.ts` exports an inline script injected into `<head>` that reads `localStorage` and sets the `dark` class on `<html>` before first paint (avoids flash). Toggle logic lives in `app/components/theme-switcher.tsx` and `app/utils/themeEffects.ts`.

### Key dependencies

| Package | Purpose |
|---|---|
| `next` (canary) | Framework |
| `next-mdx-remote` | MDX rendering (RSC-compatible) |
| `sugar-high` | Code syntax highlighting |
| `tailwindcss` 3.x | Styling |
| `redis` | View counter persistence |
| `@vercel/analytics`, `@vercel/speed-insights` | Observability |

### Adding a new MDX component

1. Create a `.tsx` file anywhere under `app/components/mdxComponents/`.
2. Run `pnpm dev` (or `pnpm run generate-mdx-components`) — the component is auto-exported and becomes available in all MDX files by its PascalCase name.

### OG image generation

`GET /api/og?title=...&author=...&date=...` runs at the edge and returns a 1200×630 PNG. The base URL is read from `NEXT_PUBLIC_BASE_URL` (defaults to `https://yun-blog.vercel.app`).