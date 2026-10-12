/* ============================================================
   NeonPulse → Figma · library builder
   Builds (and re-syncs) the design system as native, editable Figma content:
     variables   Primitives (hidden) · Theme (Dark / Light) · Scale
     styles      text · gradient paint · effect (glows bound to Theme variables)
     components  Lucide icons + elements + patterns, every fill/stroke/radius/
                 gap bound to a variable or style
     pages       Cover · Foundations · Components (incl. a Dark/Light theme check)

   One file, two runners:
   · Figma plugin   Plugins → Development → Import plugin from manifest…
                    (figma/plugin/manifest.json), then run a “NeonPulse Library” command.
   · Claude + Figma MCP   `use_figma` with this file followed by
                    `return await NP.run(['variables', 'styles'])` — one phase list per call.

   Re-running is safe. Variables and styles are updated in place by name, so token
   changes flow into every bound component. Existing components are kept (they hold
   designers' edits) unless the “rebuild” option is set. Data comes from the block
   below, written by `node figma/export-tokens.mjs` from colors_and_type.css.
   ============================================================ */

// @generated:start — do not edit by hand: node figma/export-tokens.mjs
const NP_DATA = {"meta":{"system":"NeonPulse","version":"1.3.0","source":"colors_and_type.css","generator":"figma/export-tokens.mjs"},"collections":[{"name":"Primitives","modes":["Value"],"hidden":true,"variables":[{"name":"dark/bg/0","css":"--bg-0","type":"COLOR","value":"#07070d"},{"name":"light/bg/0","css":"--bg-0","type":"COLOR","value":"#e9ebf3"},{"name":"dark/bg/1","css":"--bg-1","type":"COLOR","value":"#0c0c16"},{"name":"light/bg/1","css":"--bg-1","type":"COLOR","value":"#f5f6fa"},{"name":"dark/bg/2","css":"--bg-2","type":"COLOR","value":"#12121f"},{"name":"light/bg/2","css":"--bg-2","type":"COLOR","value":"#ffffff"},{"name":"dark/bg/3","css":"--bg-3","type":"COLOR","value":"#1a1a2b"},{"name":"light/bg/3","css":"--bg-3","type":"COLOR","value":"#eef0f6"},{"name":"dark/bg/4","css":"--bg-4","type":"COLOR","value":"#24243a"},{"name":"light/bg/4","css":"--bg-4","type":"COLOR","value":"#e1e4ee"},{"name":"dark/line/1","css":"--line-1","type":"COLOR","value":"#ffffff12"},{"name":"light/line/1","css":"--line-1","type":"COLOR","value":"#10143012"},{"name":"dark/line/2","css":"--line-2","type":"COLOR","value":"#ffffff1f"},{"name":"light/line/2","css":"--line-2","type":"COLOR","value":"#10143021"},{"name":"dark/line/3","css":"--line-3","type":"COLOR","value":"#ffffff2e"},{"name":"light/line/3","css":"--line-3","type":"COLOR","value":"#10143038"},{"name":"dark/fg/1","css":"--fg-1","type":"COLOR","value":"#eef1fb"},{"name":"light/fg/1","css":"--fg-1","type":"COLOR","value":"#11131f"},{"name":"dark/fg/2","css":"--fg-2","type":"COLOR","value":"#aab0c8"},{"name":"light/fg/2","css":"--fg-2","type":"COLOR","value":"#3d4360"},{"name":"dark/fg/3","css":"--fg-3","type":"COLOR","value":"#7c82a2"},{"name":"light/fg/3","css":"--fg-3","type":"COLOR","value":"#5a6080"},{"name":"dark/fg/4","css":"--fg-4","type":"COLOR","value":"#454b66"},{"name":"light/fg/4","css":"--fg-4","type":"COLOR","value":"#9ca2ba"},{"name":"fg/on-neon","css":"--fg-on-neon","type":"COLOR","value":"#07070d"},{"name":"base/white","css":"--white","type":"COLOR","value":"#ffffff"},{"name":"neon/blue","css":"--neon-blue","type":"COLOR","value":"#2d7bff"},{"name":"neon/cyan","css":"--neon-cyan","type":"COLOR","value":"#00e5ff"},{"name":"neon/violet","css":"--neon-violet","type":"COLOR","value":"#7c4dff"},{"name":"neon/magenta","css":"--neon-magenta","type":"COLOR","value":"#ff2d9b"},{"name":"dark/status/success","css":"--success","type":"COLOR","value":"#18f0a0"},{"name":"light/status/success","css":"--success","type":"COLOR","value":"#04694a"},{"name":"dark/status/warning","css":"--warning","type":"COLOR","value":"#ffcf3a"},{"name":"light/status/warning","css":"--warning","type":"COLOR","value":"#7d4f00"},{"name":"dark/status/danger","css":"--danger","type":"COLOR","value":"#ff3b6b"},{"name":"light/status/danger","css":"--danger","type":"COLOR","value":"#bb1442"},{"name":"dark/status/info","css":"--info","type":"COLOR","value":"#00e5ff"},{"name":"light/status/info","css":"--info","type":"COLOR","value":"#00618f"},{"name":"dark/status/success-fill","css":"--success-fill","type":"COLOR","value":"#18f0a024"},{"name":"light/status/success-fill","css":"--success-fill","type":"COLOR","value":"#04694a1a"},{"name":"dark/status/warning-fill","css":"--warning-fill","type":"COLOR","value":"#ffcf3a24"},{"name":"light/status/warning-fill","css":"--warning-fill","type":"COLOR","value":"#7d4f001a"},{"name":"dark/status/danger-fill","css":"--danger-fill","type":"COLOR","value":"#ff3b6b24"},{"name":"light/status/danger-fill","css":"--danger-fill","type":"COLOR","value":"#bb14421a"},{"name":"dark/status/info-fill","css":"--info-fill","type":"COLOR","value":"#00e5ff24"},{"name":"light/status/info-fill","css":"--info-fill","type":"COLOR","value":"#00618f1a"},{"name":"neon/ink","css":"--neon-ink","type":"COLOR","value":"#2059b8"},{"name":"dark/line/glow","css":"--line-glow","type":"COLOR","value":"#00e5ff66"},{"name":"light/line/glow","css":"--line-glow","type":"COLOR","value":"#2059b873"}]},{"name":"Theme","modes":["Dark","Light"],"variables":[{"name":"bg/page","css":"--color-bg-page","type":"COLOR","scopes":["FRAME_FILL","SHAPE_FILL"],"values":{"Dark":{"alias":"dark/bg/1"},"Light":{"alias":"light/bg/1"}}},{"name":"bg/void","css":"--color-bg-void","type":"COLOR","scopes":["FRAME_FILL","SHAPE_FILL"],"values":{"Dark":{"alias":"dark/bg/0"},"Light":{"alias":"light/bg/0"}}},{"name":"bg/translucent","css":"--color-bg-translucent","type":"COLOR","scopes":["FRAME_FILL","SHAPE_FILL"],"values":{"Dark":{"value":"#07070db8"},"Light":{"value":"#f5f6fac7"}}},{"name":"surface/default","css":"--color-surface","type":"COLOR","scopes":["FRAME_FILL","SHAPE_FILL"],"values":{"Dark":{"alias":"dark/bg/2"},"Light":{"alias":"light/bg/2"}}},{"name":"surface/raised","css":"--color-surface-raised","type":"COLOR","scopes":["FRAME_FILL","SHAPE_FILL"],"values":{"Dark":{"alias":"dark/bg/3"},"Light":{"alias":"light/bg/3"}}},{"name":"surface/overlay","css":"--color-surface-overlay","type":"COLOR","scopes":["FRAME_FILL","SHAPE_FILL"],"values":{"Dark":{"alias":"dark/bg/4"},"Light":{"alias":"light/bg/2"}}},{"name":"surface/track","css":"--color-track","type":"COLOR","scopes":["FRAME_FILL","SHAPE_FILL"],"values":{"Dark":{"alias":"dark/bg/4"},"Light":{"alias":"light/bg/4"}}},{"name":"bg/scrim","css":"--color-scrim","type":"COLOR","scopes":["FRAME_FILL","SHAPE_FILL"],"values":{"Dark":{"value":"#05050aa8"},"Light":{"value":"#10143052"}}},{"name":"text/default","css":"--color-text","type":"COLOR","scopes":["TEXT_FILL","STROKE_COLOR"],"values":{"Dark":{"alias":"dark/fg/1"},"Light":{"alias":"light/fg/1"}}},{"name":"text/secondary","css":"--color-text-secondary","type":"COLOR","scopes":["TEXT_FILL","STROKE_COLOR"],"values":{"Dark":{"alias":"dark/fg/2"},"Light":{"alias":"light/fg/2"}}},{"name":"text/muted","css":"--color-text-muted","type":"COLOR","scopes":["TEXT_FILL","STROKE_COLOR"],"values":{"Dark":{"alias":"dark/fg/3"},"Light":{"alias":"light/fg/3"}}},{"name":"text/disabled","css":"--color-text-disabled","type":"COLOR","scopes":["TEXT_FILL","STROKE_COLOR"],"values":{"Dark":{"alias":"dark/fg/4"},"Light":{"alias":"light/fg/4"}}},{"name":"text/on-accent","css":"--color-text-on-accent","type":"COLOR","scopes":["TEXT_FILL","STROKE_COLOR"],"values":{"Dark":{"alias":"fg/on-neon"},"Light":{"alias":"fg/on-neon"}}},{"name":"text/accent","css":"--color-text-accent","type":"COLOR","scopes":["TEXT_FILL","STROKE_COLOR"],"values":{"Dark":{"alias":"neon/cyan"},"Light":{"alias":"neon/ink"}}},{"name":"border/default","css":"--color-border","type":"COLOR","scopes":["STROKE_COLOR"],"values":{"Dark":{"alias":"dark/line/2"},"Light":{"alias":"light/line/2"}}},{"name":"border/subtle","css":"--color-border-subtle","type":"COLOR","scopes":["STROKE_COLOR"],"values":{"Dark":{"alias":"dark/line/1"},"Light":{"alias":"light/line/1"}}},{"name":"border/strong","css":"--color-border-strong","type":"COLOR","scopes":["STROKE_COLOR"],"values":{"Dark":{"alias":"dark/line/3"},"Light":{"alias":"light/line/3"}}},{"name":"border/focus","css":"--color-border-focus","type":"COLOR","scopes":["STROKE_COLOR"],"values":{"Dark":{"alias":"dark/line/glow"},"Light":{"alias":"light/line/glow"}}},{"name":"action/primary-solid","css":"--color-action-primary-solid","type":"COLOR","scopes":["FRAME_FILL","SHAPE_FILL"],"values":{"Dark":{"alias":"neon/blue"},"Light":{"alias":"neon/blue"}}},{"name":"accent/default","css":"--color-accent","type":"COLOR","scopes":["FRAME_FILL","SHAPE_FILL","STROKE_COLOR"],"values":{"Dark":{"alias":"neon/cyan"},"Light":{"alias":"neon/ink"}}},{"name":"feedback/success","css":"--color-success","type":"COLOR","scopes":["TEXT_FILL","SHAPE_FILL","STROKE_COLOR"],"values":{"Dark":{"alias":"dark/status/success"},"Light":{"alias":"light/status/success"}}},{"name":"feedback/success-fill","css":"--color-success-fill","type":"COLOR","scopes":["FRAME_FILL","SHAPE_FILL"],"values":{"Dark":{"alias":"dark/status/success-fill"},"Light":{"alias":"light/status/success-fill"}}},{"name":"feedback/warning","css":"--color-warning","type":"COLOR","scopes":["TEXT_FILL","SHAPE_FILL","STROKE_COLOR"],"values":{"Dark":{"alias":"dark/status/warning"},"Light":{"alias":"light/status/warning"}}},{"name":"feedback/warning-fill","css":"--color-warning-fill","type":"COLOR","scopes":["FRAME_FILL","SHAPE_FILL"],"values":{"Dark":{"alias":"dark/status/warning-fill"},"Light":{"alias":"light/status/warning-fill"}}},{"name":"feedback/danger","css":"--color-danger","type":"COLOR","scopes":["TEXT_FILL","SHAPE_FILL","STROKE_COLOR"],"values":{"Dark":{"alias":"dark/status/danger"},"Light":{"alias":"light/status/danger"}}},{"name":"feedback/danger-fill","css":"--color-danger-fill","type":"COLOR","scopes":["FRAME_FILL","SHAPE_FILL"],"values":{"Dark":{"alias":"dark/status/danger-fill"},"Light":{"alias":"light/status/danger-fill"}}},{"name":"feedback/info","css":"--color-info","type":"COLOR","scopes":["TEXT_FILL","SHAPE_FILL","STROKE_COLOR"],"values":{"Dark":{"alias":"dark/status/info"},"Light":{"alias":"light/status/info"}}},{"name":"feedback/info-fill","css":"--color-info-fill","type":"COLOR","scopes":["FRAME_FILL","SHAPE_FILL"],"values":{"Dark":{"alias":"dark/status/info-fill"},"Light":{"alias":"light/status/info-fill"}}},{"name":"effect/glow-cyan/1/color","css":"--glow-cyan #1","type":"COLOR","scopes":["EFFECT_COLOR"],"values":{"Dark":{"value":"#00e5ff4d"},"Light":{"value":"#2059b84d"}}},{"name":"effect/glow-cyan/2/y","css":"--glow-cyan #2","type":"FLOAT","scopes":["EFFECT_FLOAT"],"values":{"Dark":{"value":0},"Light":{"value":6}}},{"name":"effect/glow-cyan/2/blur","css":"--glow-cyan #2","type":"FLOAT","scopes":["EFFECT_FLOAT"],"values":{"Dark":{"value":22},"Light":{"value":20}}},{"name":"effect/glow-cyan/2/color","css":"--glow-cyan #2","type":"COLOR","scopes":["EFFECT_COLOR"],"values":{"Dark":{"value":"#00e5ff47"},"Light":{"value":"#00e5ff47"}}},{"name":"effect/glow-blue/1/color","css":"--glow-blue #1","type":"COLOR","scopes":["EFFECT_COLOR"],"values":{"Dark":{"value":"#2d7bff59"},"Light":{"value":"#2d7bff4d"}}},{"name":"effect/glow-blue/2/y","css":"--glow-blue #2","type":"FLOAT","scopes":["EFFECT_FLOAT"],"values":{"Dark":{"value":0},"Light":{"value":6}}},{"name":"effect/glow-blue/2/blur","css":"--glow-blue #2","type":"FLOAT","scopes":["EFFECT_FLOAT"],"values":{"Dark":{"value":22},"Light":{"value":18}}},{"name":"effect/glow-blue/2/color","css":"--glow-blue #2","type":"COLOR","scopes":["EFFECT_COLOR"],"values":{"Dark":{"value":"#2d7bff4d"},"Light":{"value":"#2d7bff42"}}},{"name":"effect/glow-magenta/1/color","css":"--glow-magenta #1","type":"COLOR","scopes":["EFFECT_COLOR"],"values":{"Dark":{"value":"#ff2d9b59"},"Light":{"value":"#ff2d9b59"}}},{"name":"effect/glow-magenta/2/color","css":"--glow-magenta #2","type":"COLOR","scopes":["EFFECT_COLOR"],"values":{"Dark":{"value":"#ff2d9b4d"},"Light":{"value":"#ff2d9b4d"}}},{"name":"effect/glow-magenta-hover/1/color","css":".np-btn--secondary:hover #1","type":"COLOR","scopes":["EFFECT_COLOR"],"values":{"Dark":{"value":"#ff2d9b4d"},"Light":{"value":"#ff2d9b4d"}}},{"name":"effect/glow-danger/1/color","css":"--glow-danger #1","type":"COLOR","scopes":["EFFECT_COLOR"],"values":{"Dark":{"value":"#ff3b6b59"},"Light":{"value":"#bb144259"}}},{"name":"effect/glow-danger/2/color","css":"--glow-danger #2","type":"COLOR","scopes":["EFFECT_COLOR"],"values":{"Dark":{"value":"#ff3b6b4d"},"Light":{"value":"#bb14424d"}}},{"name":"effect/glow-soft/1/y","css":"--glow-soft #1","type":"FLOAT","scopes":["EFFECT_FLOAT"],"values":{"Dark":{"value":0},"Light":{"value":6}}},{"name":"effect/glow-soft/1/blur","css":"--glow-soft #1","type":"FLOAT","scopes":["EFFECT_FLOAT"],"values":{"Dark":{"value":18},"Light":{"value":22}}},{"name":"effect/glow-soft/1/color","css":"--glow-soft #1","type":"COLOR","scopes":["EFFECT_COLOR"],"values":{"Dark":{"value":"#00e5ff2e"},"Light":{"value":"#2d7bff29"}}},{"name":"effect/state-hover-glow/1/color","css":"--state-hover-glow #1","type":"COLOR","scopes":["EFFECT_COLOR"],"values":{"Dark":{"value":"#00e5ff80"},"Light":{"value":"#2059b866"}}},{"name":"effect/state-hover-glow/2/y","css":"--state-hover-glow #2","type":"FLOAT","scopes":["EFFECT_FLOAT"],"values":{"Dark":{"value":0},"Light":{"value":8}}},{"name":"effect/state-hover-glow/2/blur","css":"--state-hover-glow #2","type":"FLOAT","scopes":["EFFECT_FLOAT"],"values":{"Dark":{"value":26},"Light":{"value":24}}},{"name":"effect/state-hover-glow/2/color","css":"--state-hover-glow #2","type":"COLOR","scopes":["EFFECT_COLOR"],"values":{"Dark":{"value":"#00e5ff73"},"Light":{"value":"#2d7bff4d"}}},{"name":"effect/ring-focus/1/color","css":"--ring-focus #1","type":"COLOR","scopes":["EFFECT_COLOR"],"values":{"Dark":{"value":"#0c0c16"},"Light":{"value":"#ffffff"}}},{"name":"effect/ring-focus/2/color","css":"--ring-focus #2","type":"COLOR","scopes":["EFFECT_COLOR"],"values":{"Dark":{"value":"#00e5ff8c"},"Light":{"value":"#2059b899"}}},{"name":"effect/shadow-1/1/color","css":"--shadow-1 #1","type":"COLOR","scopes":["EFFECT_COLOR"],"values":{"Dark":{"value":"#ffffff0a"},"Light":{"value":"#00000000"}}},{"name":"effect/shadow-1/2/y","css":"--shadow-1 #2","type":"FLOAT","scopes":["EFFECT_FLOAT"],"values":{"Dark":{"value":2},"Light":{"value":1}}},{"name":"effect/shadow-1/2/blur","css":"--shadow-1 #2","type":"FLOAT","scopes":["EFFECT_FLOAT"],"values":{"Dark":{"value":8},"Light":{"value":2}}},{"name":"effect/shadow-1/2/color","css":"--shadow-1 #2","type":"COLOR","scopes":["EFFECT_COLOR"],"values":{"Dark":{"value":"#00000066"},"Light":{"value":"#1014300f"}}},{"name":"effect/shadow-2/1/y","css":"--shadow-2 #1","type":"FLOAT","scopes":["EFFECT_FLOAT"],"values":{"Dark":{"value":8},"Light":{"value":18}}},{"name":"effect/shadow-2/1/blur","css":"--shadow-2 #1","type":"FLOAT","scopes":["EFFECT_FLOAT"],"values":{"Dark":{"value":28},"Light":{"value":40}}},{"name":"effect/shadow-2/1/color","css":"--shadow-2 #1","type":"COLOR","scopes":["EFFECT_COLOR"],"values":{"Dark":{"value":"#00000080"},"Light":{"value":"#10143024"}}},{"name":"gradient/haze-1","css":"--grad-haze stop","type":"COLOR","scopes":[],"values":{"Dark":{"value":"#2d7bff2e"},"Light":{"value":"#2d7bff1a"}}},{"name":"gradient/haze-2","css":"--grad-haze stop","type":"COLOR","scopes":[],"values":{"Dark":{"value":"#00e5ff0f"},"Light":{"value":"#00e5ff0d"}}},{"name":"gradient/haze-3","css":"--grad-haze stop","type":"COLOR","scopes":[],"values":{"Dark":{"value":"#00000000"},"Light":{"value":"#00000000"}}}]},{"name":"Scale","modes":["Value"],"variables":[{"name":"font/display","css":"--font-display","type":"STRING","value":"Space Grotesk","scopes":["FONT_FAMILY"]},{"name":"font/body","css":"--font-body","type":"STRING","value":"Sora","scopes":["FONT_FAMILY"]},{"name":"font/mono","css":"--font-mono","type":"STRING","value":"JetBrains Mono","scopes":["FONT_FAMILY"]},{"name":"radius/sm","css":"--r-sm","type":"FLOAT","value":8,"scopes":["CORNER_RADIUS"]},{"name":"radius/md","css":"--r-md","type":"FLOAT","value":12,"scopes":["CORNER_RADIUS"]},{"name":"radius/lg","css":"--r-lg","type":"FLOAT","value":16,"scopes":["CORNER_RADIUS"]},{"name":"radius/xl","css":"--r-xl","type":"FLOAT","value":20,"scopes":["CORNER_RADIUS"]},{"name":"radius/2xl","css":"--r-2xl","type":"FLOAT","value":28,"scopes":["CORNER_RADIUS"]},{"name":"radius/full","css":"--r-full","type":"FLOAT","value":999,"scopes":["CORNER_RADIUS"]},{"name":"space/1","css":"--s-1","type":"FLOAT","value":4,"scopes":["GAP"]},{"name":"space/2","css":"--s-2","type":"FLOAT","value":8,"scopes":["GAP"]},{"name":"space/3","css":"--s-3","type":"FLOAT","value":12,"scopes":["GAP"]},{"name":"space/4","css":"--s-4","type":"FLOAT","value":16,"scopes":["GAP"]},{"name":"space/5","css":"--s-5","type":"FLOAT","value":20,"scopes":["GAP"]},{"name":"space/6","css":"--s-6","type":"FLOAT","value":24,"scopes":["GAP"]},{"name":"space/8","css":"--s-8","type":"FLOAT","value":32,"scopes":["GAP"]},{"name":"space/10","css":"--s-10","type":"FLOAT","value":40,"scopes":["GAP"]},{"name":"space/12","css":"--s-12","type":"FLOAT","value":48,"scopes":["GAP"]},{"name":"space/16","css":"--s-16","type":"FLOAT","value":64,"scopes":["GAP"]},{"name":"space/20","css":"--s-20","type":"FLOAT","value":80,"scopes":["GAP"]},{"name":"layout/container-max","css":"--container-max","type":"FLOAT","value":1200,"scopes":["WIDTH_HEIGHT"]},{"name":"layout/bp-sm","css":"--bp-sm","type":"FLOAT","value":480,"scopes":["WIDTH_HEIGHT"]},{"name":"layout/bp-md","css":"--bp-md","type":"FLOAT","value":768,"scopes":["WIDTH_HEIGHT"]},{"name":"layout/bp-lg","css":"--bp-lg","type":"FLOAT","value":1024,"scopes":["WIDTH_HEIGHT"]},{"name":"layout/bp-xl","css":"--bp-xl","type":"FLOAT","value":1440,"scopes":["WIDTH_HEIGHT"]},{"name":"layout/bp-2xl","css":"--bp-2xl","type":"FLOAT","value":1920,"scopes":["WIDTH_HEIGHT"]},{"name":"layout/container-prose","css":"--container-prose","type":"FLOAT","value":680,"scopes":["WIDTH_HEIGHT"]},{"name":"layout/container-wide","css":"--container-wide","type":"FLOAT","value":1600,"scopes":["WIDTH_HEIGHT"]},{"name":"layout/sidebar-w","css":"--sidebar-w","type":"FLOAT","value":248,"scopes":["WIDTH_HEIGHT"]},{"name":"layout/aside-w","css":"--aside-w","type":"FLOAT","value":320,"scopes":["WIDTH_HEIGHT"]},{"name":"layout/topbar-h","css":"--topbar-h","type":"FLOAT","value":56,"scopes":["WIDTH_HEIGHT"]},{"name":"layout/touch-target","css":"--touch-target","type":"FLOAT","value":44,"scopes":["WIDTH_HEIGHT"]},{"name":"icon/stroke","css":"--icon-stroke","type":"FLOAT","value":1.9,"scopes":["STROKE_FLOAT"]},{"name":"icon/sm","css":"--icon-sm","type":"FLOAT","value":16,"scopes":["WIDTH_HEIGHT"]},{"name":"icon/md","css":"--icon-md","type":"FLOAT","value":20,"scopes":["WIDTH_HEIGHT"]},{"name":"icon/lg","css":"--icon-lg","type":"FLOAT","value":24,"scopes":["WIDTH_HEIGHT"]}]}],"textStyles":[{"name":"Display/XL","css":"--display-xl","family":"Space Grotesk","weight":700,"size":64,"sizeMin":40,"lineHeight":104,"letterSpacing":0,"upper":false},{"name":"Display/L","css":"--display-l","family":"Space Grotesk","weight":700,"size":48,"sizeMin":34,"lineHeight":106,"letterSpacing":0,"upper":false},{"name":"Heading/H1","css":"--h1","family":"Space Grotesk","weight":700,"size":36,"sizeMin":28,"lineHeight":112,"letterSpacing":0,"upper":false},{"name":"Heading/H2","css":"--h2","family":"Space Grotesk","weight":600,"size":28,"lineHeight":118,"letterSpacing":0,"upper":false},{"name":"Heading/H3","css":"--h3","family":"Space Grotesk","weight":600,"size":22,"lineHeight":125,"letterSpacing":0,"upper":false},{"name":"Heading/H4","css":"--h4","family":"Space Grotesk","weight":600,"size":18,"lineHeight":130,"letterSpacing":0,"upper":false},{"name":"Body/LG","css":"--body-lg","family":"Sora","weight":400,"size":18,"lineHeight":160,"letterSpacing":0,"upper":false},{"name":"Body/MD","css":"--body","family":"Sora","weight":400,"size":16,"lineHeight":160,"letterSpacing":0,"upper":false},{"name":"Body/SM","css":"--body-sm","family":"Sora","weight":400,"size":14,"lineHeight":155,"letterSpacing":0,"upper":false},{"name":"Body/Caption","css":"--caption","family":"Sora","weight":400,"size":13,"lineHeight":145,"letterSpacing":0,"upper":false},{"name":"Mono/Label","css":"--mono-label","family":"JetBrains Mono","weight":500,"size":12,"lineHeight":120,"letterSpacing":14,"upper":true},{"name":"UI/Button","css":".np-btn","family":"Space Grotesk","weight":600,"size":14,"lineHeight":100,"letterSpacing":0,"upper":false},{"name":"UI/Button SM","css":".np-btn.np-btn--sm","family":"Space Grotesk","weight":600,"size":13,"lineHeight":100,"letterSpacing":0,"upper":false},{"name":"UI/Button LG","css":".np-btn.np-btn--lg","family":"Space Grotesk","weight":600,"size":15,"lineHeight":100,"letterSpacing":0,"upper":false},{"name":"UI/Tab","css":".np-tab","family":"Space Grotesk","weight":500,"size":14,"lineHeight":100,"letterSpacing":0,"upper":false},{"name":"UI/Input","css":".np-input","family":"Sora","weight":400,"size":14,"lineHeight":140,"letterSpacing":0,"upper":false},{"name":"UI/Nav item","css":".np-navitem","family":"Sora","weight":400,"size":14,"lineHeight":130,"letterSpacing":0,"upper":false},{"name":"UI/Toast title","css":".np-toast__title","family":"Sora","weight":500,"size":14,"lineHeight":135,"letterSpacing":0,"upper":false},{"name":"UI/Metric","css":".np-card__metric","family":"Space Grotesk","weight":700,"size":28,"lineHeight":110,"letterSpacing":0,"upper":false},{"name":"Mono/Badge","css":".np-badge","family":"JetBrains Mono","weight":500,"size":11,"lineHeight":100,"letterSpacing":8,"upper":true},{"name":"Mono/Segment","css":".np-seg__item","family":"JetBrains Mono","weight":500,"size":11,"lineHeight":100,"letterSpacing":8,"upper":true},{"name":"Mono/Field label","css":".np-field__label","family":"JetBrains Mono","weight":500,"size":11,"lineHeight":120,"letterSpacing":10,"upper":true},{"name":"Mono/Switch","css":".np-switch","family":"JetBrains Mono","weight":400,"size":12,"lineHeight":120,"letterSpacing":0,"upper":false},{"name":"Mono/Caption","css":".np-toast__body","family":"JetBrains Mono","weight":400,"size":11,"lineHeight":140,"letterSpacing":0,"upper":false},{"name":"Mono/Data","css":".np-table","family":"JetBrains Mono","weight":400,"size":12,"lineHeight":140,"letterSpacing":0,"upper":false},{"name":"Mono/Table head","css":".np-table th","family":"JetBrains Mono","weight":500,"size":10,"lineHeight":120,"letterSpacing":12,"upper":true},{"name":"Mono/Kbd","css":".np-kbd","family":"JetBrains Mono","weight":500,"size":10,"lineHeight":100,"letterSpacing":0,"upper":false},{"name":"Mono/Code","css":".np-codeblock","family":"JetBrains Mono","weight":400,"size":13,"lineHeight":170,"letterSpacing":0,"upper":false},{"name":"Mono/Tooltip","css":"[data-np-tooltip]::after","family":"JetBrains Mono","weight":500,"size":11,"lineHeight":100,"letterSpacing":6,"upper":false}],"effects":[{"name":"Glow/Cyan","css":"--glow-cyan","aliases":["--glow-accent"],"layers":[{"type":"DROP_SHADOW","vars":{"color":"effect/glow-cyan/1/color"},"x":0,"y":0,"blur":0,"spread":1,"color":"#00e5ff4d"},{"type":"DROP_SHADOW","vars":{"y":"effect/glow-cyan/2/y","blur":"effect/glow-cyan/2/blur","color":"effect/glow-cyan/2/color"},"x":0,"y":0,"blur":22,"spread":0,"color":"#00e5ff47"}]},{"name":"Glow/Blue","css":"--glow-blue","aliases":["--glow-action"],"layers":[{"type":"DROP_SHADOW","vars":{"color":"effect/glow-blue/1/color"},"x":0,"y":0,"blur":0,"spread":1,"color":"#2d7bff59"},{"type":"DROP_SHADOW","vars":{"y":"effect/glow-blue/2/y","blur":"effect/glow-blue/2/blur","color":"effect/glow-blue/2/color"},"x":0,"y":0,"blur":22,"spread":0,"color":"#2d7bff4d"}]},{"name":"Glow/Magenta","css":"--glow-magenta","aliases":[],"layers":[{"type":"DROP_SHADOW","vars":{"color":"effect/glow-magenta/1/color"},"x":0,"y":0,"blur":0,"spread":1,"color":"#ff2d9b59"},{"type":"DROP_SHADOW","vars":{"color":"effect/glow-magenta/2/color"},"x":0,"y":0,"blur":22,"spread":0,"color":"#ff2d9b4d"}]},{"name":"Glow/Magenta hover","css":"--glow-magenta + .np-btn--secondary:hover","aliases":[],"layers":[{"type":"DROP_SHADOW","vars":{"color":"effect/glow-magenta/1/color"},"x":0,"y":0,"blur":0,"spread":1,"color":"#ff2d9b59"},{"type":"DROP_SHADOW","vars":{"color":"effect/glow-magenta/2/color"},"x":0,"y":0,"blur":22,"spread":0,"color":"#ff2d9b4d"},{"type":"DROP_SHADOW","vars":{"color":"effect/glow-magenta-hover/1/color"},"x":0,"y":0,"blur":26,"spread":0,"color":"#ff2d9b4d"}]},{"name":"Glow/Danger","css":"--glow-danger","aliases":[],"layers":[{"type":"DROP_SHADOW","vars":{"color":"effect/glow-danger/1/color"},"x":0,"y":0,"blur":0,"spread":1,"color":"#ff3b6b59"},{"type":"DROP_SHADOW","vars":{"color":"effect/glow-danger/2/color"},"x":0,"y":0,"blur":22,"spread":0,"color":"#ff3b6b4d"}]},{"name":"Glow/Soft","css":"--glow-soft","aliases":[],"layers":[{"type":"DROP_SHADOW","vars":{"y":"effect/glow-soft/1/y","blur":"effect/glow-soft/1/blur","color":"effect/glow-soft/1/color"},"x":0,"y":0,"blur":18,"spread":0,"color":"#00e5ff2e"}]},{"name":"State/Hover glow","css":"--state-hover-glow","aliases":[],"layers":[{"type":"DROP_SHADOW","vars":{"color":"effect/state-hover-glow/1/color"},"x":0,"y":0,"blur":0,"spread":1,"color":"#00e5ff80"},{"type":"DROP_SHADOW","vars":{"y":"effect/state-hover-glow/2/y","blur":"effect/state-hover-glow/2/blur","color":"effect/state-hover-glow/2/color"},"x":0,"y":0,"blur":26,"spread":0,"color":"#00e5ff73"}]},{"name":"State/Focus ring","css":"--ring-focus","aliases":[],"layers":[{"type":"DROP_SHADOW","vars":{"color":"effect/ring-focus/1/color"},"x":0,"y":0,"blur":0,"spread":2,"color":"#0c0c16"},{"type":"DROP_SHADOW","vars":{"color":"effect/ring-focus/2/color"},"x":0,"y":0,"blur":0,"spread":4,"color":"#00e5ff8c"}]},{"name":"Elevation/Flat","css":"--shadow-1","aliases":["--elevation-flat"],"layers":[{"type":"INNER_SHADOW","vars":{"color":"effect/shadow-1/1/color"},"x":0,"y":1,"blur":0,"spread":0,"color":"#ffffff0a"},{"type":"DROP_SHADOW","vars":{"y":"effect/shadow-1/2/y","blur":"effect/shadow-1/2/blur","color":"effect/shadow-1/2/color"},"x":0,"y":2,"blur":8,"spread":0,"color":"#00000066"}]},{"name":"Elevation/Overlay","css":"--shadow-2","aliases":["--elevation-overlay"],"layers":[{"type":"DROP_SHADOW","vars":{"y":"effect/shadow-2/1/y","blur":"effect/shadow-2/1/blur","color":"effect/shadow-2/1/color"},"x":0,"y":8,"blur":28,"spread":0,"color":"#00000080"}]},{"name":"Elevation/Overlay glow","css":"--shadow-2 + --glow-soft","aliases":["--elevation-overlay"],"layers":[{"type":"DROP_SHADOW","vars":{"y":"effect/shadow-2/1/y","blur":"effect/shadow-2/1/blur","color":"effect/shadow-2/1/color"},"x":0,"y":8,"blur":28,"spread":0,"color":"#00000080"},{"type":"DROP_SHADOW","vars":{"y":"effect/glow-soft/1/y","blur":"effect/glow-soft/1/blur","color":"effect/glow-soft/1/color"},"x":0,"y":0,"blur":18,"spread":0,"color":"#00e5ff2e"}]}],"gradients":[{"name":"Gradient/Pulse","css":"--grad-pulse","aliases":["--color-action-primary"],"kind":"linear","angle":"135deg","stops":[{"position":0,"primitive":"neon/blue","color":"#2d7bff"},{"position":1,"primitive":"neon/cyan","color":"#00e5ff"}]},{"name":"Gradient/Pulse hot","css":"--grad-pulse-hot","aliases":["--color-action-secondary"],"kind":"linear","angle":"135deg","stops":[{"position":0,"primitive":"neon/violet","color":"#7c4dff"},{"position":1,"primitive":"neon/magenta","color":"#ff2d9b"}]},{"name":"Gradient/Haze","css":"--grad-haze","aliases":[],"kind":"radial","angle":"120% 120% at 0% 0%","stops":[{"position":0,"theme":"gradient/haze-1","color":"#2d7bff2e","values":{"Dark":"#2d7bff2e","Light":"#2d7bff1a"}},{"position":0.4,"theme":"gradient/haze-2","color":"#00e5ff0f","values":{"Dark":"#00e5ff0f","Light":"#00e5ff0d"}},{"position":0.7,"theme":"gradient/haze-3","color":"#00000000","values":{"Dark":"#00000000","Light":"#00000000"}}]}],"icons":{"activity":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#eef1fb\" stroke-width=\"1.9\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2\" /></svg>","arrow-right":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#eef1fb\" stroke-width=\"1.9\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M5 12h14\" /><path d=\"m12 5 7 7-7 7\" /></svg>","arrow-up-right":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#eef1fb\" stroke-width=\"1.9\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M7 7h10v10\" /><path d=\"M7 17 17 7\" /></svg>","bell":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#eef1fb\" stroke-width=\"1.9\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M10.268 21a2 2 0 0 0 3.464 0\" /><path d=\"M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326\" /></svg>","check":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#eef1fb\" stroke-width=\"1.9\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M20 6 9 17l-5-5\" /></svg>","chevron-down":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#eef1fb\" stroke-width=\"1.9\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"m6 9 6 6 6-6\" /></svg>","chevron-right":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#eef1fb\" stroke-width=\"1.9\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"m9 18 6-6-6-6\" /></svg>","circle-alert":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#eef1fb\" stroke-width=\"1.9\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><circle cx=\"12\" cy=\"12\" r=\"10\" /><line x1=\"12\" x2=\"12\" y1=\"8\" y2=\"12\" /><line x1=\"12\" x2=\"12.01\" y1=\"16\" y2=\"16\" /></svg>","circle-check":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#eef1fb\" stroke-width=\"1.9\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><circle cx=\"12\" cy=\"12\" r=\"10\" /><path d=\"m9 12 2 2 4-4\" /></svg>","command":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#eef1fb\" stroke-width=\"1.9\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3\" /></svg>","copy":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#eef1fb\" stroke-width=\"1.9\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><rect width=\"14\" height=\"14\" x=\"8\" y=\"8\" rx=\"2\" ry=\"2\" /><path d=\"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2\" /></svg>","cpu":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#eef1fb\" stroke-width=\"1.9\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M12 20v2\" /><path d=\"M12 2v2\" /><path d=\"M17 20v2\" /><path d=\"M17 2v2\" /><path d=\"M2 12h2\" /><path d=\"M2 17h2\" /><path d=\"M2 7h2\" /><path d=\"M20 12h2\" /><path d=\"M20 17h2\" /><path d=\"M20 7h2\" /><path d=\"M7 20v2\" /><path d=\"M7 2v2\" /><rect x=\"4\" y=\"4\" width=\"16\" height=\"16\" rx=\"2\" /><rect x=\"8\" y=\"8\" width=\"8\" height=\"8\" rx=\"1\" /></svg>","database":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#eef1fb\" stroke-width=\"1.9\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><ellipse cx=\"12\" cy=\"5\" rx=\"9\" ry=\"3\" /><path d=\"M3 5V19A9 3 0 0 0 21 19V5\" /><path d=\"M3 12A9 3 0 0 0 21 12\" /></svg>","download":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#eef1fb\" stroke-width=\"1.9\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M12 15V3\" /><path d=\"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4\" /><path d=\"m7 10 5 5 5-5\" /></svg>","git-branch":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#eef1fb\" stroke-width=\"1.9\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M15 6a9 9 0 0 0-9 9V3\" /><circle cx=\"18\" cy=\"6\" r=\"3\" /><circle cx=\"6\" cy=\"18\" r=\"3\" /></svg>","globe":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#eef1fb\" stroke-width=\"1.9\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><circle cx=\"12\" cy=\"12\" r=\"10\" /><path d=\"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20\" /><path d=\"M2 12h20\" /></svg>","info":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#eef1fb\" stroke-width=\"1.9\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><circle cx=\"12\" cy=\"12\" r=\"10\" /><path d=\"M12 16v-4\" /><path d=\"M12 8h.01\" /></svg>","layers":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#eef1fb\" stroke-width=\"1.9\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z\" /><path d=\"M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12\" /><path d=\"M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17\" /></svg>","lock":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#eef1fb\" stroke-width=\"1.9\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><rect width=\"18\" height=\"11\" x=\"3\" y=\"11\" rx=\"2\" ry=\"2\" /><path d=\"M7 11V7a5 5 0 0 1 10 0v4\" /></svg>","play":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#eef1fb\" stroke-width=\"1.9\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z\" /></svg>","plus":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#eef1fb\" stroke-width=\"1.9\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M5 12h14\" /><path d=\"M12 5v14\" /></svg>","refresh-cw":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#eef1fb\" stroke-width=\"1.9\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8\" /><path d=\"M21 3v5h-5\" /><path d=\"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16\" /><path d=\"M8 16H3v5\" /></svg>","rocket":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#eef1fb\" stroke-width=\"1.9\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5\" /><path d=\"M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09\" /><path d=\"M9 12a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.4 22.4 0 0 1-4 2z\" /><path d=\"M9 12H4s.55-3.03 2-4c1.62-1.08 5 .05 5 .05\" /></svg>","search":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#eef1fb\" stroke-width=\"1.9\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"m21 21-4.34-4.34\" /><circle cx=\"11\" cy=\"11\" r=\"8\" /></svg>","server":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#eef1fb\" stroke-width=\"1.9\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><rect width=\"20\" height=\"8\" x=\"2\" y=\"2\" rx=\"2\" ry=\"2\" /><rect width=\"20\" height=\"8\" x=\"2\" y=\"14\" rx=\"2\" ry=\"2\" /><line x1=\"6\" x2=\"6.01\" y1=\"6\" y2=\"6\" /><line x1=\"6\" x2=\"6.01\" y1=\"18\" y2=\"18\" /></svg>","settings":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#eef1fb\" stroke-width=\"1.9\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915\" /><circle cx=\"12\" cy=\"12\" r=\"3\" /></svg>","sliders-horizontal":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#eef1fb\" stroke-width=\"1.9\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M10 5H3\" /><path d=\"M12 19H3\" /><path d=\"M14 3v4\" /><path d=\"M16 17v4\" /><path d=\"M21 12h-9\" /><path d=\"M21 19h-5\" /><path d=\"M21 5h-7\" /><path d=\"M8 10v4\" /><path d=\"M8 12H3\" /></svg>","terminal":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#eef1fb\" stroke-width=\"1.9\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M12 19h8\" /><path d=\"m4 17 6-6-6-6\" /></svg>","trash-2":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#eef1fb\" stroke-width=\"1.9\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M10 11v6\" /><path d=\"M14 11v6\" /><path d=\"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6\" /><path d=\"M3 6h18\" /><path d=\"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2\" /></svg>","triangle-alert":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#eef1fb\" stroke-width=\"1.9\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3\" /><path d=\"M12 9v4\" /><path d=\"M12 17h.01\" /></svg>","upload":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#eef1fb\" stroke-width=\"1.9\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M12 3v12\" /><path d=\"m17 8-5-5-5 5\" /><path d=\"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4\" /></svg>","user":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#eef1fb\" stroke-width=\"1.9\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2\" /><circle cx=\"12\" cy=\"7\" r=\"4\" /></svg>","x":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#eef1fb\" stroke-width=\"1.9\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M18 6 6 18\" /><path d=\"m6 6 12 12\" /></svg>","zap":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#eef1fb\" stroke-width=\"1.9\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ><path d=\"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z\" /></svg>"}};
// @generated:end

const NP = (() => {
  const D = NP_DATA;
  const NS = 'neonpulse';                                   // shared plugin data namespace
  const DOCS = 'https://kujoh1.github.io/Designsystem-Neonpulse/';
  const PAGES = ['Cover', 'Foundations', 'Components'];
  const S = { vars: {}, cols: {}, text: {}, paint: {}, effect: {}, icons: {}, sets: {}, fonts: {} };
  const warnings = [];
  const warn = msg => { if (warnings.indexOf(msg) < 0) warnings.push(msg); };

  /* ---------- values ---------- */
  function rgba(hex) {
    const h = hex.slice(1), n = i => parseInt(h.slice(i, i + 2), 16) / 255;
    return { r: n(0), g: n(2), b: n(4), a: h.length === 8 ? n(6) : 1 };
  }
  const rgb = hex => { const c = rgba(hex); return { r: c.r, g: c.g, b: c.b }; };
  const primitive = name => D.collections[0].variables.find(x => x.name === name).value;
  function v(name) {
    const x = S.vars[name];
    if (!x) throw new Error(`Variable "${name}" missing — run the "variables" phase first`);
    return x;
  }
  // a solid paint bound to a variable; opacity mirrors CSS color-mix(… p%, transparent)
  function fill(name, opacity) {
    const base = { type: 'SOLID', color: { r: 0, g: 0, b: 0 }, opacity: opacity == null ? 1 : opacity };
    return figma.variables.setBoundVariableForPaint(base, 'color', v(name));
  }
  const paint = spec => (Array.isArray(spec) ? fill(spec[0], spec[1]) : fill(spec));

  /* ---------- index what the file already has ---------- */
  async function index() {
    const cols = await figma.variables.getLocalVariableCollectionsAsync();
    const vars = await figma.variables.getLocalVariablesAsync();
    for (const spec of D.collections) {
      const col = cols.find(c => c.name === spec.name);
      if (!col) continue;
      const modeIds = {};
      for (const m of col.modes) modeIds[m.name] = m.modeId;
      S.cols[spec.name] = { col, modeIds };
      for (const x of vars) if (x.variableCollectionId === col.id) S.vars[x.name] = x;
    }
    for (const s of await figma.getLocalTextStylesAsync()) S.text[s.name] = s;
    for (const s of await figma.getLocalPaintStylesAsync()) S.paint[s.name] = s;
    for (const s of await figma.getLocalEffectStylesAsync()) S.effect[s.name] = s;
  }
  async function ensureFonts() {
    const fonts = {};
    for (const name in S.text) { const f = S.text[name].fontName; fonts[f.family + '|' + f.style] = f; }
    fonts['Inter|Regular'] = { family: 'Inter', style: 'Regular' };
    await Promise.all(Object.keys(fonts).map(k => figma.loadFontAsync(fonts[k])
      .catch(() => warn(`Font ${fonts[k].family} ${fonts[k].style} (used by a text style) is not available.`))));
  }
  // components live on their own page; other phases instance them from there
  async function registerSets() {
    const page = figma.root.children.find(p => p.name === 'Components');
    if (!page) return;
    await page.loadAsync();
    for (const c of page.findAllWithCriteria({ types: ['COMPONENT'] })) if (c.name.indexOf('Icon/') === 0) S.icons[c.name.slice(5)] = c;
    for (const item of LIB) {
      const doc = page.findChild(n => n.getSharedPluginData(NS, 'doc') === item[0]);
      const node = doc && doc.findOne(n => n.getSharedPluginData(NS, 'component') === item[0]);
      if (node) S.sets[item[0]] = node;
    }
  }

  /* ============================================================
     PHASE · variables
     ============================================================ */
  function describeVar(t) {
    if (/^effect\//.test(t.name)) return `Layer of ${t.css.replace(/ #\d+$/, '')}. Bound by an effect style; follows the theme.`;
    if (/^gradient\//.test(t.name)) return `Gradient stop of ${t.css.replace(/ stop$/, '')}. Bound by a paint style.`;
    if (/^(dark|light)\//.test(t.name)) return `${t.css} in the ${t.name.split('/')[0]} theme. Primitive: bind the Theme alias instead.`;
    return `CSS: var(${t.css})`;
  }
  function toValue(type, raw) {
    if (raw && typeof raw === 'object') {
      if (raw.alias) return figma.variables.createVariableAlias(v(raw.alias));
      raw = raw.value;
    }
    return type === 'COLOR' ? rgba(raw) : raw;
  }
  async function phaseVariables() {
    const out = { created: [], updated: 0, orphans: [], collections: {} };
    const cols = await figma.variables.getLocalVariableCollectionsAsync();
    const all = await figma.variables.getLocalVariablesAsync();
    // pass 1 — collections, modes and variables (aliases need every target to exist first)
    for (const spec of D.collections) {
      const col = cols.find(c => c.name === spec.name) || figma.variables.createVariableCollection(spec.name);
      const modeIds = {};
      spec.modes.forEach((name, i) => {
        let mode = col.modes.find(m => m.name === name);
        if (!mode && i === 0 && col.modes.length === 1 && spec.modes.indexOf(col.modes[0].name) < 0) {
          col.renameMode(col.modes[0].modeId, name);           // never leave “Mode 1”
          mode = col.modes[0];
        }
        if (mode) { modeIds[name] = mode.modeId; return; }
        try { modeIds[name] = col.addMode(name); }
        catch (e) { warn(`${spec.name}: mode "${name}" could not be added (${e.message}). Your Figma plan may allow only one mode per collection — the ${spec.modes[0]} values are in place.`); }
      });
      if (spec.hidden) col.hiddenFromPublishing = true;
      S.cols[spec.name] = { col, modeIds };
      out.collections[spec.name] = { id: col.id, modes: Object.keys(modeIds) };
      const existing = {};
      for (const x of all) if (x.variableCollectionId === col.id) existing[x.name] = x;
      for (const t of spec.variables) {
        let x = existing[t.name];
        if (x && x.resolvedType !== t.type) { x.remove(); x = null; }
        if (x) out.updated++;
        else { x = figma.variables.createVariable(t.name, col, t.type); out.created.push(t.name); }
        S.vars[t.name] = x;
      }
      const wanted = {};
      for (const t of spec.variables) wanted[t.name] = 1;
      for (const name in existing) if (!wanted[name]) out.orphans.push(`${spec.name}/${name}`);
    }
    // pass 2 — values, scopes, code syntax
    for (const spec of D.collections) {
      const modeIds = S.cols[spec.name].modeIds;
      for (const t of spec.variables) {
        const x = S.vars[t.name];
        for (const mode of spec.modes) {
          if (!modeIds[mode]) continue;
          x.setValueForMode(modeIds[mode], toValue(t.type, spec.modes.length === 1 ? t.value : t.values[mode]));
        }
        x.scopes = t.scopes || [];                             // primitives: hidden from every picker
        if (/^--[\w-]+$/.test(t.css)) x.setVariableCodeSyntax('WEB', `var(${t.css})`);
        x.description = describeVar(t);
      }
    }
    if (out.orphans.length) warn(`Variables not in colors_and_type.css (kept, review them): ${out.orphans.join(', ')}`);
    return out;
  }

  /* ============================================================
     PHASE · styles  (text · gradient paint · effect)
     ============================================================ */
  const WEIGHTS = { 100: ['thin'], 200: ['extralight', 'ultralight'], 300: ['light'], 400: ['regular', 'normal', 'book'],
    500: ['medium'], 600: ['semibold', 'demibold'], 700: ['bold'], 800: ['extrabold', 'ultrabold'], 900: ['black', 'heavy'] };
  let fontList = null;
  async function fontFor(family, weight) {
    const key = family + '|' + weight;
    if (S.fonts[key]) return S.fonts[key];
    if (!fontList) fontList = await figma.listAvailableFontsAsync();
    const norm = s => s.toLowerCase().replace(/[\s_-]/g, '');
    const pick = fam => {
      const styles = fontList.filter(f => f.fontName.family === fam).map(f => f.fontName.style);
      for (const w of WEIGHTS[weight] || []) {
        const hit = styles.find(s => norm(s) === w);
        if (hit) return { family: fam, style: hit };
      }
      return null;
    };
    let font = pick(family);
    if (!font) {
      font = pick('Inter') || { family: 'Inter', style: 'Regular' };
      warn(`Font "${family}" ${weight} is not available in Figma — using ${font.family} ${font.style}. Enable the font, then run "Sync tokens" again.`);
    }
    await figma.loadFontAsync(font);
    S.fonts[key] = font;
    return font;
  }
  function linearTransform(angle) {                          // CSS angle → Figma gradient transform
    const a = parseFloat(angle) * Math.PI / 180, dx = Math.sin(a), dy = -Math.cos(a), L = Math.abs(dx) + Math.abs(dy);
    return [[dx / L, dy / L, 0.5 - 0.5 * (dx + dy) / L], [-dy / L, dx / L, 0.5 - 0.5 * (dx - dy) / L]];
  }
  function radialTransform(head) {                           // "120% 120% at 0% 0%"
    const m = /([\d.]+)%\s+([\d.]+)%\s+at\s+([\d.]+)%\s+([\d.]+)%/.exec(head) || [0, 50, 50, 50, 50];
    const rx = m[1] / 100, ry = m[2] / 100, cx = m[3] / 100, cy = m[4] / 100;
    return [[0.5 / rx, 0, 0.5 - 0.5 * cx / rx], [0, 0.5 / ry, 0.5 - 0.5 * cy / ry]];
  }
  const FX_FIELD = { x: 'offsetX', y: 'offsetY', blur: 'radius', spread: 'spread', color: 'color' };
  async function phaseStyles() {
    await index();
    const out = { text: [], paint: [], effect: [] };
    const familyVar = {};
    for (const t of D.collections[2].variables) if (t.type === 'STRING') familyVar[t.value] = t.name;

    for (const t of D.textStyles) {
      const font = await fontFor(t.family, t.weight);
      const s = S.text[t.name] || figma.createTextStyle();
      s.name = t.name;
      s.fontName = font;
      s.fontSize = t.size;
      s.lineHeight = { unit: 'PERCENT', value: t.lineHeight };
      s.letterSpacing = { unit: 'PERCENT', value: t.letterSpacing };
      s.textCase = t.upper ? 'UPPER' : 'ORIGINAL';
      s.description = (t.css.indexOf('--') === 0 ? `CSS: font: var(${t.css})` : `CSS: ${t.css}`) +
        (t.upper ? ' · uppercase' : '') + (t.sizeMin ? ` · fluid ${t.sizeMin}–${t.size}px in code (desktop size here)` : '');
      if (familyVar[t.family] && font.family === t.family) {
        try { s.setBoundVariable('fontFamily', v(familyVar[t.family])); }
        catch (e) { warn(`Text styles keep a fixed font family (binding to ${familyVar[t.family]} failed: ${e.message}).`); }
      }
      S.text[t.name] = s;
      out.text.push(t.name);
    }

    for (const g of D.gradients) {
      const s = S.paint[g.name] || figma.createPaintStyle();
      s.name = g.name;
      s.description = `CSS: var(${g.css})` + (g.aliases.length ? ` · used as ${g.aliases.map(a => `var(${a})`).join(', ')}` : '');
      const make = bind => ({
        type: g.kind === 'linear' ? 'GRADIENT_LINEAR' : 'GRADIENT_RADIAL',
        gradientTransform: g.kind === 'linear' ? linearTransform(g.angle) : radialTransform(g.angle),
        gradientStops: g.stops.map(st => {
          const stop = { position: st.position, color: rgba(st.color) };
          const name = st.primitive || st.theme;
          if (bind && S.vars[name]) stop.boundVariables = { color: figma.variables.createVariableAlias(S.vars[name]) };
          return stop;
        }),
      });
      try { s.paints = [make(true)]; }
      catch (e) { s.paints = [make(false)]; warn(`${g.name}: gradient stops could not bind to variables (${e.message}) — raw colours used.`); }
      S.paint[g.name] = s;
      out.paint.push(g.name);
    }

    for (const e of D.effects) {
      const s = S.effect[e.name] || figma.createEffectStyle();
      s.name = e.name;
      s.description = `CSS: ${e.css.split(' + ').map(c => (c.indexOf('--') === 0 ? `var(${c})` : c)).join(' + ')}` +
        (e.aliases.length ? ` · alias ${e.aliases.map(a => `var(${a})`).join(', ')}` : '') +
        (e.name.indexOf('Glow/') === 0 || e.name.indexOf('State/') === 0 ? ' · a state, never ambient' : '');
      s.effects = e.layers.map(l => {
        let fx = { type: l.type, color: rgba(l.color), offset: { x: l.x, y: l.y }, radius: l.blur, spread: l.spread,
          visible: true, blendMode: 'NORMAL' };
        if (l.type === 'DROP_SHADOW') fx.showShadowBehindNode = false;
        for (const f in l.vars) fx = figma.variables.setBoundVariableForEffect(fx, FX_FIELD[f], v(l.vars[f]));
        return fx;
      });
      S.effect[e.name] = s;
      out.effect.push(e.name);
    }
    return out;
  }

  /* ============================================================
     Node helpers (components + docs)
     ============================================================ */
  const CORNERS = ['topLeftRadius', 'topRightRadius', 'bottomRightRadius', 'bottomLeftRadius'];
  function num(node, field, value) {                         // number, or a variable name to bind
    if (typeof value === 'string') node.setBoundVariable(field, v(value));
    else node[field] = value;
  }
  function radius(node, value) { for (const c of CORNERS) num(node, c, value); }
  function box(name, o) {
    o = o || {};
    const f = o.component ? figma.createComponent() : figma.createFrame();
    f.name = name;
    f.fills = o.fill ? [paint(o.fill)] : [];
    f.clipsContent = !!o.clip;
    const dir = o.dir || 'HORIZONTAL';
    if (dir !== 'NONE') f.layoutMode = dir;
    if (o.w || o.h) f.resize(o.w || 100, o.h || 100);        // before sizing modes: resize() resets them
    if (dir !== 'NONE') {
      const horiz = dir === 'HORIZONTAL';
      f.primaryAxisSizingMode = (horiz ? o.w : o.h) ? 'FIXED' : 'AUTO';
      f.counterAxisSizingMode = (horiz ? o.h : o.w) ? 'FIXED' : 'AUTO';
      f.primaryAxisAlignItems = o.justify || 'MIN';
      f.counterAxisAlignItems = o.align || 'CENTER';
      if (o.wrap) { f.layoutWrap = 'WRAP'; num(f, 'counterAxisSpacing', o.rowGap == null ? 0 : o.rowGap); }
      num(f, 'itemSpacing', o.gap || 0);
      const p = [].concat(o.pad == null ? 0 : o.pad);        // CSS order: [all] · [y, x] · [t, r, b, l]
      const t = p[0], r = p.length > 1 ? p[1] : t, b = p.length > 2 ? p[2] : t, l = p.length > 3 ? p[3] : r;
      num(f, 'paddingTop', t); num(f, 'paddingRight', r); num(f, 'paddingBottom', b); num(f, 'paddingLeft', l);
    }
    if (o.stroke) { f.strokes = [paint(o.stroke)]; f.strokeWeight = 1; f.strokeAlign = 'INSIDE'; }
    if (o.radius != null) radius(f, o.radius);
    return f;
  }
  function add(parent, kids) { for (const k of kids) if (k) parent.appendChild(k); return parent; }
  function edge(node, side, color) {                         // a single hairline (border-bottom etc.)
    node.strokes = [paint(color)];
    node.strokeAlign = 'INSIDE';
    node.strokeTopWeight = side === 'TOP' ? 1 : 0;
    node.strokeBottomWeight = side === 'BOTTOM' ? 1 : 0;
    node.strokeLeftWeight = 0;
    node.strokeRightWeight = 0;
  }
  async function text(chars, style, color, o) {
    o = o || {};
    const st = S.text[style];
    if (!st) throw new Error(`Text style "${style}" missing — run the "styles" phase first`);
    const t = figma.createText();
    t.fontName = st.fontName;
    await t.setTextStyleIdAsync(st.id);
    t.characters = chars;
    t.fills = [paint(color)];
    t.name = o.name || chars.slice(0, 48);
    if (o.width) { t.textAutoResize = 'HEIGHT'; t.resize(o.width, t.height); }
    if (o.align) t.textAlignHorizontal = o.align;
    return t;
  }
  function stretch(t) { t.textAutoResize = 'HEIGHT'; t.layoutSizingHorizontal = 'FILL'; return t; }
  function dot(size, color, name) {
    const e = figma.createEllipse();
    e.name = name || 'Dot';
    e.resize(size, size);
    e.fills = [paint(color)];
    return e;
  }
  const useStyle = (node, kind, name) => {
    const s = S[kind][name];
    if (!s) throw new Error(`Style "${name}" missing — run the "styles" phase first`);
    return kind === 'paint' ? node.setFillStyleIdAsync(s.id) : node.setEffectStyleIdAsync(s.id);
  };
  function icon(name, size, color, nodeName) {
    const comp = S.icons[name];
    if (!comp) throw new Error(`Icon "${name}" missing`);
    const inst = comp.createInstance();
    inst.name = nodeName || name;
    if (size !== 24) inst.rescale(size / 24);                // scales the stroke too, like an SVG viewBox
    if (color) tint(inst, color);
    return inst;
  }
  function tint(inst, color) {                               // every icon has one “Glyph” vector → overrides survive swaps
    const g = inst.findOne(n => n.name === 'Glyph');
    if (g) g.strokes = [paint(color)];
  }
  function findIn(node, name) {                              // depth-first, never into nested instances
    for (const c of node.children || []) {
      if (c.name === name) return c;
      if (c.type !== 'INSTANCE' && 'children' in c) { const hit = findIn(c, name); if (hit) return hit; }
    }
    return null;
  }
  function bindProps(owner, refs) {                          // refs: { nodeName: { characters|visible|mainComponent: key } }
    const variants = owner.type === 'COMPONENT_SET' ? owner.children : [owner];
    for (const variant of variants) for (const name in refs) {
      const n = findIn(variant, name);
      if (n) n.componentPropertyReferences = refs[name];
    }
  }
  const propKey = (owner, name) => Object.keys(owner.componentPropertyDefinitions).find(k => k.split('#')[0] === name);
  function instanceOf(key, props) {
    const owner = S.sets[key];
    if (!owner) throw new Error(`Component "${key}" missing`);
    const inst = (owner.type === 'COMPONENT_SET' ? owner.defaultVariant : owner).createInstance();
    if (props) {
      const p = {};
      for (const k in props) p[propKey(owner, k) || k] = props[k];
      inst.setProperties(p);
    }
    return inst;
  }
  function iconPrefs() { return Object.keys(S.icons).map(n => ({ type: 'COMPONENT', key: S.icons[n].key })); }
  function combine(comps, parent, name, cols) {
    const set = figma.combineAsVariants(comps, parent);
    set.name = name;
    const gap = 24, kids = set.children, colW = [], rowH = [];
    kids.forEach((k, i) => { const c = i % cols, r = Math.floor(i / cols); colW[c] = Math.max(colW[c] || 0, k.width); rowH[r] = Math.max(rowH[r] || 0, k.height); });
    const offset = (sizes, n) => sizes.slice(0, n).reduce((a, b) => a + b + gap, gap);
    kids.forEach((k, i) => { k.x = offset(colW, i % cols); k.y = offset(rowH, Math.floor(i / cols)); });
    set.resizeWithoutConstraints(offset(colW, colW.length), offset(rowH, rowH.length));
    set.fills = [];
    set.strokes = [paint('border/subtle')];
    set.dashPattern = [6, 6];
    radius(set, 'radius/lg');
    return set;
  }
  function nextY(page, except) {                             // stack doc frames in one column at x = 0
    let y = 0;
    for (const n of page.children) if (n !== except && n.x >= 0) y = Math.max(y, n.y + n.height + 120);
    return y;
  }
  async function docFrame(key, group, title, description, link) {
    const f = box(title, { dir: 'VERTICAL', gap: 28, pad: 48, fill: 'bg/page', radius: 'radius/2xl', align: 'MIN' });
    f.setSharedPluginData(NS, 'doc', key);
    const head = box('Header', { dir: 'VERTICAL', gap: 10, align: 'MIN' });
    add(head, [
      await text(group, 'Mono/Label', 'text/accent', { name: 'Group' }),
      await text(title, 'Heading/H2', 'text/default', { name: 'Title' }),
      await text(description, 'Body/SM', 'text/secondary', { name: 'Description', width: 760 }),
      link ? await text(`Docs: ${DOCS}${link}`, 'Mono/Caption', 'text/muted', { name: 'Link' }) : null,
    ]);
    f.appendChild(head);
    return f;
  }
  async function usePage(name) {
    for (const n of PAGES) {
      if (figma.root.children.some(p => p.name === n)) continue;
      const cur = figma.currentPage;                         // reuse the untouched “Page 1” of a new file
      if (/^Page \d+$/.test(cur.name) && cur.children.length === 0) cur.name = n;
      else figma.createPage().name = n;
    }
    PAGES.forEach((n, i) => figma.root.insertChild(i, figma.root.children.find(p => p.name === n)));
    const page = figma.root.children.find(p => p.name === name);
    await figma.setCurrentPageAsync(page);
    page.backgrounds = [{ type: 'SOLID', color: rgb(primitive('dark/bg/0')), visible: true, opacity: 1, blendMode: 'NORMAL' }];
    return page;
  }
  function clearDocs(page) { for (const n of page.children.slice()) if (n.getSharedPluginData(NS, 'doc')) n.remove(); }

  /* ============================================================
     Components
     ============================================================ */
  async function buildIcons(page) {
    for (const c of page.findAllWithCriteria({ types: ['COMPONENT'] })) if (c.name.indexOf('Icon/') === 0) S.icons[c.name.slice(5)] = c;
    const missing = Object.keys(D.icons).filter(n => !S.icons[n]);
    if (!missing.length) return [];
    let doc = page.findChild(n => n.getSharedPluginData(NS, 'doc') === 'Icons');
    if (!doc) {
      doc = await docFrame('Icons', 'Foundations', 'Icons',
        'Lucide outline 1.17.0 at the system stroke. Each icon is one “Glyph” vector, so its colour override survives an instance swap. Use the semantic map: LIVE → activity, SUCCESS → circle-check, WARNING → triangle-alert, DANGER → circle-alert, INFO → info. No emoji.', '#icons');
      doc.appendChild(box('Glyphs', { wrap: true, w: 760, gap: 20, rowGap: 20 }));
      doc.x = 0; doc.y = nextY(page, doc);
    }
    const grid = doc.findChild(n => n.name === 'Glyphs');
    const created = [];
    for (const name of missing) {
      const svg = figma.createNodeFromSvg(D.icons[name]);
      const glyph = figma.flatten(svg.children.slice(), svg);
      glyph.name = 'Glyph';
      glyph.constraints = { horizontal: 'SCALE', vertical: 'SCALE' };
      glyph.strokes = [paint('text/default')];
      const comp = figma.createComponentFromNode(svg);
      comp.name = `Icon/${name}`;
      comp.fills = [];
      comp.description = `Lucide “${name}”. Ink follows the parent: override the Glyph stroke with a Theme text/feedback colour.`;
      grid.appendChild(comp);
      S.icons[name] = comp;
      created.push({ name: comp.name, id: comp.id });
    }
    return created;
  }

  const FEEDBACK_ICON = { Info: 'info', Success: 'circle-check', Warning: 'triangle-alert', Danger: 'circle-alert' };

  async function buildButton(doc) {
    const SIZES = { SM: [8, 13, 'UI/Button SM'], MD: [11, 18, 'UI/Button'], LG: [13, 22, 'UI/Button LG'] };
    const INTENTS = {
      Primary:   { paint: 'Gradient/Pulse', ink: 'text/on-accent', glow: 'Glow/Blue', hover: { glow: 'State/Hover glow' } },
      Secondary: { paint: 'Gradient/Pulse hot', ink: 'text/on-accent', glow: 'Glow/Magenta', hover: { glow: 'Glow/Magenta hover' } },
      Ghost:     { fill: 'surface/default', ink: 'text/default', stroke: 'border/default', hover: { stroke: 'border/focus', ink: 'text/accent' } },
      Danger:    { fill: ['feedback/danger-fill', 0], ink: 'feedback/danger', stroke: ['feedback/danger', 0.45],
                   hover: { fill: 'feedback/danger-fill', stroke: 'feedback/danger', glow: 'Glow/Danger' } },
    };
    const STATES = ['Rest', 'Hover', 'Focus', 'Disabled', 'Loading'];
    const comps = [];
    for (const intent in INTENTS) for (const size in SIZES) for (const state of STATES) {
      const I = INTENTS[intent], Z = SIZES[size];
      let s = { paint: I.paint, fill: I.fill, ink: I.ink, stroke: I.stroke, glow: I.glow };
      if (state === 'Hover') s = Object.assign(s, I.hover);
      if (state === 'Focus') s.glow = 'State/Focus ring';
      if (state === 'Disabled') s = { fill: 'surface/default', ink: 'text/disabled', stroke: 'border/subtle' };
      // +1px: CSS draws a 1px (transparent) border around the padding box
      const c = box(`Intent=${intent}, Size=${size}, State=${state}`,
        { component: true, gap: 8, pad: [Z[0] + 1, Z[1] + 1], radius: 'radius/md', clip: true, fill: s.fill, stroke: s.stroke });
      if (s.paint) await useStyle(c, 'paint', s.paint);
      const left = icon('plus', 16, s.ink, 'Icon left');
      const label = await text('Button', Z[2], s.ink, { name: 'Label' });
      const right = icon('arrow-right', 16, s.ink, 'Icon right');
      left.visible = false; right.visible = false;
      add(c, [left, label, right]);
      if (state === 'Loading') {                             // aria-busy: label hidden, width kept, spinner centred
        label.opacity = 0;
        const spin = figma.createEllipse();
        spin.name = 'Spinner';
        spin.resize(16, 16);
        spin.arcData = { startingAngle: 0, endingAngle: Math.PI * 1.5, innerRadius: 0.75 };
        spin.fills = [paint(s.ink)];
        c.appendChild(spin);
        spin.layoutPositioning = 'ABSOLUTE';
        spin.x = (c.width - 16) / 2; spin.y = (c.height - 16) / 2;
        spin.constraints = { horizontal: 'CENTER', vertical: 'CENTER' };
      }
      if (s.glow) await useStyle(c, 'effect', s.glow);
      comps.push(c);
    }
    const set = combine(comps, doc, 'Button', STATES.length);
    const kLabel = set.addComponentProperty('Label', 'TEXT', 'Button');
    const kL = set.addComponentProperty('Icon left', 'BOOLEAN', false);
    const kR = set.addComponentProperty('Icon right', 'BOOLEAN', false);
    const kLI = set.addComponentProperty('Left glyph', 'INSTANCE_SWAP', S.icons.plus.id, { preferredValues: iconPrefs() });
    const kRI = set.addComponentProperty('Right glyph', 'INSTANCE_SWAP', S.icons['arrow-right'].id, { preferredValues: iconPrefs() });
    bindProps(set, { Label: { characters: kLabel }, 'Icon left': { visible: kL, mainComponent: kLI }, 'Icon right': { visible: kR, mainComponent: kRI } });
    return set;
  }

  async function buildIconButton(doc) {
    const STYLES = { Default: { fill: 'surface/default', stroke: 'border/default' }, Ghost: { fill: ['surface/default', 0] } };
    const SIZES = { MD: [38, 20, 'radius/md'], SM: [30, 16, 'radius/sm'] };
    const STATES = ['Rest', 'Hover', 'Focus', 'On'];
    const comps = [];
    for (const style in STYLES) for (const size in SIZES) for (const state of STATES) {
      const Z = SIZES[size];
      const s = { fill: STYLES[style].fill, stroke: STYLES[style].stroke, ink: 'text/secondary' };
      if (state === 'Hover') { s.ink = 'accent/default'; if (style === 'Ghost') s.fill = 'surface/raised'; else s.stroke = 'border/focus'; }
      if (state === 'On') { s.ink = 'accent/default'; s.stroke = 'border/focus'; }
      const c = box(`Style=${style}, Size=${size}, State=${state}`, { component: true, w: Z[0], h: Z[0], justify: 'CENTER',
        align: 'CENTER', radius: Z[2], clip: true, fill: s.fill, stroke: s.stroke });
      c.appendChild(icon('bell', Z[1], s.ink, 'Icon'));
      if (state === 'Focus') await useStyle(c, 'effect', 'State/Focus ring');
      comps.push(c);
    }
    const set = combine(comps, doc, 'Icon Button', STATES.length);
    const k = set.addComponentProperty('Glyph', 'INSTANCE_SWAP', S.icons.bell.id, { preferredValues: iconPrefs() });
    bindProps(set, { Icon: { mainComponent: k } });
    return set;
  }

  async function buildBadge(doc) {
    const TONES = {
      Neutral: ['text/secondary', 'surface/raised'], Success: ['feedback/success', 'feedback/success-fill'],
      Warning: ['feedback/warning', 'feedback/warning-fill'], Danger: ['feedback/danger', 'feedback/danger-fill'],
      Info: ['feedback/info', 'feedback/info-fill'], Accent: ['text/accent', ['accent/default', 0.14]],
      Outline: ['text/secondary', null, 'border/default'],
    };
    const comps = [];
    for (const tone in TONES) {
      const T = TONES[tone];
      const c = box(`Tone=${tone}`, { component: true, gap: 6, pad: [5, 10], radius: 'radius/full', fill: T[1], stroke: T[2] });
      add(c, [dot(6, T[0]), await text('Online', 'Mono/Badge', T[0], { name: 'Label' })]);
      comps.push(c);
    }
    const set = combine(comps, doc, 'Badge', 7);
    const kL = set.addComponentProperty('Label', 'TEXT', 'Online');
    const kD = set.addComponentProperty('Dot', 'BOOLEAN', true);
    bindProps(set, { Label: { characters: kL }, Dot: { visible: kD } });
    return set;
  }

  async function buildLiveDot(doc) {
    const c = box('Live dot', { component: true, dir: 'NONE', w: 7, h: 7, fill: 'accent/default', radius: 'radius/full' });
    c.effects = [figma.variables.setBoundVariableForEffect({ type: 'DROP_SHADOW', color: { r: 0, g: 0, b: 0, a: 1 },
      offset: { x: 0, y: 0 }, radius: 8, spread: 0, visible: true, blendMode: 'NORMAL', showShadowBehindNode: false }, 'color', v('accent/default'))];
    doc.appendChild(c);
    return c;
  }

  async function buildEyebrow(doc) {
    const c = box('Eyebrow', { component: true, gap: 9 });
    const d = instanceOf('Live dot');
    d.name = 'Dot';
    add(c, [d, await text('System online', 'Mono/Label', 'text/muted', { name: 'Label' })]);
    doc.appendChild(c);
    bindProps(c, { Label: { characters: c.addComponentProperty('Label', 'TEXT', 'System online') },
      Dot: { visible: c.addComponentProperty('Dot', 'BOOLEAN', true) } });
    return c;
  }

  async function buildInput(doc) {
    const STATES = { Rest: { stroke: 'border/default' }, Hover: { stroke: 'border/strong' }, Focus: { glow: 'Glow/Cyan' },
      Invalid: { stroke: 'feedback/danger' }, Disabled: { stroke: 'border/default', dim: true } };
    const CONTENT = { Placeholder: ['us-east-1', 'text/muted'], Value: ['eu-central-1', 'text/default'] };
    const comps = [];
    for (const state in STATES) for (const content in CONTENT) {
      const s = STATES[state];
      const c = box(`State=${state}, Content=${content}`, { component: true, w: 280, gap: 8, pad: [11, 15], radius: 'radius/md',
        clip: true, fill: 'surface/default', stroke: s.stroke });
      const ic = icon('search', 16, 'text/muted', 'Icon');
      ic.visible = false;
      const t = await text(CONTENT[content][0], 'UI/Input', CONTENT[content][1], { name: 'Value' });
      add(c, [ic, t]);
      stretch(t);
      if (s.glow) await useStyle(c, 'effect', s.glow);
      if (s.dim) c.opacity = 0.5;
      comps.push(c);
    }
    const set = combine(comps, doc, 'Input', 2);
    bindProps(set, { Icon: { visible: set.addComponentProperty('Leading icon', 'BOOLEAN', false),
      mainComponent: set.addComponentProperty('Glyph', 'INSTANCE_SWAP', S.icons.search.id, { preferredValues: iconPrefs() }) } });
    return set;
  }

  async function buildField(doc) {
    const comps = [];
    for (const status of ['Default', 'Invalid']) {
      const bad = status === 'Invalid';
      const c = box(`Status=${status}`, { component: true, dir: 'VERTICAL', w: 280, gap: 7, align: 'MIN' });
      const input = instanceOf('Input', { State: bad ? 'Invalid' : 'Rest', Content: 'Value' });
      input.name = 'Input';
      const hint = await text(bad ? 'This region is at capacity.' : 'The closest region keeps latency low.', 'Body/Caption',
        bad ? 'feedback/danger' : 'text/muted', { name: 'Hint' });
      add(c, [await text('Region', 'Mono/Field label', 'text/muted', { name: 'Label' }), input, hint]);
      input.layoutSizingHorizontal = 'FILL';
      stretch(hint);
      comps.push(c);
    }
    const set = combine(comps, doc, 'Field', 2);
    bindProps(set, { Label: { characters: set.addComponentProperty('Label', 'TEXT', 'Region') },
      Hint: { visible: set.addComponentProperty('Show hint', 'BOOLEAN', true) } });
    return set;
  }

  async function buildSwitch(doc) {
    const comps = [];
    for (const checked of ['Off', 'On']) for (const state of ['Rest', 'Focus', 'Disabled']) {
      const on = checked === 'On';
      const c = box(`Checked=${checked}, State=${state}`, { component: true, gap: 10 });
      const track = box('Track', { dir: 'NONE', w: 42, h: 24, radius: 'radius/full', clip: true,
        fill: on ? null : 'surface/raised', stroke: on ? null : 'border/default' });
      if (on) await useStyle(track, 'paint', 'Gradient/Pulse');
      const knob = dot(18, on ? 'base/white' : 'text/muted', 'Knob');
      track.appendChild(knob);
      knob.x = on ? 21 : 3; knob.y = 3;                       // 1px border + 2px inset, like the CSS
      const fx = state === 'Focus' ? 'State/Focus ring' : on && state === 'Rest' ? 'Glow/Blue' : null;
      if (fx) await useStyle(track, 'effect', fx);
      if (state === 'Disabled') track.opacity = 0.5;
      add(c, [track, await text('Auto-scale', 'Mono/Switch', state === 'Disabled' ? 'text/disabled' : 'text/secondary', { name: 'Label' })]);
      comps.push(c);
    }
    const set = combine(comps, doc, 'Switch', 3);
    bindProps(set, { Label: { characters: set.addComponentProperty('Label', 'TEXT', 'Auto-scale') } });
    return set;
  }

  async function buildTab(doc) {
    const comps = [];
    for (const selected of ['False', 'True']) for (const state of ['Rest', 'Hover', 'Focus']) {
      const on = selected === 'True';
      const c = box(`Selected=${selected}, State=${state}`, { component: true, pad: [12, 14], fill: ['surface/default', 0],
        clip: state === 'Focus' });
      num(c, 'topLeftRadius', 'radius/sm'); num(c, 'topRightRadius', 'radius/sm');
      c.appendChild(await text('Overview', 'UI/Tab', on || state === 'Hover' ? 'text/default' : 'text/muted', { name: 'Label' }));
      if (on) {
        const bar = figma.createRectangle();
        bar.name = 'Indicator';
        c.appendChild(bar);
        bar.layoutPositioning = 'ABSOLUTE';
        bar.resize(c.width, 2);
        bar.x = 0; bar.y = c.height - 2;
        bar.constraints = { horizontal: 'STRETCH', vertical: 'MAX' };
        await useStyle(bar, 'paint', 'Gradient/Pulse');
        await useStyle(bar, 'effect', 'Glow/Soft');
      }
      if (state === 'Focus') await useStyle(c, 'effect', 'State/Focus ring');
      comps.push(c);
    }
    const set = combine(comps, doc, 'Tab', 3);
    bindProps(set, { Label: { characters: set.addComponentProperty('Label', 'TEXT', 'Overview') } });
    return set;
  }

  async function buildTabs(doc) {
    const c = box('Tabs', { component: true, gap: 4, align: 'MAX' });
    edge(c, 'BOTTOM', 'border/subtle');
    for (const [label, on] of [['Overview', true], ['Metrics', false], ['Logs', false]]) {
      const t = instanceOf('Tab', { Selected: on ? 'True' : 'False', State: 'Rest', Label: label });
      t.name = label;
      c.appendChild(t);
    }
    doc.appendChild(c);
    return c;
  }

  async function buildSegment(doc) {
    const comps = [];
    for (const on of ['False', 'True']) {
      const c = box(`On=${on}`, { component: true, pad: [8, 14], radius: 'radius/full', fill: on === 'True' ? null : ['surface/default', 0] });
      if (on === 'True') await useStyle(c, 'paint', 'Gradient/Pulse');
      c.appendChild(await text('Live', 'Mono/Segment', on === 'True' ? 'text/on-accent' : 'text/muted', { name: 'Label' }));
      comps.push(c);
    }
    const set = combine(comps, doc, 'Segment', 2);
    bindProps(set, { Label: { characters: set.addComponentProperty('Label', 'TEXT', 'Live') } });
    return set;
  }

  async function buildSegmented(doc) {
    const c = box('Segmented control', { component: true, gap: 2, pad: 4, radius: 'radius/full', fill: 'surface/default', stroke: 'border/default' });
    for (const [label, on] of [['Live', true], ['24h', false], ['7d', false]]) {
      const s = instanceOf('Segment', { On: on ? 'True' : 'False', Label: label });
      s.name = label;
      c.appendChild(s);
    }
    doc.appendChild(c);
    return c;
  }

  async function buildKbd(doc) {
    const c = box('Kbd', { component: true, gap: 2, pad: [4, 7, 5, 7], radius: 5, fill: 'surface/raised', stroke: 'border/default' });
    c.strokeBottomWeight = 2;
    c.appendChild(await text('⌘K', 'Mono/Kbd', 'text/muted', { name: 'Keys' }));
    doc.appendChild(c);
    bindProps(c, { Keys: { characters: c.addComponentProperty('Keys', 'TEXT', '⌘K') } });
    return c;
  }

  async function buildTooltip(doc) {
    const c = box('Tooltip', { component: true, pad: [8, 10], radius: 'radius/sm', fill: 'surface/overlay', stroke: 'border/strong' });
    c.appendChild(await text('Copy token', 'Mono/Tooltip', 'text/default', { name: 'Label' }));
    await useStyle(c, 'effect', 'Elevation/Overlay');
    doc.appendChild(c);
    bindProps(c, { Label: { characters: c.addComponentProperty('Label', 'TEXT', 'Copy token') } });
    return c;
  }

  async function buildMeter(doc) {
    const c = box('Meter', { component: true, dir: 'NONE', w: 240, h: 6, radius: 'radius/full', fill: 'surface/track', clip: true });
    const bar = figma.createRectangle();
    bar.name = 'Value';
    bar.resize(163, 6);                                      // 68 %
    radius(bar, 'radius/full');
    c.appendChild(bar);
    bar.constraints = { horizontal: 'MIN', vertical: 'STRETCH' };
    await useStyle(bar, 'paint', 'Gradient/Pulse');
    await useStyle(bar, 'effect', 'Glow/Soft');
    doc.appendChild(c);
    return c;
  }

  async function buildAvatar(doc) {
    const comps = [];
    const font = await fontFor(D.collections[2].variables.find(x => x.name === 'font/display').value, 700);
    for (const [size, av] of [['SM', 28], ['MD', 34], ['LG', 44]]) {
      const c = box(`Size=${size}`, { component: true, w: av, h: av, justify: 'CENTER', align: 'CENTER', radius: 'radius/full' });
      await useStyle(c, 'paint', 'Gradient/Pulse hot');
      const t = figma.createText();
      t.fontName = font;
      t.characters = 'KD';
      t.fontSize = Math.round(av * 0.38);
      t.letterSpacing = { unit: 'PERCENT', value: 2 };
      t.lineHeight = { unit: 'PERCENT', value: 100 };
      t.fills = [paint('base/white')];
      t.name = 'Initials';
      c.appendChild(t);
      comps.push(c);
    }
    const set = combine(comps, doc, 'Avatar', 3);
    bindProps(set, { Initials: { characters: set.addComponentProperty('Initials', 'TEXT', 'KD') } });
    return set;
  }

  async function buildCard(doc) {
    const VARIANTS = { Default: ['border/default', 'Elevation/Flat'], Hover: ['border/focus', 'Glow/Soft'],
      Selected: ['border/focus', 'Glow/Soft'], Live: [null, 'Glow/Soft'] };
    const comps = [];
    for (const variant in VARIANTS) {
      const c = box(`Variant=${variant}`, { component: true, dir: 'VERTICAL', w: 320, gap: 'space/2', pad: 'space/5', align: 'MIN',
        radius: 'radius/lg', fill: 'surface/default', stroke: VARIANTS[variant][0] });
      if (variant === 'Live') {                              // gradient border for live data
        await c.setStrokeStyleIdAsync(S.paint['Gradient/Pulse'].id);
        c.strokeWeight = 1; c.strokeAlign = 'INSIDE';
      }
      const title = await text('Edge cluster', 'Heading/H4', 'text/default', { name: 'Title' });
      const body = await text('Latency holds under 40 ms in every region.', 'Body/SM', 'text/secondary', { name: 'Body' });
      add(c, [await text('Telemetry', 'Mono/Label', 'text/muted', { name: 'Eyebrow' }), title, body]);
      stretch(title); stretch(body);
      await useStyle(c, 'effect', VARIANTS[variant][1]);
      comps.push(c);
    }
    const set = combine(comps, doc, 'Card', 4);
    bindProps(set, {
      Eyebrow: { characters: set.addComponentProperty('Eyebrow', 'TEXT', 'Telemetry'), visible: set.addComponentProperty('Show eyebrow', 'BOOLEAN', true) },
      Title: { characters: set.addComponentProperty('Title', 'TEXT', 'Edge cluster') },
      Body: { characters: set.addComponentProperty('Body', 'TEXT', 'Latency holds under 40 ms in every region.') },
    });
    return set;
  }

  async function buildMetricCard(doc) {
    const c = box('Metric card', { component: true, dir: 'VERTICAL', w: 240, gap: 'space/2', pad: 'space/5', align: 'MIN',
      radius: 'radius/lg', fill: 'surface/default', stroke: 'border/default' });
    add(c, [
      await text('Uptime', 'Mono/Label', 'text/muted', { name: 'Label' }),
      await text('99.98%', 'UI/Metric', 'text/default', { name: 'Value' }),
      await text('+0.04% vs last week', 'Mono/Data', 'text/accent', { name: 'Delta' }),
    ]);
    await useStyle(c, 'effect', 'Elevation/Flat');
    doc.appendChild(c);
    bindProps(c, { Label: { characters: c.addComponentProperty('Label', 'TEXT', 'Uptime') },
      Value: { characters: c.addComponentProperty('Value', 'TEXT', '99.98%') },
      Delta: { characters: c.addComponentProperty('Delta', 'TEXT', '+0.04% vs last week') } });
    return c;
  }

  async function buildBanner(doc) {
    const comps = [];
    for (const tone in FEEDBACK_ICON) {
      const k = tone.toLowerCase();
      const c = box(`Tone=${tone}`, { component: true, w: 440, gap: 'space/3', pad: ['space/3', 'space/4'], align: 'MIN',
        radius: 'radius/md', fill: `feedback/${k}-fill`, stroke: [`feedback/${k}`, 0.4] });
      const msg = await text('Deploy finished. 12 services report healthy.', 'Body/SM', 'text/default', { name: 'Message' });
      add(c, [icon(FEEDBACK_ICON[tone], 18, `feedback/${k}`, 'Icon'), msg]);
      stretch(msg);
      comps.push(c);
    }
    const set = combine(comps, doc, 'Banner', 1);
    bindProps(set, { Message: { characters: set.addComponentProperty('Message', 'TEXT', 'Deploy finished. 12 services report healthy.') } });
    return set;
  }

  async function buildToast(doc) {
    const comps = [];
    for (const tone in FEEDBACK_ICON) {
      const k = tone.toLowerCase();
      const c = box(`Tone=${tone}`, { component: true, w: 340, gap: 12, pad: [13, 14], align: 'MIN', radius: 'radius/md',
        fill: 'surface/raised', stroke: 'border/default' });
      const content = box('Content', { dir: 'VERTICAL', gap: 2, align: 'MIN' });
      add(c, [icon(FEEDBACK_ICON[tone], 18, `feedback/${k}`, 'Icon'), content]);
      content.layoutSizingHorizontal = 'FILL';
      const title = await text('Build deployed', 'UI/Toast title', 'text/default', { name: 'Title' });
      const body = await text('edge-eu-1 · 2.4 s', 'Mono/Caption', 'text/muted', { name: 'Body' });
      add(content, [title, body]);
      stretch(title); stretch(body);
      await useStyle(c, 'effect', 'Elevation/Overlay');
      comps.push(c);
    }
    const set = combine(comps, doc, 'Toast', 2);
    bindProps(set, { Title: { characters: set.addComponentProperty('Title', 'TEXT', 'Build deployed') },
      Body: { characters: set.addComponentProperty('Body', 'TEXT', 'edge-eu-1 · 2.4 s') } });
    return set;
  }

  async function buildNavItem(doc) {
    const comps = [];
    for (const state of ['Rest', 'Hover', 'Current']) {
      const rest = state === 'Rest';
      const c = box(`State=${state}`, { component: true, w: 240, gap: 11, pad: [9, 10], radius: 'radius/md', clip: true,
        fill: rest ? ['surface/default', 0] : 'surface/default' });
      const label = await text('Components', 'UI/Nav item', rest ? 'text/muted' : 'text/default', { name: 'Label' });
      add(c, [icon('layers', 18, state === 'Current' ? 'accent/default' : rest ? 'text/muted' : 'text/default', 'Icon'), label]);
      stretch(label);
      if (state === 'Current') {                             // aria-current: inset 2px accent rail
        const rail = figma.createRectangle();
        rail.name = 'Rail';
        c.appendChild(rail);
        rail.layoutPositioning = 'ABSOLUTE';
        rail.resize(2, c.height);
        rail.x = 0; rail.y = 0;
        rail.constraints = { horizontal: 'MIN', vertical: 'STRETCH' };
        rail.fills = [paint('accent/default')];
      }
      comps.push(c);
    }
    const set = combine(comps, doc, 'Nav item', 3);
    bindProps(set, { Label: { characters: set.addComponentProperty('Label', 'TEXT', 'Components') },
      Icon: { mainComponent: set.addComponentProperty('Glyph', 'INSTANCE_SWAP', S.icons.layers.id, { preferredValues: iconPrefs() }) } });
    return set;
  }

  async function buildModal(doc) {
    const c = box('Modal', { component: true, dir: 'VERTICAL', w: 440, align: 'MIN', radius: 'radius/xl', clip: true,
      fill: 'surface/default', stroke: 'border/default' });
    const header = box('Header', { gap: 12, pad: [20, 22] });
    edge(header, 'BOTTOM', 'border/subtle');
    const iconBox = box('Icon box', { w: 38, h: 38, justify: 'CENTER', align: 'CENTER', radius: 'radius/md', fill: 'surface/raised' });
    iconBox.appendChild(icon('rocket', 20, 'accent/default', 'Icon'));
    const titles = box('Titles', { dir: 'VERTICAL', gap: 2, align: 'MIN' });
    add(titles, [await text('Deploy to production', 'Heading/H4', 'text/default', { name: 'Title' }),
      await text('edge-eu-1 · 12 services', 'Mono/Caption', 'text/muted', { name: 'Subtitle' })]);
    add(header, [iconBox, titles]);
    const body = box('Body', { dir: 'VERTICAL', gap: 16, pad: 22, align: 'MIN' });
    const footer = box('Footer', { gap: 10, pad: [16, 22], justify: 'MAX' });
    edge(footer, 'TOP', 'border/subtle');
    add(footer, [instanceOf('Button', { Intent: 'Ghost', Size: 'MD', State: 'Rest', Label: 'Cancel' }),
      instanceOf('Button', { Intent: 'Primary', Size: 'MD', State: 'Rest', Label: 'Deploy' })]);
    add(c, [header, body, footer]);
    for (const part of [header, body, footer]) part.layoutSizingHorizontal = 'FILL';
    const copy = await text('The new build rolls out region by region. Traffic shifts gradually and you can roll back at any time.',
      'Body/SM', 'text/secondary', { name: 'Message' });
    body.appendChild(copy);
    stretch(copy);
    await useStyle(c, 'effect', 'Elevation/Overlay glow');
    doc.appendChild(c);
    bindProps(c, { Title: { characters: c.addComponentProperty('Title', 'TEXT', 'Deploy to production') },
      Subtitle: { characters: c.addComponentProperty('Subtitle', 'TEXT', 'edge-eu-1 · 12 services') },
      Message: { characters: c.addComponentProperty('Message', 'TEXT', 'The new build rolls out region by region. Traffic shifts gradually and you can roll back at any time.') } });
    return c;
  }

  async function buildEmpty(doc) {
    const c = box('Empty state', { component: true, dir: 'VERTICAL', w: 420, gap: 'space/3', pad: ['space/12', 'space/6'],
      align: 'CENTER', radius: 'radius/lg', stroke: 'border/default' });
    c.dashPattern = [4, 4];
    const body = await text('Ship your first build and it shows up here, live.', 'Body/SM', 'text/muted', { name: 'Body', align: 'CENTER' });
    add(c, [icon('layers', 24, 'accent/default', 'Icon'),
      await text('No deployments yet', 'Heading/H4', 'text/default', { name: 'Title' }), body,
      instanceOf('Button', { Intent: 'Ghost', Size: 'SM', State: 'Rest', Label: 'New deployment', 'Icon left': true })]);
    stretch(body);
    doc.appendChild(c);
    bindProps(c, { Title: { characters: c.addComponentProperty('Title', 'TEXT', 'No deployments yet') },
      Body: { characters: c.addComponentProperty('Body', 'TEXT', 'Ship your first build and it shows up here, live.') } });
    return c;
  }

  // order matters: later entries instance earlier ones
  const LIB = [
    ['Button', 'Elements', buildButton, '#comp-buttons', 'The canonical control (.np-btn). Intent × size × state mirror --primary/--secondary/--ghost/--danger, --sm/--lg and the .is-* states. Primary and secondary carry their glow at rest by definition; every other glow is a state. Icons are Lucide at 16 px and follow the label ink.'],
    ['Icon Button', 'Elements', buildIconButton, '#comp-buttons', 'Square icon-only control (.np-icon-btn). The coded version always needs an aria-label. “On” mirrors aria-pressed.'],
    ['Badge', 'Elements', buildBadge, '#comp-badges', 'Status in the HUD voice (.np-badge): mono, uppercase, tinted fill. The dot uses the label colour (currentColor).'],
    ['Live dot', 'Elements', buildLiveDot, '#comp-badges', 'The accent dot with its halo (.np-livedot). Blinks in code; the only glow allowed at rest, because it marks live data.'],
    ['Eyebrow', 'Elements', buildEyebrow, '#comp-badges', 'Mono label led by a live dot (.np-eyebrow).'],
    ['Input', 'Elements', buildInput, '#comp-inputs', 'Text input (.np-input / .np-inputgroup): rest, hover, focus (cyan glow replaces the border), invalid (aria-invalid) and disabled.'],
    ['Field', 'Elements', buildField, '#comp-inputs', 'Label, input and hint stacked (.np-field). Invalid turns the input edge and the hint to danger.'],
    ['Switch', 'Elements', buildSwitch, '#comp-inputs', 'A real checkbox in code (.np-switch, role="switch"). On = Pulse gradient + action glow.'],
    ['Kbd', 'Elements', buildKbd, '#comp-inputs', 'Keyboard hint (.np-kbd) with the heavier bottom edge.'],
    ['Tab', 'Elements', buildTab, '#comp-tabs', 'Tab (.np-tab). The selected tab carries the signal underline; aria-selected in code.'],
    ['Tabs', 'Elements', buildTabs, '#comp-tabs', 'Tab list (.np-tabs) on a subtle hairline.'],
    ['Segment', 'Elements', buildSegment, '#comp-tabs', 'Segmented control item (.np-seg__item). On = aria-pressed / aria-checked.'],
    ['Segmented control', 'Elements', buildSegmented, '#comp-tabs', 'Segmented control (.np-seg).'],
    ['Tooltip', 'Elements', buildTooltip, '#comp-overlays', 'Tooltip ([data-np-tooltip]). Pair with an aria-label in code: the bubble is not announced.'],
    ['Meter', 'Elements', buildMeter, '#comp-data', 'Meter (.np-meter): track + Pulse bar. Resize the Value layer to set the level.'],
    ['Avatar', 'Elements', buildAvatar, '#comp-data', 'Avatar (.np-avatar): Pulse-hot disc with initials.'],
    ['Card', 'Patterns', buildCard, '#pat-cards', 'Card (.np-card): depth by surface step + hairline. Hover/Selected add the focus edge and a soft glow; Live uses the gradient border for live data.'],
    ['Metric card', 'Patterns', buildMetricCard, '#pat-cards', 'Card with a metric (.np-card__metric + __delta).'],
    ['Banner', 'Patterns', buildBanner, '#pat-content', 'Inline alert (.np-banner) in the four feedback tones, with the semantic icon map.'],
    ['Toast', 'Patterns', buildToast, '#comp-overlays', 'Toast (.np-toast) for transient feedback; render it inside an aria-live region.'],
    ['Nav item', 'Patterns', buildNavItem, '#pat-content', 'Sidebar item (.np-navitem). Current = aria-current="page" with the accent rail.'],
    ['Modal', 'Patterns', buildModal, '#comp-overlays', 'Dialog (.np-modal) on a scrim: header, body, footer with Ghost + Primary buttons.'],
    ['Empty state', 'Patterns', buildEmpty, '#pat-content', 'Empty state (.np-empty) with a dashed edge and one clear next action.'],
  ];

  async function buildThemeCheck(page) {
    for (const n of page.children.slice()) if (n.getSharedPluginData(NS, 'doc') === 'Theme check') n.remove();
    const need = ['Eyebrow', 'Button', 'Badge', 'Field', 'Switch', 'Card', 'Toast'];
    if (need.some(k => !S.sets[k])) return null;
    const theme = S.cols.Theme;
    const wrap = box('Theme check', { gap: 48, pad: 48, fill: 'bg/void', radius: 'radius/2xl', align: 'MIN' });
    wrap.setSharedPluginData(NS, 'doc', 'Theme check');
    for (const mode of ['Dark', 'Light']) {
      if (!theme.modeIds[mode]) continue;
      const f = box(`Theme · ${mode}`, { dir: 'VERTICAL', w: 560, gap: 24, pad: 40, fill: 'bg/page', radius: 'radius/xl', align: 'MIN' });
      f.setExplicitVariableModeForCollection(theme.col, theme.modeIds[mode]);
      const row = (kids, gap) => add(box('Row', { gap: gap || 12, wrap: true, w: 480, rowGap: 12 }), kids);
      add(f, [
        instanceOf('Eyebrow', { Label: `Theme · ${mode}` }),
        await text(mode === 'Dark' ? 'Dark is the canvas, neon is the signal.' : 'Same tokens, light canvas, ink accents.',
          'Heading/H3', 'text/default', { width: 480 }),
        row(['Primary', 'Secondary', 'Ghost', 'Danger'].map(i => instanceOf('Button', { Intent: i, Size: 'MD', State: 'Rest', Label: i }))),
        row(['Success', 'Warning', 'Danger', 'Info', 'Accent'].map(t => instanceOf('Badge', { Tone: t, Label: t }))),
        add(box('Row', { gap: 24, align: 'MIN' }), [instanceOf('Field'), instanceOf('Switch', { Checked: 'On', State: 'Rest' })]),
        instanceOf('Card', { Variant: 'Live' }),
        instanceOf('Toast', { Tone: 'Success' }),
      ]);
      wrap.appendChild(f);
    }
    wrap.x = -(wrap.width + 160); wrap.y = 0;                 // left of the component column
    return wrap;
  }

  async function phaseComponents(opts) {
    await index(); await ensureFonts();
    const page = await usePage('Components');
    await registerSets();                                    // what already exists, so dependants can instance it
    const out = { page: page.id, icons: await buildIcons(page), created: [], skipped: [], failed: [] };
    for (const item of LIB) {
      const key = item[0];
      if (opts.only && opts.only.indexOf(key) < 0) continue;
      const existing = page.findChild(n => n.getSharedPluginData(NS, 'doc') === key);
      if (existing && S.sets[key] && !opts.rebuild) { out.skipped.push(key); continue; }
      if (existing) existing.remove();
      const before = {};
      for (const n of page.children) before[n.id] = 1;
      try {
        const doc = await docFrame(key, item[1], key, item[4], item[3]);
        const node = await item[2](doc);
        node.setSharedPluginData(NS, 'component', key);
        node.description = `${item[4]} Docs: ${DOCS}${item[3]}`;
        try { node.documentationLinks = [{ uri: DOCS + item[3] }]; } catch (e) { /* older API */ }
        doc.x = 0; doc.y = nextY(page, doc);
        S.sets[key] = node;
        out.created.push({ name: key, id: node.id, type: node.type, variants: node.type === 'COMPONENT_SET' ? node.children.length : 1 });
      } catch (e) {
        for (const n of page.children.slice()) if (!before[n.id]) n.remove();   // leave no half-built nodes
        delete S.sets[key];
        out.failed.push(`${key}: ${e.message}`);
      }
    }
    const check = await buildThemeCheck(page);
    if (check) out.themeCheck = check.id;
    if (out.failed.length) warn(`Components that failed: ${out.failed.join(' | ')}`);
    return out;
  }

  /* ============================================================
     Docs · Foundations + Cover
     ============================================================ */
  async function swatch(varName, label, sub) {
    const s = box(label, { dir: 'VERTICAL', w: 136, gap: 6, align: 'MIN' });
    const chip = figma.createRectangle();
    chip.name = 'Chip';
    chip.resize(136, 56);
    radius(chip, 'radius/md');
    chip.fills = [fill(varName)];
    chip.strokes = [paint('border/subtle')];
    chip.strokeAlign = 'INSIDE';
    add(s, [chip, await text(label, 'Body/Caption', 'text/default', { width: 136 }),
      sub ? await text(sub, 'Mono/Caption', 'text/muted', { width: 136 }) : null]);
    return s;
  }
  function placeDoc(page, doc) { doc.x = 0; doc.y = nextY(page, doc); return doc; }
  const THEME_GROUPS = ['bg', 'surface', 'text', 'border', 'action', 'accent', 'feedback'];

  async function phaseFoundations() {
    await index(); await ensureFonts();
    const page = await usePage('Foundations');
    clearDocs(page);
    const made = [];
    const theme = S.cols.Theme;
    const themeVars = D.collections[1].variables;

    // Theme colours, Dark + Light side by side
    let doc = await docFrame('Theme colors', 'Foundations', 'Theme colors',
      'The semantic aliases components bind to (tier 2). Switch a frame between Dark and Light in the layer panel (Theme collection) and everything bound follows. Code syntax on every variable is the CSS custom property.', '#colors');
    const pair = box('Modes', { gap: 32, align: 'MIN' });
    for (const mode of ['Dark', 'Light']) {
      if (!theme.modeIds[mode]) continue;
      const f = box(`Theme · ${mode}`, { dir: 'VERTICAL', w: 680, gap: 24, pad: 32, fill: 'bg/page', stroke: 'border/subtle', radius: 'radius/xl', align: 'MIN' });
      f.setExplicitVariableModeForCollection(theme.col, theme.modeIds[mode]);
      f.appendChild(await text(mode, 'Heading/H3', 'text/default'));
      for (const g of THEME_GROUPS) {
        const grid = box(g, { wrap: true, w: 616, gap: 16, rowGap: 16, align: 'MIN' });
        for (const t of themeVars.filter(x => x.name.split('/')[0] === g)) grid.appendChild(await swatch(t.name, t.name, t.css));
        add(f, [await text(g, 'Mono/Label', 'text/muted'), grid]);
      }
      pair.appendChild(f);
    }
    doc.appendChild(pair);
    made.push(placeDoc(page, doc));

    // Primitives
    doc = await docFrame('Primitives', 'Foundations', 'Primitives',
      'Raw values (tier 1). Hidden from pickers and from publishing: use them to define or extend a Theme alias, never directly in a component. Theme-dependent ramps exist as dark/ and light/ copies.', '#tokens');
    const prims = D.collections[0].variables;
    for (const g of ['neon', 'base', 'fg', 'dark', 'light']) {
      const grid = box(g, { wrap: true, w: 1100, gap: 16, rowGap: 16, align: 'MIN' });
      for (const t of prims.filter(x => x.name.split('/')[0] === g)) grid.appendChild(await swatch(t.name, t.name, t.value));
      add(doc, [await text(g, 'Mono/Label', 'text/muted'), grid]);
    }
    made.push(placeDoc(page, doc));

    // Typography
    doc = await docFrame('Typography', 'Foundations', 'Typography',
      'Space Grotesk for display, Sora for body, JetBrains Mono as the HUD voice (labels, metrics, statuses — uppercase, 0.14em). Element styles (UI/…, Mono/…) are read from the matching CSS rules.', '#type');
    for (const t of D.textStyles) {
      const rowF = box(t.name, { gap: 32, w: 1100, align: 'CENTER' });
      const sample = await text(/^Mono/.test(t.name) ? 'Latency 38 ms · node-07' : /^(Display|Heading)/.test(t.name) ? 'Neon is the signal' : 'Dark is the canvas, neon is the signal.',
        t.name, 'text/default');
      add(rowF, [await text(`${t.name}\n${t.family} ${t.weight} · ${t.size}/${t.lineHeight}%`, 'Mono/Caption', 'text/muted', { width: 280 }), sample]);
      stretch(sample);
      doc.appendChild(rowF);
    }
    made.push(placeDoc(page, doc));

    // Spacing + radius
    doc = await docFrame('Spacing & radius', 'Foundations', 'Spacing & radius',
      '4 px base. Gaps and paddings bind to space/*, corners to radius/*. Soft 12–20 px radii carry most of the UI.', '#spacing');
    const scale = D.collections[2].variables;
    for (const t of scale.filter(x => /^space\//.test(x.name))) {
      const rowF = box(t.name, { gap: 24, align: 'CENTER' });
      const bar = figma.createRectangle();
      bar.name = 'Bar';
      bar.resize(t.value, 12);
      radius(bar, 2);
      bar.fills = [paint(['accent/default', 0.7])];
      add(rowF, [await text(`${t.name} · ${t.value}px`, 'Mono/Caption', 'text/muted', { width: 160 }), bar]);
      doc.appendChild(rowF);
    }
    const radii = box('Radii', { gap: 24, align: 'MIN' });
    for (const t of scale.filter(x => /^radius\//.test(x.name))) {
      const tile = box(t.name, { dir: 'VERTICAL', gap: 8, align: 'MIN' });
      const sq = figma.createRectangle();
      sq.name = 'Corner';
      sq.resize(80, 80);
      radius(sq, t.name);
      sq.fills = [paint('surface/raised')];
      sq.strokes = [paint('border/default')];
      sq.strokeAlign = 'INSIDE';
      add(tile, [sq, await text(`${t.name} · ${t.value}`, 'Mono/Caption', 'text/muted')]);
      radii.appendChild(tile);
    }
    doc.appendChild(radii);
    made.push(placeDoc(page, doc));

    // Effects + gradients
    doc = await docFrame('Effects & gradients', 'Foundations', 'Glow, elevation & gradients',
      'Flat by default: depth is a surface step plus a hairline. Glows are a state (hover, focus, live), never ambient. Effect colours and geometry bind to Theme variables, so the light theme turns halos into soft tinted shadows.', '#glow');
    for (const mode of ['Dark', 'Light']) {
      if (!theme.modeIds[mode]) continue;
      const f = box(`Effects · ${mode}`, { wrap: true, w: 1100, gap: 32, rowGap: 32, pad: 32, fill: 'bg/page', stroke: 'border/subtle', radius: 'radius/xl', align: 'MIN' });
      f.setExplicitVariableModeForCollection(theme.col, theme.modeIds[mode]);
      for (const e of D.effects) {
        const tile = box(e.name, { dir: 'VERTICAL', w: 176, h: 96, pad: 14, justify: 'MAX', align: 'MIN', radius: 'radius/lg', clip: true,
          fill: 'surface/default', stroke: 'border/subtle' });
        tile.appendChild(await text(e.name, 'Mono/Caption', 'text/secondary', { width: 148 }));
        await useStyle(tile, 'effect', e.name);
        f.appendChild(tile);
      }
      doc.appendChild(f);
    }
    const grads = box('Gradients', { gap: 24, align: 'MIN' });
    for (const g of D.gradients) {
      const tile = box(g.name, { dir: 'VERTICAL', w: 260, h: 120, pad: 14, justify: 'MAX', align: 'MIN', radius: 'radius/lg', clip: true });
      await useStyle(tile, 'paint', g.name);
      tile.appendChild(await text(`${g.name}\nvar(${g.css})`, 'Mono/Caption', g.name === 'Gradient/Haze' ? 'text/secondary' : 'text/on-accent', { width: 232 }));
      grads.appendChild(tile);
    }
    doc.appendChild(grads);
    made.push(placeDoc(page, doc));

    return { page: page.id, frames: made.map(n => ({ name: n.name, id: n.id })) };
  }

  async function phaseCover() {
    await index(); await ensureFonts(); await registerSets();
    const page = await usePage('Cover');
    clearDocs(page);
    const W = 1600, H = 960;
    const cover = box('Cover', { dir: 'VERTICAL', w: W, h: H, pad: 120, gap: 32, justify: 'CENTER', align: 'MIN', fill: 'bg/void', clip: true });
    cover.setSharedPluginData(NS, 'doc', 'Cover');
    const haze = figma.createRectangle();
    haze.name = 'Haze';
    cover.appendChild(haze);
    haze.layoutPositioning = 'ABSOLUTE';
    haze.resize(W, H);
    haze.x = 0; haze.y = 0;
    haze.constraints = { horizontal: 'STRETCH', vertical: 'STRETCH' };
    await useStyle(haze, 'paint', 'Gradient/Haze');
    const title = await text('NeonPulse', 'Display/XL', 'text/default', { name: 'Title' });
    title.fontSize = 168;
    const chips = box('Principles', { gap: 10 });
    if (S.sets.Badge) {
      add(chips, [instanceOf('Badge', { Tone: 'Accent', Label: 'Dark-first' }), instanceOf('Badge', { Tone: 'Neutral', Label: 'Flat surfaces' }),
        instanceOf('Badge', { Tone: 'Info', Label: 'Glow is a state', Dot: false }), instanceOf('Badge', { Tone: 'Outline', Label: `v${D.meta.version}`, Dot: false })]);
    }
    add(cover, [
      S.sets.Eyebrow ? instanceOf('Eyebrow', { Label: `Design system · v${D.meta.version}` }) : await text(`Design system · v${D.meta.version}`, 'Mono/Label', 'text/muted'),
      title,
      await text('Dark is the canvas, neon is the signal. Variables, styles and components in this file are generated from colors_and_type.css, the same source the coded system reads.',
        'Body/LG', 'text/secondary', { width: 880 }),
      chips,
      await text(`Docs ${DOCS}`, 'Mono/Caption', 'text/muted'),
    ]);

    const guide = box('How this file works', { dir: 'VERTICAL', w: 720, gap: 16, pad: 48, fill: 'bg/page', stroke: 'border/subtle', radius: 'radius/2xl', align: 'MIN' });
    guide.setSharedPluginData(NS, 'doc', 'Guide');
    const lines = [
      ['Variables', 'Theme (Dark / Light) holds the aliases components bind to; switch a frame’s mode to preview light. Scale holds radius/*, space/*, icon/* and font/*. Primitives are hidden raw values.'],
      ['Styles', 'Text styles (Display, Heading, Body, Mono, UI), gradient paint styles and effect styles. Glows are states: hover, focus, live — never ambient on static cards.'],
      ['Components', 'Elements and patterns on the Components page, every value bound to a variable or style. Compose screens from instances; detach only to explore.'],
      ['Sync', 'Code is the source. After a token change: node figma/export-tokens.mjs, then run “NeonPulse Library → Sync tokens” (or ask Claude via the Figma connector). Variables and styles update in place; bound components follow.'],
      ['Edits here', 'Designing in Figma is welcome. A token change that should ship goes back into colors_and_type.css via a pull request, so code and file stay one system.'],
    ];
    guide.appendChild(await text('How this file works', 'Heading/H3', 'text/default'));
    for (const [k, body] of lines) {
      const item = box(k, { dir: 'VERTICAL', gap: 4, align: 'MIN' });
      add(item, [await text(k, 'Mono/Label', 'text/accent'), await text(body, 'Body/SM', 'text/secondary', { width: 624 })]);
      guide.appendChild(item);
    }
    cover.x = 0; cover.y = 0;
    guide.x = W + 120; guide.y = 0;
    try { await figma.setFileThumbnailNodeAsync(cover); } catch (e) { /* not available in every runner */ }
    return { page: page.id, cover: cover.id, guide: guide.id };
  }

  /* ============================================================
     Runner
     ============================================================ */
  const PHASES = { variables: phaseVariables, styles: phaseStyles, components: phaseComponents, foundations: phaseFoundations, cover: phaseCover };
  const ALL = ['variables', 'styles', 'components', 'foundations', 'cover'];
  async function run(phases, opts) {
    phases = phases || ALL;
    opts = opts || {};
    const started = Date.now();
    const result = { system: `${D.meta.system} ${D.meta.version}`, phases: {} };
    await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
    for (const p of phases) {
      if (!PHASES[p]) throw new Error(`Unknown phase "${p}" — use ${ALL.join(', ')}`);
      result.phases[p] = await PHASES[p](opts);
    }
    figma.root.setSharedPluginData(NS, 'version', D.meta.version);
    result.warnings = warnings.slice();
    result.ms = Date.now() - started;
    return result;
  }
  return { run, ALL, data: D };
})();

// Plugin entry. Through the Figma MCP (`use_figma`) there is no menu command:
// the caller appends `return await NP.run([...phases])` instead.
(function main() {
  let command = '';
  try { command = figma.command || ''; } catch (e) { command = ''; }
  if (!command) return;
  const PLAN = { all: NP.ALL, tokens: ['variables', 'styles'], components: ['components'], docs: ['foundations', 'cover'], rebuild: NP.ALL };
  NP.run(PLAN[command] || NP.ALL, { rebuild: command === 'rebuild' }).then(r => {
    const c = r.phases.components;
    const parts = [];
    if (r.phases.variables) parts.push(`${r.phases.variables.created.length} new / ${r.phases.variables.updated} updated variables`);
    if (r.phases.styles) parts.push(`${r.phases.styles.text.length + r.phases.styles.paint.length + r.phases.styles.effect.length} styles`);
    if (c) parts.push(`${c.created.length} components built, ${c.skipped.length} kept`);
    console.log('NeonPulse library', r);
    figma.closePlugin(`${r.system}: ${parts.join(' · ') || 'done'}${r.warnings.length ? ` · ${r.warnings.length} warning(s) in the console` : ''}`);
  }).catch(e => {
    console.error(e);
    figma.closePlugin(`NeonPulse library failed: ${e.message}`);
  });
})();
