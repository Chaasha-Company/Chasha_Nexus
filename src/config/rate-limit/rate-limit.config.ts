import type { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';

import { EnvValueConfig } from '@/config/env';
import { throwTooManyRequestException } from '@/shared/v1/exceptions/too-many-request';
import { ResponseMessage } from '@/shared/v1/enums';
import { ResponseMessages, t } from '@/infrastructure/translator-system/i18n';

export const rateLimitConfig = rateLimit({
  windowMs: EnvValueConfig.API_RATE_LIMIT_MAX,
  max: EnvValueConfig.API_RATE_LIMIT_MAX,

  legacyHeaders: true,

  handler: (req: Request, _res: Response, _next: NextFunction) => {
    throwTooManyRequestException({
      message: t(ResponseMessages, ResponseMessage.TOO_MANY_REQUESTS, req.lang ?? 'en'),
      details: {
        max_request: [EnvValueConfig.API_RATE_LIMIT_MAX.toString()],
      },
    });
  },
});
