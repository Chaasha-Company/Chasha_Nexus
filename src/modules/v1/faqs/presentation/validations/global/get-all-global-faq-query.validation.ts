import type { GetAllGlobalFaqQueryRequestDTO } from '@/modules/v1/faqs/presentation/dtos';
import { t, ValidationMessages, type Language } from '@/infrastructure/translator-system/i18n';

import z, { type Schema } from 'zod';
import { ValidationMessage } from '@/shared/v1/enums';
import { PaginationQueryValidation } from '@/shared/v1/validations/pagination';

export const GetAllGlobalFaqQueryValidation = (lang: Language): Schema =>
  z.strictObject<GetAllGlobalFaqQueryRequestDTO>({
    ...PaginationQueryValidation(lang).shape,

    faqType: z.enum(['landing', 'business'], {
      error: t(ValidationMessages, ValidationMessage.FAQ_TYPE_INVALID, lang),
    }),

    faqSearch: z.string().optional(),
  });
