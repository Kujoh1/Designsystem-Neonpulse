/* Dashboard — SVG charts (area, bars, donut, sparkline) */

function smoothPath(pts) {
  if (pts.length < 2) return '';
  let d = `M ${pts[0][0]},${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const [x0, y0] = pts[i];
    const [x1, y1] = pts[i + 1];
    const mx = (x0 + x1) / 2;
    d += ` C ${mx},${y0} ${mx},${y1} ${x1},${y1}`;
  }
  return d;
}

function AreaChart({ data, color = 'var(--neon-cyan)', height = 220, id = 'a' }) {
  const w = 680, h = height, pad = 14;
  const max = Math.max(...data) * 1.15, min = Math.min(...data) * 0.85;
  const pts = data.map((v, i) => [
    pad + (i / (data.length - 1)) * (w - pad * 2),
    h - pad - ((v - min) / (max - min)) * (h - pad * 2)
  ]);
  const line = smoothPath(pts);
  const area = line + ` L ${pts[pts.length - 1][0]},${h - pad} L ${pts[0][0]},${h - pad} Z`;
  const last = pts[pts.length - 1];
  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width: '100%', height, display: 'block' }} preserveAspectRatio="none">
      <defs>
        <linearGradient id={`fill-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.28" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
        <filter id={`glow-${id}`} x="-20%" y="-40%" width="140%" height="180%">
          <feGaussianBlur stdDeviation="3.2" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      {[0.25, 0.5, 0.75].map(g => <line key={g} x1="0" x2={w} y1={h * g} y2={h * g} stroke="var(--line-1)" strokeWidth="1" />)}
      <path d={area} fill={`url(#fill-${id})`} />
      <path d={line} fill="none" stroke={color} strokeWidth="2.4" filter={`url(#glow-${id})`} strokeLinecap="round" />
      <circle cx={last[0]} cy={last[1]} r="4.5" fill={color} filter={`url(#glow-${id})`} />
      <circle cx={last[0]} cy={last[1]} r="9" fill="none" stroke={color} strokeOpacity="0.4" />
    </svg>
  );
}

function BarChart({ data, color = 'var(--neon-blue)', height = 180 }) {
  const w = 320, h = height, pad = 8, gap = 8;
  const max = Math.max(...data) * 1.1;
  const bw = (w - pad * 2 - gap * (data.length - 1)) / data.length;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width: '100%', height, display: 'block' }} preserveAspectRatio="none">
      <defs>
        <linearGradient id="barg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--neon-cyan)" /><stop offset="100%" stopColor="var(--neon-blue)" />
        </linearGradient>
      </defs>
      {data.map((v, i) => {
        const bh = (v / max) * (h - pad * 2);
        return <rect key={i} x={pad + i * (bw + gap)} y={h - pad - bh} width={bw} height={bh} rx="3" fill="url(#barg)" opacity={i === data.length - 1 ? 1 : 0.55} />;
      })}
    </svg>
  );
}

function Donut({ value = 72, color = 'var(--neon-cyan)', size = 132 }) {
  const r = size / 2 - 12, c = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <defs><filter id="dglow"><feGaussianBlur stdDeviation="2.4" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter></defs>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--bg-4)" strokeWidth="10" />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth="10" strokeLinecap="round"
        strokeDasharray={c} strokeDashoffset={c * (1 - value / 100)} filter="url(#dglow)"
        transform={`rotate(-90 ${size / 2} ${size / 2})`} />
      <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="26" fontWeight="700" fill="var(--fg-1)">{value}%</text>
    </svg>
  );
}

function Sparkline({ data, color, up = true }) {
  const w = 90, h = 30;
  const max = Math.max(...data), min = Math.min(...data);
  const pts = data.map((v, i) => [(i / (data.length - 1)) * w, h - ((v - min) / (max - min || 1)) * (h - 4) - 2]);
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ display: 'block' }}>
      <polyline points={pts.map(p => p.join(',')).join(' ')} fill="none" stroke={color || (up ? 'var(--success)' : 'var(--danger)')} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

Object.assign(window, { AreaChart, BarChart, Donut, Sparkline });
