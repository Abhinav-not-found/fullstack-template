import express from "express";
import path from "path";
import type { Application } from "express";

export default function staticMiddleware(app: Application) {
  const publicPath = path.join(process.cwd(), "public");

  app.use(express.static(publicPath));

  app.get(/^(?!\/api).*/, (_req, res, _next) => {
    res.sendFile(path.join(publicPath, "index.html"));
  });
}