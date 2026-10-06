/* Marketing — footer */
function Footer() {
  const cols = [
    { h: 'Product', links: [['Platform', '#platform'], ['Pricing', '#pricing'], ['Docs', '#docs'], ['Changelog'], ['Status']] },
    { h: 'Company', links: [['About'], ['Blog'], ['Careers'], ['Press']] },
    { h: 'Resources', links: [['Guides'], ['API reference'], ['Community'], ['Support']] },
    { h: 'Legal', links: [['Privacy'], ['Terms'], ['Security'], ['DPA']] },
  ];
  const social = [['at-sign', 'Email'], ['message-circle', 'Community chat'], ['rss', 'RSS feed']];
  return (
    <footer style={{ borderTop: '1px solid var(--color-border-subtle)', background: 'var(--color-bg-void)' }}>
      <div className="np-container" style={{ paddingBlock: '56px 28px' }}>
        <div className="mk-foot-grid">
          <div>
            <NPLogo />
            <p style={{ font: 'var(--body-sm)', color: 'var(--color-text-muted)', maxWidth: 230, margin: '16px 0 0' }}>
              Realtime infrastructure for teams that move fast.
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
              {social.map(([s, label]) => (
                <a key={s} href="#" className="np-icon-btn" aria-label={label}><Icon name={s} size={16} /></a>
              ))}
            </div>
          </div>
          {cols.map(c => (
            <nav key={c.h} aria-labelledby={'foot-' + c.h}>
              <h2 id={'foot-' + c.h} className="np-label" style={{ margin: '0 0 14px' }}>{c.h}</h2>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {c.links.map(([l, href]) => (
                  <li key={l}><a href={href || '#'} className="mk-footlink">{l}</a></li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 44, paddingTop: 22, borderTop: '1px solid var(--color-border-subtle)', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ font: '400 12px/1.4 var(--font-mono)', color: 'var(--color-text-muted)', letterSpacing: '0.04em' }}>© 2026 NeonPulse, Inc.</span>
          <span className="np-eyebrow" style={{ gap: 8, letterSpacing: '0.04em', textTransform: 'none' }}>
            <span className="np-livedot" />All systems operational
          </span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Footer });
