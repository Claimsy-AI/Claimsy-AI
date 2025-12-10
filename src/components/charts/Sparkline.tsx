interface SparklineProps {
  points: number[];
  labels?: string[];
}

const Sparkline = ({ points, labels }: SparklineProps) => {
  if (!points.length) return <p className="text-sm text-muted">No data</p>;

  const width = 240;
  const height = 90;
  const pad = 10;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const step = points.length > 1 ? (width - pad * 2) / (points.length - 1) : 0;

  const toX = (idx: number) => pad + idx * step;
  const toY = (value: number) => height - pad - ((value - min) / range) * (height - pad * 2);

  const path = points
    .map((v, i) => `${i === 0 ? "M" : "L"} ${toX(i).toFixed(1)} ${toY(v).toFixed(1)}`)
    .join(" ");

  const areaPath =
    `M ${toX(0).toFixed(1)} ${height - pad}` +
    " " +
    points
      .map((v, i) => `L ${toX(i).toFixed(1)} ${toY(v).toFixed(1)}`)
      .join(" ") +
    ` L ${toX(points.length - 1).toFixed(1)} ${height - pad} Z`;

  return (
    <div className="space-y-2">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full">
        <path d={areaPath} fill="url(#sparkGradient)" opacity={0.35} />
        <path d={path} fill="none" stroke="url(#sparkStroke)" strokeWidth={2.5} strokeLinecap="round" />
        <defs>
          <linearGradient id="sparkGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="sparkStroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#0ea5e9" />
          </linearGradient>
        </defs>
      </svg>
      {labels && labels.length === points.length && (
        <div className="flex justify-between text-[11px] text-muted">
          {labels.map((label, idx) => (
            <span key={idx} className="truncate">
              {label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default Sparkline;
