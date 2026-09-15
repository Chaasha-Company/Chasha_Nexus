import type { DetailAdminFaqRequestDTO } from '@/modules/v1/faqs/presentation';
import { t, ValidationMessages, type Language } from '@/infrastructure/translator-system/i18n';

import z, { type Schema } from 'zod';
import { ValidationMessage } from '@/shared/v1/enums';

export const DetailAdminFaqValidation = (lang: Language): Schema =>
  z.strictObject<DetailAdminFaqRequestDTO>({
    faqId: z.number({
      error: t(ValidationMessages, ValidationMessage.FAQ_ID_REQUIRED, lang),
    }),
  });
