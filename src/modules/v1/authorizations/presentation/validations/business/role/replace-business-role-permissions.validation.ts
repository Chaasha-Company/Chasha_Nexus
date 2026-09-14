import type { ReplaceBusinessRolePermissionsRequestDTO } from '@/modules/v1/authorizations/presentation';
import { t, ValidationMessages, type Language } from '@/infrastructure/translator-system/i18n';

import z, { type Schema } from 'zod';
import { ValidationMessage } from '@/shared/v1/enums';

export const ReplaceBusinessRolePermissionsValidation = (lang: Language): Schema =>
  z
    .strictObject<ReplaceBusinessRolePermissionsRequestDTO>({
      businessRoleId: z.string({
        error: t(ValidationMessages, ValidationMessage.BUSINESS_EMPLOYEE_ROLE_ID_REQUIRED, lang),
      }),

      businessPermissionIds: z.array(
        z.string({
          error: t(ValidationMessages, ValidationMessage.BUSINESS_EMPLOYEE_PERMISSION_ID_REQUIRED, lang),
        }),
        {
          error: t(ValidationMessages, ValidationMessage.BUSINESS_EMPLOYEE_PERMISSION_IDS_INVALID, lang),
        },
      ),
    })
    .refine((data) => new Set(data.businessPermissionIds as string[]).size === (data.businessPermissionIds as string[]).length, {
      message: t(ValidationMessages, ValidationMessage.BUSINESS_EMPLOYEE_PERMISSION_IDS_DUPLICATE, lang),
    });
