import type { PaginationQueryRequestDTO } from '@/shared/v1/interfaces/config/api/query';
import z from 'zod';

import { t, ValidationMessages, type Language } from '@/infrastructure/translator-system/i18n';

import { ValidationMessage } from '@/shared/v1/enums';

export const PaginationQueryValidation = (lang: Language) =>
  z.strictObject<PaginationQueryRequestDTO>({
    paginationPage: z
      .string({
        error: t(ValidationMessages, ValidationMessage.PAGINATION_PAGE_REQUIRED, lang),
      })
      .regex(/^\d+$/, {
        error: t(ValidationMessages, ValidationMessage.PAGINATION_PAGE_INVALID, lang),
      }),

    paginationLimit: z
      .string({
        error: t(ValidationMessages, ValidationMessage.PAGINATION_LIMIT_REQUIRED, lang),
      })
      .regex(/^\d+$/, {
        error: t(ValidationMessages, ValidationMessage.PAGINATION_LIMIT_INVALID, lang),
      }),
  });
