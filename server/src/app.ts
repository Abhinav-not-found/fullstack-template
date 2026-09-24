import express from "express";
import indexRouter from "./shared/routes/index.route.js";
import appMiddleware from "./shared/middlewares/app.middleware.js";
import securityMiddleware from "./shared/middlewares/security.middleware.js";
import staticMiddleware from "./shared/middlewares/static.middleware.js";
import notFoundMiddleware from "./shared/middlewares/not-found.middleware.js";
import errorMiddleware from "./shared/middlewares/error.middleware.js";

function createApp() {
  const app = express();

  appMiddleware(app);
  securityMiddleware(app);

  app.use("/api", indexRouter);

  staticMiddleware(app);

  notFoundMiddleware(app);
  errorMiddleware(app);

  return app;
}
export default createApp;
