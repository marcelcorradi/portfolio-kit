# shadcn Tokens — Brand Color Recipe

How the owner's brand color is wired into shadcn/ui. **This is a recipe: it's already applied in `src/index.css`, and changing the brand color means editing the four `BRAND` values there.** This file explains the method so the edit is correct.

## ⚠️ Verify with Context7 before changing token syntax

The shadcn theming format changes between versions (it moved from HSL under Tailwind v3 to **OKLCH under Tailwind v4**, mapped via `@theme inline`). **If you're changing how tokens are declared** — not just their values — query the Context7 MCP for the current shadcn theming docs first, to confirm the token names, the color format, and the mechanism. For simply swapping the brand hue, editing the four values is enough.

## The strategy (approach A)

shadcn components consume **semantic** tokens (`--primary`, `--ring`, `--primary-foreground`). Those point at a **brand color** (the primitive value). Components never hardcode a color utility like `bg-indigo-600` — they use `bg-primary`, so the site themes from one place and dark mode works. This is the primitive→semantic pattern that real design systems use.

## Where the brand color lives

Four declarations in `src/index.css`, each marked with a `BRAND` comment:

- `:root` → `--primary` (light) and `--ring` (light)
- `.dark` → `--primary` (dark) and `--ring` (dark)

`--primary-foreground` (the text/icon color that sits *on* the primary) is white in light mode and near-black in dark mode, and rarely needs to change.

## Choosing the values

Pick one hue, then set lightness so both modes stay accessible. OKLCH makes this direct: `oklch(L C H)` — L is lightness (0–1), C is chroma (saturation), H is hue (0–360). Keep the **same H** across all four; vary **L** between light and dark.

```css
/* src/index.css — the four BRAND declarations. Same hue, tuned lightness. */
:root {
  --primary: oklch(0.51 0.23 <H>);   /* BRAND (light) — dark enough for contrast on white */
  --ring:    oklch(0.59 0.20 <H>);   /* BRAND (focus ring) */
}
.dark {
  --primary: oklch(0.67 0.17 <H>);   /* BRAND (dark) — lighter so it reads on near-black */
  --ring:    oklch(0.59 0.20 <H>);   /* BRAND (focus ring) */
}
```

Rough hue reference (H): red ≈ 25, orange ≈ 55, green ≈ 145, teal ≈ 185, blue ≈ 250, indigo ≈ 277, violet ≈ 300, magenta ≈ 340. If the owner gives a hex, convert it to OKLCH and read off its H (any OKLCH converter, or Tailwind's color docs for a scale you're borrowing from).

## Why the dark value is lighter

A saturated mid-tone on a near-black background is too low-contrast for accessible text and focus rings. Stepping the primary lighter in dark mode keeps contrast healthy. **Verify the final contrast (WCAG AA) once the theme is live** — a portfolio that fails its own accessibility check undercuts the work it's showing.

## The favicon and manifest carry hardcoded copies

An SVG favicon and the web manifest can't read a CSS variable, so `public/favicon.svg` and `public/site.webmanifest` hold their own copy of the color. When you change the brand hue, update those two hex values too, or the browser tab won't match the site. (`/setup` does this for you on first run.)

## Do / don't

- ✅ `className="bg-primary text-primary-foreground"`
- ✅ Change the brand color by editing the four `BRAND` values — everything follows.
- ❌ `className="bg-indigo-600"` (or any literal color utility) on components — breaks theming + dark mode.
- ❌ Copy an OKLCH value from memory without confirming the format for the installed shadcn/Tailwind version, if you're touching the token *mechanism* rather than the values.