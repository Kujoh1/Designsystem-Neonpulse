# Marketing UI Kit — NeonPulse

A dark, cyberpunk landing page for a fictional realtime-infra product ("NeonPulse"). Built from the canonical classes in `../../colors_and_type.css`; the kit's own `<style>` only holds layout helpers (`mk-*`) and the 880px breakpoint.

## Run
Open `index.html` via a static server. Loads React 18.3.1 (production UMD) + Babel 7.29.0 + Lucide 1.17.0 from CDN, all pinned with SRI, plus `../../colors_and_type.css`.

## Components
| File | Exports | Notes |
|---|---|---|
| `Nav.jsx` | `Nav`, `NPLogo`, `NAV_LINKS` | Sticky translucent `<header>` (`--color-bg-translucent`). Real in-page anchors (`#product`, `#platform`, `#pricing`, `#docs`). Mobile menu toggle with `aria-expanded`/`aria-controls`; closes on link choice or Esc. |
| `Hero.jsx` | `Hero`, `ConsoleMock`, `CONSOLE_SCRIPT` | Split hero; primary CTA uses `np-btn--cta` (the one spotlight per view). `ConsoleMock` loops: types every line, holds ~2.4s, clears, replays; with `prefers-reduced-motion: reduce` it renders all lines statically. Timers are cleaned up on unmount. |
| `Features.jsx` | `Features`, `LogoStrip`, `FeatureCard` | Feature cards = `.np-card` in an auto-fit `.np-grid` (`--np-grid-min: 300px`). Icon tiles use a categorical neon hue; the halo appears on hover only. |
| `Pricing.jsx` | `Pricing`, `CTABand` | Monthly/annual `.np-seg` (`role="group"`, `aria-pressed`). Highlighted tier = `.np-card--live`; tiers reflow via `.np-grid`. |
| `Footer.jsx` | `Footer` | Footer nav columns, labelled social `.np-icon-btn` links, operational status line. |

## Patterns shown
- `np-btn` intents/sizes (`--primary`, `--ghost`, `--lg`, `--block`, `--cta`), `np-icon-btn`
- `np-eyebrow` + `np-livedot`, `np-label`, `np-card` family, `np-container` / `np-cluster` / `np-grid`
- Landmarks (`<header>`, `<main>`, `<footer>`), skip link (`.np-skip`), smooth anchor scroll with sticky-header offset
- Lucide icons via the self-rendering `Icon` component + `useLucide()` (re-runs `lucide.createIcons()` each render)

> Brand/social icons (github, twitter…) were removed from Lucide's core set — this kit uses neutral icons (`at-sign`, `message-circle`, `rss`) instead.
