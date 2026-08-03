# Deploy — GitHub Pages

The kit ships with a GitHub Actions workflow that builds and deploys on every push
to `main`. You choose between two URL styles; that choice sets two config values.

## One-time setup

1. Push the repo to GitHub.
2. In the repo: **Settings → Pages → Build and deployment → Source → GitHub Actions.**
3. Push to `main`. The workflow in `.github/workflows/deploy.yml` builds and
   publishes. The first deploy takes a minute or two.

## Two URL styles

### A. Custom domain (yourname.com)

This is the cleanest, and what `/setup` assumes if you gave it a domain.

- `public/CNAME` contains your domain (one line, no `https://`).
- `vite.config.ts` keeps `base: '/'`.
- `public/404.html` keeps `pathSegmentsToKeep = 0`.
- `src/site.config.ts` `url` is `https://yourname.com`.
- In **Settings → Pages**, set the custom domain to match, and point your domain's
  DNS at GitHub Pages (a `CNAME` record to `youruser.github.io`, or the four A
  records GitHub lists).

### B. GitHub Pages free URL (youruser.github.io/your-repo)

No domain needed. The site lives under a repo path, so two values change:

- `vite.config.ts`: `base: '/your-repo/'` (with the leading and trailing slash).
- `public/404.html`: `pathSegmentsToKeep = 1` (so deep links keep the repo segment).
- `src/site.config.ts` `url` is `https://youruser.github.io/your-repo`.
- No `public/CNAME`.

React Router follows `base` automatically via `basename: import.meta.env.BASE_URL`,
so you don't touch routing.

> A **user site** at `youruser.github.io` (repo named `youruser.github.io`) is
> served from the root, so it uses style A's values (`base: '/'`,
> `pathSegmentsToKeep = 0`) even without a custom domain.

## Why the 404.html dance

GitHub Pages has no server, so a deep link like `/cases/foo` refreshed directly
would 404. `public/404.html` catches that, encodes the path into a query, and
`index.html` decodes it back — so refreshes and shared deep links work. That's what
`pathSegmentsToKeep` tunes: how much of the path is the app's vs. the repo's.

## Checklist before going live

- `npm run build` passes locally.
- `src/site.config.ts` `url` matches the real URL (the sitemap and OG tags use it).
- `public/robots.txt` `Sitemap:` line points at `<your-url>/sitemap.xml`.
- Open the deployed site, tab through it for visible focus, and check it on a phone
  width. The quality checklist in the orchestrator skill covers the rest.