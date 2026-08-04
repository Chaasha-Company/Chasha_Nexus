import type { LoginResendOtpPlatformAdminCommand } from '../login-resend-otp-platform-admin.command';
import type { LoginResendOtpPlatformAdminResponseDTO } from '@/modules/v1/authentications/presentation';
import { getCacheHelper, updateCacheHelper, type LoginWithPhoneNumberPlatformAdminSession } from '@/infrastructure/cache-system/node-cache';
import { throwBadRequestException, throwNotFoundException } from '@/shared/v1/exceptions';
import { CacheKey, ResponseMessage, ValidationMessage } from '@/shared/v1/enums';
import { ResponseMessages, t, ValidationMessages, type Language } from '@/infrastructure/translator-system/i18n';
import { EnvValueConfig } from '@/config';

export const loginResendOtpPlatformAdminCommandHandler = async (resendOtpData: LoginResendOtpPlatformAdminCommand, lang: Language): Promise<LoginResendOtpPlatformAdminResponseDTO> => {
  const cacheGet = getCacheHelper();
  const cacheUpdate = updateCacheHelper();

  const session = cacheGet<LoginWithPhoneNumberPlatformAdminSession>({
    cacheName: `${CacheKey.PLATFORM_ADMIN_LOGIN_WITH_PHONE}:${resendOtpData.loginResendOtpPhoneNumber}`,
  });

  if (!session) {
    throwNotFoundException({
      message: t(ResponseMessages, ResponseMessage.NOT_FOUND, lang),
      details: {
        loginVerifyPhoneNumber: [t(ValidationMessages, ValidationMessage.PLATFORM_ADMIN_LOGIN_VERIFY_SESSION_ID_NOT_FOUND, lang)],
      },
    });
  }

  if ((session as LoginWithPhoneNumberPlatformAdminSession).platformAdminLoginWithPhoneNumberSessionId !== resendOtpData.loginResendOtpSessionId) {
    throwNotFoundException({
      message: t(ResponseMessages, ResponseMessage.NOT_FOUND, lang),
      details: {
        loginResendOtpSessionId: [t(ValidationMessages, ValidationMessage.PLATFORM_ADMIN_LOGIN_VERIFY_SESSION_ID_NOT_FOUND, lang)],
      },
    });
  }
  const otpExpired = Date.now() > (session as LoginWithPhoneNumberPlatformAdminSession).platformAdminLoginWithPhoneNumberOtpCreatedAt.getTime() + (session as LoginWithPhoneNumberPlatformAdminSession).platformAdminLoginWithPhoneNumberOtpExpiresAt * 1000;

  if (!otpExpired) {
    throwBadRequestException({
      message: t(ResponseMessages, ResponseMessage.DATA_CONFLICT, lang),
      details: {
        error_message: [t(ValidationMessages, ValidationMessage.PLATFORM_ADMIN_LOGIN_VERIFY_OTP_NOT_EXPIRED, lang)],
      },
    });
  }

  const newOtp = Math.floor(100000 + Math.random() * 900000);

  const updatedSession: LoginWithPhoneNumberPlatformAdminSession = {
    platformAdminLoginWithPhoneNumberSessionId: resendOtpData.loginResendOtpSessionId,
    platformAdminLoginWithPhoneNumberOtp: newOtp,
    platformAdminLoginWithPhoneNumberOtpCreatedAt: new Date(),
    platformAdminLoginWithPhoneNumberOtpExpiresAt: EnvValueConfig.PLATFORM_ADMIN_LOGIN_WITH_PHONE_OTP_EXPIRES_IN_SECONDS,
  };

  cacheUpdate<LoginWithPhoneNumberPlatformAdminSession>({
    cacheName: `${CacheKey.PLATFORM_ADMIN_LOGIN_WITH_PHONE}:${resendOtpData.loginResendOtpPhoneNumber}`,

    newCacheData: updatedSession,

    newCacheTTL: EnvValueConfig.PLATFORM_ADMIN_LOGIN_SESSION_EXPIRES_IN_SECONDS,
  });

  return {
    loginResendOtpExpiresTimer: EnvValueConfig.PLATFORM_ADMIN_LOGIN_WITH_PHONE_OTP_EXPIRES_IN_SECONDS,
  };
};
