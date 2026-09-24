import jwt, { type JwtPayload } from 'jsonwebtoken';
import mongoose from 'mongoose';
import env from '../config/env.config.js';
import tokenConst from '../constants/token.constant.js';
import ApiError from './apiError.util.js';
import type { AuthPayload } from '../types/express.js';

interface Payload {
  id: mongoose.Types.ObjectId;
}

function isAuthPayload(payload: string | JwtPayload): payload is AuthPayload {
  return typeof payload !== 'string' && typeof payload.id === 'string';
}

class Token {
  generateAccessToken(payload: Payload): string {
    return jwt.sign(payload, env.JWT_SECRET_ACCESS, tokenConst.accessTokenExpireIn);
  }

  generateRefreshToken(payload: Payload): string {
    return jwt.sign(payload, env.JWT_SECRET_REFRESH, tokenConst.refreshTokenExpireIn);
  }

  verifyAccessToken(token: string): AuthPayload {
    const decoded = jwt.verify(token, env.JWT_SECRET_ACCESS);

    if (!isAuthPayload(decoded)) {
      throw ApiError.unAuthorized('Invalid access token');
    }

    return decoded;
  }

  verifyRefreshToken(token: string) {
    const decoded = jwt.verify(token, env.JWT_SECRET_REFRESH);

    if (!isAuthPayload(decoded)) {
      throw ApiError.unAuthorized('Invalid refresh token');
    }

    return decoded;
  }
}

export default Token;
