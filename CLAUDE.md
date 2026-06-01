# CLAUDE.md — NeonPulse Design System

> This file is read automatically by Claude Code. It defines the project, the
> brand rules, and the publish/sync workflow. Keep designs on-brand and keep the
> repo deployable to GitHub Pages at all times.

## What this repo is
**NeonPulse** is a dark-first, cyberpunk *flat-design* design system for web and app
projects. It is a **static site** — plain HTML/CSS + a few React-via-CDN prototypes.
No build step, no bundler, no npm. It is published as-is via **GitHub Pages**.

- Live site (Pages): `https://kujoh1.github.io/Designsystem-Neonpulse/`
- Entry point: `index.html` (the browsable design-system reference / docs home).

## Repo structure
| Path | What |
|---|---|
| `index.html` | Reference/docs home (Zeroheight-style overview). Start here. |
| `colors_and_type.css` | **Single source of truth** for all tokens (color, type, spacing, radii, glow, motion). |
| `README.md` | Brand context, content + visual foundations, iconography. |
| `SKILL.md` | Agent-Skill manifest (works as a downloadable skill too). |
| `preview/` | Small specimen cards (type, color, spacing, components, brand). |
| `ui_kits/marketing/` | Landing-page kit (React via CDN). |
| `ui_kits/dashboard/` | SaaS dashboard kit (charts, modal, toasts). |
| `ui_kits/mobile/` | Mobile app kit (iOS frame + tab bar). |

Each UI kit = `index.html` + small `*.jsx` files loaded with
`<script type="text/babel" src="...">`. Components export to `window` via
`Object.assign(window, { ... })`.

## Run locally
It's static. Any of these works:
```bash
python3 -m http.server 8000      # then open http://localhost:8000
# or: npx serve .
```
Open `index.html`. (Open via a server, not `file://`, so the relative CSS/JSX and
iframes load.)

## Publish / sync workflow  →  this is the "live sync"
GitHub Pages auto-deploys on every push to `main`. So:
```bash
git add -A && git commit -m "..." && git push
```
…and the live docs update automatically a minute later. **That push is the only
manual step** — there is no other build.

First-time Pages setup (once): repo **Settings → Pages → Deploy from a branch →
`main` / `root`**.

## Brand non-negotiables (DO NOT drift from these)
1. **Dark is the canvas, neon is the signal.** ~90% near-black (`--bg-*`) + grey text;
   neon marks only what's interactive or live (~10%).
2. **Flat, not flat-boring.** Depth = surface step (`bg-1 → bg-2 → bg-3`) + 1px hairline.
   No stacked drop-shadows.
3. **Glow is a state, not a style.** Halos (`--glow-*`) only on hover/focus/active and
   on live data. Never ambient on static cards.
4. **Mono is the HUD voice.** Labels, metrics, statuses, timestamps → JetBrains Mono,
   UPPERCASE, `letter-spacing: 0.14em`.
5. **Type:** Space Grotesk (display), Sora (body), JetBrains Mono (data). Soft 12–20px radii.
6. **Icons:** Lucide outline (`stroke-width` ~1.9), `currentColor`. **No emoji, ever.**
7. **Always use tokens** from `colors_and_type.css` — never hardcode hex values in new work.
   Tokens come in **two tiers**: consume the **semantic aliases** (`--color-surface`,
   `--color-text`, `--color-action-primary`, `--color-border-focus`, `--ring-focus`,
   `--z-*`) in components; reach for raw **primitives** (`--bg-2`, `--neon-cyan`) only
   when defining or extending an alias. This keeps theming + rebrands a one-line change.

## Conventions when adding things
- New component specimen → add `preview/<name>.html` (self-contained, links
  `../colors_and_type.css`, line 1 carries `<!-- @dsCard group="..." -->`), then add a
  dedicated `<section id="comp-<name>">` for it in `index.html` and a matching sidebar link.
- The system is layered: **tokens** (`colors_and_type.css` primitives + aliases) →
  **elements** (`.np-btn`) → **patterns** (`.np-card` family, layout primitives
  `.np-stack/.np-cluster/.np-grid/.np-section`, content blocks `.np-empty/.np-skeleton/
  .np-banner/.np-list`). Compose new screens from these; only drop to bespoke CSS when no
  pattern fits — and if a pattern is missing, add it to the patterns layer, don't inline it.
  Pattern specimens live in `preview/pat-*.html` under the `group="Patterns"` tag.
- New kit screen/component → add a `*.jsx` to the relevant `ui_kits/<kit>/`, export to
  `window`, and mount it from that kit's `index.html`.
- The self-rendering `Icon` component (in each kit's `index.html`) re-runs
  `lucide.createIcons()` every render — keep it; it's required because some state lives
  below the React root.
- Pin every CDN dep exactly — React 18.3.1 + Babel 7.29.0 (with integrity hashes) and
  **Lucide 1.17.0**. Never use `@latest`; don't swap for unpinned versions.
- Icons: use Lucide outline at the icon tokens (`--icon-stroke`, `--icon-sm/md/lg`) and
  prefer the **semantic icon map** in `preview/icons.html` (LIVE→`activity`,
  SUCCESS→`circle-check`, WARNING→`triangle-alert`, DANGER→`circle-alert`, …) so dev and
  design share one name per meaning. No emoji.

## Good next tasks (backlog)
- [ ] Add a **light mode** token set (`[data-theme="light"]`) mirroring the dark ramp.
- [ ] Add missing components: command palette (⌘K), date picker, empty states, tooltips, pagination.
- [ ] Add a **copy-the-CSS** button to each `preview/` card on the docs home.
- [ ] Self-host the three fonts in `/fonts` and replace the Google Fonts `@import`.
- [ ] Wire real brand/social SVGs (Lucide dropped them; neutral icons used as placeholder).
- [ ] Add a GitHub Action to lint HTML / check links on push (optional).
