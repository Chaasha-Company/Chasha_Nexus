import type { Request, Response, NextFunction } from 'express';
import type { LoginVerifyPlatformAdminMobileResponseDTO } from '@/modules/v1/authentications/presentation/dtos';
import { successResponseHandler } from '@/shared/v1/helpers/api/handlers';
import { loginVerifyPlatformAdminCommandHandler } from '@/modules/v1/authentications/application';
import { setAccessTokenProvider, setRefreshTokenProvider } from '@/modules/v1/authentications/infrastructure';
import { HttpStatus, ResponseMessage } from '@/shared/v1/enums';
import { ResponseMessages, t } from '@/infrastructure/translator-system/i18n';

export const loginVeirfyPlatformAdminController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const platform = req.headers['x-platform'] === 'mobile' ? 'mobile' : 'web';
    const userAgent = req.headers['user-agent'] as string;
    const ipAddress = req.ip as string;
    const result = await loginVerifyPlatformAdminCommandHandler(
      {
        loginVerifyPhoneNumber: req.body.loginVerifyPhoneNumber as string,
        loginVerifyOtp: req.body.loginVerifyOtp as string,
        loginVerifySessionId: req.body.loginVerifySessionId as string,
        loginVerifyIpAddress: ipAddress,
        loginVerifyUserAgent: userAgent,
      },
      req.lang,
    );

    if (platform === 'web') {
      setAccessTokenProvider()(res, result.loginVerifyAccessToken, false);
      setRefreshTokenProvider()(res, result.loginVerifyRefreshToken, false);
      successResponseHandler<null>(req, res, HttpStatus.OK, null, t(ResponseMessages, ResponseMessage.SUCCESS, req.lang));
      return;
    }

    successResponseHandler<LoginVerifyPlatformAdminMobileResponseDTO>(req, res, HttpStatus.OK, result, t(ResponseMessages, ResponseMessage.SUCCESS, req.lang));
  } catch (error: unknown) {
    next(error);
  }
};
