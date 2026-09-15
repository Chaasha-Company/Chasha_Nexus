import type { CreateAdminFaqRequestDTO } from '@/modules/v1/faqs/presentation';
import { t, ValidationMessages, type Language } from '@/infrastructure/translator-system/i18n';

import z, { type Schema } from 'zod';
import { ValidationMessage } from '@/shared/v1/enums';

export const CreateAdminFaqValidation = (lang: Language): Schema =>
  z.strictObject<CreateAdminFaqRequestDTO>({
    faqTypeId: z.number({
      error: t(ValidationMessages, ValidationMessage.FAQ_TYPE_ID_REQUIRED, lang),
    }),

    faqQuestionFa: z.string({
      error: t(ValidationMessages, ValidationMessage.FAQ_QUESTION_FA_REQUIRED, lang),
    }),

    faqQuestionEn: z
      .string({
        error: t(ValidationMessages, ValidationMessage.FAQ_QUESTION_EN_INVALID, lang),
      })
      .optional(),

    faqAnswerFa: z.string({
      error: t(ValidationMessages, ValidationMessage.FAQ_ANSWER_FA_REQUIRED, lang),
    }),

    faqAnswerEn: z
      .string({
        error: t(ValidationMessages, ValidationMessage.FAQ_ANSWER_EN_INVALID, lang),
      })
      .optional(),

    faqSlug: z.string({
      error: t(ValidationMessages, ValidationMessage.FAQ_SLUG_REQUIRED, lang),
    }),

    faqSortOrder: z.number({
      error: t(ValidationMessages, ValidationMessage.FAQ_SORT_ORDER_REQUIRED, lang),
    }),
  });
