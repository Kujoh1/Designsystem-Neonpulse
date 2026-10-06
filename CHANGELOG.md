# Changelog

All notable changes to NeonPulse. Versions follow [semver](https://semver.org): a minor
version adds tokens/components without breaking existing class or token names.

## 1.1.0 — 2026-10-05

### Added
- **Light theme** — `[data-theme="light"]` mirrors the dark ramp, works on `<html>` or any subtree; dark islands work inside light pages. Accents switch to `--neon-ink`, semantic colours to deeper ink tones (all text pairings ≥ 4.5:1).
- **Derived tokens** — gradients, glows, `--line-glow`, `--ring-focus` and `--state-hover-glow` are computed from the neon hues with `color-mix()`, so a rebrand swaps two primitives.
- New aliases: `--color-bg-translucent`, `--color-track`, `--color-scrim`, `--glow-accent`, `--glow-action`, plus primitives `--white`, `--neon-ink`, `--container-max`.
- **23 new elements & patterns**: `.np-icon-btn`, `.np-livedot`, `.np-eyebrow`, `.np-badge`, `.np-field` / `.np-input` / `.np-inputgroup`, `.np-kbd`, `.np-switch` (real checkbox), `.np-tabs` / `.np-tab`, `.np-seg`, `data-np-tooltip`, `.np-meter`, `.np-avatar`, `.np-code`, `.np-link`, `.np-container`, `.np-navitem`, `.np-table`, `.np-codeblock`, `.np-scrim` + `.np-modal`, `.np-toast-region` + `.np-toast`, `.np-palette` (⌘K), helpers `.np-sr-only`, `.np-skip`, `.np-btn--block`.
- Specimens `comp-overlays.html` and `comp-data.html`; colour specimens print live values and contrast ratios.
- Docs: theme switch, ⌘K / `/` search over sections and tokens, mobile drawer navigation, scrollspy, swatches and token table generated from the stylesheet (dark + light columns), source view + copy for every specimen, responsive kit previews, Theming section.
- Dashboard kit: ⌘K command palette, empty states for every view, off-canvas sidebar on small screens. Mobile kit: Settings screen with switches.
- `showcase/` — bilingual (DE/EN) case-study page; `404.html`; `assets/og-image.png` social preview; `fonts/README.md`.

### Changed
- **Fonts are self-hosted** variable woff2 (no Google Fonts request).
- `--fg-3` lightened `#6c7290` → `#7c82a2` so muted text passes WCAG AA (was 3.9–4.1:1, now 4.5–5.3:1 on bg-0…bg-3).
- `--display-xl`, `--display-l`, `--h1` are fluid (`clamp()`).
- `.np-btn--secondary` uses dark label text (`--color-text-on-accent`) for contrast.
- Icons inside `.np-btn` render at `--icon-sm` so icon + label buttons keep one height.
- `.np-scope` element defaults use `:where()` — classes always win over them.
- `.np-skeleton` uses a raised base so it is visible inside cards.
- Kits use the canonical classes and semantic aliases (no local button/badge/segment CSS), React production builds, SRI on every CDN script, canonical Lucide names.

### Fixed
- Marketing hero console played once instead of looping; it now loops and respects reduced motion.
- Docs had no navigation below 920px.
- Dashboard modal: Escape, focus trap and focus return; toasts announced via `aria-live`.

## 1.0.0 — 2026-05-30
- Initial publish: tokens (two tiers), `.np-btn` state model, card family, layout and content patterns, CTA spotlight, starfield effect, kudesi wordmark, three UI kits, docs home.
