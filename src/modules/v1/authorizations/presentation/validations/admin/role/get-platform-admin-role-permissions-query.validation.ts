import type { GetPlatformAdminRolePermissionsRequestQueryDTO } from '@/modules/v1/authorizations/presentation';
import { t, ValidationMessages, type Language } from '@/infrastructure/translator-system/i18n';

import z, { type Schema } from 'zod';
import { ValidationMessage } from '@/shared/v1/enums';

export const GetPlatformAdminRolePermissionsQueryValidation = (lang: Language): Schema =>
  z.strictObject<GetPlatformAdminRolePermissionsRequestQueryDTO>({
    platformAdminRoleId: z.string({
      error: t(ValidationMessages, ValidationMessage.PLATFORM_ADMIN_ROLE_ID_REQUIRED, lang),
    }),
  });
