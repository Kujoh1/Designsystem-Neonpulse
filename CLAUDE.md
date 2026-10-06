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
- Case study: `showcase/` (DE/EN marketing page that presents the system — used for applications).

## Repo structure
| Path | What |
|---|---|
| `index.html` | Reference/docs home: theme switch, ⌘K search, swatches + token table read live from the CSS. Start here. |
| `showcase/` | Case-study page (DE/EN via `?lang=de` / `?lang=en`). `showcase/img/` holds the kit screenshots. |
| `colors_and_type.css` | **Single source of truth**: fonts, tokens (primitives + aliases), light theme, elements, patterns. |
| `fonts/` | Self-hosted variable woff2 (Space Grotesk, Sora, JetBrains Mono) + licence notes. |
| `effects/starfield.css` | Starfield scene backdrop (brand effect). |
| `README.md` | Overview, quick start, architecture, brand foundations, iconography. |
| `CHANGELOG.md` | Release notes — add an entry for every user-visible change. |
| `SKILL.md` | Agent-Skill manifest (works as a downloadable skill too). |
| `preview/` | Specimen cards (type, color, spacing, components, patterns, brand). |
| `ui_kits/marketing/` | Landing-page kit (React via CDN). |
| `ui_kits/dashboard/` | SaaS dashboard kit (charts, modal, toasts, ⌘K palette, empty states). |
| `ui_kits/mobile/` | Mobile app kit (iOS frame, tab bar, settings). |
| `assets/` | kudesi wordmark, `og-image.png` social preview (1200×630). |
| `404.html` | On-brand not-found page (resolves URLs against the site root). |

Each UI kit = `index.html` + small `*.jsx` files loaded with
`<script type="text/babel" src="...">`. Components export to `window` via
`Object.assign(window, { ... })`.

## Run locally
It's static. Any of these works:
```bash
python3 -m http.server 8000      # then open http://localhost:8000
# or: npx serve .
```
Open `index.html`. (Open via a server, not `file://`: the docs `fetch()` the stylesheet
for the token table, the kits load JSX, and specimen iframes are auto-sized.)

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

8. **Contrast is part of the brand.** Text uses `--color-text`, `-secondary` or `-muted`
   (all ≥ 4.5:1 on `bg-0…bg-3`, in both themes). `--color-text-disabled` is for disabled
   states only. Never put `--neon-*` on text — use `--color-text-accent` (it becomes a
   legible ink in light mode).

## Theming
- Dark is the default. `data-theme="light"` on `<html>` or any subtree switches it;
  `data-theme="dark"` islands work inside light pages too.
- Order inside the token file matters: primitives on `:root, [data-theme="dark"]` →
  derived primitives + aliases on `:root, [data-theme]` (so themed subtrees re-resolve
  them) → `[data-theme="light"]` overrides **after** the alias block.
- Gradients, glows, `--line-glow` and `--ring-focus` are derived from the neon hues
  (`color-mix`) — a rebrand swaps `--neon-blue` / `--neon-cyan`, nothing else.
- Every specimen must look right in both themes (the docs set `data-theme` on each
  specimen iframe). Intrinsically dark brand art opts out with
  `<html data-theme="dark" data-theme-lock>`. The UI kits are dark product mocks and
  are not theme-switched.

## Conventions when adding things
- New component specimen → add `preview/<name>.html` (self-contained, links
  `../colors_and_type.css`, line 1 carries `<!-- @dsCard group="..." -->`), then add a
  dedicated `<section id="comp-<name>">` for it in `index.html` and a matching sidebar link.
- The system is layered: **tokens** (`colors_and_type.css` primitives + aliases) →
  **elements** (`.np-btn`, `.np-icon-btn`, `.np-badge`, `.np-livedot`, `.np-eyebrow`,
  `.np-field/.np-input/.np-inputgroup`, `.np-kbd`, `.np-switch`, `.np-tabs/.np-tab`,
  `.np-seg`, `data-np-tooltip`, `.np-meter`, `.np-avatar`, `.np-code`, `.np-link`) →
  **patterns** (`.np-card` family; layout `.np-container/.np-stack/.np-cluster/.np-grid/
  .np-section`; navigation `.np-navitem`; content `.np-pageheader/.np-empty/.np-skeleton/
  .np-banner/.np-list/.np-table/.np-codeblock`; overlays `.np-scrim/.np-modal/
  .np-toast-region/.np-toast/.np-palette`). Compose new screens from these; only drop to
  bespoke CSS when no pattern fits — and if a pattern is missing, add it to the patterns
  layer, don't inline it. Pattern specimens live in `preview/pat-*.html` under the
  `group="Patterns"` tag.
- States follow the button model: real pseudo-classes / ARIA attributes (`:focus-visible`,
  `aria-pressed`, `aria-selected`, `aria-current`, `aria-invalid`, `aria-busy`) plus
  `.is-*` helpers so specimens can show every state statically. Every interactive element
  gets `--ring-focus` on `:focus-visible`; icon-only buttons get an `aria-label`.
- Default element styles in `.np-scope` are wrapped in `:where()` (zero specificity) so a
  class always wins — keep it that way.
- New kit screen/component → add a `*.jsx` to the relevant `ui_kits/<kit>/`, export to
  `window`, and mount it from that kit's `index.html`.
- The self-rendering `Icon` component (in each kit's `index.html`) re-runs
  `lucide.createIcons()` every render — keep it; it's required because some state lives
  below the React root.
- Pin every CDN dep exactly, always with an `integrity` (SRI) hash — React 18.3.1
  **production** UMD builds, Babel standalone 7.29.0 and **Lucide 1.17.0**. Never use
  `@latest`; don't swap for unpinned versions. Fonts are self-hosted — don't re-add a
  Google Fonts `@import`.
- The showcase is bilingual: every visible string exists as a `lang="de"` and a
  `lang="en"` element (CSS hides the inactive one). Keep both in sync. Its facts strip
  counts tokens/components live from the stylesheet (static numbers are only fallbacks).
- After visual changes to a kit, regenerate `showcase/img/kit-*.webp` (1340×838) and,
  if the look changed noticeably, `assets/og-image.png`.
- Icons: use Lucide outline at the icon tokens (`--icon-stroke`, `--icon-sm/md/lg`) and
  prefer the **semantic icon map** in `preview/icons.html` (LIVE→`activity`,
  SUCCESS→`circle-check`, WARNING→`triangle-alert`, DANGER→`circle-alert`, …) so dev and
  design share one name per meaning. No emoji.

## Good next tasks (backlog)
- [x] Light mode token set (`[data-theme="light"]`) mirroring the dark ramp + docs toggle.
- [x] Command palette (⌘K), empty states, tooltips.
- [x] Code view + copy button on each `preview/` card on the docs home.
- [x] Self-host the three fonts in `/fonts` (Google Fonts `@import` removed).
- [ ] Add missing components: date picker, pagination, select/combobox, checkbox & radio group.
- [ ] Wire real brand/social SVGs (Lucide dropped them; neutral icons used as placeholder).
- [ ] Add a GitHub Action to lint HTML / check links on push (optional).
- [ ] Precompile the kits' JSX (drop in-browser Babel) if load time ever matters.
