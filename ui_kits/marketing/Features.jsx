/* Marketing — logo strip + feature grid (.np-card in an auto-fit .np-grid) */
function LogoStrip() {
  const names = ['VECTORA', 'NIMBUS', 'HELIXOS', 'QUANTLY', 'ORBIT', 'FLUX'];
  return (
    <section aria-label="Customers" style={{ borderTop: '1px solid var(--color-border-subtle)', borderBottom: '1px solid var(--color-border-subtle)' }}>
      <div className="np-container np-cluster" style={{ paddingBlock: 26, gap: 18 }}>
        <span className="np-label" style={{ marginRight: 10 }}>Powering teams at</span>
        <ul className="np-cluster" style={{ listStyle: 'none', margin: 0, padding: 0, gap: 18 }}>
          {names.map(n => (
            <li key={n} style={{ font: '700 16px/1 var(--font-display)', color: 'var(--color-text-muted)', letterSpacing: '0.06em' }}>{n}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// accent = categorical neon hue for the icon tile; its halo appears on hover only (glow is a state)
function FeatureCard({ icon, title, body, accent }) {
  return (
    <article className="np-card mk-feature" style={{ padding: 24, '--feat-accent': accent }}>
      <div className="mk-feature__icon" aria-hidden="true"><Icon name={icon} size={22} /></div>
      <h3 className="np-card__title" style={{ margin: 0 }}>{title}</h3>
      <p className="np-card__body">{body}</p>
    </article>
  );
}

function Features() {
  const items = [
    { icon: 'zap', title: 'Instant deploys', body: 'Push to live in under two seconds. Global edge propagation with zero cold starts.', accent: 'var(--neon-cyan)' },
    { icon: 'activity', title: 'Live telemetry', body: 'Realtime metrics streamed to your dashboard. p50/p99, errors, throughput — as it happens.', accent: 'var(--neon-blue)' },
    { icon: 'shield', title: 'Hardened by default', body: 'Encrypted at rest and in flight. SOC 2, automatic key rotation, scoped tokens.', accent: 'var(--neon-violet)' },
    { icon: 'git-branch', title: 'Preview every branch', body: 'A live, shareable URL for every push. Diff metrics against production instantly.', accent: 'var(--neon-magenta)' },
    { icon: 'gauge', title: 'Auto-scale', body: 'Nodes spin up and wind down with traffic. You pay for the pulse, not the idle.', accent: 'var(--neon-cyan)' },
    { icon: 'terminal', title: 'CLI-first', body: 'Everything you can click, you can script. A clean API and a fast local CLI.', accent: 'var(--neon-blue)' },
  ];
  return (
    <section id="platform" aria-labelledby="platform-title" className="np-container" style={{ paddingBlock: 90 }}>
      <div className="np-eyebrow"><span className="np-livedot" />The platform</div>
      <h2 id="platform-title" style={{ font: 'var(--h1)', color: 'var(--color-text)', letterSpacing: '-0.02em', margin: '16px 0 0', maxWidth: 620 }}>
        Everything you need to run realtime, nothing you don't.
      </h2>
      <div className="np-grid" style={{ '--np-grid-min': '300px', gap: 18, marginTop: 44 }}>
        {items.map(it => <FeatureCard key={it.title} {...it} />)}
      </div>
    </section>
  );
}

Object.assign(window, { Features, LogoStrip, FeatureCard });
