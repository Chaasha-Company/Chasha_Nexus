import type { Language } from '@/infrastructure/translator-system/i18n';
import type { GetAllAdminFaqTypeQueryRequestDTO } from '@/modules/v1/faqs/presentation';

import z, { type Schema } from 'zod';

import { PaginationQueryValidation } from '@/shared/v1/validations/pagination';

export const GetAllAdminFaqTypeQueryValidation = (lang: Language): Schema =>
  z.strictObject<GetAllAdminFaqTypeQueryRequestDTO>({
    ...PaginationQueryValidation(lang).shape,

    faqTypeSearch: z.string().optional(),
  });
