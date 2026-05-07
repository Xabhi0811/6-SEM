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
const marketCategories = ['Equity', 'Crypto', 'Index', 'Commodity', 'ETF'];
const marketSymbols = ['AAPL', 'MSFT', 'NVDA', 'TSLA', 'BTC', 'ETH', 'SPY', 'DAX'];

const marketState = {
  lastPrice: 180.25,
  lastVolume: 145_000
};

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

export const generateMarketPoint = (): StreamPoint => {
  const drift = randomBetween(-1.8, 2.2);
  const shock = Math.random() > 0.92 ? randomBetween(-5, 5) : 0;
  const nextPrice = Math.max(1, marketState.lastPrice + drift + shock);
  const nextVolume = Math.max(1000, Math.round(marketState.lastVolume + randomBetween(-18000, 24000)));
  const sentiment = Math.max(-1, Math.min(1, (nextPrice - marketState.lastPrice) / 6 + randomBetween(-0.12, 0.12)));
  const confidence = Math.max(0.55, Math.min(0.99, 0.72 + Math.abs(drift) * 0.05 - Math.abs(shock) * 0.01));
  const anomalyScore = Math.max(0, Math.min(1, Math.abs(shock) / 5 + Math.abs(drift) / 20));

  marketState.lastPrice = nextPrice;
  marketState.lastVolume = nextVolume;

  return {
    id: randomUUID(),
    source: 'market',
    timestamp: new Date().toISOString(),
    value: Number(nextPrice.toFixed(2)),
    volume: nextVolume,
    sentiment: Number(sentiment.toFixed(2)),
    anomalyScore: Number(anomalyScore.toFixed(2)),
    confidence: Number(confidence.toFixed(2)),
    cluster: Math.floor(randomBetween(0, 3)),
    category: `${marketCategories[Math.floor(Math.random() * marketCategories.length)]}:${marketSymbols[Math.floor(Math.random() * marketSymbols.length)]}`
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

export const buildMarketKpis = (points: StreamPoint[]) => {
  const last = points.at(-1);
  const first = points[0];
  const anomalies = points.filter((point) => point.anomalyScore > 0.82).length;
  const change = first && last ? (((last.value - first.value) / first.value) * 100) : 0;
  const averageVolume = points.length
    ? points.reduce((sum, point) => sum + point.volume, 0) / points.length
    : 0;

  return {
    activeStreams: 1,
    currentValue: last?.value ?? 0,
    anomalyCount: anomalies,
    confidence: Number(((points.reduce((sum, point) => sum + point.confidence, 0) / Math.max(points.length, 1)) * 100).toFixed(1)),
    throughput: Math.round(averageVolume / 1000),
    sentiment: Number((points.reduce((sum, point) => sum + point.sentiment, 0) / Math.max(points.length, 1)).toFixed(2)),
    change: Number(change.toFixed(2))
  };
};
