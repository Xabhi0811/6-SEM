import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export interface AuthPayload {
  sub: string;
  role: string;
  email: string;
  name: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload;
    }
  }
}

export const requireAuth = (request: Request, response: Response, next: NextFunction) => {
  const header = request.headers.authorization;

  if (!header?.startsWith('Bearer ')) {
    return response.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const token = header.slice(7);
    const payload = jwt.verify(token, env.jwtSecret) as AuthPayload;
    request.user = payload;
    return next();
  } catch {
    return response.status(401).json({ message: 'Invalid or expired token' });
  }
};

export const permit = (...roles: string[]) => (request: Request, response: Response, next: NextFunction) => {
  if (!request.user || !roles.includes(request.user.role)) {
    return response.status(403).json({ message: 'Forbidden' });
  }

  return next();
};
