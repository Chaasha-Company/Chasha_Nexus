import type { Request, Response, NextFunction } from 'express';
import { loginResendOtpPlatformAdminCommandHandler } from '@/modules/v1/auth/application';
import { HttpStatus, ResponseMessage } from '@/shared/v1/enums';
import { ResponseMessages, t } from '@/infrastructure/translator-system/i18n';
import { successResponseHandler } from '@/shared/v1/helpers/api/handlers';

export const loginResendOtpPlatformAdminController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await loginResendOtpPlatformAdminCommandHandler(req.body, req.lang);
    successResponseHandler<null>(req, res, HttpStatus.OK, null, t(ResponseMessages, ResponseMessage.SUCCESS, req.lang));
  } catch (error: unknown) {
    next(error);
  }
};
