import type { RefreshTokenBusinessRequestDTO } from '@/modules/v1/auth/presentation/dtos';
import { t, ValidationMessages, type Language } from '@/infrastructure/translator-system/i18n';

import z, { type Schema } from 'zod';
import { ValidationMessage } from '@/shared/v1/enums';

export const RefreshTokenBusinessValidation = (lang: Language): Schema =>
  z.strictObject<RefreshTokenBusinessRequestDTO>({
    refreshTokenBusiness: z.string({
      error: t(ValidationMessages, ValidationMessage.BUSINESS_REFRESH_TOKEN_REQUIRED, lang),
    }),
  });
