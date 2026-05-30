/* Marketing — Pricing with monthly/annual toggle + CTA band */
function Pricing() {
  const [annual, setAnnual] = React.useState(true);
  const tiers = [
    { name: 'Hobby', price: 0, blurb: 'For side projects finding their signal.', feats: ['1 region', '100K requests / mo', 'Community support', 'Preview URLs'], cta: 'Start free', hot: false },
    { name: 'Pulse', price: annual ? 24 : 29, blurb: 'For teams shipping to production.', feats: ['8 regions', '10M requests / mo', 'Live telemetry', 'Auto-scale', 'Priority support'], cta: 'Start free trial', hot: true },
    { name: 'Scale', price: annual ? 79 : 99, blurb: 'For high-traffic, global apps.', feats: ['All 18 regions', 'Unlimited requests', 'SOC 2 + SSO', 'Dedicated nodes', '24/7 on-call'], cta: 'Contact sales', hot: false },
  ];
  return (
    <section style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px 90px' }}>
      <div style={{ textAlign: 'center', marginBottom: 36 }}>
        <div className="np-eyebrow" style={{ justifyContent: 'center' }}><span className="np-livedot" />PRICING</div>
        <h2 style={{ font: 'var(--h1)', color: 'var(--fg-1)', letterSpacing: '-0.02em', margin: '14px 0 22px' }}>Pay for the pulse.</h2>
        <div className="np-seg" style={{ display: 'inline-flex' }}>
          <div className={annual ? '' : 'on'} onClick={() => setAnnual(false)}>Monthly</div>
          <div className={annual ? 'on' : ''} onClick={() => setAnnual(true)}>Annual <span style={{ color: annual ? 'var(--fg-on-neon)' : 'var(--success)' }}>−20%</span></div>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18, alignItems: 'stretch' }} className="np-price-grid">
        {tiers.map(t => (
          <div key={t.name} style={{
            position: 'relative', borderRadius: 'var(--r-xl)', padding: 28,
            background: t.hot ? 'linear-gradient(var(--bg-2),var(--bg-2)) padding-box, var(--grad-pulse) border-box' : 'var(--bg-2)',
            border: '1px solid ' + (t.hot ? 'transparent' : 'var(--line-2)'),
            boxShadow: t.hot ? 'var(--glow-soft)' : 'var(--shadow-1)'
          }}>
            {t.hot && <span style={{ position: 'absolute', top: -11, left: 28, fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--fg-on-neon)', background: 'var(--grad-pulse)', padding: '4px 10px', borderRadius: 'var(--r-full)' }}>Most popular</span>}
            <div className="np-label">{t.name}</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, margin: '14px 0 6px' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 40, color: 'var(--fg-1)' }}>${t.price}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--fg-3)' }}>/mo</span>
            </div>
            <p style={{ font: 'var(--body-sm)', color: 'var(--fg-2)', minHeight: 40 }}>{t.blurb}</p>
            <button className={t.hot ? 'np-btn-primary' : 'np-btn-ghost'} style={{ width: '100%', marginTop: 6, justifyContent: 'center' }}>{t.cta}</button>
            <div style={{ height: 1, background: 'var(--line-1)', margin: '22px 0' }} />
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 11 }}>
              {t.feats.map(f => (
                <li key={f} style={{ display: 'flex', gap: 10, alignItems: 'center', font: 'var(--body-sm)', color: 'var(--fg-2)' }}>
                  <span style={{ color: t.hot ? 'var(--neon-cyan)' : 'var(--success)', display: 'flex' }}><Icon name="check" size={16} /></span>{f}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function CTABand() {
  return (
    <section style={{ position: 'relative', overflow: 'hidden', borderTop: '1px solid var(--line-1)' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(80% 140% at 50% 0%, rgba(0,229,255,0.14), transparent 60%)' }} />
      <div style={{ position: 'relative', maxWidth: 760, margin: '0 auto', padding: '96px 24px', textAlign: 'center' }}>
        <h2 style={{ font: 'var(--display-l)', color: 'var(--fg-1)', letterSpacing: '-0.03em', margin: 0 }}>Light it up.</h2>
        <p style={{ font: 'var(--body-lg)', color: 'var(--fg-2)', margin: '16px auto 30px', maxWidth: 460 }}>
          Deploy your first node in under a minute. No card, no cold starts.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="np-btn-primary np-btn-lg">Start free <Icon name="arrow-right" /></button>
          <button className="np-btn-ghost np-btn-lg">Read the docs</button>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Pricing, CTABand });
