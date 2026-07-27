import type { Request, Response, NextFunction } from 'express';
import type { ZodType } from 'zod';

import { ErrorCode, HttpStatus, ResponseMessage } from '@/shared/v1/enums';
import { ResponseMessages, t } from '@/infrastructure/translator-system/i18n';
import { errorResponseHandler } from '@/shared/v1/helpers';

export const validateBodyMiddleware =
  (schema: ZodType) =>
  (req: Request, res: Response, next: NextFunction): void => {
    if (req.body === null || req.body === undefined || Object.keys(req.body as object).length === 0) {
      errorResponseHandler<null>(req, res, HttpStatus.BAD_REQUEST, null, t(ResponseMessages, ResponseMessage.NO_DATA_RECEIVED, req.lang), ErrorCode.NO_DATA_RECEIVED);
      return;
    }
    try {
      schema.parse(req.body);
      next();
    } catch (error: unknown) {
      next(error);
    }
  };
