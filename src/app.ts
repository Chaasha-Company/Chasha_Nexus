import path from 'path';

import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { type Application, type Request, type Response } from 'express';
import helmet from 'helmet';
import hpp from 'hpp';

import { corsConfig, helmetConfig, rateLimitConfig } from '@/config';
import { v1Router } from '@/modules';
import { errorHandlerHelper } from '@/shared/v1/helpers/api/error';
import { languageFilterMiddleware, monitoringMiddleware } from '@/shared/v1/middlewares/global';
import { routeNotFoundHelper } from '@/shared/v1/helpers/api/handlers';

export const createChashaApplication = (): Application => {
  const app = express();

  // Core middleware
  app.set('trust proxy', 1);
  app.disable('x-powered-by');
  app.use(helmet(helmetConfig));
  app.use(cors(corsConfig));
  app.use(cookieParser());
  app.use(express.json());
  app.use(hpp());
  app.use(rateLimitConfig);
  app.use(monitoringMiddleware);

  // favicon loader
  app.use('/favicon.ico', express.static(path.join('./public/assets/images/favicon.ico')));

  // application entrypoint
  app.get('/', (_req: Request, res: Response) => res.sendFile(path.join(process.cwd(), 'index.html')));

  // v1 router
  app.use('/api/v1/:lang', languageFilterMiddleware, v1Router);

  // not found handler
  app.use(routeNotFoundHelper);

  // error handler
  app.use(errorHandlerHelper);

  return app;
};
