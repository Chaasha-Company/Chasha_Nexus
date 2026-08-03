import type { Request, Response, NextFunction } from 'express';

import { createUniqueRequestIdHelper } from '@/shared/v1/helpers/api/utils';

export const requestIdMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  let requestId = req.headers['x-request-id'];
  if (!requestId) {
    requestId = createUniqueRequestIdHelper('Mehkam');
  }
  req.request_id = requestId as string;

  res.setHeader('X-Request-ID', requestId);

  next();
};
