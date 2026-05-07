import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { buildKpis, buildMarketKpis } from '../services/streamSimulator.js';
import { getMarketStreamCache, getStreamCache } from '../socket.js';

const router = Router();

router.get('/summary', requireAuth, (_request, response) => {
  const points = getStreamCache();
  response.json({
    kpis: buildKpis(points),
    recentPoints: points.slice(-30),
    alerts: points.filter((point) => point.anomalyScore > 0.85).slice(-10)
  });
});

router.get('/market-summary', requireAuth, (_request, response) => {
  const points = getMarketStreamCache();
  response.json({
    kpis: buildMarketKpis(points),
    recentPoints: points.slice(-30),
    alerts: points.filter((point) => point.anomalyScore > 0.85).slice(-10)
  });
});

export default router;
