import type { UpdateBusinessRoleRequestDTO } from '@/modules/v1/authorizations/presentation';
import { t, ValidationMessages, type Language } from '@/infrastructure/translator-system/i18n';

import z, { type Schema } from 'zod';
import { ValidationMessage } from '@/shared/v1/enums';

export const UpdateBusinessRoleValidation = (lang: Language): Schema =>
  z
    .strictObject<UpdateBusinessRoleRequestDTO>({
      businessRoleId: z.string({
        error: t(ValidationMessages, ValidationMessage.BUSINESS_EMPLOYEE_ROLE_ID_REQUIRED, lang),
      }),

      businessRoleNameFa: z
        .string({
          error: t(ValidationMessages, ValidationMessage.BUSINESS_EMPLOYEE_ROLE_NAME_FA_INVALID, lang),
        })
        .max(255, {
          error: t(ValidationMessages, ValidationMessage.BUSINESS_EMPLOYEE_ROLE_NAME_FA_TOO_LONG, lang),
        })
        .optional(),

      businessRoleNameEn: z
        .string({
          error: t(ValidationMessages, ValidationMessage.BUSINESS_EMPLOYEE_ROLE_NAME_EN_INVALID, lang),
        })
        .max(255, {
          error: t(ValidationMessages, ValidationMessage.BUSINESS_EMPLOYEE_ROLE_NAME_EN_TOO_LONG, lang),
        })
        .optional(),

      businessRoleDescriptionFa: z
        .string({
          error: t(ValidationMessages, ValidationMessage.BUSINESS_EMPLOYEE_ROLE_DESCRIPTION_INVALID, lang),
        })
        .optional(),

      businessRoleDescriptionEn: z
        .string({
          error: t(ValidationMessages, ValidationMessage.BUSINESS_EMPLOYEE_ROLE_DESCRIPTION_INVALID, lang),
        })
        .optional(),
    })
    .refine((data) => Object.entries(data).some(([key, value]) => key !== 'businessRoleId' && value !== undefined), {
      message: t(ValidationMessages, ValidationMessage.UPDATE_AT_LEAST_ONE_FIELD_REQUIRED, lang),
    });
