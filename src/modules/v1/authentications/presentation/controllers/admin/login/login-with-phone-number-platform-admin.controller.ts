import type { Request, Response, NextFunction } from 'express';
import type { LoginWithPhoneNumberPlatformAdminResponseDTO } from '@/modules/v1/authentications/presentation/dtos';
import { loginWithPhoneNumberPlatformAdminCommandHandler, type LoginWithPhoneNumberPlatformAdminCommand } from '@/modules/v1/authentications/application';
import { successResponseHandler } from '@/shared/v1/helpers/api/handlers';
import { HttpStatus, ResponseMessage } from '@/shared/v1/enums';
import { ResponseMessages, t } from '@/infrastructure/translator-system/i18n';

export const loginWithPhoneNumberPlatformAdminController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await loginWithPhoneNumberPlatformAdminCommandHandler(req.body as LoginWithPhoneNumberPlatformAdminCommand, req.lang);
    successResponseHandler<LoginWithPhoneNumberPlatformAdminResponseDTO>(req, res, HttpStatus.OK, result, t(ResponseMessages, ResponseMessage.SUCCESS, req.lang));
  } catch (error: unknown) {
    next(error);
  }
};
