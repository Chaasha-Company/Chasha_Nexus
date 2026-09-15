import type { UpdateAdminFaqTypeRequestDTO } from '@/modules/v1/faqs/presentation';
import { t, ValidationMessages, type Language } from '@/infrastructure/translator-system/i18n';

import z, { type Schema } from 'zod';

import { ValidationMessage } from '@/shared/v1/enums';

export const UpdateAdminFaqTypeValidation = (lang: Language): Schema =>
  z
    .strictObject<UpdateAdminFaqTypeRequestDTO>({
      faqTypeId: z.number({
        error: t(ValidationMessages, ValidationMessage.FAQ_TYPE_ID_REQUIRED, lang),
      }),

      faqTypeNameFa: z
        .string({
          error: t(ValidationMessages, ValidationMessage.FAQ_TYPE_NAME_FA_INVALID, lang),
        })
        .optional(),

      faqTypeNameEn: z
        .string({
          error: t(ValidationMessages, ValidationMessage.FAQ_TYPE_NAME_EN_INVALID, lang),
        })
        .optional(),

      faqTypeSlug: z
        .string({
          error: t(ValidationMessages, ValidationMessage.FAQ_TYPE_SLUG_INVALID, lang),
        })
        .optional(),

      faqTypeDescriptionFa: z
        .string({
          error: t(ValidationMessages, ValidationMessage.FAQ_TYPE_DESCRIPTION_FA_INVALID, lang),
        })
        .optional(),

      faqTypeDescriptionEn: z
        .string({
          error: t(ValidationMessages, ValidationMessage.FAQ_TYPE_DESCRIPTION_EN_INVALID, lang),
        })
        .optional(),
    })
    .refine((data) => Object.entries(data).some(([key, value]) => key !== 'faqTypeId' && value !== undefined), {
      message: t(ValidationMessages, ValidationMessage.UPDATE_AT_LEAST_ONE_FIELD_REQUIRED, lang),
    });
