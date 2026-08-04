import type { LoginWithPhoneNumberBusinessRequestDTO } from '@/modules/v1/authentications/presentation/dtos';
import { t, ValidationMessages, type Language } from '@/infrastructure/translator-system/i18n';

import z, { type Schema } from 'zod';
import { RegexPattern, ValidationMessage } from '@/shared/v1/enums';

export const LoginWithPhoneNumberBusinessValidation = (lang: Language): Schema =>
  z.strictObject<LoginWithPhoneNumberBusinessRequestDTO>({
    loginPhoneNumber: z
      .string({
        error: t(ValidationMessages, ValidationMessage.BUSINESS_LOGIN_PHONE_NUMBER_REQUIRED, lang),
      })
      .regex(new RegExp(RegexPattern.PHONE_NUMBER_PATTERN), {
        error: t(ValidationMessages, ValidationMessage.BUSINESS_LOGIN_PHONE_NUMBER_BAD_FORMAT, lang),
      }),
    loginPassword: z
      .string({
        error: t(ValidationMessages, ValidationMessage.BUSINESS_LOGIN_PASSWORD_REQUIRED, lang),
      })
      .max(64, {
        error: t(ValidationMessages, ValidationMessage.BUSINESS_LOGIN_PASSWORD_IS_ONLY_64_CH, lang),
      }),
  });
