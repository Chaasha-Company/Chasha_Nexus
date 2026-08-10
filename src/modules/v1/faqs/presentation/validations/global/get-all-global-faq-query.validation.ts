import type { GetAllGlobalFaqQueryRequestDTO } from '@/modules/v1/faqs/presentation/dtos';
import { t, ValidationMessages, type Language } from '@/infrastructure/translator-system/i18n';

import z, { type Schema } from 'zod';
import { ValidationMessage } from '@/shared/v1/enums';

export const GetAllGlobalFaqQueryValidation = (lang: Language): Schema =>
  z.strictObject<GetAllGlobalFaqQueryRequestDTO>({
    faqType: z.enum(['landing', 'business'], {
      error: t(ValidationMessages, ValidationMessage.FAQ_TYPE_INVALID, lang),
    }),
  });
