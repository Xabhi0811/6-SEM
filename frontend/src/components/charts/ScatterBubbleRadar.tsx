import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip } from 'recharts';

export function ScatterBubbleRadar({ scatterData, radarData }: { scatterData: Array<{ x: number; y: number; z: number }>; radarData: Array<{ subject: string; value: number }> }) {
  return (
    <div className="grid gap-4 xl:grid-cols-2">
      <div className="glass rounded-3xl p-4">
        <h3 className="mb-3 font-semibold text-white">Scatter + Bubble</h3>
        <ResponsiveContainer width="100%" height={260}>
          <ScatterChart>
            <XAxis dataKey="x" />
            <YAxis dataKey="y" />
            <ZAxis dataKey="z" range={[64, 250]} />
            <Tooltip />
            <Scatter data={scatterData} fill="#22d3ee" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
      <div className="glass rounded-3xl p-4">
        <h3 className="mb-3 font-semibold text-white">Radar Profile</h3>
        <ResponsiveContainer width="100%" height={260}>
          <RadarChart data={radarData}>
            <PolarGrid stroke="rgba(148,163,184,0.15)" />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis />
            <Radar dataKey="value" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.25} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
