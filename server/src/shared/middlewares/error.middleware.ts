import type { Application, Request, Response, NextFunction } from 'express';
import ApiError from '../utils/apiError.util.js';
import logger from '../config/logger.config.js';
import { getErrorLocation } from '../utils/error.util.js';

const errorHandler = (err: ApiError, req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof ApiError) {
    logger.error(
      {
        statusCode: err.statusCode,
        method: req.method,
        url: req.originalUrl,
        name: err.name,
        location: getErrorLocation(err),
      },
      err.message,
    );

    return res.status(err.statusCode).json({
      success: err.success,
      message: err.message,
      errors: err.errors,
    });
  }

  logger.error({ err }, 'Unhandled server error');

  throw ApiError.internal();
};

const errorMiddleware = (app: Application) => {
  app.use(errorHandler);
};

export default errorMiddleware;
