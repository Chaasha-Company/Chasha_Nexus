import type { Request, Response, NextFunction } from 'express';

import { loggerConfig, requestCounter, responseSizeHistogram } from '@/config/logger';

export const monitoringMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const startTime = process.hrtime.bigint();
  const requestId = req.headers['x-request-id'];

  const childLogger = loggerConfig.child({ requestId });

  res.on('finish', () => {
    const endTime = process.hrtime.bigint();
    const durationMs: number = Number(endTime - startTime) / 1000000;
    const { statusCode } = res;
    const route = req.route?.path || req.originalUrl;

    if (statusCode >= 500) {
      childLogger.error({ statusCode, durationMs }, 'Request failed');
    } else {
      childLogger.info({ statusCode, durationMs }, 'Request completed');
    }

    requestCounter.inc({ method: req.method, route, status_code: statusCode });

    const contentLength = res.getHeaders()['content-length'] ? Number(res.getHeaders()['content-length']) : 0;
    responseSizeHistogram.observe({ method: req.method, route, status_code: statusCode }, contentLength);
  });

  next();
};
