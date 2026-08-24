import type { ReplacePlatformAdminRolePermissionsRequestDTO } from '@/modules/v1/authorizations/presentation';
import { t, ValidationMessages, type Language } from '@/infrastructure/translator-system/i18n';

import z, { type Schema } from 'zod';
import { ValidationMessage } from '@/shared/v1/enums';

export const ReplacePlatformAdminRolePermissionsValidation = (lang: Language): Schema =>
  z
    .strictObject<ReplacePlatformAdminRolePermissionsRequestDTO>({
      platformAdminRoleId: z.string({
        error: t(ValidationMessages, ValidationMessage.PLATFORM_ADMIN_ROLE_ID_REQUIRED, lang),
      }),

      permissionIds: z.array(
        z.string({
          error: t(ValidationMessages, ValidationMessage.PLATFORM_ADMIN_PERMISSION_ID_REQUIRED, lang),
        }),
        {
          error: t(ValidationMessages, ValidationMessage.PLATFORM_ADMIN_PERMISSION_IDS_INVALID, lang),
        },
      ),
    })
    .refine((data) => new Set(data.permissionIds as string[]).size === (data.permissionIds as string[]).length, {
      message: t(ValidationMessages, ValidationMessage.PLATFORM_ADMIN_PERMISSION_IDS_DUPLICATE, lang),
    });
