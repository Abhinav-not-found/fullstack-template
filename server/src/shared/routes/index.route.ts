import { Router } from "express";
import docsRouter from "./docs.route.js";
import healthRoute from "./health.route.js";

const indexRouter = Router()

indexRouter.use('/docs', docsRouter)
indexRouter.use('/health', healthRoute)


export default indexRouter