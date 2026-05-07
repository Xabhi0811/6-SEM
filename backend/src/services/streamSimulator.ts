import { randomUUID } from 'crypto';

export interface StreamPoint {
  id: string;
  source: 'iot' | 'market' | 'social';
  timestamp: string;
  value: number;
  volume: number;
  sentiment: number;
  anomalyScore: number;
  confidence: number;
  cluster: number;
  category: string;
}

const categories = ['Temperature', 'Pressure', 'Latency', 'Equity', 'Crypto', 'News', 'Tweet'];

const randomBetween = (min: number, max: number) => min + Math.random() * (max - min);

export const generateStreamPoint = (): StreamPoint => {
  const sourcePool: StreamPoint['source'][] = ['iot', 'market', 'social'];
  const source = sourcePool[Math.floor(Math.random() * sourcePool.length)];
  const baseline = source === 'iot' ? randomBetween(10, 95) : source === 'market' ? randomBetween(50, 220) : randomBetween(-1, 1);

  return {
    id: randomUUID(),
    source,
    timestamp: new Date().toISOString(),
    value: Number(baseline.toFixed(2)),
    volume: Math.floor(randomBetween(100, 5000)),
    sentiment: Number(randomBetween(-1, 1).toFixed(2)),
    anomalyScore: Number(randomBetween(0, 1).toFixed(2)),
    confidence: Number(randomBetween(0.6, 0.99).toFixed(2)),
    cluster: Math.floor(randomBetween(0, 5)),
    category: categories[Math.floor(Math.random() * categories.length)]
  };
};

export const buildKpis = (points: StreamPoint[]) => {
  const last = points.at(-1);
  const anomalies = points.filter((point) => point.anomalyScore > 0.82).length;
  const avgConfidence = points.length
    ? points.reduce((sum, point) => sum + point.confidence, 0) / points.length
    : 0;

  return {
    activeStreams: 3,
    currentValue: last?.value ?? 0,
    anomalyCount: anomalies,
    confidence: Number((avgConfidence * 100).toFixed(1)),
    throughput: points.length * 12,
    sentiment: Number((points.reduce((sum, point) => sum + point.sentiment, 0) / Math.max(points.length, 1)).toFixed(2))
  };
};
