/* Mobile — NeonPulse app screens + tab bar (dark cyberpunk) */

function MiniArea({ data, color = 'var(--neon-cyan)', h = 64 }) {
  const w = 320, pad = 4;
  const max = Math.max(...data), min = Math.min(...data);
  const pts = data.map((v, i) => [
    pad + (i / (data.length - 1)) * (w - pad * 2),
    h - pad - ((v - min) / (max - min || 1)) * (h - pad * 2)
  ]);
  let d = `M ${pts[0][0]},${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const mx = (pts[i][0] + pts[i + 1][0]) / 2;
    d += ` C ${mx},${pts[i][1]} ${mx},${pts[i + 1][1]} ${pts[i + 1][0]},${pts[i + 1][1]}`;
  }
  const area = d + ` L ${pts[pts.length - 1][0]},${h} L ${pts[0][0]},${h} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width: '100%', height: h, display: 'block' }} preserveAspectRatio="none">
      <defs>
        <linearGradient id="mfill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.32" /><stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
        <filter id="mglow" x="-10%" y="-40%" width="120%" height="180%"><feGaussianBlur stdDeviation="2" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
      </defs>
      <path d={area} fill="url(#mfill)" />
      <path d={d} fill="none" stroke={color} strokeWidth="2.4" filter="url(#mglow)" strokeLinecap="round" />
    </svg>
  );
}

function StatusPill({ status }) {
  const map = {
    Online: ['var(--success)', 'var(--success-fill)'],
    Degraded: ['var(--warning)', 'var(--warning-fill)'],
    Offline: ['var(--danger)', 'var(--danger-fill)'],
  };
  const [c, bg] = map[status];
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', color: c, background: bg, padding: '4px 9px', borderRadius: 'var(--r-full)' }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: c }} />{status}
    </span>
  );
}

function NodeRow({ name, region, status, ms }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderBottom: '1px solid var(--line-1)' }}>
      <div style={{ width: 38, height: 38, borderRadius: 'var(--r-md)', background: 'var(--bg-3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--neon-cyan)', flex: 'none' }}><Icon name="server" size={18} /></div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--fg-1)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{name}</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-3)', marginTop: 2 }}>{region} · {ms}</div>
      </div>
      <StatusPill status={status} />
    </div>
  );
}

function HomeScreen() {
  const nodes = [
    ['aurora-core-1a', 'us-east', 'Online', '38ms'],
    ['aurora-edge-eu', 'eu-west', 'Online', '52ms'],
    ['aurora-edge-ap', 'ap-south', 'Degraded', '120ms'],
  ];
  return (
    <div style={{ padding: '0 16px 16px' }}>
      {/* hero status card */}
      <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 'var(--r-xl)', padding: 20, background: 'var(--bg-2)', border: '1px solid var(--line-2)', boxShadow: 'var(--glow-soft)' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'var(--grad-haze)' }} />
        <div style={{ position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--neon-cyan)', boxShadow: '0 0 8px var(--neon-cyan)', animation: 'np-blink 1.4s infinite' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--fg-3)' }}>All systems operational</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 14 }}>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 44, color: 'var(--fg-1)', lineHeight: 1 }}>99.99%</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--success)' }}>uptime</span>
          </div>
          <div style={{ marginTop: 14 }}><MiniArea data={[42, 38, 50, 44, 58, 52, 66, 60, 74, 70, 82, 90]} /></div>
        </div>
      </div>

      {/* quick stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 14 }}>
        {[['p99 latency', '42ms', 'var(--neon-blue)'], ['requests / s', '12.4K', 'var(--neon-cyan)']].map(([l, v, c]) => (
          <div key={l} style={{ background: 'var(--bg-2)', border: '1px solid var(--line-2)', borderRadius: 'var(--r-lg)', padding: 16 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--fg-3)' }}>{l}</div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 24, color: 'var(--fg-1)', marginTop: 8 }}>{v}</div>
            <div style={{ height: 3, borderRadius: 2, background: c, marginTop: 12, boxShadow: `0 0 8px ${c}`, width: '70%' }} />
          </div>
        ))}
      </div>

      {/* nodes */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '22px 4px 10px' }}>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 17, color: 'var(--fg-1)' }}>Nodes</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--neon-cyan)' }}>See all →</span>
      </div>
      <div style={{ background: 'var(--bg-2)', border: '1px solid var(--line-2)', borderRadius: 'var(--r-lg)', overflow: 'hidden' }}>
        {nodes.map((n, i) => <NodeRow key={i} name={n[0]} region={n[1]} status={n[2]} ms={n[3]} />)}
      </div>

      <button className="np-btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 16 }}><Icon name="rocket" size={16} /> Deploy</button>
    </div>
  );
}

function ActivityScreen() {
  const events = [
    ['rocket', 'var(--neon-cyan)', 'Deployed aurora-core', 'us-east · 42ms p99', '2m'],
    ['check-circle-2', 'var(--success)', 'Node back online', 'aurora-edge-ap', '14m'],
    ['alert-triangle', 'var(--warning)', 'Latency spike', 'ap-south · 120ms', '38m'],
    ['git-branch', 'var(--neon-violet)', 'Preview created', 'branch: feat/cache', '1h'],
    ['key-round', 'var(--neon-blue)', 'API key rotated', 'sk_live_••••4f2a', '3h'],
  ];
  return (
    <div style={{ padding: '4px 16px 16px' }}>
      {events.map((e, i) => (
        <div key={i} style={{ display: 'flex', gap: 14, padding: '14px 4px', borderBottom: i < events.length - 1 ? '1px solid var(--line-1)' : 'none' }}>
          <div style={{ width: 38, height: 38, borderRadius: 'var(--r-md)', background: 'var(--bg-2)', border: '1px solid var(--line-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: e[1], flex: 'none', filter: `drop-shadow(0 0 5px ${e[1]}66)` }}><Icon name={e[0]} size={17} /></div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--fg-1)' }}>{e[2]}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-3)', marginTop: 3 }}>{e[3]}</div>
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-4)' }}>{e[4]}</span>
        </div>
      ))}
    </div>
  );
}

function MobileHeader({ tab }) {
  const titles = { home: 'aurora-core', nodes: 'Nodes', activity: 'Activity', settings: 'Settings' };
  return (
    <div style={{ padding: '58px 16px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div>
        {tab === 'home' && <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--fg-3)', marginBottom: 4 }}>Good evening, Kira</div>}
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 28, color: 'var(--fg-1)', margin: 0, letterSpacing: '-0.01em' }}>{titles[tab]}</h1>
      </div>
      <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'var(--grad-pulse-hot)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13, color: '#fff' }}>KV</div>
    </div>
  );
}

function TabBar({ tab, setTab }) {
  const tabs = [['home', 'Home'], ['server', 'Nodes'], ['activity', 'Activity'], ['settings', 'Settings']];
  const key = { home: 'home', server: 'nodes', activity: 'activity', settings: 'settings' };
  return (
    <div style={{ display: 'flex', padding: '10px 12px 26px', borderTop: '1px solid var(--line-1)', background: 'rgba(7,7,13,0.82)', backdropFilter: 'blur(14px)' }}>
      {tabs.map(([ic, label]) => {
        const k = key[ic];
        const on = tab === k;
        return (
          <button key={k} onClick={() => setTab(k)} style={{ flex: 1, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, color: on ? 'var(--neon-cyan)' : 'var(--fg-3)', transition: 'color var(--dur)' }}>
            <span style={{ display: 'flex', filter: on ? 'drop-shadow(0 0 6px var(--neon-cyan))' : 'none' }}><Icon name={ic} size={21} /></span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{label}</span>
          </button>
        );
      })}
    </div>
  );
}

function NeonPulseApp() {
  const [tab, setTab] = React.useState('home');
  const nodesAll = [
    ['aurora-core-1a', 'us-east', 'Online', '38ms'], ['aurora-core-1b', 'us-east', 'Online', '41ms'],
    ['aurora-edge-eu', 'eu-west', 'Online', '52ms'], ['aurora-edge-ap', 'ap-south', 'Degraded', '120ms'],
    ['aurora-batch-1', 'us-west', 'Online', '44ms'], ['aurora-test-x', 'us-east', 'Offline', '—'],
  ];
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--bg-1)' }}>
      <MobileHeader tab={tab} />
      <div style={{ flex: 1, overflow: 'auto' }}>
        {tab === 'home' && <HomeScreen />}
        {tab === 'nodes' && <div style={{ padding: '4px 16px 16px' }}><div style={{ background: 'var(--bg-2)', border: '1px solid var(--line-2)', borderRadius: 'var(--r-lg)', overflow: 'hidden' }}>{nodesAll.map((n, i) => <NodeRow key={i} name={n[0]} region={n[1]} status={n[2]} ms={n[3]} />)}</div></div>}
        {tab === 'activity' && <ActivityScreen />}
        {tab === 'settings' && <div style={{ padding: 40, textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--fg-3)' }}><div style={{ color: 'var(--neon-cyan)', marginBottom: 10 }}><Icon name="construction" size={22} /></div>Settings · placeholder</div>}
      </div>
      <TabBar tab={tab} setTab={setTab} />
    </div>
  );
}

Object.assign(window, { NeonPulseApp, MiniArea, NodeRow, StatusPill });
