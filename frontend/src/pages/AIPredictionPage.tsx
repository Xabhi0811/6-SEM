import { useMemo } from 'react';
import { GlassCard } from '../components/ui/GlassCard';
import { ConfusionRoc } from '../components/charts/ConfusionRoc';
import { useStream } from '../context/StreamContext';

export function AIPredictionPage() {
  const { lastPayload } = useStream();

  const rocData = useMemo(() => [
    { x: 0, y: 0 },
    { x: 0.1, y: 0.2 },
    { x: 0.2, y: 0.35 },
    { x: 0.4, y: 0.68 },
    { x: 0.6, y: 0.83 },
    { x: 0.8, y: 0.95 },
    { x: 1, y: 1 }
  ], []);

  const matrixData = useMemo(() => [
    { name: 'TP', value: 92 },
    { name: 'FP', value: 8 },
    { name: 'TN', value: 88 },
    { name: 'FN', value: 12 }
  ], []);

  return (
    <div className="space-y-6">
      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <GlassCard title="Prediction Confidence" subtitle="Streaming inference confidence and forecast horizon">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Confidence</p>
              <p className="mt-2 text-4xl font-semibold text-white">{Math.round((lastPayload?.analysis.confidence ?? 0.92) * 100)}%</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Prediction</p>
              <p className="mt-2 text-4xl font-semibold text-white">{lastPayload?.analysis.prediction?.toFixed(2) ?? '125.40'}</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Anomaly</p>
              <p className="mt-2 text-4xl font-semibold text-white">{lastPayload?.analysis.anomaly ? 'Yes' : 'No'}</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard title="Forecast Engine" subtitle="ARIMA-style projected path from the ML service">
          <div className="space-y-2 text-sm text-slate-300">
            {(lastPayload?.analysis.forecast ?? [121, 124, 127, 131]).map((value, index) => (
              <div key={index} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <span>Step {index + 1}</span>
                <span className="font-semibold text-cyan-300">{value.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </section>

      <ConfusionRoc rocData={rocData} matrixData={matrixData} />
    </div>
  );
}
