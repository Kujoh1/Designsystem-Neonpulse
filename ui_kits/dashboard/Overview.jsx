/* Dashboard — Overview: stat cards, charts, table */
function StatCard({ label, value, delta, good, spark, color }) {
  const down = /^[−-]/.test(delta);
  return (
    <div className="np-card" style={{ padding: 18, gap: 12 }}>
      <div className="np-card__eyebrow" style={{ fontSize: 10 }}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 10 }}>
        <div>
          <div className="np-card__metric" style={{ fontSize: 30, lineHeight: 1 }}>{value}</div>
          <div className="np-card__delta" style={{ color: good ? 'var(--color-success)' : 'var(--color-danger)', marginTop: 8, display: 'flex', alignItems: 'center', gap: 4 }}>
            <Icon name={down ? 'trending-down' : 'trending-up'} size={14} /> {delta}
          </div>
        </div>
        <Sparkline data={spark} up={good} color={color} />
      </div>
    </div>
  );
}

function Overview({ range }) {
  const series = {
    Live: [42, 38, 46, 40, 52, 48, 60, 55, 68, 62, 74, 70, 82, 78, 90],
    '1H': [30, 44, 36, 50, 42, 58, 48, 64, 54, 70, 60, 76, 66, 82, 72],
    '24H': [60, 52, 68, 58, 72, 64, 56, 70, 62, 78, 68, 84, 74, 66, 80],
    '7D': [20, 35, 28, 45, 38, 55, 48, 62, 58, 70, 65, 78, 72, 85, 92],
  };
  const data = series[range] || series.Live;
  const live = range === 'Live';
  return (
    <div className="db-page np-stack">
      <div className="db-stat-grid">
        <StatCard label="Requests" value="6.8M" delta="+24.6%" good spark={[10, 14, 12, 18, 16, 22, 20, 28]} color="var(--neon-cyan)" />
        <StatCard label="p99 latency" value="42ms" delta="−8.1%" good spark={[28, 24, 26, 20, 22, 18, 16, 14]} color="var(--neon-blue)" />
        <StatCard label="Error rate" value="0.02%" delta="−0.4%" good spark={[8, 6, 9, 5, 6, 4, 5, 3]} color="var(--color-success)" />
        <StatCard label="Active nodes" value="18" delta="+3" good spark={[12, 12, 14, 13, 15, 16, 16, 18]} color="var(--neon-violet)" />
      </div>

      <div className="db-chart-grid">
        {/* live data earns the live card treatment; history renders flat */}
        <section className={'np-card' + (live ? ' np-card--live' : '')} style={{ padding: 20, gap: 6 }} aria-labelledby="thr-title">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
            <div>
              <h2 id="thr-title" className="np-card__title" style={{ margin: 0 }}>Throughput</h2>
              <span style={{ font: '400 11px/1.4 var(--font-mono)', color: 'var(--color-text-muted)' }}>requests / sec · {range}</span>
            </div>
            {live
              ? <span className="np-badge np-badge--accent np-badge--live"><span className="np-badge__dot" />Live</span>
              : <span className="np-badge np-badge--outline">{range}</span>}
          </div>
          <AreaChart data={data} id="thr" height={230} label={'Throughput, requests per second, ' + range} />
        </section>
        <section className="np-card" style={{ padding: 20, gap: 4 }} aria-labelledby="cpu-title">
          <h2 id="cpu-title" className="np-card__title" style={{ margin: 0 }}>CPU saturation</h2>
          <span style={{ font: '400 11px/1.4 var(--font-mono)', color: 'var(--color-text-muted)' }}>fleet average</span>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1, padding: '12px 0' }}>
            <Donut value={72} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', font: '400 11px/1.4 var(--font-mono)', color: 'var(--color-text-muted)' }}>
            <span>peak 91%</span><span style={{ color: 'var(--color-success)' }}>headroom 28%</span>
          </div>
        </section>
      </div>

      <section className="np-card np-card--flush" style={{ gap: 0 }} aria-labelledby="nodes-title">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, padding: '16px 20px', borderBottom: '1px solid var(--color-border-subtle)' }}>
          <h2 id="nodes-title" className="np-card__title" style={{ margin: 0 }}>Nodes</h2>
          <button type="button" className="np-btn np-btn--ghost np-btn--sm"><Icon name="list-filter" size={14} /><span>Filter</span></button>
        </div>
        <NodeTable />
      </section>
    </div>
  );
}

function NodeTable() {
  const rows = [
    ['aurora-core-1a', 'us-east', 'Online', 99.99, '38ms', '1.2M'],
    ['aurora-core-1b', 'us-east', 'Online', 99.98, '41ms', '1.1M'],
    ['aurora-edge-eu', 'eu-west', 'Online', 99.95, '52ms', '880K'],
    ['aurora-edge-ap', 'ap-south', 'Degraded', 98.20, '120ms', '420K'],
    ['aurora-batch-1', 'us-west', 'Online', 99.99, '44ms', '610K'],
    ['aurora-test-x', 'us-east', 'Offline', 0, '—', '0'],
  ];
  const tone = { Online: 'success', Degraded: 'warning', Offline: 'danger' };
  const cols = [['Node'], ['Region'], ['Status'], ['Uptime', true], ['p99', true], ['Reqs', true]];
  return (
    <div className="np-table-wrap" tabIndex={0} role="region" aria-labelledby="nodes-title">
      <table className="np-table">
        <thead>
          <tr>{cols.map(([h, num]) => <th key={h} scope="col" className={num ? 'is-num' : undefined}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r[0]}>
              <td className="is-strong">{r[0]}</td>
              <td>{r[1]}</td>
              <td><span className={'np-badge np-badge--' + tone[r[2]]}><span className="np-badge__dot" />{r[2]}</span></td>
              <td className="is-num">{r[3].toFixed(2)}%</td>
              <td className="is-num">{r[4]}</td>
              <td className="is-num">{r[5]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

Object.assign(window, { Overview, StatCard, NodeTable });
