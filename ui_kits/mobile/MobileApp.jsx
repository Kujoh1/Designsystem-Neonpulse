/* Mobile — NeonPulse app screens + tab bar (dark cyberpunk) */
const MB_NODES = [
  ['aurora-core-1a', 'us-east', 'Online', '38ms'], ['aurora-core-1b', 'us-east', 'Online', '41ms'],
  ['aurora-edge-eu', 'eu-west', 'Online', '52ms'], ['aurora-edge-ap', 'ap-south', 'Degraded', '120ms'],
  ['aurora-batch-1', 'us-west', 'Online', '44ms'], ['aurora-test-x', 'us-east', 'Offline', '—'],
];
const MB_TONE = { Online: 'success', Degraded: 'warning', Offline: 'danger' };

function MiniArea({ data, color = 'var(--color-accent)', h = 64, label }) {
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
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width: '100%', height: h, display: 'block' }} preserveAspectRatio="none"
      role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : 'true'}>
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
  return <span className={'np-badge np-badge--' + MB_TONE[status]}><span className="np-badge__dot" />{status}</span>;
}

function NodeRow({ name, region, status, ms }) {
  // neon only where the node is live; degraded warns, offline goes quiet
  const ic = { Online: 'var(--color-accent)', Degraded: 'var(--color-warning)', Offline: 'var(--color-text-muted)' }[status];
  return (
    <li className="np-list__row" style={{ padding: '14px 16px' }}>
      <span aria-hidden="true" style={{ width: 38, height: 38, flex: 'none', borderRadius: 'var(--r-md)', background: 'var(--color-surface-raised)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: ic }}><Icon name="server" size={18} /></span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ font: '400 13px/1.3 var(--font-mono)', color: 'var(--color-text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{name}</div>
        <div style={{ font: '400 11px/1.3 var(--font-mono)', color: 'var(--color-text-muted)', marginTop: 2 }}>{region} · {ms}</div>
      </div>
      <StatusPill status={status} />
    </li>
  );
}

function NodeList({ nodes }) {
  return (
    <ul className="np-list" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
      {nodes.map(n => <NodeRow key={n[0]} name={n[0]} region={n[1]} status={n[2]} ms={n[3]} />)}
    </ul>
  );
}

function HomeScreen({ setTab }) {
  const [deploy, setDeploy] = React.useState('idle');   // idle → busy → done
  React.useEffect(() => {
    if (deploy !== 'busy') return;
    const t = setTimeout(() => setDeploy('done'), 1400);
    return () => clearTimeout(t);
  }, [deploy]);
  return (
    <div className="np-stack" style={{ padding: '0 16px 16px', gap: 14 }}>
      {/* hero status card — live data, so it carries the live treatment */}
      <section className="np-card np-card--live" aria-label="Fleet status" style={{ position: 'relative', overflow: 'hidden', borderRadius: 'var(--r-xl)', padding: 20, gap: 0 }}>
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, backgroundImage: 'var(--grad-haze)' }} />
        <div style={{ position: 'relative' }}>
          <div className="np-eyebrow" style={{ fontSize: 11, gap: 8 }}><span className="np-livedot" />All systems operational</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 14 }}>
            <span className="np-card__metric" style={{ fontSize: 44, lineHeight: 1 }}>99.99%</span>
            <span style={{ font: '400 12px/1 var(--font-mono)', color: 'var(--color-success)' }}>uptime</span>
          </div>
          <div style={{ marginTop: 14 }}><MiniArea data={[42, 38, 50, 44, 58, 52, 66, 60, 74, 70, 82, 90]} label="Request volume, last 12 hours, trending up" /></div>
        </div>
      </section>

      {/* quick stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {[['p99 latency', '42ms', 70, '42ms of a 60ms budget'], ['requests / s', '12.4K', 62, '12.4K of 20K capacity']].map(([l, v, pct, txt]) => (
          <div key={l} className="np-card" style={{ padding: 16, gap: 8 }}>
            <div className="np-card__eyebrow" style={{ fontSize: 10, letterSpacing: '0.1em' }}>{l}</div>
            <div className="np-card__metric" style={{ fontSize: 24 }}>{v}</div>
            <div className="np-meter" role="meter" aria-label={l} aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct} aria-valuetext={txt} style={{ height: 4, marginTop: 4 }}>
              <div className="np-meter__bar" style={{ '--value': pct + '%' }} />
            </div>
          </div>
        ))}
      </div>

      {/* nodes */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '8px 4px -4px' }}>
        <h2 style={{ font: '600 17px/1.3 var(--font-display)', color: 'var(--color-text)', margin: 0 }}>Nodes</h2>
        <button type="button" className="np-link" onClick={() => setTab('nodes')}
          style={{ border: 0, padding: 0, cursor: 'pointer', font: '400 12px/1.4 var(--font-mono)', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
          See all <Icon name="arrow-right" size={14} />
        </button>
      </div>
      <NodeList nodes={MB_NODES.filter(n => ['aurora-core-1a', 'aurora-edge-eu', 'aurora-edge-ap'].includes(n[0]))} />

      <div aria-live="polite">
        {deploy === 'done' && (
          <div className="np-banner np-banner--success" role="status">
            <span className="np-banner__icon"><Icon name="circle-check" size={18} /></span>
            <span>Deployed. Live in us-east · 42ms p99.</span>
          </div>
        )}
      </div>
      <button type="button" className="np-btn np-btn--primary np-btn--lg np-btn--block" aria-busy={deploy === 'busy'}
        onClick={() => setDeploy('busy')}>
        <Icon name="rocket" size={16} /><span>{deploy === 'done' ? 'Deploy again' : 'Deploy'}</span>
      </button>
    </div>
  );
}

function NodesScreen() {
  const count = s => MB_NODES.filter(n => n[2] === s).length;
  return (
    <div className="np-stack" style={{ padding: '4px 16px 16px', gap: 12 }}>
      <div className="np-cluster" style={{ gap: 8 }} role="group" aria-label="Fleet summary">
        {['Online', 'Degraded', 'Offline'].map(s => (
          <span key={s} className={'np-badge np-badge--outline'} style={{ color: 'var(--color-' + MB_TONE[s] + ')' }}>{count(s)} {s}</span>
        ))}
      </div>
      <NodeList nodes={MB_NODES} />
    </div>
  );
}

function ActivityScreen() {
  // categorical icon hues; only the newest (live) event carries a halo
  const events = [
    ['rocket', 'var(--neon-cyan)', 'Deployed aurora-core', 'us-east · 42ms p99', '2m'],
    ['circle-check', 'var(--color-success)', 'Node back online', 'aurora-edge-ap', '14m'],
    ['triangle-alert', 'var(--color-warning)', 'Latency spike', 'ap-south · 120ms', '38m'],
    ['git-branch', 'var(--neon-violet)', 'Preview created', 'branch: feat/cache', '1h'],
    ['key-round', 'var(--neon-blue)', 'API key rotated', 'sk_live_••••4f2a', '3h'],
  ];
  return (
    <ol style={{ listStyle: 'none', margin: 0, padding: '4px 16px 16px' }}>
      {events.map((e, i) => (
        <li key={i} style={{ display: 'flex', gap: 14, padding: '14px 4px', borderBottom: i < events.length - 1 ? '1px solid var(--color-border-subtle)' : 'none' }}>
          <span aria-hidden="true" style={{
            width: 38, height: 38, flex: 'none', borderRadius: 'var(--r-md)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'var(--color-surface)', border: '1px solid var(--color-border)', color: e[1],
            filter: i === 0 ? `drop-shadow(0 0 5px color-mix(in srgb, ${e[1]} 40%, transparent))` : 'none'
          }}><Icon name={e[0]} size={17} /></span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ font: '400 14px/1.35 var(--font-body)', color: 'var(--color-text)' }}>{e[2]}</div>
            <div style={{ font: '400 11px/1.4 var(--font-mono)', color: 'var(--color-text-muted)', marginTop: 3 }}>{e[3]}</div>
          </div>
          <span style={{ display: 'inline-flex', alignItems: 'flex-start', gap: 6, font: '400 11px/1.4 var(--font-mono)', color: 'var(--color-text-muted)' }}>
            {i === 0 && <span className="np-livedot" style={{ marginTop: 4 }} aria-hidden="true" />}
            <time>{e[4]}</time>
          </span>
        </li>
      ))}
    </ol>
  );
}

function SettingsScreen() {
  const [prefs, setPrefs] = React.useState({ autoscale: true, push: true, verbose: false });
  const [region, setRegion] = React.useState('us-east');
  const toggles = [
    ['autoscale', 'Auto-scale', 'Add nodes when load climbs'],
    ['push', 'Push alerts', 'Incidents and deploy results'],
    ['verbose', 'Verbose logs', 'Full request traces · 7-day retention'],
  ];
  return (
    <div className="np-stack" style={{ padding: '4px 16px 24px', gap: 22 }}>
      <section className="np-card np-card--row" aria-label="Account" style={{ padding: 16, gap: 14 }}>
        <span className="np-avatar" aria-hidden="true" style={{ '--av': '48px' }}>KV</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ font: 'var(--h4)', color: 'var(--color-text)' }}>Kira Vance</div>
          <div style={{ font: '400 12px/1.4 var(--font-mono)', color: 'var(--color-text-muted)', marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>kira@aurora.dev</div>
        </div>
        <span className="np-badge np-badge--accent">Owner</span>
      </section>

      <section aria-labelledby="mb-prefs">
        <h2 id="mb-prefs" className="np-label" style={{ margin: '0 4px 10px' }}>Preferences</h2>
        <div className="np-list">
          {toggles.map(([k, label, hint]) => (
            <label key={k} className="np-switch np-list__row" style={{ padding: '14px 16px', justifyContent: 'space-between' }}>
              <span style={{ flex: 1, minWidth: 0 }}>
                <span id={'mb-' + k} style={{ display: 'block', font: '400 14px/1.35 var(--font-body)', color: 'var(--color-text)' }}>{label}</span>
                <span id={'mb-' + k + '-hint'} style={{ display: 'block', font: '400 11px/1.4 var(--font-mono)', color: 'var(--color-text-muted)', marginTop: 3 }}>{hint}</span>
              </span>
              <input type="checkbox" role="switch" checked={prefs[k]} aria-labelledby={'mb-' + k} aria-describedby={'mb-' + k + '-hint'}
                onChange={() => setPrefs(p => ({ ...p, [k]: !p[k] }))} />
              <span className="np-switch__track" aria-hidden="true" />
            </label>
          ))}
        </div>
      </section>

      <section aria-labelledby="mb-region">
        <h2 id="mb-region" className="np-label" style={{ margin: '0 4px 10px' }}>Default region</h2>
        <div className="np-seg" role="group" aria-labelledby="mb-region" style={{ display: 'flex' }}>
          {['us-east', 'us-west', 'eu-west', 'ap-south'].map(r => (
            <button key={r} type="button" className="np-seg__item" aria-pressed={region === r} onClick={() => setRegion(r)} style={{ flex: 1, padding: '8px 6px' }}>{r}</button>
          ))}
        </div>
        <p style={{ font: 'var(--caption)', color: 'var(--color-text-muted)', margin: '8px 4px 0' }}>New deploys ship to <span className="np-code">{region}</span> unless a region is set.</p>
      </section>

      <button type="button" className="np-btn np-btn--danger np-btn--block"><Icon name="log-out" size={16} /><span>Sign out</span></button>
      <div className="np-label" style={{ textAlign: 'center', fontSize: 10 }}>NeonPulse 2.4.0 · build 7f3a</div>
    </div>
  );
}

function MobileHeader({ tab, framed }) {
  const titles = { home: 'aurora-core', nodes: 'Nodes', activity: 'Activity', settings: 'Settings' };
  return (
    <header style={{ padding: framed ? '58px 16px 12px' : 'calc(16px + env(safe-area-inset-top)) 16px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
      <div>
        {tab === 'home' && <div className="np-eyebrow" style={{ fontSize: 11, marginBottom: 4 }}>Good evening, Kira</div>}
        <h1 style={{ font: '700 28px/1.15 var(--font-display)', color: 'var(--color-text)', margin: 0, letterSpacing: '-0.01em' }}>{titles[tab]}</h1>
      </div>
      {tab !== 'settings' && <span className="np-avatar" role="img" aria-label="Kira Vance" style={{ '--av': '38px' }}>KV</span>}
    </header>
  );
}

function TabBar({ tab, setTab, framed }) {
  const tabs = [['home', 'house', 'Home'], ['nodes', 'server', 'Nodes'], ['activity', 'activity', 'Activity'], ['settings', 'sliders-horizontal', 'Settings']];
  return (
    <nav aria-label="Tabs" style={{
      display: 'flex', padding: framed ? '10px 12px 26px' : '10px 12px calc(10px + env(safe-area-inset-bottom))',
      borderTop: '1px solid var(--color-border-subtle)',
      background: 'var(--color-bg-translucent)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)'
    }}>
      {tabs.map(([k, ic, label]) => (
        <button key={k} type="button" className="mb-tab" onClick={() => setTab(k)} aria-label={label} aria-current={tab === k ? 'page' : undefined}>
          <Icon name={ic} size={21} />
          <span className="mb-tab__label">{label}</span>
        </button>
      ))}
    </nav>
  );
}

function NeonPulseApp({ framed = true }) {
  const [tab, setTab] = React.useState('home');
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--color-bg-page)' }}>
      <MobileHeader tab={tab} framed={framed} />
      <main style={{ flex: 1, overflow: 'auto' }}>
        {tab === 'home' && <HomeScreen setTab={setTab} />}
        {tab === 'nodes' && <NodesScreen />}
        {tab === 'activity' && <ActivityScreen />}
        {tab === 'settings' && <SettingsScreen />}
      </main>
      <TabBar tab={tab} setTab={setTab} framed={framed} />
    </div>
  );
}

Object.assign(window, { NeonPulseApp, MiniArea, NodeRow, NodeList, StatusPill, HomeScreen, NodesScreen, ActivityScreen, SettingsScreen, TabBar, MobileHeader });
