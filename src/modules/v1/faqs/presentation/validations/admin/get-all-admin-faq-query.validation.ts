import type { Language } from '@/infrastructure/translator-system/i18n';
import type { GetAllAdminFaqQueryRequestDTO } from '@/modules/v1/faqs/presentation';
import { t, ValidationMessages } from '@/infrastructure/translator-system/i18n';

import z, { type Schema } from 'zod';

import { ValidationMessage } from '@/shared/v1/enums';
import { PaginationQueryValidation } from '@/shared/v1/validations/pagination';

export const GetAllAdminFaqQueryValidation = (lang: Language): Schema =>
  z.strictObject<GetAllAdminFaqQueryRequestDTO>({
    ...PaginationQueryValidation(lang).shape,

    faqSearch: z.string().optional(),

    faqTypeId: z
      .string()
      .regex(/^\d+$/, {
        error: t(ValidationMessages, ValidationMessage.FAQ_TYPE_ID_INVALID, lang),
      })
      .optional(),
  });
