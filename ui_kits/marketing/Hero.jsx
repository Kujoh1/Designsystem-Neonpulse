/* Marketing — Hero with live console mock */
function ConsoleMock() {
  const [lines, setLines] = React.useState([]);
  const script = React.useMemo(() => ([
    { t: 'cmd', txt: '$ pulse deploy --region us-east' },
    { t: 'dim', txt: 'building image · aurora-core' },
    { t: 'ok', txt: '✓ image built  1.24s' },
    { t: 'dim', txt: 'provisioning 3 nodes' },
    { t: 'ok', txt: '✓ nodes online  us-east-1a/1b/1c' },
    { t: 'live', txt: '● LIVE  https://aurora-core.pulse.app  ·  42ms p99' },
  ]), []);
  React.useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i++;
      setLines(script.slice(0, i));
      if (i >= script.length) { clearInterval(id); setTimeout(() => { i = 0; }, 1200); }
    }, 700);
    return () => clearInterval(id);
  }, [script]);
  const color = t => t === 'ok' ? 'var(--success)' : t === 'live' ? 'var(--neon-cyan)' : t === 'cmd' ? 'var(--fg-1)' : 'var(--fg-3)';
  return (
    <div style={{
      background: 'var(--bg-2)', border: '1px solid var(--line-2)', borderRadius: 'var(--r-lg)',
      boxShadow: 'var(--glow-soft)', overflow: 'hidden', width: '100%'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px', borderBottom: '1px solid var(--line-1)' }}>
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--danger)' }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--warning)' }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--success)' }} />
        <span style={{ marginLeft: 8, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-3)', letterSpacing: '0.1em' }}>pulse · deploy</span>
      </div>
      <div style={{ padding: 18, fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 1.9, minHeight: 196 }}>
        {lines.map((l, i) => (
          <div key={i} style={{ color: color(l.t), whiteSpace: 'pre-wrap' }}>{l.txt}</div>
        ))}
        <span style={{ display: 'inline-block', width: 8, height: 16, background: 'var(--neon-cyan)', verticalAlign: 'text-bottom', animation: 'np-blink 1s steps(1) infinite' }} />
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section style={{ position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'var(--grad-haze)', pointerEvents: 'none' }} />
      <div style={{
        position: 'relative', maxWidth: 1200, margin: '0 auto', padding: '0 24px',
        display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 56, alignItems: 'center', minHeight: 560
      }} className="np-hero-grid">
        <div>
          <div className="np-eyebrow"><span className="np-livedot" />REALTIME INFRA</div>
          <h1 style={{ font: 'var(--display-xl)', color: 'var(--fg-1)', letterSpacing: '-0.03em', margin: '18px 0 0' }} className="np-h1">
            Ship at the<br />speed of <span style={{
              background: 'var(--grad-pulse)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent'
            }}>light</span>
          </h1>
          <p style={{ font: 'var(--body-lg)', color: 'var(--fg-2)', maxWidth: 460, marginTop: 20 }}>
            Realtime infrastructure for teams that move fast. Spin up nodes, watch them go live, and never lose the signal.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 30, flexWrap: 'wrap' }}>
            <button className="np-btn-primary np-btn-lg">Start free <Icon name="arrow-right" /></button>
            <button className="np-btn-ghost np-btn-lg"><Icon name="play" /> Watch demo</button>
          </div>
          <div style={{ display: 'flex', gap: 28, marginTop: 38 }}>
            {[['99.99%', 'uptime'], ['42ms', 'p99 latency'], ['18', 'regions']].map(([n, l]) => (
              <div key={l}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 22, color: 'var(--fg-1)', fontWeight: 700 }}>{n}</div>
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

Object.assign(window, { Hero, ConsoleMock });
