# Fonts — self-hosted

The three NeonPulse typefaces ship as **variable woff2** files (latin subset, which
covers German umlauts and ß). They are declared via `@font-face` at the top of
`colors_and_type.css`, so no request goes to a third-party font CDN.

| File | Family | Weights | Licence |
|---|---|---|---|
| `space-grotesk-latin-wght.woff2` | Space Grotesk (display) | 300–700 | SIL OFL 1.1 |
| `sora-latin-wght.woff2` | Sora (body) | 100–800 | SIL OFL 1.1 |
| `jetbrains-mono-latin-wght.woff2` | JetBrains Mono (data / HUD) | 100–800 | SIL OFL 1.1 |

Source: the Fontsource variable builds (`@fontsource-variable/*` v5.3.0), which repackage
the Google Fonts originals unchanged. Licence texts:

- Space Grotesk — https://github.com/floriankarsten/space-grotesk/blob/master/OFL.txt
- Sora — https://github.com/sora-xor/sora-font/blob/master/OFL.txt
- JetBrains Mono — https://github.com/JetBrains/JetBrainsMono/blob/master/OFL.txt

Need Cyrillic, Greek or Vietnamese? Add the matching `*-wght-normal.woff2` subset from
Fontsource and a second `@font-face` with a `unicode-range`.
