interface BarDatum {
  label: string;
  value: number;
}

interface SimpleBarChartProps {
  data: BarDatum[];
  maxValue?: number;
}

const SimpleBarChart = ({ data, maxValue }: SimpleBarChartProps) => {
  const max = maxValue ?? Math.max(...data.map((d) => d.value), 1);

  return (
    <div className="flex items-end gap-3 w-full text-base">
      {data.map((item) => {
        const heightPct = Math.round((item.value / max) * 100);
        return (
          <div key={item.label} className="flex-1">
            <div
              className="rounded-xl bg-gradient-to-t from-indigo-500/40 via-indigo-400/50 to-sky-300/70 border border-indigo-400/40 shadow-inner"
              style={{ height: `${heightPct}%`, minHeight: 12 }}
            />
            <div className="mt-2 text-xs text-muted text-center whitespace-nowrap">{item.label}</div>
            <div className="text-sm font-semibold text-main text-center">{item.value}</div>
          </div>
        );
      })}
    </div>
  );
};

export default SimpleBarChart;
