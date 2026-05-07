import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { AlertModel } from '../models/Alert.js';

const router = Router();

router.get('/', requireAuth, async (_request, response) => {
  const alerts = await AlertModel.find().sort({ createdAt: -1 }).limit(25);
  response.json({ alerts });
});

router.post('/', requireAuth, async (request, response) => {
  const alert = await AlertModel.create(request.body);
  response.status(201).json({ alert });
});

export default router;
