import { Router } from 'express';
import mongoose from 'mongoose';
import ApiResponse from '../utils/apiResponse.util.js';
import ApiError from '../utils/apiError.util.js';

const healthRoute = Router();

healthRoute.get('/', (_req, res) => {
  return ApiResponse.ok('Backend is running').send(res);
});

healthRoute.get('/ready', (_req, res) => {
  const mongoReady = mongoose.connection.readyState === 1;

  if (!mongoReady) {
    throw ApiError.serviceUnavailable();
  }
  return ApiResponse.ok('Service is Ready!', {
    dependencies: {
      mongodb: 'connected',
    },
  }).send(res);
});
export default healthRoute;
