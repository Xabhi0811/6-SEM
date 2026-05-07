import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export function TimeSeriesChart({ data, dataKey = 'value' }: { data: Array<Record<string, number | string>>; dataKey?: string }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="seriesFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.75} />
            <stop offset="95%" stopColor="#22d3ee" stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.15)" />
        <XAxis dataKey="timestamp" tick={{ fill: '#94a3b8', fontSize: 12 }} hide />
        <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} />
        <Tooltip contentStyle={{ background: '#020617', border: '1px solid rgba(255,255,255,0.1)' }} />
        <Area type="monotone" dataKey={dataKey} stroke="#22d3ee" fill="url(#seriesFill)" strokeWidth={2.2} />
      </AreaChart>
    </ResponsiveContainer>
  );
}
