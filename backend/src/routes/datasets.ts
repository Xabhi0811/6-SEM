import { Router } from 'express';
import multer from 'multer';
import { requireAuth } from '../middleware/auth.js';
import { DatasetModel } from '../models/Dataset.js';

const router = Router();
const upload = multer({ dest: 'uploads/' });

router.get('/', requireAuth, async (_request, response) => {
  const datasets = await DatasetModel.find().sort({ createdAt: -1 }).limit(20);
  response.json({ datasets });
});

router.post('/upload', requireAuth, upload.single('file'), async (request, response) => {
  if (!request.file) {
    return response.status(400).json({ message: 'File is required' });
  }

  const dataset = await DatasetModel.create({
    name: request.body.name ?? request.file.originalname,
    fileName: request.file.originalname,
    mimeType: request.file.mimetype,
    size: request.file.size,
    rowCount: Number(request.body.rowCount ?? 0),
    status: 'ready'
  });

  return response.status(201).json({ dataset });
});

export default router;
