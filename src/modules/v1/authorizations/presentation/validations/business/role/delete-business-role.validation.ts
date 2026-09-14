import type { DeleteBusinessRoleRequestDTO } from '@/modules/v1/authorizations/presentation';
import { t, ValidationMessages, type Language } from '@/infrastructure/translator-system/i18n';

import z, { type Schema } from 'zod';
import { ValidationMessage } from '@/shared/v1/enums';

export const DeleteBusinessRoleValidation = (lang: Language): Schema =>
  z.strictObject<DeleteBusinessRoleRequestDTO>({
    businessRoleId: z.string({
      error: t(ValidationMessages, ValidationMessage.BUSINESS_EMPLOYEE_ROLE_ID_REQUIRED, lang),
    }),
  });
