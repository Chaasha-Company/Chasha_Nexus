import type { Request, Response, NextFunction } from 'express';
import { logoutBusinessQueryHandler } from '@/modules/v1/authentications/application';
import { successResponseHandler } from '@/shared/v1/helpers/api/handlers';
import { HttpStatus, ResponseMessage } from '@/shared/v1/enums';
import { ResponseMessages, t } from '@/infrastructure/translator-system/i18n';

export const logoutBusinessController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await logoutBusinessQueryHandler({
      auth_token_session_id: req.user?.auth_token_session_id as string,
    });
    successResponseHandler<null>(req, res, HttpStatus.OK, null, t(ResponseMessages, ResponseMessage.USER_LOGOUT, req.lang));
  } catch (error: unknown) {
    next(error);
  }
};
