import type { Application } from 'express';
import hpp from 'hpp';
import helmet from 'helmet';
import compression from 'compression';

const securityMiddleware = (app: Application) => {
  app.use(hpp());
  app.use(
    helmet({
      contentSecurityPolicy: false,
    }),
  );
  app.use(compression());
};

export default securityMiddleware;
