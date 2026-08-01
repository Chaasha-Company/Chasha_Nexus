import type { Request, Response, NextFunction } from 'express';
import type { LoginWithPhoneNumberBusinessMobileResponseDTO, LoginWithPhoneNumberPlatformAdminRequestDTO } from '@/modules/v1/auth/presentation/dtos';
import { loginWithPhoneNumberBusinessCommandHandler } from '@/modules/v1/auth/application';
import { setAccessTokenProvider, setRefreshTokenProvider } from '@/modules/v1/auth/infrastructure';
import { successResponseHandler } from '@/shared/v1/helpers/api/handlers';
import { HttpStatus, ResponseMessage } from '@/shared/v1/enums';
import { ResponseMessages, t } from '@/infrastructure/translator-system/i18n';

export const loginWithPhoneNumberBusinessController = async (req: Request<unknown, unknown, LoginWithPhoneNumberPlatformAdminRequestDTO>, res: Response, next: NextFunction): Promise<void> => {
  try {
    const platform = req.headers['x-platform'] === 'mobile' ? 'mobile' : 'web';
    const userAgent = req.headers['user-agent'] as string;
    const ipAddress = req.ip as string;
    const result = await loginWithPhoneNumberBusinessCommandHandler(
      {
        loginPhoneNumber: req.body.loginPhoneNumber as string,
        loginPassword: req.body.loginPassword as string,
        loginIpAddress: ipAddress,
        loginUserAgent: userAgent,
      },
      req.lang,
    );

    if (platform === 'web') {
      setAccessTokenProvider()(res, result.loginAccessToken, false);
      setRefreshTokenProvider()(res, result.loginRefreshToken, false);
      successResponseHandler<null>(req, res, HttpStatus.OK, null, t(ResponseMessages, ResponseMessage.SUCCESS, req.lang));
      return;
    }

    successResponseHandler<LoginWithPhoneNumberBusinessMobileResponseDTO>(req, res, HttpStatus.OK, result, t(ResponseMessages, ResponseMessage.SUCCESS, req.lang));
  } catch (error: unknown) {
    next(error);
  }
};
