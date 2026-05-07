import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { useStream } from '../context/StreamContext';
import { KpiCard } from '../components/ui/KpiCard';
import { GlassCard } from '../components/ui/GlassCard';
import { TimeSeriesChart } from '../components/charts/TimeSeriesChart';
import { LineChartPanel } from '../components/charts/LineChartPanel';
import { HeatmapPanel } from '../components/charts/HeatmapPanel';
import { MapPanel } from '../components/charts/MapPanel';
import { formatDateTime } from '../utils';

export function OverviewPage() {
  const { marketData, lastMarketPayload } = useStream();
  const [summary, setSummary] = useState<any>(null);

  useEffect(() => {
    api.get('/dashboard/market-summary').then(({ data }) => setSummary(data));
  }, [lastMarketPayload]);

  const points = summary?.recentPoints ?? marketData;
  const kpis = summary?.kpis ?? lastMarketPayload?.kpis;

  const heatmapData = [
    { row: 'IoT', col: 'Mon', value: 0.2 },
    { row: 'IoT', col: 'Tue', value: 0.45 },
    { row: 'IoT', col: 'Wed', value: 0.65 },
    { row: 'IoT', col: 'Thu', value: 0.58 },
    { row: 'IoT', col: 'Fri', value: 0.88 },
    { row: 'Market', col: 'Mon', value: 0.52 },
    { row: 'Market', col: 'Tue', value: 0.31 },
    { row: 'Market', col: 'Wed', value: 0.74 },
    { row: 'Market', col: 'Thu', value: 0.63 },
    { row: 'Market', col: 'Fri', value: 0.82 },
    { row: 'Social', col: 'Mon', value: 0.38 },
    { row: 'Social', col: 'Tue', value: 0.56 },
    { row: 'Social', col: 'Wed', value: 0.47 },
    { row: 'Social', col: 'Thu', value: 0.69 },
    { row: 'Social', col: 'Fri', value: 0.9 }
  ];

  const mapPoints = [
    { x: 20, y: 42, label: 'New York Stream Node' },
    { x: 41, y: 26, label: 'London Inference Hub' },
    { x: 68, y: 58, label: 'Dubai Sensor Cluster' },
    { x: 75, y: 34, label: 'Tokyo Market Feed' }
  ];

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Active Streams" value={kpis?.activeStreams ?? 3} delta="+12.4%" accent="linear-gradient(135deg,#22d3ee,#3b82f6)" />
        <KpiCard label="Current Value" value={kpis?.currentValue ?? 0} delta="+4.8%" accent="linear-gradient(135deg,#8b5cf6,#6366f1)" />
        <KpiCard label="Anomaly Count" value={kpis?.anomalyCount ?? 0} delta="-3.1%" accent="linear-gradient(135deg,#fb7185,#f59e0b)" />
        <KpiCard label="Confidence %" value={kpis?.confidence ?? 0} delta="+1.9%" accent="linear-gradient(135deg,#34d399,#22c55e)" />
      </section>

      <section className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <GlassCard title="Streaming Analytics" subtitle="Real-time line and area views for the live market feed">
          <TimeSeriesChart data={points.slice(-40)} />
        </GlassCard>
        <GlassCard title="Live Market Feed" subtitle="Recent market ticks and auto-generated symbols">
          <div className="space-y-3">
            {points.slice(-5).reverse().map((point) => (
              <div key={point.id} className="rounded-2xl border border-white/10 bg-white/5 p-3 text-sm text-slate-300">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-medium text-white">{point.category}</span>
                  <span className="text-xs text-slate-400">{formatDateTime(point.timestamp)}</span>
                </div>
                <p className="mt-1 text-slate-400">{point.source.toUpperCase()} value {point.value} | confidence {point.confidence}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </section>

      <section className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <GlassCard title="Trend Comparison" subtitle="Live market trajectories and volatility changes">
          <LineChartPanel data={points.slice(-30)} />
        </GlassCard>
        <GlassCard title="Heatmap" subtitle="Density view for stream hot spots">
          <HeatmapPanel data={heatmapData} />
        </GlassCard>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.3fr_1fr]">
        <GlassCard title="Geo Activity" subtitle="Live regional stream pulse overlay">
          <MapPanel points={mapPoints} />
        </GlassCard>
        <GlassCard title="Forecast Note" subtitle="Latest model forecast snapshot">
          <div className="space-y-3 text-sm text-slate-300">
            <p>Latest stream confidence: {lastMarketPayload?.analysis.confidence ?? 0.91}</p>
            <p>Prediction horizon: {lastMarketPayload?.analysis.forecast?.join(' • ') ?? 'awaiting live payload'}</p>
            <p>Anomaly flag: {lastMarketPayload?.analysis.anomaly ? 'active' : 'clear'}</p>
          </div>
        </GlassCard>
      </section>
    </div>
  );
}
