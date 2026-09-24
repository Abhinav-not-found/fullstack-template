import { Router } from 'express';
import { apiReference } from '@scalar/express-api-reference';
import swaggerSpec from '../config/swagger.config.js';

const docsRouter = Router();

docsRouter.use(
  '/',
  apiReference({
    showDeveloperTools: 'never',
    spec: {
      content: swaggerSpec,
    },
    theme: 'kepler',
    layout: 'modern',
    hideModels: true,
  }),
);

export default docsRouter;
