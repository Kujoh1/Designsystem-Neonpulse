# Neon Pulse — Design System

**Neon Pulse** is an original, dark-first design language for cyberpunk-flavored web and app products. It pairs **flat, near-black surfaces** with **electric neon accents** (blue → cyan → violet, plus a hot-magenta "pulse") and a **geometric techy type system** (Space Grotesk / Sora / JetBrains Mono). Depth never comes from heavy skeuomorphic shadows — it comes from **surface lightness steps** and a **restrained neon halo** on the elements that matter.

> This is a from-scratch system created to a brief ("neon pulse flat design, cyberpunk style"), not a recreation of any existing brand. There is no source codebase or Figma file.

---

## The one-paragraph brief

Imagine a HUD for a near-future city: matte black glass, crisp grotesk type, and light that only appears where it's functional — an active button, a live data point, a focused field. Neon Pulse is **flat but alive**. Surfaces are calm and dark so the neon reads as *signal*, not decoration. Use color with discipline: most of any screen is near-black and cool grey; neon is the 10% that guides the eye.

---

## Design principles

1. **Dark is the canvas, neon is the signal.** ~90% of a screen is `--bg-*` and grey text. Neon marks the *one* thing that's interactive or live.
2. **Flat, not flat-boring.** No bevels, no inner-glow gradients on everything. Depth = surface step (`bg-1 → bg-2 → bg-3`) + a 1px hairline. Glow is reserved.
3. **Glow is a state, not a style.** Halos appear on hover/focus/active and on "live" data — never as ambient decoration on static cards.
4. **Mono is the HUD voice.** Labels, metrics, statuses, and timestamps use JetBrains Mono, uppercase, letter-spaced. It's what makes it read "cyberpunk" instead of generic dark mode.
5. **Soft corners keep it friendly.** 12–20px radii stop the cool palette from feeling clinical.

---

## CONTENT FUNDAMENTALS

**Voice:** confident, terse, a little futurist. Think system readouts and control panels, not marketing fluff.

- **Tense / person:** Address the user as **you**. The product speaks as a calm system: *"You're synced."* / *"3 nodes online."*
- **Casing:** Sentence case for headings and body. **UPPERCASE only for mono labels** (`SYSTEM STATUS`, `LIVE`, `API KEY`) — and keep them short (1–3 words).
- **Length:** Short. Headlines ≤ 6 words. Button labels 1–2 words (`Connect`, `Deploy`, `Sync now`).
- **Numbers & data:** Lead with the number. Use mono for any figure (`+24.6%`, `1,204 ms`, `v3.2.0`). Pair metrics with a tiny mono caption label.
- **Tone examples:**
  - Hero: *"Ship at the speed of light."* / sub: *"Realtime infra for teams that move."*
  - Empty state: *"Nothing online yet. Spin up your first node."*
  - Error: *"Connection dropped. Retrying in 3s…"* (factual, never cute-apologetic)
  - Success toast: *"Deployed. Live in us-east."*
- **Emoji:** Not used. Status is communicated with neon dots, mono labels, and icons — never emoji.
- **Punctuation flourish:** A single `→` or `·` is on-brand for separators and CTAs. Avoid exclamation marks except in big marketing moments.

---

## VISUAL FOUNDATIONS

### Color
- **Surfaces** are a cool near-black ramp: `--bg-0 #07070d` (void) → `--bg-1 #0c0c16` (canvas) → `--bg-2 #12121f` (card) → `--bg-3 #1a1a2b` (hover/elevated) → `--bg-4 #24243a` (overlay). Each step is the primary tool for hierarchy.
- **Text** is a cool-white ramp: `--fg-1 #eef1fb` → `--fg-2 #aab0c8` → `--fg-3 #6c7290` → `--fg-4 #454b66`.
- **Neon accents** (use sparingly): blue `#2d7bff`, cyan `#00e5ff`, violet `#7c4dff`, magenta `#ff2d9b`. Primary actions use the **blue→cyan `--grad-pulse`**; the hot **violet→magenta `--grad-pulse-hot`** is the secondary/"energy" gradient.
- **Semantic:** success mint `#18f0a0`, warning amber `#ffcf3a`, danger `#ff3b6b`, info cyan `#00e5ff`. Each has a 14%-opacity tinted fill for badges/alerts.

### Type
- **Display / headings / buttons:** Space Grotesk (geometric, techy).
- **Body / UI copy:** Sora (humanist-geometric, very readable).
- **HUD / data / labels / code:** JetBrains Mono, often uppercase + `0.14em` tracking.
- Scale is defined as ready-to-use shorthands (`--display-xl`, `--h1`, `--body`, `--mono-label`, …) in `colors_and_type.css`.

### Backgrounds
Flat dark fills, never photographic by default. Optional ambient texture: a faint `--grad-haze` radial in a hero corner, or a 1px **grid/scanline** overlay at very low opacity. No busy gradients across whole screens.

### Elevation & glow
- Flat: `--shadow-1` (barely-there) and `--shadow-2` (overlays/popovers).
- Neon halos: `--glow-cyan`, `--glow-blue`, `--glow-magenta`, `--glow-soft`. Tuned to ~30% intensity. Applied on **hover / focus / active** and on **live** indicators — not ambiently.
- Signature motion: `@keyframes np-pulse` (breathing halo) for "live" elements; `np-blink` for status dots.

### Borders & corners
1px hairlines (`--line-1/2/3`); a neon-lit edge (`--line-glow`) on focus. Radii 8–28px; default card `--r-lg (16px)`, buttons `--r-md (12px)` or `--r-full` for pills.

### Cards
`--bg-2` fill, `1px --line-2` border, `--r-lg`, `--shadow-1`. On hover: lift border to `--line-3` + add `--glow-soft`. No drop-shadow stacking.

### Motion
Fast and snappy: `--dur 200ms` with `--ease-out`. Hover = border/glow brighten; press = `scale(0.98)`; focus = neon ring. Avoid bounces; this system is precise, not playful.

### Layout
Generous negative space on the dark canvas. 4px spacing base (`--s-*`). Content max-width ~1200px for marketing; app shells use a fixed dark sidebar + lighter content well.

---

## ICONOGRAPHY

- **Library:** [Lucide](https://lucide.dev) — clean 1.5–2px stroke icons, outline style, which matches the crisp techy line work. Loaded via CDN (`lucide@latest`) in the UI kits. No emoji, ever.
- **Why outline (not filled):** thin neon-capable strokes read like HUD glyphs and can inherit `currentColor` to glow.
- **Sizing:** 16px (inline/UI), 20px (buttons/nav), 24px (feature). Stroke stays 1.75px.
- **Color:** icons default to `--fg-2`/`--fg-3`; active/hover icons take a neon `currentColor` and may receive `filter: drop-shadow()` for a subtle glow.
- **Status dots & unicode:** small neon `•` dots + `→ · ×` are used as micro-glyphs. Anything more complex is a Lucide icon.

> If you download this system for Claude Code and Lucide isn't available, substitute any 2px-stroke outline set (Feather, Tabler) and flag the swap.

---

## FILE INDEX

| Path | What |
|---|---|
| `colors_and_type.css` | All design tokens: color, type scale, spacing, radii, glow, motion. **Start here.** |
| `README.md` | This file — brand context, content + visual foundations, iconography. |
| `preview/` | Small HTML cards that populate the Design System tab (color, type, components…). |
| `ui_kits/marketing/` | Landing-page UI kit (hero, nav, feature cards, pricing, footer, CTA). |
| `ui_kits/dashboard/` | SaaS dashboard UI kit (sidebar, stat cards, charts, table, modal, toasts). |
| `ui_kits/mobile/` | Mobile app UI kit (device frame, tab bar, cards, live screen). |
| `SKILL.md` | Agent-Skill manifest so this system works in Claude Code. |

### Fonts
Loaded from Google Fonts via `@import` in `colors_and_type.css`: **Space Grotesk**, **Sora**, **JetBrains Mono**. All three are open-source. If you need offline/self-hosted files, drop them in `/fonts` and replace the `@import`.

---

## SETUP CHECKLIST
> Set the **File type to "Design System"** in the Share menu so others in your org can view this system.
