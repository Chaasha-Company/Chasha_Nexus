import type { ForgotPasswordVerifyBusinessRequestDTO } from '@/modules/v1/authentications/presentation/dtos';
import { t, ValidationMessages, type Language } from '@/infrastructure/translator-system/i18n';

import z, { type Schema } from 'zod';
import { RegexPattern, ValidationMessage } from '@/shared/v1/enums';

export const ForgotPasswordVerifyBusinessValidation = (lang: Language): Schema =>
  z.strictObject<ForgotPasswordVerifyBusinessRequestDTO>({
    forgotPasswordVerifyResetToken: z
      .string({
        error: t(ValidationMessages, ValidationMessage.BUSINESS_FORGOT_PASSWORD_VERIFY_RESET_TOKEN_REQUIRED, lang),
      })
      .regex(new RegExp(RegexPattern.PASSWORD_RESET_TOKEN_PATTERN), {
        error: t(ValidationMessages, ValidationMessage.BUSINESS_FORGOT_PASSWORD_VERIFY_RESET_TOKEN_IS_ONLY_32_CH, lang),
      }),

    forgotPasswordVerifyNewPassword: z
      .string({
        error: t(ValidationMessages, ValidationMessage.BUSINESS_FORGOT_PASSWORD_VERIFY_NEW_PASSWORD_REQUIRED, lang),
      })
      .max(64, {
        error: t(ValidationMessages, ValidationMessage.BUSINESS_FORGOT_PASSWORD_VERIFY_NEW_PASSWORD_IS_ONLY_64_CH, lang),
      }),
  });
