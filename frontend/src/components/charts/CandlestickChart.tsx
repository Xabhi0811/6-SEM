export function CandlestickChart({ data }: { data: Array<{ label: string; open: number; high: number; low: number; close: number }> }) {
  const width = 420;
  const height = 260;
  const max = Math.max(...data.map((item) => item.high));
  const min = Math.min(...data.map((item) => item.low));
  const scaleY = (value: number) => height - ((value - min) / (max - min || 1)) * (height - 20) - 10;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-[260px] w-full">
      {data.map((item, index) => {
        const x = 30 + index * 70;
        const openY = scaleY(item.open);
        const closeY = scaleY(item.close);
        const highY = scaleY(item.high);
        const lowY = scaleY(item.low);
        const color = item.close >= item.open ? '#34d399' : '#fb7185';

        return (
          <g key={item.label}>
            <line x1={x} x2={x} y1={highY} y2={lowY} stroke={color} strokeWidth={2} />
            <rect x={x - 18} width={36} y={Math.min(openY, closeY)} height={Math.max(5, Math.abs(closeY - openY))} fill={color} opacity={0.8} rx={6} />
          </g>
        );
      })}
    </svg>
  );
}
