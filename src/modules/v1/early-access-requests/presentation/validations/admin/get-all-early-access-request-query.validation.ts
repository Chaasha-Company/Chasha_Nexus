import type { Language } from '@/infrastructure/translator-system/i18n';
import type { GetAllEarlyAccessRequestRequestQueryDTO } from '@/modules/v1/early-access-requests/presentation';
import { t, ValidationMessages } from '@/infrastructure/translator-system/i18n';

import z, { type Schema } from 'zod';

import { ValidationMessage } from '@/shared/v1/enums';
import { PaginationQueryValidation } from '@/shared/v1/validations/pagination';

export const GetAllEarlyAccessRequestQueryValidation = (lang: Language): Schema =>
  z.strictObject<GetAllEarlyAccessRequestRequestQueryDTO>({
    ...PaginationQueryValidation(lang).shape,

    earlyAccessRequestSearch: z.string().optional(),

    earlyAccessRequestStatusId: z
      .string()
      .regex(/^\d+$/, {
        error: t(ValidationMessages, ValidationMessage.EARLY_ACCESS_REQUEST_STATUS_ID_INVALID, lang),
      })
      .optional(),
  });
