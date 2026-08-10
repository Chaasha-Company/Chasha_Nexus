import type { Request, Response, NextFunction } from 'express';
import type { ZodType } from 'zod';

import { ErrorCode, HttpStatus, ResponseMessage } from '@/shared/v1/enums';
import { ResponseMessages, t, type Language } from '@/infrastructure/translator-system/i18n';
import { errorResponseHandler } from '@/shared/v1/helpers';

export const validateQueryMiddleware =
  (schemaFactory: (lang: Language) => ZodType) =>
  (req: Request, res: Response, next: NextFunction): void => {
    if (req.query === null || req.query === undefined || Object.keys(req.query).length === 0) {
      errorResponseHandler<null>(req, res, HttpStatus.BAD_REQUEST, null, t(ResponseMessages, ResponseMessage.NO_DATA_RECEIVED, req.lang), ErrorCode.NO_DATA_RECEIVED);

      return;
    }

    try {
      const schema = schemaFactory(req.lang);

      schema.parse(req.query);

      next();
    } catch (error: unknown) {
      next(error);
    }
  };
