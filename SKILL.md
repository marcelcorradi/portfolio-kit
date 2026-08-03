---
name: Portfolio Kit
description: A portfolio site you build with AI, not a template you rename. Ships a production Vite + React + Tailwind + shadcn foundation plus four Claude Code skills that interview you, then design your pages and write your case studies with you — grounded in a real portfolio-writing methodology, in your voice, in your look. Run /setup and the skills configure the whole site from your answers; then build the home and write cases one section at a time. Includes a Markdown case engine, per-route SEO, and a GitHub Pages deploy workflow.
---

# Portfolio Kit

**This ZIP is a complete project, not a single skill.** Unzip it into a new
folder and you have a working portfolio site plus the AI skills that build it
with you.

Most portfolio templates hand you someone else's design and ask you to swap the
text. This is different. You get a solid technical foundation and a set of Claude
Code skills that interview you, then design your pages and write your case
studies *with* you — so the result reads as yours, because it was built for you,
not recolored from a demo.

## Start here

You need [Node.js](https://nodejs.org) and
[Claude Code](https://www.claude.com/product/claude-code).

```bash
npm install      # install dependencies
npm run dev      # open the site — it tells you to run /setup
```

Then, in Claude Code, from this folder:

1. Run **`/setup`** — it asks who you are, what you do, how the site should feel,
   and your brand color, then configures everything.
2. Ask it to **build your home page**.
3. Ask it to **write your first case** — one section at a time, with you.

## What's inside

- **A production foundation** — Vite, React 19, Tailwind v4, shadcn/ui,
  TypeScript, dark mode, per-route SEO, a sitemap generator, and a GitHub Pages
  deploy workflow.
- **A content engine** — write a case as a Markdown file, drop it in a folder, it
  publishes. No CMS.
- **Four Claude Code skills** in `.claude/skills/`:
  - `setup` — the first-run interview (`/setup`).
  - `portfolio-orchestrator` — holds your decisions, routes work, runs a quality
    checklist based on the mistakes that get portfolios rejected.
  - `portfolio-content` — writes your cases and copy with a proven structure,
    grounded only in facts you give it.
  - `portfolio-design` — builds your pages with an opinionated, anti-template
    design philosophy, themed to a brand color you choose.

## What it is not

Not a finished site you fill in — it starts blank on purpose. Not a click-to-deploy
theme. Not a writing service. You build it in a conversation, and that takes an
afternoon, not five minutes.

## Docs

Full documentation is in [README.md](README.md) and [docs/](docs/): the content
model, how case figures work, and deployment. Licensed for personal and
client-project use — see [LICENSE](LICENSE).