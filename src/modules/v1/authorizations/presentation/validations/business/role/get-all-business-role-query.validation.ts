import type { Language } from '@/infrastructure/translator-system/i18n';
import type { GetAllBusinessRoleQueryDTO } from '@/modules/v1/authorizations/presentation';
import { t, ValidationMessages } from '@/infrastructure/translator-system/i18n';

import z, { type Schema } from 'zod';

import { ValidationMessage } from '@/shared/v1/enums';
import { PaginationQueryValidation } from '@/shared/v1/validations/pagination';

export const GetAllBusinessRoleQueryValidation = (lang: Language): Schema =>
  z.strictObject<GetAllBusinessRoleQueryDTO>({
    ...PaginationQueryValidation(lang).shape,

    businessRoleSearch: z.string().optional(),

    businessRoleIsActive: z
      .string()
      .regex(/^(true|false)$/, {
        error: t(ValidationMessages, ValidationMessage.BUSINESS_EMPLOYEE_ROLE_IS_ACTIVE_INVALID, lang),
      })
      .optional(),
  });
