import type { Request, Response, NextFunction } from 'express';
import type { AuthTokenPayload } from '@/shared/v1/types';
import { verifyAccessTokenProvider } from '@/modules/v1/authentications/infrastructure';
import { throwUnAuthenticatedException } from '@/shared/v1/exceptions';
import { ResponseMessages, ValidationMessages, t } from '@/infrastructure/translator-system/i18n';
import { ResponseMessage, ValidationMessage } from '@/shared/v1/enums';
import { findPlatformAdminSessionByIdRepository } from '@/modules/v1/platform-admin-sessions';

export const requirePlatformAdminAuthMiddleware = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
  try {
    let accessToken: string | null = null;

    if (req.cookies?.accessToken) {
      accessToken = req.cookies.accessToken;
    }

    if (!accessToken) {
      const authorization = req.headers.authorization;

      if (authorization?.startsWith('Bearer ')) {
        accessToken = authorization.split(' ')[1];
      }
    }

    if (!accessToken) {
      throwUnAuthenticatedException({
        message: t(ResponseMessages, ResponseMessage.UNAUTHORIZED, req.lang),
        details: {
          error_message: [t(ValidationMessages, ValidationMessage.ACCESS_TOKEN_REQUIRED, req.lang)],
        },
      });
    }

    const verifiedToken = verifyAccessTokenProvider()(accessToken as string) as AuthTokenPayload | null;

    if (!verifiedToken || verifiedToken.auth_token_type !== 'platform_admin') {
      throwUnAuthenticatedException({
        message: t(ResponseMessages, ResponseMessage.UNAUTHORIZED, req.lang),
        details: {
          error_message: [t(ValidationMessages, ValidationMessage.ACCESS_TOKEN_INVALID, req.lang)],
        },
      });
    }

    const session = await findPlatformAdminSessionByIdRepository()({
      platformAdminSessionId: verifiedToken?.auth_token_session_id as string,
    });

    if (session === null || session.platformAdminSessionIsActive === false || session.platformAdminSessionExpiresAt < new Date()) {
      throwUnAuthenticatedException({
        message: t(ResponseMessages, ResponseMessage.UNAUTHORIZED, req.lang),
        details: {
          error_message: [t(ValidationMessages, ValidationMessage.ACCESS_TOKEN_SESSION_INVALID, req.lang)],
        },
      });
    }

    req.user = verifiedToken as AuthTokenPayload;

    next();
  } catch (error: unknown) {
    next(error);
  }
};
