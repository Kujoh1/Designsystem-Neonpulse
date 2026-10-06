---
name: neonpulse-design
description: Use this skill to generate well-branded interfaces and assets for NeonPulse — a dark-first, cyberpunk "neon pulse" flat-design system with a light theme — either for production or throwaway prototypes/mocks. Contains design guidelines, tokens, self-hosted fonts, canonical CSS components and React UI-kit components for web, dashboard, and mobile.
user-invocable: true
---

# NeonPulse design skill

Read `README.md` first — it holds the brand context, content + visual foundations and iconography rules. `CLAUDE.md` holds the binding conventions. Then explore:

- `colors_and_type.css` — the single source of truth: fonts, tokens (primitives + semantic aliases), the light theme, and the canonical element/pattern classes (`.np-btn`, `.np-input`, `.np-switch`, `.np-badge`, `.np-card`, `.np-modal`, `.np-toast`, `.np-palette` …). Link it and use the classes before writing any bespoke CSS.
- `index.html` — the live reference; `preview/` — one specimen per component/pattern (copy their markup).
- `ui_kits/marketing/`, `ui_kits/dashboard/`, `ui_kits/mobile/` — React UI kits (each has its own README). Copy components out and adapt.

## How to use
- **Visual artifacts** (slides, mocks, throwaway prototypes): produce standalone HTML that links `colors_and_type.css` (and `fonts/`), wrap the page in `class="np-scope"`, and compose from the `.np-*` classes. Use semantic aliases (`var(--color-surface)`, `var(--color-text-muted)`, `var(--color-accent)`, `var(--ring-focus)`) for anything custom.
- **Production code**: follow the token tiers — components consume `--color-*` / `--ring-*` / `--z-*` aliases, never raw primitives or hex values.
- **Theming**: dark is the default; `data-theme="light"` on `<html>` or any subtree switches it. Rebrand by swapping `--neon-blue` / `--neon-cyan` — gradients, glows and focus rings are derived.

## Non-negotiables (the "neon pulse" feel)
1. **Dark canvas, neon as signal.** ~90% near-black + grey; neon marks the one interactive/live thing.
2. **Flat, not flat-boring.** Depth = surface step (`bg-1 → bg-2 → bg-3`) + 1px hairline. Glow is a *state* (hover/focus/active/live), never ambient.
3. **Mono is the HUD voice.** Labels, metrics, statuses, timestamps → JetBrains Mono, uppercase, `0.14em` tracking.
4. **Type:** Space Grotesk (display), Sora (body), JetBrains Mono (data). Soft 12–20px corners.
5. **Icons:** Lucide outline 1.17.0, stroke `1.9` (`--icon-stroke`), `currentColor`; use the semantic icon map. No emoji.
6. **Accessible:** text only in `--color-text`, `-secondary`, `-muted` (all AA); every control gets `--ring-focus` on `:focus-visible`; icon-only buttons get `aria-label`.

If invoked with no other guidance, ask the user what they want to build, ask a few focused questions, then act as an expert designer who outputs HTML artifacts or production code.

## Fonts
Space Grotesk, Sora, JetBrains Mono — self-hosted variable woff2 in `fonts/`, declared via `@font-face` in `colors_and_type.css` (SIL OFL 1.1). No external font request.
