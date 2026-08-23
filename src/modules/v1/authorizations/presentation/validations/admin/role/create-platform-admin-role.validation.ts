import type { CreatePlatformAdminRoleRequestDTO } from '@/modules/v1/authorizations/presentation';
import { t, ValidationMessages, type Language } from '@/infrastructure/translator-system/i18n';

import z, { type Schema } from 'zod';
import { ValidationMessage } from '@/shared/v1/enums';

export const CreatePlatformAdminRoleValidation = (lang: Language): Schema =>
  z.strictObject<CreatePlatformAdminRoleRequestDTO>({
    platformAdminRoleKey: z
      .string({
        error: t(ValidationMessages, ValidationMessage.PLATFORM_ADMIN_ROLE_KEY_REQUIRED, lang),
      })
      .min(1, {
        error: t(ValidationMessages, ValidationMessage.PLATFORM_ADMIN_ROLE_KEY_REQUIRED, lang),
      })
      .max(100, {
        error: t(ValidationMessages, ValidationMessage.PLATFORM_ADMIN_ROLE_KEY_TOO_LONG, lang),
      }),

    platformAdminRoleNameFa: z
      .string({
        error: t(ValidationMessages, ValidationMessage.PLATFORM_ADMIN_ROLE_NAME_FA_REQUIRED, lang),
      })
      .min(1, {
        error: t(ValidationMessages, ValidationMessage.PLATFORM_ADMIN_ROLE_NAME_FA_REQUIRED, lang),
      })
      .max(255, {
        error: t(ValidationMessages, ValidationMessage.PLATFORM_ADMIN_ROLE_NAME_FA_TOO_LONG, lang),
      }),

    platformAdminRoleNameEn: z
      .string({
        error: t(ValidationMessages, ValidationMessage.PLATFORM_ADMIN_ROLE_NAME_EN_REQUIRED, lang),
      })
      .min(1, {
        error: t(ValidationMessages, ValidationMessage.PLATFORM_ADMIN_ROLE_NAME_EN_REQUIRED, lang),
      })
      .max(255, {
        error: t(ValidationMessages, ValidationMessage.PLATFORM_ADMIN_ROLE_NAME_EN_TOO_LONG, lang),
      }),

    platformAdminRoleDescriptionFa: z.string().optional(),

    platformAdminRoleDescriptionEn: z.string().optional(),
  });
