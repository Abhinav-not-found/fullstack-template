import type { Request, Response, NextFunction } from 'express';
import type { ZodSchema } from 'zod';
import ApiError from '../utils/apiError.util.js';

const validate = (schema: ZodSchema) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      throw ApiError.badRequest('', result.error.issues);
    }

    req.body = result.data;

    next();
  };
};

export default validate;
