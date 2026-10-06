/* Marketing — pricing with monthly/annual .np-seg + CTA band */
function Pricing() {
  const [annual, setAnnual] = React.useState(true);
  const tiers = [
    { name: 'Hobby', price: 0, blurb: 'For side projects finding their signal.', feats: ['1 region', '100K requests / mo', 'Community support', 'Preview URLs'], cta: 'Start free', hot: false },
    { name: 'Pulse', price: annual ? 24 : 29, blurb: 'For teams shipping to production.', feats: ['8 regions', '10M requests / mo', 'Live telemetry', 'Auto-scale', 'Priority support'], cta: 'Start free trial', hot: true },
    { name: 'Scale', price: annual ? 79 : 99, blurb: 'For high-traffic, global apps.', feats: ['All 18 regions', 'Unlimited requests', 'SOC 2 + SSO', 'Dedicated nodes', '24/7 on-call'], cta: 'Contact sales', hot: false },
  ];
  return (
    <section id="pricing" aria-labelledby="pricing-title" className="np-container" style={{ paddingBlock: '40px 90px' }}>
      <div style={{ textAlign: 'center', marginBottom: 36 }}>
        <div className="np-eyebrow"><span className="np-livedot" />Pricing</div>
        <h2 id="pricing-title" style={{ font: 'var(--h1)', color: 'var(--color-text)', letterSpacing: '-0.02em', margin: '14px 0 22px' }}>Pay for the pulse.</h2>
        <div className="np-seg" role="group" aria-label="Billing period">
          <button type="button" className="np-seg__item" aria-pressed={!annual} onClick={() => setAnnual(false)}>Monthly</button>
          <button type="button" className="np-seg__item" aria-pressed={annual} onClick={() => setAnnual(true)}>
            Annual <span style={{ color: annual ? 'inherit' : 'var(--color-success)' }}>−20%</span>
          </button>
        </div>
      </div>
      <div className="np-grid" style={{ '--np-grid-min': '280px', gap: 18, alignItems: 'stretch' }}>
        {tiers.map(t => (
          <article key={t.name} aria-labelledby={'tier-' + t.name} className={'np-card' + (t.hot ? ' np-card--live' : '')}
            style={{ position: 'relative', borderRadius: 'var(--r-xl)', padding: 28, gap: 0 }}>
            {t.hot && <span className="np-badge" style={{ position: 'absolute', top: -11, left: 28, fontSize: 10, letterSpacing: '0.14em', color: 'var(--color-text-on-accent)', background: 'var(--color-action-primary)' }}>Most popular</span>}
            <h3 id={'tier-' + t.name} className="np-label" style={{ margin: 0 }}>{t.name}</h3>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, margin: '14px 0 6px' }}>
              <span className="np-card__metric" style={{ fontSize: 40 }}>${t.price}</span>
              <span style={{ font: '400 13px/1 var(--font-mono)', color: 'var(--color-text-muted)' }}>/mo{t.price > 0 && annual ? ' · billed annually' : ''}</span>
            </div>
            <p className="np-card__body" style={{ minHeight: 40 }}>{t.blurb}</p>
            <button type="button" className={'np-btn np-btn--block ' + (t.hot ? 'np-btn--primary' : 'np-btn--ghost')} style={{ marginTop: 6 }}><span>{t.cta}</span></button>
            <hr className="np-divider" style={{ margin: '22px 0' }} />
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 11 }}>
              {t.feats.map(f => (
                <li key={f} style={{ display: 'flex', gap: 10, alignItems: 'center', font: 'var(--body-sm)', color: 'var(--color-text-secondary)' }}>
                  <span aria-hidden="true" style={{ color: t.hot ? 'var(--color-accent)' : 'var(--color-success)', display: 'flex' }}><Icon name="check" size={16} /></span>{f}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

function CTABand() {
  return (
    <section id="docs" aria-labelledby="cta-title" style={{ position: 'relative', overflow: 'hidden', borderTop: '1px solid var(--color-border-subtle)' }}>
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(80% 140% at 50% 0%, color-mix(in srgb, var(--color-accent) 14%, transparent), transparent 60%)' }} />
      <div className="np-container" style={{ position: 'relative', maxWidth: 760, paddingBlock: 96, textAlign: 'center' }}>
        <h2 id="cta-title" style={{ font: 'var(--display-l)', color: 'var(--color-text)', letterSpacing: '-0.03em', margin: 0 }}>Light it up.</h2>
        <p style={{ font: 'var(--body-lg)', color: 'var(--color-text-secondary)', margin: '16px auto 30px', maxWidth: 460 }}>
          Deploy your first node in under a minute. No card, no cold starts.
        </p>
        <div className="np-cluster" style={{ justifyContent: 'center' }}>
          <a href="#pricing" className="np-btn np-btn--primary np-btn--lg"><span>Start free</span><Icon name="arrow-right" size={16} /></a>
          <button type="button" className="np-btn np-btn--ghost np-btn--lg"><Icon name="book-open" size={16} /><span>Read the docs</span></button>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Pricing, CTABand });
