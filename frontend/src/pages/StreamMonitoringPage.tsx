import { GlassCard } from '../components/ui/GlassCard';
import { MapPanel } from '../components/charts/MapPanel';
import { useStream } from '../context/StreamContext';

export function StreamMonitoringPage() {
  const { liveData } = useStream();

  const mapPoints = liveData.slice(-6).map((point, index) => ({ x: 12 + index * 13, y: 18 + (point.value % 55), label: point.category }));

  return (
    <div className="space-y-6">
      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <GlassCard title="Stream Health" subtitle="Operational state of connected feeds">
          <div className="grid gap-4 md:grid-cols-3">
            {['Kafka/Redis buffer', 'Socket latency', 'ML response'].map((item, index) => (
              <div key={item} className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-slate-300">{item}</p>
                <p className="mt-2 text-3xl font-semibold text-white">{index === 0 ? '98%' : index === 1 ? '42ms' : '183ms'}</p>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard title="Real-time Maps" subtitle="Synthetic geographic feed density">
          <MapPanel points={mapPoints} />
        </GlassCard>
      </section>

      <GlassCard title="Activity Feed" subtitle="Auto-refreshing stream events and system notices">
        <div className="space-y-3">
          {liveData.slice(-8).reverse().map((point) => (
            <div key={point.id} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm">
              <span className="text-slate-300">{point.source.toUpperCase()} • {point.category}</span>
              <span className="text-cyan-300">{point.anomalyScore.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
