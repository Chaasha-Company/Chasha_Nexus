import type { LoginVerifyPlatformAdminRequestDTO } from '@/modules/v1/auth/presentation/dtos';
import { t, ValidationMessages, type Language } from '@/infrastructure/translator-system/i18n';

import z, { type Schema } from 'zod';
import { RegexPattern, ValidationMessage } from '@/shared/v1/enums';

export const LoginVerifyPlatformAdminValidation = (lang: Language): Schema =>
  z.strictObject<LoginVerifyPlatformAdminRequestDTO>({
    loginVerifySessionId: z
      .string({
        error: t(ValidationMessages, ValidationMessage.PLATFORM_ADMIN_LOGIN_VERIFY_SESSION_ID_REQUIRED, lang),
      })
      .uuid({
        error: t(ValidationMessages, ValidationMessage.PLATFORM_ADMIN_LOGIN_VERIFY_SESSION_ID_IS_ONLY_32_CH, lang),
      }),
    loginVerifyPhoneNumber: z
      .string({
        error: t(ValidationMessages, ValidationMessage.PLATFORM_ADMIN_LOGIN_PHONE_NUMBER_REQUIRED, lang),
      })
      .regex(new RegExp(RegexPattern.PHONE_NUMBER_PATTERN), {
        error: t(ValidationMessages, ValidationMessage.PLATFORM_ADMIN_LOGIN_PHONE_NUMBER_BAD_FORMAT, lang),
      }),
    loginVerifyOtp: z
      .string({
        error: t(ValidationMessages, ValidationMessage.PLATFORM_ADMIN_LOGIN_VERIFY_OTP_REQUIRED, lang),
      })
      .length(6, {
        error: t(ValidationMessages, ValidationMessage.PLATFORM_ADMIN_LOGIN_VERIFY_OTP_IS_ONLY_6_CH, lang),
      })
      .regex(/^\d{6}$/, {
        error: t(ValidationMessages, ValidationMessage.PLATFORM_ADMIN_LOGIN_VERIFY_OTP_IS_ONLY_6_CH, lang),
      }),
  });
