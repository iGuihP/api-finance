import "express-async-errors";
import express, { Request, Response, NextFunction } from "express";
import cors from 'cors'
import route from '../api/routes';
import logger from '../utils/logger';
import AppError from "../errors/AppError";
import isAuthenticatedMiddleware from "../middlewares/isAuthenticatedMiddleware";
import * as Sentry from "@sentry/node";

Sentry.init({ dsn: process.env.SENTRY_DSN });

const app = express();

app.use(express.json());

app.use(cors({ origin: true, credentials: true }));

app.use(function (req: any, res: any, next: any) {
    const whitelist = ['*', 'http://host.docker.internal:3000'];
  
    const index = req.header('Origin') ?? '-1';
    if (whitelist.indexOf(index) !== -1) {
      res.header('Access-Control-Allow-Origin', req.headers.origin);
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    }
  
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-correlation-id');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  
    next();
});

app.use(Sentry.Handlers.requestHandler());

app.use(isAuthenticatedMiddleware);
app.use('/', route);

app.use(Sentry.Handlers.errorHandler());

app.use(async (err: Error, req: Request, res: Response, _: NextFunction)  => {
  console.log(err);
  if (err instanceof AppError) {
    logger.warn(err);
    return res.status(err.statusCode).json({ error: err.message });
  }

  logger.error(err.message);
  return res.json({ error: "Internal server error" });
});

export default app;