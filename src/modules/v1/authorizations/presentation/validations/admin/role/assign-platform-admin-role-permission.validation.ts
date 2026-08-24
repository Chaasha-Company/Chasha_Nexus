import type { AssignPlatformAdminRolePermissionRequestDTO } from '@/modules/v1/authorizations/presentation';
import { t, ValidationMessages, type Language } from '@/infrastructure/translator-system/i18n';

import z, { type Schema } from 'zod';
import { ValidationMessage } from '@/shared/v1/enums';

export const AssignPlatformAdminRolePermissionValidation = (lang: Language): Schema =>
  z.strictObject<AssignPlatformAdminRolePermissionRequestDTO>({
    platformAdminRoleId: z.string({
      error: t(ValidationMessages, ValidationMessage.PLATFORM_ADMIN_ROLE_ID_REQUIRED, lang),
    }),

    platformAdminPermissionId: z.string({
      error: t(ValidationMessages, ValidationMessage.PLATFORM_ADMIN_PERMISSION_ID_REQUIRED, lang),
    }),
  });
