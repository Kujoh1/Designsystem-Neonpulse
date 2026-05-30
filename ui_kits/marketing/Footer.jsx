/* Marketing — Footer */
function Footer() {
  const cols = [
    { h: 'Product', links: ['Platform', 'Pricing', 'Changelog', 'Status', 'Docs'] },
    { h: 'Company', links: ['About', 'Blog', 'Careers', 'Press'] },
    { h: 'Resources', links: ['Guides', 'API reference', 'Community', 'Support'] },
    { h: 'Legal', links: ['Privacy', 'Terms', 'Security', 'DPA'] },
  ];
  return (
    <footer style={{ borderTop: '1px solid var(--line-1)', background: 'var(--bg-0)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '56px 24px 28px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr repeat(4,1fr)', gap: 32 }} className="np-foot-grid">
          <div>
            <NPLogo />
            <p style={{ font: 'var(--body-sm)', color: 'var(--fg-3)', maxWidth: 230, marginTop: 16 }}>
              Realtime infrastructure for teams that move fast.
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
              {['at-sign', 'message-circle', 'rss'].map(s => (
                <a key={s} href="#" className="np-icon-btn" style={{ textDecoration: 'none' }}><Icon name={s} size={16} /></a>
              ))}
            </div>
          </div>
          {cols.map(c => (
            <div key={c.h}>
              <div className="np-label" style={{ marginBottom: 14 }}>{c.h}</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {c.links.map(l => (
                  <li key={l}><a href="#" style={{ font: 'var(--body-sm)', color: 'var(--fg-2)', textDecoration: 'none' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--neon-cyan)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--fg-2)'}>{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 44, paddingTop: 22, borderTop: '1px solid var(--line-1)', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--fg-3)', letterSpacing: '0.04em' }}>© 2026 NeonPulse, Inc.</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--fg-3)' }}>
            <span className="np-livedot" />All systems operational
          </span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Footer });
