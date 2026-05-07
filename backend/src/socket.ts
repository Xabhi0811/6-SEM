import { Server as HttpServer } from 'http';
import { Server } from 'socket.io';
import { env } from './config/env.js';
import { analyzePoint } from './services/mlClient.js';
import { buildKpis, generateStreamPoint, StreamPoint } from './services/streamSimulator.js';
import { AlertModel } from './models/Alert.js';

let io: Server | null = null;
const streamCache: StreamPoint[] = [];

export const initializeSocket = (server: HttpServer) => {
  io = new Server(server, {
    cors: { origin: env.clientUrl, credentials: true }
  });

  io.on('connection', (socket) => {
    socket.emit('stream:seed', streamCache.slice(-100));

    socket.on('stream:subscribe', (channel) => {
      socket.join(channel);
    });
  });

  const tick = async () => {
    const point = generateStreamPoint();
    streamCache.push(point);
    if (streamCache.length > 300) {
      streamCache.shift();
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

    io?.emit('stream:data', payload);

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
