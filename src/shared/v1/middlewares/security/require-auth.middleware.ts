import type { Request, Response, NextFunction } from 'express';
import type { AuthTokenPayload } from '@/shared/v1/types';
import { verifyAccessTokenProvider } from '@/modules/v1/auth/infrastructure';
import { throwUnAuthenticatedException } from '@/shared/v1/exceptions';
import { ResponseMessages, ValidationMessages, t } from '@/infrastructure/translator-system/i18n';
import { ResponseMessage, ValidationMessage } from '@/shared/v1/enums';
import { findBusinessEmployeeSessionByIdRepository } from '@/modules/v1/business-employee-sessions';
import { findPlatformAdminSessionByIdRepository } from '@/modules/v1/platform-admin-sessions';

export const requireAuthMiddleware = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
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

    if (!verifiedToken) {
      throwUnAuthenticatedException({
        message: t(ResponseMessages, ResponseMessage.UNAUTHORIZED, req.lang),
        details: {
          error_message: [t(ValidationMessages, ValidationMessage.ACCESS_TOKEN_INVALID, req.lang)],
        },
      });
    }

    if (verifiedToken?.auth_token_type !== 'business_employee' && verifiedToken?.auth_token_type !== 'platform_admin') {
      throwUnAuthenticatedException({
        message: t(ResponseMessages, ResponseMessage.UNAUTHORIZED, req.lang),
        details: {
          error_message: [t(ValidationMessages, ValidationMessage.ACCESS_TOKEN_INVALID, req.lang)],
        },
      });
    }

    switch (verifiedToken?.auth_token_type) {
      case 'business_employee': {
        const session = await findBusinessEmployeeSessionByIdRepository()({
          businessEmployeeSessionId: verifiedToken?.auth_token_session_id,
        });

        if (session === null || session.businessEmployeeSessionIsActive === false || session.businessEmployeeSessionExpiresAt < new Date()) {
          throwUnAuthenticatedException({
            message: t(ResponseMessages, ResponseMessage.UNAUTHORIZED, req.lang),
            details: {
              error_message: [t(ValidationMessages, ValidationMessage.ACCESS_TOKEN_SESSION_INVALID, req.lang)],
            },
          });
        }

        break;
      }

      case 'platform_admin': {
        const session = await findPlatformAdminSessionByIdRepository()({
          platformAdminSessionId: verifiedToken?.auth_token_session_id,
        });

        if (session === null || session.platformAdminSessionIsActive === false || session.platformAdminSessionExpiresAt < new Date()) {
          throwUnAuthenticatedException({
            message: t(ResponseMessages, ResponseMessage.UNAUTHORIZED, req.lang),
            details: {
              error_message: [t(ValidationMessages, ValidationMessage.ACCESS_TOKEN_SESSION_INVALID, req.lang)],
            },
          });
        }

        break;
      }
    }

    req.user = verifiedToken as AuthTokenPayload;

    next();
  } catch (error: unknown) {
    next(error);
  }
};
