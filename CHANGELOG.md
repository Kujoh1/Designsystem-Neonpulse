# Changelog

All notable changes to NeonPulse. Versions follow [semver](https://semver.org): a minor
version adds tokens/components without breaking existing class or token names.

## 1.1.3 — 2026-10-06

### Added
- `evals/` — agent eval (DE/EN): one customer-service agent in two versions (a quick-start prompt vs. a master briefing with knowledge base, guardrails and handover) runs through a golden dataset of seven test cases. Seven criteria (five critical, two quality) are graded by fixed rules in the browser, a session panel turns every case green or red, and a release gate decides "do not go live" vs. "released for the pilot". Plus the in-life-management loop (eval, pilot, monitoring, optimise). Answers are prepared examples, the scenario is neutral; both are labelled on the page. Linked from the live check.

## 1.1.2 — 2026-10-06

### Added
- `governance/check.html` — live check (DE/EN): two pull requests with the same feature card, one built off-system, one with the system. A click runs eleven deterministic Guardian rules (rulebook v1.1) against the shown code in the browser; a session panel turns every check green or red, then shows whether the change is ready to approve and the Guardian comment with line, problem and token fix. Framed as a small eval (expected vs. actual). Linked from the governance page and the showcase.

## 1.1.1 — 2026-10-06

### Added
- `governance/` — management-level explanation (DE/EN) of the PR Guardian: design drift, before/after, four-step flow, a real review, value, guardrails, roadmap.
- `governance/workflow.html` — direct link to the real n8n workflow as an interactive, read-only canvas (official `n8n-demo` component, pinned + SRI; workflow JSON read from the Guardian repo). `?local` adds an "open in my n8n" button for the owner's machine.
- Showcase section "07 · Governance" and a docs sidebar link.

## 1.1.0 — 2026-10-05

### Added
- **Light theme** — `[data-theme="light"]` mirrors the dark ramp, works on `<html>` or any subtree; dark islands work inside light pages. Accents switch to `--neon-ink`, semantic colours to deeper ink tones (all text pairings ≥ 4.5:1).
- **Derived tokens** — gradients, glows, `--line-glow`, `--ring-focus` and `--state-hover-glow` are computed from the neon hues with `color-mix()`, so a rebrand swaps two primitives.
- New aliases: `--color-bg-translucent`, `--color-track`, `--color-scrim`, `--glow-accent`, `--glow-action`, plus primitives `--white`, `--neon-ink`, `--container-max`.
- **23 new elements & patterns**: `.np-icon-btn`, `.np-livedot`, `.np-eyebrow`, `.np-badge`, `.np-field` / `.np-input` / `.np-inputgroup`, `.np-kbd`, `.np-switch` (real checkbox), `.np-tabs` / `.np-tab`, `.np-seg`, `data-np-tooltip`, `.np-meter`, `.np-avatar`, `.np-code`, `.np-link`, `.np-container`, `.np-navitem`, `.np-table`, `.np-codeblock`, `.np-scrim` + `.np-modal`, `.np-toast-region` + `.np-toast`, `.np-palette` (⌘K), helpers `.np-sr-only`, `.np-skip`, `.np-btn--block`. Ghost buttons get an `aria-pressed="true"` toggle state.
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
