---
name: neonpulse-design
description: Use this skill to generate well-branded interfaces and assets for NeonPulse — a dark, cyberpunk "neon pulse" flat-design system — either for production or throwaway prototypes/mocks. Contains design guidelines, color + type tokens, fonts, and React UI-kit components for web, dashboard, and mobile.
user-invocable: true
---

# NeonPulse design skill

Read `README.md` first — it holds the full brand context, content + visual foundations, and iconography rules. Then explore:

- `colors_and_type.css` — all design tokens (color, type scale, spacing, radii, glow, motion). Import or copy these variables.
- `preview/` — small specimen cards for type, color, spacing, and components.
- `ui_kits/marketing/`, `ui_kits/dashboard/`, `ui_kits/mobile/` — React UI kits (each has its own README). Copy components out and adapt.

## How to use
- **Visual artifacts** (slides, mocks, throwaway prototypes): copy assets/tokens out and produce standalone HTML for the user to view. Load `colors_and_type.css`, then use `var(--bg-1)`, `var(--neon-cyan)`, `var(--grad-pulse)`, etc.
- **Production code**: read the rules here and reuse the token names + component patterns to become an expert in designing with this brand.

## Non-negotiables (the "neon pulse" feel)
1. **Dark canvas, neon as signal.** ~90% near-black + grey; neon marks the one interactive/live thing.
2. **Flat, not flat-boring.** Depth = surface step (`bg-1 → bg-2 → bg-3`) + 1px hairline. Glow is a *state* (hover/focus/active/live), never ambient.
3. **Mono is the HUD voice.** Labels, metrics, statuses, timestamps → JetBrains Mono, uppercase, `0.14em` tracking.
4. **Type:** Space Grotesk (display), Sora (body), JetBrains Mono (data). Soft 12–20px corners.
5. **Icons:** Lucide outline, 1.75–2px stroke, `currentColor`. No emoji.

If invoked with no other guidance, ask the user what they want to build, ask a few focused questions, then act as an expert designer who outputs HTML artifacts or production code.

## Fonts
Space Grotesk, Sora, JetBrains Mono — loaded via Google Fonts `@import` in `colors_and_type.css`. Self-host from `/fonts` if offline.
