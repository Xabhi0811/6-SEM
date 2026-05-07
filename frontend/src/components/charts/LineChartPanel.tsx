import { Line, LineChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export function LineChartPanel({ data }: { data: Array<Record<string, number | string>> }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.15)" />
        <XAxis dataKey="timestamp" hide />
        <YAxis />
        <Tooltip contentStyle={{ background: '#020617', border: '1px solid rgba(255,255,255,0.1)' }} />
        <Line type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={2.5} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}
