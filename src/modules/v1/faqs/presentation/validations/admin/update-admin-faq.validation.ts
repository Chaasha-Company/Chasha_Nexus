import type { UpdateAdminFaqRequestDTO } from '@/modules/v1/faqs/presentation';
import { t, ValidationMessages, type Language } from '@/infrastructure/translator-system/i18n';

import z, { type Schema } from 'zod';

import { ValidationMessage } from '@/shared/v1/enums';

export const UpdateAdminFaqValidation = (lang: Language): Schema =>
  z
    .strictObject<UpdateAdminFaqRequestDTO>({
      faqId: z.number({
        error: t(ValidationMessages, ValidationMessage.FAQ_ID_REQUIRED, lang),
      }),

      faqTypeId: z
        .number({
          error: t(ValidationMessages, ValidationMessage.FAQ_TYPE_ID_INVALID, lang),
        })
        .optional(),

      faqQuestionFa: z
        .string({
          error: t(ValidationMessages, ValidationMessage.FAQ_QUESTION_FA_INVALID, lang),
        })
        .optional(),

      faqQuestionEn: z
        .string({
          error: t(ValidationMessages, ValidationMessage.FAQ_QUESTION_EN_INVALID, lang),
        })
        .optional(),

      faqAnswerFa: z
        .string({
          error: t(ValidationMessages, ValidationMessage.FAQ_ANSWER_FA_INVALID, lang),
        })
        .optional(),

      faqAnswerEn: z
        .string({
          error: t(ValidationMessages, ValidationMessage.FAQ_ANSWER_EN_INVALID, lang),
        })
        .optional(),

      faqSlug: z
        .string({
          error: t(ValidationMessages, ValidationMessage.FAQ_SLUG_INVALID, lang),
        })
        .optional(),

      faqSortOrder: z
        .number({
          error: t(ValidationMessages, ValidationMessage.FAQ_SORT_ORDER_INVALID, lang),
        })
        .optional(),
    })
    .refine((data) => Object.entries(data).some(([key, value]) => key !== 'faqId' && value !== undefined), {
      message: t(ValidationMessages, ValidationMessage.UPDATE_AT_LEAST_ONE_FIELD_REQUIRED, lang),
    });
