import cookieParser from 'cookie-parser';
import type { Application } from 'express';
import express from 'express';
import morgan from 'morgan';
import env from '../config/env.config.js';
import cors from 'cors';

const appMiddleware = (app: Application) => {
  app.use(
    cors({
      origin: 'http://localhost:5173',
      credentials: true,
    }),
  );

  app.use(express.json({ limit: '10kb' }));
  app.use(express.urlencoded({ extended: true, limit: '10kb' }));
  app.use(cookieParser());
  app.use(morgan(env.IS_PROD ? 'combined' : 'dev'));
};
export default appMiddleware;
