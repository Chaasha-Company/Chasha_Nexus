import type { LoginWithPhoneNumberPlatformAdminCommand } from '../login-with-phone-number-platform-admin.command';
import type { LoginWithPhoneNumberPlatformAdminResponseDTO } from '@/modules/v1/auth/presentation';

import { findPlatformAdminByPhoneNumberRepository } from '@/modules/v1/platform-admins';

import { throwBadRequestException, throwNotFoundException } from '@/shared/v1/exceptions';

import { CacheKey, ResponseMessage, ValidationMessage } from '@/shared/v1/enums';

import { ResponseMessages, ValidationMessages, t, type Language } from '@/infrastructure/translator-system/i18n';

import { getCacheHelper, setCacheHelper, type LoginWithPhoneNumberPlatformAdminSession } from '@/infrastructure/cache-system/node-cache';

import { passwordCheckerProvider } from '@/modules/v1/auth/infrastructure';

import { EnvValueConfig } from '@/config/env';

export const loginWithPhoneNumberPlatformAdminCommandHandler = async (credential: LoginWithPhoneNumberPlatformAdminCommand, lang: Language): Promise<LoginWithPhoneNumberPlatformAdminResponseDTO> => {
  const cacheGet = getCacheHelper();

  const session = cacheGet<LoginWithPhoneNumberPlatformAdminSession>({
    cacheName: `${CacheKey.PLATFORM_ADMIN_LOGIN_WITH_PHONE}:${credential.loginPhoneNumber}`,
  });

  if (session) {
    throwBadRequestException({
      message: t(ResponseMessages, ResponseMessage.DATA_CONFLICT, lang),
      details: {
        error_message: [t(ValidationMessages, ValidationMessage.PLATFORM_ADMIN_LOGIN_ALREADY_IN_QUEUE, lang)],
      },
    });
  }

  const findPlatformAdmin = findPlatformAdminByPhoneNumberRepository();

  const platformAdmin = await findPlatformAdmin({
    platform_admin_phone_number: credential.loginPhoneNumber,
  });

  if (!platformAdmin) {
    throwNotFoundException({
      message: t(ResponseMessages, ResponseMessage.NOT_FOUND, lang),
      details: {
        loginPhoneNumber: [t(ValidationMessages, ValidationMessage.PLATFORM_ADMIN_LOGIN_NOT_FOUND_PHONE_NUMBER, lang)],
      },
    });
  }

  const passwordChecker = passwordCheckerProvider();

  const passwordIsCorrect = await passwordChecker(credential.loginPassword, platformAdmin?.platformAdminPassword as string);

  if (!passwordIsCorrect) {
    throwBadRequestException({
      message: t(ResponseMessages, ResponseMessage.DATA_CONFLICT, lang),
      details: {
        loginPassword: [t(ValidationMessages, ValidationMessage.PLATFORM_ADMIN_LOGIN_PASSWORD_INCORRECT, lang)],
      },
    });
  }

  const loginSession = crypto.randomUUID();

  const cacheData: LoginWithPhoneNumberPlatformAdminSession = {
    platformAdminLoginWithPhoneNumberSessionId: loginSession,

    platformAdminLoginWithPhoneNumberOtp: Math.floor(100000 + Math.random() * 900000),

    platformAdminLoginWithPhoneNumberOtpCreatedAt: new Date(),

    platformAdminLoginWithPhoneNumberOtpExpiresAt: EnvValueConfig.PLATFORM_ADMIN_LOGIN_WITH_PHONE_OTP_EXPIRES_IN_SECONDS,

    platformAdminLoginWithPhoneNumberAttempt: 1,
  };

  const setCache = setCacheHelper();

  setCache({
    cacheName: `${CacheKey.PLATFORM_ADMIN_LOGIN_WITH_PHONE}:${credential.loginPhoneNumber}`,
    cacheData,
    cacheTTL: EnvValueConfig.PLATFORM_ADMIN_LOGIN_SESSION_EXPIRES_IN_SECONDS,
  });

  return {
    loginSession,
  };
};
