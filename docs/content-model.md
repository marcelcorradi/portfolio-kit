# Content model — how cases work

A case study is one Markdown file in `src/content/cases/`. Dropping a file there
publishes it; deleting it unpublishes it. There is no database, no CMS, no build
step to remember. The filename (minus `.md`) is the URL slug: `acme-checkout.md`
becomes `/cases/acme-checkout`.

Cases are sorted newest-first by their `date`, and each one is picked up
automatically by the Home, the case reader, and the sitemap.

## The file shape

```markdown
---
title: "Redesigning the checkout flow"
summary: "Cut a five-step checkout to two and lifted conversion 18%."
date: "2026-03-14"
type: "client"
tags: ["Fintech", "UX", "Conversion"]
role: "Lead Product Designer"
timeframe: "Jan 2026 to Mar 2026"
company: "Acme Pay"
outcome: "18% higher conversion, 40% fewer support tickets"
cover: "acme-checkout/hero.webp"
---

## Context

Your prose starts here. Write in Markdown: ## headings, **bold**, lists,
links, `code`. Each ## heading becomes a section in the table of contents.

## What I did

...
```

## Frontmatter fields

| Field | Required | What it is |
|---|---|---|
| `title` | yes | The case title, shown in the header and on cards. |
| `summary` | yes | One narrative line. Used on the Home card and as the meta description. |
| `date` | yes | `YYYY-MM-DD`. Drives sort order and the sitemap's `lastmod`. |
| `tags` | yes | Inline array of strings. Rendered as the "Scope" fact and as card tags. |
| `type` | no | `"client"` or `"authorial"` (or your own label). For your curation only; not rendered. |
| `role` | no | Your role. Shown as the "Role" fact in the header. |
| `timeframe` | no | Human-readable period, e.g. "Jan to Mar 2026". Shown as "When". |
| `company` | no | Client or employer. Drives the header's brand logo slot. |
| `outcome` | no | A short, hard result line for the header. Sharper than `summary`. |
| `cover` | no | Path **relative to `src/assets/cases/`**, e.g. `acme/hero.webp`. The card and OG image. |

## Parser limits — read this before you fight it

The frontmatter parser is hand-written and deliberately tiny (no `gray-matter`,
which pulls in ~500kB and `eval`). It supports exactly:

- `key: "value"` and `key: value`
- inline arrays: `tags: ["a", "b", "c"]`

It does **not** support:

- block lists (`-` items on their own lines)
- multi-line values
- nested objects
- comments inside the frontmatter block

Keep every frontmatter value on one line. If you need a list, use the inline
`["...", "..."]` form. Everything below the closing `---` is normal Markdown and
has none of these limits.

## Images

Case images live in `src/assets/cases/<slug>/`. Optimize them before committing:

```
node scripts/to-webp.mjs src/assets/cases/<slug>
```

This converts PNGs to WebP (~80% smaller) and crops a design tool's dark canvas
margin. See [the design skill's case-images reference](../.claude/skills/portfolio-design/references/case-images.md)
for the gotchas (don't run it on dark-UI screenshots; export design-tool figures
in light mode).

## Figures inside the prose

Plain cases render as prose, which is a complete, valid state. To place figures
(images, galleries, before/after) *between* paragraphs, see
[case-visuals.md](./case-visuals.md) — and read its warning about anchors before
you edit a case that has them.