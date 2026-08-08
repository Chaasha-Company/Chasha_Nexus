import type { ForgotPasswordBusinessRequestDTO } from '@/modules/v1/authentications/presentation/dtos';
import { t, ValidationMessages, type Language } from '@/infrastructure/translator-system/i18n';

import z, { type Schema } from 'zod';
import { RegexPattern, ValidationMessage } from '@/shared/v1/enums';

export const ForgotPasswordBusinessValidation = (lang: Language): Schema =>
  z.strictObject<ForgotPasswordBusinessRequestDTO>({
    forgotPasswordPhoneNumber: z
      .string({
        error: t(ValidationMessages, ValidationMessage.BUSINESS_FORGOT_PASSWORD_PHONE_NUMBER_REQUIRED, lang),
      })
      .regex(new RegExp(RegexPattern.PHONE_NUMBER_PATTERN), {
        error: t(ValidationMessages, ValidationMessage.BUSINESS_FORGOT_PASSWORD_PHONE_NUMBER_BAD_FORMAT, lang),
      }),
  });
