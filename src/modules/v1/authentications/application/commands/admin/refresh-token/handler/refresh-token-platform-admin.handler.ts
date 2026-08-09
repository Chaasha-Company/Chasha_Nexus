import { ResponseMessages, t, ValidationMessages, type Language } from '@/infrastructure/translator-system/i18n';
import type { PlatformAdminAuthTokenPayload } from '@/shared/v1/types/auth';
import type { RefreshTokenPlatformAdminResponseDTO } from '@/modules/v1/authentications/presentation/dtos/response/admin/refresh-token';
import type { RefreshTokenPlatformAdminCommand } from '../refresh-token-platform-admin.command';
import ms from 'ms';
import { createAccessTokenProvider, createRefreshTokenProvider, hashPasswordProvider, passwordCheckerProvider, verifyRefreshTokenProvider } from '@/modules/v1/authentications/infrastructure';
import { throwUnAuthenticatedException } from '@/shared/v1/exceptions';
import { ResponseMessage, ValidationMessage } from '@/shared/v1/enums';
import { EnvValueConfig } from '@/config/env';
import { findPlatformAdminSessionByIdRepository } from '@/modules/v1/platform-admin-sessions';
import { updatePlatformAdminSessionRepository } from '@/modules/v1/platform-admin-sessions/infrastructure';

export const refreshTokenPlatformAdminCommandHandler = async (tokenData: RefreshTokenPlatformAdminCommand, lang: Language): Promise<RefreshTokenPlatformAdminResponseDTO> => {
  const { refreshTokenPlatformAdmin } = tokenData;

  const verifiedToken = verifyRefreshTokenProvider()(refreshTokenPlatformAdmin as string) as PlatformAdminAuthTokenPayload;

  if (verifiedToken === null) {
    throwUnAuthenticatedException({
      message: t(ResponseMessages, ResponseMessage.UNAUTHORIZED, lang),
      details: {
        error_message: [t(ValidationMessages, ValidationMessage.PLATFORM_ADMIN_REFRESH_TOKEN_INVALID, lang)],
      },
    });
  }

  if (verifiedToken.auth_token_type !== 'platform_admin') {
    throwUnAuthenticatedException({
      message: t(ResponseMessages, ResponseMessage.UNAUTHORIZED, lang),
      details: {
        error_message: [t(ValidationMessages, ValidationMessage.PLATFORM_ADMIN_REFRESH_TOKEN_INVALID, lang)],
      },
    });
  }

  const platformAdminSessionIsExist = await findPlatformAdminSessionByIdRepository()({ platformAdminSessionId: verifiedToken.auth_token_session_id });

  if (platformAdminSessionIsExist === null) {
    throwUnAuthenticatedException({
      message: t(ResponseMessages, ResponseMessage.UNAUTHORIZED, lang),
      details: {
        error_message: [t(ValidationMessages, ValidationMessage.PLATFORM_ADMIN_REFRESH_TOKEN_INVALID, lang)],
      },
    });
  }

  if ((platformAdminSessionIsExist?.platformAdminSessionExpiresAt as Date) < new Date() || platformAdminSessionIsExist?.platformAdminSessionRevokedAt !== null) {
    throwUnAuthenticatedException({
      message: t(ResponseMessages, ResponseMessage.UNAUTHORIZED, lang),
      details: {
        error_message: [t(ValidationMessages, ValidationMessage.PLATFORM_ADMIN_REFRESH_TOKEN_INVALID, lang)],
      },
    });
  }

  const isRefreshTokenValid = await passwordCheckerProvider()(refreshTokenPlatformAdmin as string, platformAdminSessionIsExist?.platformAdminSessionRefreshToken as string);
  if (isRefreshTokenValid === false) {
    throwUnAuthenticatedException({
      message: t(ResponseMessages, ResponseMessage.UNAUTHORIZED, lang),
      details: {
        error_message: [t(ValidationMessages, ValidationMessage.PLATFORM_ADMIN_REFRESH_TOKEN_INVALID, lang)],
      },
    });
  }

  const authTokenPayload: PlatformAdminAuthTokenPayload = {
    auth_token_id: verifiedToken.auth_token_id,
    auth_token_session_id: platformAdminSessionIsExist?.platformAdminSessionId as string,
    auth_token_role_id: verifiedToken.auth_token_role_id,
    auth_token_type: 'platform_admin',
  };

  const accessToken = createAccessTokenProvider()(authTokenPayload);
  const refreshToken = createRefreshTokenProvider()(authTokenPayload);

  await updatePlatformAdminSessionRepository()({
    platformAdminSessionId: platformAdminSessionIsExist?.platformAdminSessionId as string,
    platformAdminSessionRefreshToken: await hashPasswordProvider()(refreshToken),
    platformAdminSessionLastActivityAt: new Date(),
    platformAdminSessionExpiresAt: new Date(Date.now() + ms(EnvValueConfig.JWT_REFRESH_TOKEN_EXPIRES_AT)),
  });

  return {
    newPlatformAdminAccessToken: accessToken,
    newPlatformAdminRefreshToken: refreshToken,
  };
};
