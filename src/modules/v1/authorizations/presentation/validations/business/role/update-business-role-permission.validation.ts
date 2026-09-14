import type { UpdateBusinessRolePermissionRequestDTO } from '@/modules/v1/authorizations/presentation';
import { t, ValidationMessages, type Language } from '@/infrastructure/translator-system/i18n';

import z, { type Schema } from 'zod';
import { ValidationMessage } from '@/shared/v1/enums';

export const UpdateBusinessRolePermissionValidation = (lang: Language): Schema =>
  z.strictObject<UpdateBusinessRolePermissionRequestDTO>({
    businessRoleId: z.string({
      error: t(ValidationMessages, ValidationMessage.BUSINESS_EMPLOYEE_ROLE_ID_REQUIRED, lang),
    }),

    businessPermissionId: z.string({
      error: t(ValidationMessages, ValidationMessage.BUSINESS_EMPLOYEE_PERMISSION_ID_REQUIRED, lang),
    }),

    enabled: z.boolean({
      error: t(ValidationMessages, ValidationMessage.BUSINESS_EMPLOYEE_ROLE_PERMISSION_ENABLED_REQUIRED, lang),
    }),
  });
