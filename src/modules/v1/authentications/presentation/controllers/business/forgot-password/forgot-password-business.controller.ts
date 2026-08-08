import type { Request, Response, NextFunction } from 'express';
import { forgotPasswordBusinessCommandHandler } from '@/modules/v1/authentications/application';
import { successResponseHandler } from '@/shared/v1/helpers/api/handlers';
import { HttpStatus, ResponseMessage } from '@/shared/v1/enums';
import { ResponseMessages, t } from '@/infrastructure/translator-system/i18n';

export const forgotPasswordBusinessController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await forgotPasswordBusinessCommandHandler(req.body);
    successResponseHandler<null>(req, res, HttpStatus.OK, null, t(ResponseMessages, ResponseMessage.SUCCESS, req.lang));
  } catch (error: unknown) {
    next(error);
  }
};
