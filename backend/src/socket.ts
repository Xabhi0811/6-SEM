import { Server as HttpServer } from 'http';
import { Server } from 'socket.io';
import { env } from './config/env.js';
import { analyzePoint } from './services/mlClient.js';
import { buildKpis, buildMarketKpis, generateMarketPoint, generateStreamPoint, StreamPoint } from './services/streamSimulator.js';
import { AlertModel } from './models/Alert.js';

let io: Server | null = null;
const streamCache: StreamPoint[] = [];
const marketStreamCache: StreamPoint[] = [];

export const initializeSocket = (server: HttpServer) => {
  io = new Server(server, {
    cors: { origin: env.clientUrl, credentials: true }
  });

  io.on('connection', (socket) => {
    socket.emit('stream:seed', streamCache.slice(-100));
    socket.emit('market:seed', marketStreamCache.slice(-100));

    socket.on('stream:subscribe', (channel) => {
      socket.join(channel);
    });
  });

  const tick = async () => {
    const point = generateStreamPoint();
    const marketPoint = generateMarketPoint();
    streamCache.push(point);
    marketStreamCache.push(marketPoint);
    if (streamCache.length > 300) {
      streamCache.shift();
    }
    if (marketStreamCache.length > 300) {
      marketStreamCache.shift();
    }

    let analysis = null;
    try {
      analysis = await analyzePoint(point);
    } catch {
      analysis = {
        anomaly: point.anomalyScore > 0.8,
        prediction: point.value,
        confidence: point.confidence,
        sentimentLabel: point.sentiment > 0.2 ? 'positive' : point.sentiment < -0.2 ? 'negative' : 'neutral',
        cluster: point.cluster,
        forecast: [point.value - 3, point.value - 1, point.value + 1, point.value + 4]
      };
    }

    const payload = {
      point,
      analysis,
      kpis: buildKpis(streamCache),
      generatedAt: new Date().toISOString()
    };

    const marketAnalysis = await analyzePoint(marketPoint).catch(() => ({
      anomaly: marketPoint.anomalyScore > 0.8,
      prediction: marketPoint.value,
      confidence: marketPoint.confidence,
      sentimentLabel: marketPoint.sentiment > 0.2 ? 'positive' : marketPoint.sentiment < -0.2 ? 'negative' : 'neutral',
      cluster: marketPoint.cluster,
      forecast: [marketPoint.value - 3, marketPoint.value - 1, marketPoint.value + 1, marketPoint.value + 4]
    }));

    const marketPayload = {
      point: marketPoint,
      analysis: marketAnalysis,
      kpis: buildMarketKpis(marketStreamCache),
      generatedAt: new Date().toISOString()
    };

    io?.emit('stream:data', payload);
    io?.emit('market:data', marketPayload);

    if (point.anomalyScore > 0.85) {
      const alert = await AlertModel.create({
        type: 'warning',
        title: `Anomaly detected in ${point.source} stream`,
        message: `${point.category} jumped to ${point.value} with score ${point.anomalyScore}`
      });
      io?.emit('alert:new', alert);
    }

    setTimeout(tick, env.streamIntervalMs);
  };

  setTimeout(tick, env.streamIntervalMs);
};

export const getSocketServer = () => io;
export const getStreamCache = () => streamCache;
export const getMarketStreamCache = () => marketStreamCache;
