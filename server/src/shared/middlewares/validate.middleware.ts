import type { Request, Response, NextFunction } from 'express';
import type { ZodType } from 'zod';

type ValidationSchemas = {
  body?: ZodType;
  params?: ZodType;
  query?: ZodType;
};

const validate = (schemas: ValidationSchemas) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      if (schemas.body) {
        req.body = schemas.body.parse(req.body);
      }

      schemas.params?.parse(req.params);
      schemas.query?.parse(req.query);

      next();
    } catch (error) {
      next(error);
    }
  };
};

export default validate;
