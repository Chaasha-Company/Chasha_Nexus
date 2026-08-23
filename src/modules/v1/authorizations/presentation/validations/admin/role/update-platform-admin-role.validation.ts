import type { UpdatePlatformAdminRoleRequestDTO } from '@/modules/v1/authorizations/presentation';
import { t, ValidationMessages, type Language } from '@/infrastructure/translator-system/i18n';

import z, { type Schema } from 'zod';
import { ValidationMessage } from '@/shared/v1/enums';

export const UpdatePlatformAdminRoleValidation = (lang: Language): Schema =>
  z
    .strictObject<UpdatePlatformAdminRoleRequestDTO>({
      platformAdminRoleId: z.string({
        error: t(ValidationMessages, ValidationMessage.PLATFORM_ADMIN_ROLE_ID_REQUIRED, lang),
      }),

      platformAdminRoleNameFa: z
        .string({
          error: t(ValidationMessages, ValidationMessage.PLATFORM_ADMIN_ROLE_NAME_FA_INVALID, lang),
        })
        .max(255, {
          error: t(ValidationMessages, ValidationMessage.PLATFORM_ADMIN_ROLE_NAME_FA_TOO_LONG, lang),
        })
        .optional(),

      platformAdminRoleNameEn: z
        .string({
          error: t(ValidationMessages, ValidationMessage.PLATFORM_ADMIN_ROLE_NAME_EN_INVALID, lang),
        })
        .max(255, {
          error: t(ValidationMessages, ValidationMessage.PLATFORM_ADMIN_ROLE_NAME_EN_TOO_LONG, lang),
        })
        .optional(),

      platformAdminRoleDescriptionFa: z
        .string({
          error: t(ValidationMessages, ValidationMessage.PLATFORM_ADMIN_ROLE_DESCRIPTION_INVALID, lang),
        })
        .optional(),

      platformAdminRoleDescriptionEn: z
        .string({
          error: t(ValidationMessages, ValidationMessage.PLATFORM_ADMIN_ROLE_DESCRIPTION_INVALID, lang),
        })
        .optional(),
    })
    .refine((data) => Object.entries(data).some(([key, value]) => key !== 'platformAdminRoleId' && value !== undefined), {
      message: t(ValidationMessages, ValidationMessage.UPDATE_AT_LEAST_ONE_FIELD_REQUIRED, lang),
    });
