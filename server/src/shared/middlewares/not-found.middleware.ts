import type { Application, Request, Response, NextFunction } from 'express';
import ApiError from '../utils/apiError.util.js';

function notFoundMiddleware(app: Application) {
  app.use((_req: Request, _res: Response, next: NextFunction) => {
    next(ApiError.notFound('Route not found'));
  });
}

export default notFoundMiddleware;