---
name: setup
description: First-run interview for the portfolio kit. Use it the first time the owner opens the project, when they run /setup, or whenever the orchestrator finds the site's identity still blank (empty src/site.config.ts). It asks who they are, what they do, how the site should feel, and their brand color, then writes those answers into the config, the theme, the meta tags, and the two skill profiles — so the specialist skills have a real person to build for. It configures; it does not build the pages.
---

# Setup — the first-run interview

You are onboarding the owner of a blank portfolio kit. When you finish, the site knows whose it is: name, role, differentiator, contact, brand color, and typography are all recorded, and the specialist skills (`portfolio-content`, `portfolio-design`) have a filled profile to work from. **You configure the site. You do not build the Home or write a case** — that's the normal flow afterward, run by the orchestrator, section by section.

Keep this warm and short. It's the owner's first impression of the product. Ask in structured choice boxes (the `AskUserQuestion` tool), not a wall of prose. Group related questions so it's a few screens, not twenty prompts.

## Before you start

Read `src/site.config.ts`. If it's already filled (`name` and `url` set), setup has run — ask whether they want to reconfigure or just change one thing, and don't blow away good answers.

## The interview

Ask in this order. **Question 1 changes how you speak for the rest of the session, so it comes first.** Use `AskUserQuestion`; batch questions that fit on one screen. Where a field is free text (name, email, links), it's fine to ask in plain text rather than forcing a choice box.

1. **Technical comfort** *(choice — sets the tone for everything after)*
   - "Comfortable with git, npm and editing code" → don't explain basic commands later.
   - "I'm a designer — walk me through the terminal steps" → spell out each command, no assumed tooling knowledge.

2. **Identity** *(text)* — full name, role/title, and one or two sentences of bio. This is the raw material for the hero and the meta description; you'll refine it with the content skill later, so rough is fine now.

3. **The differentiator** *(text, and the most important answer)* — "What's the one true thing that separates you from every other candidate for the roles you want?" Push gently for something concrete and specific, not "I'm passionate and detail-oriented." If they struggle, offer examples from their field. This becomes the spine of the whole site.

4. **Contact** *(text)* — email, and the links that matter for their field (LinkedIn, GitHub, Dribbble, a personal site). Skip any they don't have; an empty link simply isn't rendered.

5. **Where it will live** *(choice)* — decides deploy config:
   - "I have a custom domain" → ask the domain; you'll write `public/CNAME` and keep Vite `base: '/'`.
   - "Use GitHub Pages free URL" → ask their GitHub username and intended repo name; the URL is `username.github.io/repo`, and you'll set Vite `base: '/repo/'` and `pathSegmentsToKeep = 1` in `public/404.html`.
   - "Decide later" → leave `url` blank; the site runs, the sitemap just waits.

6. **Brand color** *(choice — ask about intent, not a hex)* — "What should the site feel like?" Offer a few directions and derive the hue:
   - "Confident, precise, engineered" → indigo / blue (H ≈ 250–277)
   - "Warm, human, creative" → orange / coral (H ≈ 40–55)
   - "Calm, considered, editorial" → teal / green (H ≈ 160–185)
   - "Bold, energetic, expressive" → magenta / violet (H ≈ 300–340)
   - Always allow a custom hex. Convert whatever you land on to the four OKLCH `BRAND` values using the recipe in `portfolio-design`'s [references/shadcn-tokens.md](../portfolio-design/references/shadcn-tokens.md).

7. **Typography** *(choice)* — "One clean family, or a characterful display face paired with a readable body?" If they want specific fonts, note them. Don't install anything yet unless they name a font; record the decision and let the design skill wire it when it builds the Home. The kit's system-font default is a fine starting point.

8. **Their work** *(text)* — roughly how many cases they have and of which kind (client/employer work, self-built/authorial, or both). This just seeds the profile; you're not writing cases now.

## What to write

After the interview, apply the answers. Show the owner what you changed.

- **`src/site.config.ts`** — `name`, `role`, `url` (blank if "decide later"), `description` (from the bio), `email`, `links`.
- **`src/index.css`** — the four `BRAND` declarations, from the chosen hue (recipe in shadcn-tokens.md). Keep light darker, dark lighter, same hue.
- **`public/favicon.svg`** and **`public/site.webmanifest`** — update the hardcoded brand hex to match (an SVG/manifest can't read a CSS variable).
- **`index.html`** — `<title>`, description, and the OG/canonical tags, from name + role + bio + url.
- **Custom domain:** write `public/CNAME` with the domain. **GitHub Pages path:** set `base` in `vite.config.ts` and `pathSegmentsToKeep = 1` in `public/404.html`; also fix the `Sitemap:` line in `public/robots.txt`.
- **`.claude/skills/portfolio-orchestrator/references/project-decisions.md`** — fill the `[set by /setup]` sections: owner, differentiator, positioning, language, technical comfort, brand color, page-structure choices.
- **`.claude/skills/portfolio-content/references/profile.md`** — fill Identity and the differentiator; leave the Cases section for when you write them together.

## Verify, then hand off

- Run `npm run build`. It must pass. If the owner chose a domain, confirm the sitemap generated with the right URLs.
- Tell them plainly what's set and what's next: **"Your site is configured. Next, ask me to build your home page, and we'll write your first case together, one section at a time."**
- Then stop. Return control to the orchestrator for the actual building. Don't start designing the Home in the same breath — let the owner choose to begin.