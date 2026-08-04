import type { Request, Response, NextFunction } from 'express';
import { successResponseHandler } from '@/shared/v1/helpers/api/handlers';
import { HttpStatus, ResponseMessage } from '@/shared/v1/enums';
import { ResponseMessages, t } from '@/infrastructure/translator-system/i18n';

export const meBusinessController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    successResponseHandler<null>(req, res, HttpStatus.OK, null, t(ResponseMessages, ResponseMessage.SUCCESS, req.lang));
  } catch (error: unknown) {
    next(error);
  }
};
