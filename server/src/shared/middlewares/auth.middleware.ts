import type { Request, Response, NextFunction } from 'express';
import ApiError from '../utils/apiError.util.js';
import Token from '../utils/token.util.js';

const token = new Token();

const authMiddleware = async (req: Request, _res: Response, next: NextFunction) => {
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
export default authMiddleware;
