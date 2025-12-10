interface MetricCardProps {
  title: string;
  value: string | number;
  subtext?: string;
}

const MetricCard = ({ title, value, subtext }: MetricCardProps) => {
  return (
    <div className="panel rounded-2xl p-5 shadow-lg">
      <p className="text-sm text-muted">{title}</p>
      <div className="mt-2 text-3xl font-semibold text-main">{value}</div>
      {subtext && <p className="mt-1 text-xs text-muted">{subtext}</p>}
    </div>
  );
};

export default MetricCard;
