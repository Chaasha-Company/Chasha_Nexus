import type { Request, Response, NextFunction } from 'express';

import { ResponseMessage } from '@/shared/v1/enums';
import { throwNotFoundException } from '@/shared/v1/exceptions';
import { ResponseMessages, t } from '@/infrastructure/translator-system/i18n';

export const routeNotFoundHelper = (req: Request, _res: Response, next: NextFunction): void => {
  throwNotFoundException({
    message: t(ResponseMessages, ResponseMessage.NOT_FOUND, req.lang),
    details: {
      routePath: [req.path],
      routeMethod: [req.method],
    },
  });
  next();
};
