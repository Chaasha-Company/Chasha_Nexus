import type { Language } from '@/infrastructure/translator-system/i18n';
import type { GetAllPlatformAdminRoleRequestQueryDTO } from '@/modules/v1/authorizations/presentation';
import { t, ValidationMessages } from '@/infrastructure/translator-system/i18n';

import z, { type Schema } from 'zod';

import { ValidationMessage } from '@/shared/v1/enums';
import { PaginationQueryValidation } from '@/shared/v1/validations/pagination';

export const GetAllPlatformAdminRoleQueryValidation = (lang: Language): Schema =>
  z.strictObject<GetAllPlatformAdminRoleRequestQueryDTO>({
    ...PaginationQueryValidation(lang).shape,

    platformAdminRoleSearch: z.string().optional(),

    platformAdminRoleIsActive: z
      .string()
      .regex(/^(true|false)$/, {
        error: t(ValidationMessages, ValidationMessage.PLATFORM_ADMIN_ROLE_IS_ACTIVE_INVALID, lang),
      })
      .optional(),
  });
