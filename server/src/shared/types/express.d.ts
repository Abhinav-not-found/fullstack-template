import { JwtPayload } from 'jsonwebtoken';
import type mongoose from 'mongoose';

export interface AuthPayload extends JwtPayload {
  id: string;
}

declare global {
  namespace Express {
    interface Request {
      user: AuthPayload;
    }
  }
}

export {};
