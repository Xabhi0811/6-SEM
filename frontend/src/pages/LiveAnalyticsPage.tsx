import { GlassCard } from '../components/ui/GlassCard';
import { ScatterBubbleRadar } from '../components/charts/ScatterBubbleRadar';
import { CandlestickChart } from '../components/charts/CandlestickChart';
import { NetworkGraph } from '../components/charts/NetworkGraph';
import { useStream } from '../context/StreamContext';

export function LiveAnalyticsPage() {
  const { liveData } = useStream();

  const scatterData = liveData.slice(-20).map((point, index) => ({ x: index + 1, y: point.value, z: Math.max(10, point.volume / 60) }));
  const radarData = [
    { subject: 'Throughput', value: 0.82 },
    { subject: 'Confidence', value: 0.91 },
    { subject: 'Latency', value: 0.63 },
    { subject: 'Precision', value: 0.88 },
    { subject: 'Recall', value: 0.84 }
  ];

  const candles = liveData.slice(-6).map((point, index) => ({
    label: `T${index + 1}`,
    open: point.value - 5,
    high: point.value + 8,
    low: point.value - 10,
    close: point.value + (point.sentiment * 4)
  }));

  const nodes = [{ id: 'Edge' }, { id: 'Broker' }, { id: 'ML' }, { id: 'BI' }, { id: 'Alert' }];
  const links = [
    { source: 'Edge', target: 'Broker' },
    { source: 'Broker', target: 'ML' },
    { source: 'ML', target: 'BI' },
    { source: 'ML', target: 'Alert' },
    { source: 'Broker', target: 'Alert' }
  ];

  return (
    <div className="space-y-6">
      <GlassCard title="Multi-channel Live Analytics" subtitle="Scatter, bubble, radar, and network visual layers over the same stream">
        <ScatterBubbleRadar scatterData={scatterData} radarData={radarData} />
      </GlassCard>

      <section className="grid gap-6 xl:grid-cols-2">
        <GlassCard title="Candlestick Range" subtitle="Financial-style OHLC rendering for market stream bursts">
          <CandlestickChart data={candles} />
        </GlassCard>
        <GlassCard title="Event Network" subtitle="Stream pipeline graph with live inference edges">
          <NetworkGraph nodes={nodes} links={links} />
        </GlassCard>
      </section>
    </div>
  );
}
