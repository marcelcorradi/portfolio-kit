# Changelog

Every version of the kit, newest first. When you receive a new ZIP, run `/update`
in Claude Code and it walks you through applying the changes below without touching
your own work (your cases, your colors, your pages). See the "Updating the kit"
section in [README.md](README.md).

The version you currently have is recorded in `.claude/kit-version`.

## 1.0.0

First release.

- Production foundation: Vite, React 19, Tailwind v4, shadcn/ui, TypeScript, dark
  mode, per-route SEO, sitemap generation, GitHub Pages deploy workflow.
- Markdown case engine: drop a file in `src/content/cases/`, it publishes.
- Four skills: `setup`, `portfolio-orchestrator`, `portfolio-content`,
  `portfolio-design`.
- `update` skill for applying future versions without losing your work.