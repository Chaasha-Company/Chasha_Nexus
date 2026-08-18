import type { UpdateEarlyAccessRequestRequestDTO } from '@/modules/v1/early-access-requests/presentation';
import { t, ValidationMessages, type Language } from '@/infrastructure/translator-system/i18n';

import z, { type Schema } from 'zod';

import { ValidationMessage } from '@/shared/v1/enums';

export const UpdateEarlyAccessRequestValidation = (lang: Language): Schema =>
  z
    .strictObject<UpdateEarlyAccessRequestRequestDTO>({
      earlyAccessRequestId: z.string({
        error: t(ValidationMessages, ValidationMessage.EARLY_ACCESS_REQUEST_ID_REQUIRED, lang),
      }),

      earlyAccessRequestStatusId: z
        .number({
          error: t(ValidationMessages, ValidationMessage.EARLY_ACCESS_REQUEST_STATUS_ID_INVALID, lang),
        })
        .optional(),

      earlyAccessRequestBusinessTypeId: z
        .string({
          error: t(ValidationMessages, ValidationMessage.EARLY_ACCESS_REQUEST_BUSINESS_TYPE_ID_INVALID, lang),
        })
        .optional(),

      earlyAccessRequestFullName: z
        .string({
          error: t(ValidationMessages, ValidationMessage.EARLY_ACCESS_REQUEST_FULL_NAME_INVALID, lang),
        })
        .optional(),

      earlyAccessRequestPhoneNumber: z
        .string({
          error: t(ValidationMessages, ValidationMessage.EARLY_ACCESS_REQUEST_PHONE_NUMBER_INVALID, lang),
        })
        .optional(),

      earlyAccessRequestCode: z
        .string({
          error: t(ValidationMessages, ValidationMessage.EARLY_ACCESS_REQUEST_CODE_INVALID, lang),
        })
        .optional(),

      earlyAccessRequestBusinessName: z
        .string({
          error: t(ValidationMessages, ValidationMessage.EARLY_ACCESS_REQUEST_BUSINESS_NAME_INVALID, lang),
        })
        .optional(),

      earlyAccessRequestMetadata: z
        .record(z.string(), z.unknown(), {
          error: t(ValidationMessages, ValidationMessage.EARLY_ACCESS_REQUEST_METADATA_INVALID, lang),
        })
        .optional(),
    })
    .refine((data) => Object.entries(data).some(([key, value]) => key !== 'earlyAccessRequestId' && value !== undefined), {
      message: t(ValidationMessages, ValidationMessage.UPDATE_AT_LEAST_ONE_FIELD_REQUIRED, lang),
    });
