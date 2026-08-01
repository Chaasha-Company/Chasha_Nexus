import { deleteCacheHelper, getCacheHelper, type LoginWithPhoneNumberPlatformAdminSession } from '@/infrastructure/cache-system/node-cache';
import type { LoginVerifyPlatformAdminCommand } from '../login-verify-platform-admin.command';
import type { PlatformAdminAuthTokenPayload } from '@/shared/v1/types/auth/token';
import ms from 'ms';
import { CacheKey, ResponseMessage, ValidationMessage } from '@/shared/v1/enums';
import { throwBadRequestException, throwNotFoundException } from '@/shared/v1/exceptions';
import { ResponseMessages, t, ValidationMessages, type Language } from '@/infrastructure/translator-system/i18n';
import { findPlatformAdminByPhoneNumberRepository } from '@/modules/v1/platform-admins';
import { createPlatformAdminSessionRepository } from '@/modules/v1/platform-admin-sessions';
import { createAccessTokenProvider, createRefreshTokenProvider, hashPasswordProvider } from '@/modules/v1/auth/infrastructure';
import { EnvValueConfig } from '@/config/env';

export const loginVerifyPlatformAdminCommandHandler = async (
  loginVerifyData: LoginVerifyPlatformAdminCommand,
  lang: Language,
): Promise<{
  loginVerifyAccessToken: string;
  loginVerifyRefreshToken: string;
}> => {
  const cacheGet = getCacheHelper();
  const cacheDel = deleteCacheHelper();

  const session = cacheGet<LoginWithPhoneNumberPlatformAdminSession>({
    cacheName: `${CacheKey.PLATFORM_ADMIN_LOGIN_WITH_PHONE}:${loginVerifyData.loginVerifyPhoneNumber}`,
  });

  if (!session) {
    throwNotFoundException({
      message: t(ResponseMessages, ResponseMessage.NOT_FOUND, lang),
      details: {
        loginVerifyPhoneNumber: [t(ValidationMessages, ValidationMessage.PLATFORM_ADMIN_LOGIN_VERIFY_SESSION_ID_NOT_FOUND, lang)],
      },
    });
  }

  if ((session as LoginWithPhoneNumberPlatformAdminSession).platformAdminLoginWithPhoneNumberSessionId !== loginVerifyData.loginVerifySessionId) {
    throwNotFoundException({
      message: t(ResponseMessages, ResponseMessage.NOT_FOUND, lang),
      details: {
        loginVerifySessionId: [t(ValidationMessages, ValidationMessage.PLATFORM_ADMIN_LOGIN_VERIFY_SESSION_ID_NOT_FOUND, lang)],
      },
    });
  }
  const otpExpired = Date.now() > (session as LoginWithPhoneNumberPlatformAdminSession).platformAdminLoginWithPhoneNumberOtpCreatedAt.getTime() + (session as LoginWithPhoneNumberPlatformAdminSession).platformAdminLoginWithPhoneNumberOtpExpiresAt * 1000;

  if (otpExpired) {
    throwBadRequestException({
      message: t(ResponseMessages, ResponseMessage.DATA_CONFLICT, lang),
      details: {
        loginVerifyOtp: [t(ValidationMessages, ValidationMessage.PLATFORM_ADMIN_LOGIN_VERIFY_OTP_EXPIRED, lang)],
      },
    });
  }

  if (Number(loginVerifyData.loginVerifyOtp) !== (session as LoginWithPhoneNumberPlatformAdminSession).platformAdminLoginWithPhoneNumberOtp) {
    throwBadRequestException({
      message: t(ResponseMessages, ResponseMessage.DATA_CONFLICT, lang),
      details: {
        loginVerifyOtp: [t(ValidationMessages, ValidationMessage.PLATFORM_ADMIN_LOGIN_VERIFY_OTP_INVALID, lang)],
      },
    });
  }

  const platformAdmin = await findPlatformAdminByPhoneNumberRepository()({
    platformAdminPhoneNumber: loginVerifyData.loginVerifyPhoneNumber as string,
  });

  if (platformAdmin === null) {
    throwNotFoundException({
      message: t(ResponseMessages, ResponseMessage.NOT_FOUND, lang),
      details: {
        loginVerifyPhoneNumber: [t(ValidationMessages, ValidationMessage.PLATFORM_ADMIN_LOGIN_NOT_FOUND_PHONE_NUMBER, lang)],
      },
    });
  }

  const sessionId = crypto.randomUUID();
  const authTokenPayload: PlatformAdminAuthTokenPayload = {
    auth_token_id: platformAdmin?.platformAdminId as string,
    auth_token_session_id: sessionId,
    auth_token_type: 'platform_admin',
  };

  const accessToken = createAccessTokenProvider()(authTokenPayload);
  const refreshToken = createRefreshTokenProvider()(authTokenPayload);

  await createPlatformAdminSessionRepository()({
    platformAdminSessionId: sessionId,
    platformAdminSessionUserId: platformAdmin?.platformAdminId as string,
    platformAdminSessionRefreshToken: await hashPasswordProvider()(refreshToken),
    platformAdminSessionIpAddress: loginVerifyData.loginVerifyIpAddress,
    platformAdminSessionUserAgent: loginVerifyData.loginVerifyUserAgent,
    platformAdminSessionLastActivityAt: new Date(),
    platformAdminSessionExpiresAt: new Date(Date.now() + ms(EnvValueConfig.JWT_REFRESH_TOKEN_EXPIRES_AT)),
  });
  cacheDel({
    cacheName: `${CacheKey.PLATFORM_ADMIN_LOGIN_WITH_PHONE}:${loginVerifyData.loginVerifyPhoneNumber}`,
  });

  return {
    loginVerifyAccessToken: accessToken,
    loginVerifyRefreshToken: refreshToken,
  };
};
