import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { getStreamCache } from '../socket.js';

const router = Router();

router.get('/performance', requireAuth, (_request, response) => {
  const points = getStreamCache();
  const total = points.length || 1;
  const anomalies = points.filter((point) => point.anomalyScore > 0.82).length;

  response.json({
    accuracy: Number((0.92 + Math.random() * 0.05).toFixed(3)),
    precision: Number((0.9 + Math.random() * 0.08).toFixed(3)),
    recall: Number((0.88 + Math.random() * 0.08).toFixed(3)),
    f1Score: Number((0.89 + Math.random() * 0.07).toFixed(3)),
    anomalyRate: Number(((anomalies / total) * 100).toFixed(2))
  });
});

export default router;
