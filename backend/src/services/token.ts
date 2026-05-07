import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { AuthPayload } from '../middleware/auth.js';

export const signToken = (payload: AuthPayload) =>
  jwt.sign(payload, env.jwtSecret, { expiresIn: env.jwtExpiresIn });
