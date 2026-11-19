// Линейный прогресс-бар
export default function ProgressBar({ value = 0, color = 'var(--accent)', height = 8, showLabel = false }) {
  const v = Math.max(0, Math.min(100, value));
  return (
    <div className="progress">
      <div className="progress__track" style={{ height }}>
        <div className="progress__fill" style={{ width: `${v}%`, background: color }} />
      </div>
      {showLabel && <span className="progress__label">{v}%</span>}
    </div>
  );
}

// Круговой прогресс
export function ProgressRing({ value = 0, size = 120, stroke = 10, label }) {
  const v = Math.max(0, Math.min(100, value));
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (v / 100) * c;
  const id = `ring-grad-${size}`;
  return (
    <div className="ring" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#8267F5" />
            <stop offset="100%" stopColor="#35C9A1" />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={r} stroke="var(--bg-3)" strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={`url(#${id})`}
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: 'stroke-dashoffset .6s ease' }}
        />
      </svg>
      <div className="ring__center">
        <strong>{v}%</strong>
        {label && <span>{label}</span>}
      </div>
    </div>
  );
}
