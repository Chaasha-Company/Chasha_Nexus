import type { ZodString } from 'zod';

export interface CreateGlobalEarlyAccessRequestRequestDTO {
  earlyAccessRequestFullName: string | ZodString;
  earlyAccessRequestPhoneNumber: string | ZodString;
  earlyAccessRequestBusinessTypeSlug: string | ZodString;
}
