export type UserRole = 'admin' | 'analyst' | 'viewer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

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

export interface StreamPayload {
  point: StreamPoint;
  analysis: {
    prediction: number;
    confidence: number;
    anomaly: boolean;
    sentimentLabel: string;
    cluster: number;
    forecast: number[];
  };
  kpis: {
    activeStreams: number;
    currentValue: number;
    anomalyCount: number;
    confidence: number;
    throughput: number;
    sentiment: number;
  };
  generatedAt: string;
}
