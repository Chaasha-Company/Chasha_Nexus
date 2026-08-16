import type { DetailEarlyAccessRequestRequestDTO } from '@/modules/v1/early-access-requests/presentation';
import { t, ValidationMessages, type Language } from '@/infrastructure/translator-system/i18n';

import z, { type Schema } from 'zod';
import { ValidationMessage } from '@/shared/v1/enums';

export const DetailEarlyAccessRequestValidation = (lang: Language): Schema =>
  z.strictObject<DetailEarlyAccessRequestRequestDTO>({
    earlyAccessRequestId: z.string({
      error: t(ValidationMessages, ValidationMessage.EARLY_ACCESS_REQUEST_ID_REQUIRED, lang),
    }),
  });
