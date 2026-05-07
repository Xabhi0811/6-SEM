import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import authRoutes from './routes/auth.js';
import dashboardRoutes from './routes/dashboard.js';
import datasetsRoutes from './routes/datasets.js';
import metricsRoutes from './routes/metrics.js';
import alertsRoutes from './routes/alerts.js';
import healthRoutes from './routes/health.js';
import { env } from './config/env.js';

export const createApp = () => {
  const app = express();

  app.use(helmet());
  app.use(cors({ origin: env.clientUrl, credentials: true }));
  app.use(express.json({ limit: '10mb' }));
  app.use(morgan('dev'));

  app.use('/api/health', healthRoutes);
  app.use('/api/auth', authRoutes);
  app.use('/api/dashboard', dashboardRoutes);
  app.use('/api/datasets', datasetsRoutes);
  app.use('/api/metrics', metricsRoutes);
  app.use('/api/alerts', alertsRoutes);

  app.use((_request, response) => response.status(404).json({ message: 'Route not found' }));

  return app;
};
