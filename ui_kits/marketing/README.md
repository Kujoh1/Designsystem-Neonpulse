# Marketing UI Kit — NeonPulse

A dark, cyberpunk landing page for a fictional realtime-infra product ("NeonPulse").

## Run
Open `index.html`. Loads React 18 + Babel + Lucide from CDN and `../../colors_and_type.css` for tokens.

## Components
| File | Exports | Notes |
|---|---|---|
| `Nav.jsx` | `Nav`, `NPLogo` | Sticky translucent nav, mobile hamburger toggle, pulse-mark logo. |
| `Hero.jsx` | `Hero`, `ConsoleMock` | Split hero + an animated live-deploy console mock (self-typing). |
| `Features.jsx` | `Features`, `LogoStrip`, `FeatureCard` | Logo strip + 3×2 feature grid with neon icon glow on hover. |
| `Pricing.jsx` | `Pricing`, `CTABand` | Monthly/annual toggle, gradient-border "most popular" tier, CTA band. |
| `Footer.jsx` | `Footer` | 5-col footer + operational status line. |

## Patterns shown
- `np-btn-primary` (blue→cyan gradient + glow), `np-btn-ghost`, `np-btn-lg`
- `np-eyebrow` + `np-livedot` (blinking neon status dot)
- `np-seg` segmented control
- Gradient-border card via `padding-box / border-box` layering
- Lucide icons via `Icon` component + `useLucide()` (re-runs `lucide.createIcons()` each render)

> Brand/social icons (github, twitter…) were removed from Lucide's core set — this kit uses neutral icons (`at-sign`, `message-circle`, `rss`) instead.
