/* Marketing — Hero with looping live-deploy console mock */
const CONSOLE_SCRIPT = [
  { t: 'cmd', txt: '$ pulse deploy --region us-east' },
  { t: 'dim', txt: 'building image · aurora-core' },
  { t: 'ok', txt: '✓ image built  1.24s' },
  { t: 'dim', txt: 'provisioning 3 nodes' },
  { t: 'ok', txt: '✓ nodes online  us-east-1a/1b/1c' },
  { t: 'live', txt: '● LIVE  https://aurora-core.pulse.app  ·  42ms p99' },
];

function ConsoleMock({ step = 700, hold = 2400 }) {
  const reduce = React.useMemo(() => !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches), []);
  const [count, setCount] = React.useState(reduce ? CONSOLE_SCRIPT.length : 0);
  // type every line → hold → clear → replay. Reduced motion: static, all lines.
  React.useEffect(() => {
    if (reduce) return;
    let i = 0, timer;
    const tick = () => {
      if (i < CONSOLE_SCRIPT.length) { i++; setCount(i); timer = setTimeout(tick, i === CONSOLE_SCRIPT.length ? hold : step); }
      else { i = 0; setCount(0); timer = setTimeout(tick, step); }
    };
    timer = setTimeout(tick, step);
    return () => clearTimeout(timer);
  }, [reduce, step, hold]);

  const color = t => t === 'ok' ? 'var(--color-success)' : t === 'live' ? 'var(--color-text-accent)' : t === 'cmd' ? 'var(--color-text)' : 'var(--color-text-muted)';
  return (
    <div className="np-card np-card--live np-card--flush mk-console" style={{ gap: 0, width: '100%' }}>
      <div aria-hidden="true" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px', borderBottom: '1px solid var(--color-border-subtle)' }}>
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--color-danger)' }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--color-warning)' }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--color-success)' }} />
        <span style={{ marginLeft: 8, font: '400 11px/1 var(--font-mono)', color: 'var(--color-text-muted)', letterSpacing: '0.1em' }}>pulse · deploy</span>
      </div>
      <p className="np-sr-only">Example deploy: pulse deploy builds aurora-core, brings three nodes online in us-east and goes live at 42ms p99.</p>
      <div aria-hidden="true" style={{ padding: 18, font: '400 13px/1.9 var(--font-mono)', minHeight: 196, overflowWrap: 'anywhere' }}>
        {CONSOLE_SCRIPT.slice(0, count).map((l, i) => (
          <div key={i} style={{ color: color(l.t), whiteSpace: 'pre-wrap' }}>{l.txt}</div>
        ))}
        <span style={{ display: 'inline-block', width: 8, height: 16, background: 'var(--color-accent)', verticalAlign: 'text-bottom', animation: 'np-blink 1s steps(1) infinite' }} />
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section id="product" aria-labelledby="hero-title" style={{ position: 'relative', overflow: 'hidden' }}>
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, backgroundImage: 'var(--grad-haze)', pointerEvents: 'none' }} />
      <div className="np-container mk-hero-grid" style={{ position: 'relative' }}>
        <div>
          <div className="np-eyebrow"><span className="np-livedot" />Realtime infra</div>
          <h1 id="hero-title" style={{ font: 'var(--display-xl)', color: 'var(--color-text)', letterSpacing: '-0.03em', margin: '18px 0 0' }}>
            Ship at the<br />speed of <span style={{
              background: 'var(--color-action-primary)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent'
            }}>light</span>
          </h1>
          <p style={{ font: 'var(--body-lg)', color: 'var(--color-text-secondary)', maxWidth: 460, margin: '20px 0 0' }}>
            Realtime infrastructure for teams that move fast. Spin up nodes, watch them go live, and never lose the signal.
          </p>
          <div className="np-cluster" style={{ marginTop: 30 }}>
            <a href="#pricing" className="np-btn np-btn--primary np-btn--lg np-btn--cta"><span>Start free</span><Icon name="arrow-right" size={16} /></a>
            <button type="button" className="np-btn np-btn--ghost np-btn--lg"><Icon name="play" size={16} /><span>Watch demo</span></button>
          </div>
          <div className="np-cluster" style={{ gap: '16px 28px', marginTop: 38 }}>
            {[['99.99%', 'uptime'], ['42ms', 'p99 latency'], ['18', 'regions']].map(([n, l]) => (
              <div key={l}>
                <div style={{ font: '700 22px/1.3 var(--font-mono)', color: 'var(--color-text)' }}>{n}</div>
                <div className="np-label" style={{ marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
        <ConsoleMock />
      </div>
    </section>
  );
}

Object.assign(window, { Hero, ConsoleMock, CONSOLE_SCRIPT });
