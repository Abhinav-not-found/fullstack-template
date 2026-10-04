import type { Application, Request, Response, NextFunction } from 'express';
import ApiError from '@/shared/utils/apiError.util.js';
import logger from '@/shared/config/logger.config.js';
import { getErrorLocation } from '@/shared/utils/error.util.js';
import { ZodError } from 'zod';

const errorHandler = (err: unknown, req: Request, res: Response, _next: NextFunction) => {
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

  if (err instanceof ZodError) {
    logger.warn(
      {
        method: req.method,
        url: req.originalUrl,
        errors: err.issues,
      },
      'Request validation failed',
    );

    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: err.issues,
    });
  }

  logger.error({ err }, 'Unhandled server error');

  throw ApiError.internal();
};

const errorMiddleware = (app: Application) => {
  app.use(errorHandler);
};

export default errorMiddleware;
