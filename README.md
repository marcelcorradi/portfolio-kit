# Portfolio Kit

A portfolio site you build *with AI*, not a template you rename.

Most portfolio templates hand you someone else's design and ask you to swap the
text. This is different. You get a solid technical foundation and a set of Claude
Code skills that interview you, then design your pages and write your case studies
*with* you — grounded in a real portfolio-writing methodology, in your voice, in
your look. The result is a site that reads as yours, because it was built for you,
not recolored from a demo.

## What's in the box

- **A production foundation** — Vite, React 19, Tailwind v4, shadcn/ui, TypeScript,
  dark mode, per-route SEO, a sitemap generator, and a GitHub Pages deploy
  workflow. Wired up and ready.
- **A content engine** — write a case as a Markdown file, drop it in a folder, it
  publishes. No CMS.
- **The skills** — the part you can't get from a blank repo:
  - `setup` — a first-run interview (`/setup`) that configures the whole site from
    your answers.
  - `portfolio-orchestrator` — the brain: holds your decisions, routes work, and
    runs a quality checklist based on the mistakes that get portfolios rejected.
  - `portfolio-content` — writes your cases and copy using a proven structure
    (inverted pyramid, hook formula, self-reflection), grounded only in facts you
    give it.
  - `portfolio-design` — builds your pages with an opinionated, anti-template
    design philosophy, themed to a brand color you choose.

## What it is not

- Not a finished site you fill in. It starts **blank on purpose.**
- Not a click-to-deploy theme. You build it in a conversation with Claude Code, and
  that takes an afternoon, not five minutes.
- Not a writing service. The skills write *with* you and refuse to invent facts —
  you supply the real work and numbers.

If you want a pretty template to rename in ten minutes, this isn't it, and that's
the point.

## Getting started

You'll need [Node.js](https://nodejs.org) and
[Claude Code](https://www.claude.com/product/claude-code).

```bash
npm install      # install dependencies
npm run dev      # open the site — it tells you to run /setup
```

Then, in Claude Code, from this folder:

1. Run **`/setup`**. It asks who you are, what you do, how the site should feel, and
   your brand color, then configures everything.
2. Ask it to **build your home page**.
3. Ask it to **write your first case** — it works one section at a time, with you.

When you're ready to publish, see [docs/deploy.md](docs/deploy.md).

## Docs

- [docs/content-model.md](docs/content-model.md) — how cases work, the frontmatter
  fields, and the parser's limits.
- [docs/case-visuals.md](docs/case-visuals.md) — placing figures in a case (and the
  one sharp edge to know about).
- [docs/deploy.md](docs/deploy.md) — GitHub Pages, custom domains, and the two URL
  styles.

## The stack

React 19 · Vite · Tailwind v4 · shadcn/ui · TypeScript · react-router · Lucide.
A current, fast stack as of this release. Dependencies use caret ranges, so
`npm install` picks up compatible updates. Major version bumps ship as repo
updates you can pull.

## License

See [LICENSE](LICENSE).