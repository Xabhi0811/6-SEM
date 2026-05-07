import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { UserModel } from '../models/User.js';
import { signToken } from '../services/token.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

const authSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email(),
  password: z.string().min(8)
});

router.post('/register', async (request, response) => {
  const parsed = authSchema.safeParse(request.body);

  if (!parsed.success) {
    return response.status(400).json({ message: 'Invalid payload', issues: parsed.error.flatten() });
  }

  const existing = await UserModel.findOne({ email: parsed.data.email });
  if (existing) {
    return response.status(409).json({ message: 'User already exists' });
  }

  const password = await bcrypt.hash(parsed.data.password, 12);
  const user = await UserModel.create({
    name: parsed.data.name ?? 'Data Scientist',
    email: parsed.data.email,
    password,
    role: 'analyst'
  });

  const token = signToken({ sub: user.id, role: user.role, email: user.email, name: user.name });
  return response.status(201).json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
});

router.post('/login', async (request, response) => {
  const parsed = authSchema.safeParse(request.body);

  if (!parsed.success) {
    return response.status(400).json({ message: 'Invalid payload', issues: parsed.error.flatten() });
  }

  const user = await UserModel.findOne({ email: parsed.data.email });
  if (!user) {
    return response.status(401).json({ message: 'Invalid credentials' });
  }

  const isValid = await bcrypt.compare(parsed.data.password, user.password);
  if (!isValid) {
    return response.status(401).json({ message: 'Invalid credentials' });
  }

  const token = signToken({ sub: user.id, role: user.role, email: user.email, name: user.name });
  return response.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
});

router.get('/me', requireAuth, async (request, response) => response.json({ user: request.user }));

export default router;
