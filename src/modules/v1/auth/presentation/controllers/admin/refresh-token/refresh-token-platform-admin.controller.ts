import type { Request, Response, NextFunction } from 'express';
import { refreshTokenPlatformAdminCommandHandler } from '@/modules/v1/auth/application';
import { successResponseHandler } from '@/shared/v1/helpers/api/handlers';
import { HttpStatus, ResponseMessage } from '@/shared/v1/enums';
import { ResponseMessages, t } from '@/infrastructure/translator-system/i18n';
import { setAccessTokenProvider, setRefreshTokenProvider } from '@/modules/v1/auth/infrastructure';

export const refreshTokenPlatformAdminController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await refreshTokenPlatformAdminCommandHandler({ refreshTokenPlatformAdmin: req.cookies?.refreshToken }, req.lang);
    setAccessTokenProvider()(res, result.newPlatformAdminAccessToken, false);
    setRefreshTokenProvider()(res, result.newPlatformAdminRefreshToken, false);
    successResponseHandler<null>(req, res, HttpStatus.OK, null, t(ResponseMessages, ResponseMessage.SUCCESS, req.lang));
  } catch (error: unknown) {
    next(error);
  }
};
