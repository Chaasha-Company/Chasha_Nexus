import type { ZodNumber } from 'zod';

export interface DetailAdminFaqRequestDTO {
  faqId: number | ZodNumber;
}
