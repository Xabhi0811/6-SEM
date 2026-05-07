import { Line, LineChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, BarChart, Bar } from 'recharts';

export function ConfusionRoc({ rocData, matrixData }: { rocData: Array<{ x: number; y: number }>; matrixData: Array<{ name: string; value: number }> }) {
  return (
    <div className="grid gap-4 xl:grid-cols-2">
      <div className="glass rounded-3xl p-4">
        <h3 className="mb-3 font-semibold text-white">ROC Curve</h3>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={rocData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.15)" />
            <XAxis dataKey="x" />
            <YAxis />
            <Tooltip />
            <Line dataKey="y" stroke="#34d399" strokeWidth={2.4} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="glass rounded-3xl p-4">
        <h3 className="mb-3 font-semibold text-white">Confusion Matrix</h3>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={matrixData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#8b5cf6" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
