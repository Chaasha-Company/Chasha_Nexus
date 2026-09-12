import type { ZodNumber, ZodOptional, ZodRecord, ZodString, ZodUnknown } from 'zod';

export interface UpdateEarlyAccessRequestRequestDTO {
  earlyAccessRequestId: string | ZodString;
  earlyAccessRequestStatusId?: number | ZodOptional<ZodNumber>;
  earlyAccessRequestBusinessTypeId?: number | ZodOptional<ZodNumber>;
  earlyAccessRequestFullName?: string | ZodOptional<ZodString>;
  earlyAccessRequestPhoneNumber?: string | ZodOptional<ZodString>;
  earlyAccessRequestCode?: string | ZodOptional<ZodString>;
  earlyAccessRequestBusinessName?: string | ZodOptional<ZodString>;
  earlyAccessRequestMetadata?: Record<string, unknown> | ZodOptional<ZodRecord<ZodString, ZodUnknown>>;
}
