import type { CreateAdminFaqTypeRequestDTO } from '@/modules/v1/faqs/presentation';
import { t, ValidationMessages, type Language } from '@/infrastructure/translator-system/i18n';

import z, { type Schema } from 'zod';
import { ValidationMessage } from '@/shared/v1/enums';

export const CreateAdminFaqTypeValidation = (lang: Language): Schema =>
  z.strictObject<CreateAdminFaqTypeRequestDTO>({
    faqTypeNameFa: z.string({
      error: t(ValidationMessages, ValidationMessage.FAQ_TYPE_NAME_FA_REQUIRED, lang),
    }),

    faqTypeNameEn: z
      .string({
        error: t(ValidationMessages, ValidationMessage.FAQ_TYPE_NAME_EN_INVALID, lang),
      })
      .optional(),

    faqTypeSlug: z.string({
      error: t(ValidationMessages, ValidationMessage.FAQ_TYPE_SLUG_REQUIRED, lang),
    }),

    faqTypeDescriptionFa: z.string({
      error: t(ValidationMessages, ValidationMessage.FAQ_TYPE_DESCRIPTION_FA_REQUIRED, lang),
    }),

    faqTypeDescriptionEn: z
      .string({
        error: t(ValidationMessages, ValidationMessage.FAQ_TYPE_DESCRIPTION_EN_INVALID, lang),
      })
      .optional(),
  });
