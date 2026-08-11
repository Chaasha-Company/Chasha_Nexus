import type { CreateGlobalEarlyAccessRequestRequestDTO } from '@/modules/v1/early-access-requests/presentation/dtos';
import { t, ValidationMessages, type Language } from '@/infrastructure/translator-system/i18n';

import z, { type Schema } from 'zod';
import { RegexPattern, ValidationMessage } from '@/shared/v1/enums';

export const CreateGlobalEarlyAccessRequestValidation = (lang: Language): Schema =>
  z.strictObject<CreateGlobalEarlyAccessRequestRequestDTO>({
    earlyAccessRequestFullName: z
      .string({
        error: t(ValidationMessages, ValidationMessage.EARLY_ACCESS_REQUEST_FULL_NAME_REQUIRED, lang),
      })
      .min(2, {
        error: t(ValidationMessages, ValidationMessage.EARLY_ACCESS_REQUEST_FULL_NAME_TOO_SHORT, lang),
      })
      .max(150, {
        error: t(ValidationMessages, ValidationMessage.EARLY_ACCESS_REQUEST_FULL_NAME_TOO_LONG, lang),
      }),

    earlyAccessRequestPhoneNumber: z
      .string({
        error: t(ValidationMessages, ValidationMessage.EARLY_ACCESS_REQUEST_PHONE_NUMBER_REQUIRED, lang),
      })
      .regex(new RegExp(RegexPattern.PHONE_NUMBER_PATTERN), {
        error: t(ValidationMessages, ValidationMessage.EARLY_ACCESS_REQUEST_PHONE_NUMBER_BAD_FORMAT, lang),
      }),

    earlyAccessRequestBusinessName: z
      .string({
        error: t(ValidationMessages, ValidationMessage.EARLY_ACCESS_REQUEST_BUSINESS_NAME_REQUIRED, lang),
      })
      .min(2, {
        error: t(ValidationMessages, ValidationMessage.EARLY_ACCESS_REQUEST_BUSINESS_NAME_TOO_SHORT, lang),
      })
      .max(150, {
        error: t(ValidationMessages, ValidationMessage.EARLY_ACCESS_REQUEST_BUSINESS_NAME_TOO_LONG, lang),
      }),

    earlyAccessRequestBusinessTypeSlug: z
      .string({
        error: t(ValidationMessages, ValidationMessage.EARLY_ACCESS_REQUEST_BUSINESS_TYPE_REQUIRED, lang),
      })
      .min(1, {
        error: t(ValidationMessages, ValidationMessage.EARLY_ACCESS_REQUEST_BUSINESS_TYPE_REQUIRED, lang),
      }),
  });
