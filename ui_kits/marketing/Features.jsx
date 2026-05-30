/* Marketing — Feature grid + logo strip */
function LogoStrip() {
  const names = ['VECTORA', 'NIMBUS', 'HELIXOS', 'QUANTLY', 'ORBIT', 'FLUX'];
  return (
    <section style={{ borderTop: '1px solid var(--line-1)', borderBottom: '1px solid var(--line-1)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '26px 24px', display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap' }}>
        <span className="np-label" style={{ marginRight: 10 }}>Powering teams at</span>
        {names.map(n => (
          <span key={n} style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, color: 'var(--fg-3)', letterSpacing: '0.06em' }}>{n}</span>
        ))}
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, body, accent }) {
  const [h, setH] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        background: 'var(--bg-2)', border: '1px solid ' + (h ? 'transparent' : 'var(--line-2)'),
        borderRadius: 'var(--r-lg)', padding: 24, transition: 'all var(--dur) var(--ease-out)',
        boxShadow: h ? 'var(--glow-soft)' : 'var(--shadow-1)', transform: h ? 'translateY(-3px)' : 'none'
      }}>
      <div style={{
        width: 44, height: 44, borderRadius: 'var(--r-md)', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'var(--bg-3)', color: accent, boxShadow: h ? '0 0 18px ' + accent + '55' : 'none',
        transition: 'box-shadow var(--dur)'
      }}>
        <Icon name={icon} size={22} />
      </div>
      <h3 style={{ font: 'var(--h4)', color: 'var(--fg-1)', margin: '18px 0 8px' }}>{title}</h3>
      <p style={{ font: 'var(--body-sm)', color: 'var(--fg-2)' }}>{body}</p>
    </div>
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
    <section style={{ maxWidth: 1200, margin: '0 auto', padding: '90px 24px' }}>
      <div className="np-eyebrow"><span className="np-livedot" />THE PLATFORM</div>
      <h2 style={{ font: 'var(--h1)', color: 'var(--fg-1)', letterSpacing: '-0.02em', margin: '16px 0 0', maxWidth: 620 }}>
        Everything you need to run realtime, nothing you don't.
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18, marginTop: 44 }} className="np-feat-grid">
        {items.map(it => <FeatureCard key={it.title} {...it} />)}
      </div>
    </section>
  );
}

Object.assign(window, { Features, LogoStrip, FeatureCard });
