import type { CreateBusinessRoleRequestDTO } from '@/modules/v1/authorizations/presentation';
import { t, ValidationMessages, type Language } from '@/infrastructure/translator-system/i18n';

import z, { type Schema } from 'zod';
import { ValidationMessage } from '@/shared/v1/enums';

export const CreateBusinessRoleValidation = (lang: Language): Schema =>
  z.strictObject<CreateBusinessRoleRequestDTO>({
    businessRoleKey: z
      .string({
        error: t(ValidationMessages, ValidationMessage.BUSINESS_EMPLOYEE_ROLE_KEY_REQUIRED, lang),
      })
      .min(1, {
        error: t(ValidationMessages, ValidationMessage.BUSINESS_EMPLOYEE_ROLE_KEY_REQUIRED, lang),
      })
      .max(100, {
        error: t(ValidationMessages, ValidationMessage.BUSINESS_EMPLOYEE_ROLE_KEY_TOO_LONG, lang),
      }),

    businessRoleNameFa: z
      .string({
        error: t(ValidationMessages, ValidationMessage.BUSINESS_EMPLOYEE_ROLE_NAME_FA_REQUIRED, lang),
      })
      .min(1, {
        error: t(ValidationMessages, ValidationMessage.BUSINESS_EMPLOYEE_ROLE_NAME_FA_REQUIRED, lang),
      })
      .max(255, {
        error: t(ValidationMessages, ValidationMessage.BUSINESS_EMPLOYEE_ROLE_NAME_FA_TOO_LONG, lang),
      }),

    businessRoleNameEn: z
      .string({
        error: t(ValidationMessages, ValidationMessage.BUSINESS_EMPLOYEE_ROLE_NAME_EN_REQUIRED, lang),
      })
      .min(1, {
        error: t(ValidationMessages, ValidationMessage.BUSINESS_EMPLOYEE_ROLE_NAME_EN_REQUIRED, lang),
      })
      .max(255, {
        error: t(ValidationMessages, ValidationMessage.BUSINESS_EMPLOYEE_ROLE_NAME_EN_TOO_LONG, lang),
      }),

    businessRoleDescriptionFa: z.string().optional(),

    businessRoleDescriptionEn: z.string().optional(),
  });
