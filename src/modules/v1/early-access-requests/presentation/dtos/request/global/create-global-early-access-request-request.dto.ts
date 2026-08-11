import type { ZodString } from 'zod';

export interface CreateGlobalEarlyAccessRequestRequestDTO {
  earlyAccessRequestFullName: string | ZodString;
  earlyAccessRequestPhoneNumber: string | ZodString;
  earlyAccessRequestBusinessName: string | ZodString;
  earlyAccessRequestBusinessTypeSlug: string | ZodString;
}
