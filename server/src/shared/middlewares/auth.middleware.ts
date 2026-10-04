import type { Request, Response, NextFunction } from 'express';
import ApiError from '../utils/apiError.util.js';
import Token from '../../module/auth/auth.token.js';

const token = new Token();

export const requireAuth = async (req: Request, _res: Response, next: NextFunction) => {
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) throw ApiError.unAuthorized('Unauthorized - no token provided');

    const decoded = token.verifyAccessToken(accessToken);
    if (!decoded) throw ApiError.unAuthorized('Invalid access token');

    req.user = decoded;
    next();
  } catch (error) {
    next(error instanceof ApiError ? error : ApiError.unAuthorized());
  }
};

export const USER_ROLES = ['user', 'admin'] as const;

export type UserRole = (typeof USER_ROLES)[number];

export const requireRole = (...roles: UserRole[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(ApiError.unAuthorized('Authentication required'));
    }

    if (!roles.includes(req.user.role)) {
      return next(ApiError.forbidden('Forbidden'));
    }

    next();
  };
};

// example usage.

// adminRouter.delete(
//   '/users/:id',
//   requireAuth,
//   requireRole('admin'),
//   deleteUser,
// );
