import type { RequestHandler } from 'express';

const AsyncHandler = (handler: RequestHandler): RequestHandler => {
  return (req, res, next): void => {
    Promise.resolve(handler(req, res, next)).catch((error) => next(error));
  };
};

export default AsyncHandler;
