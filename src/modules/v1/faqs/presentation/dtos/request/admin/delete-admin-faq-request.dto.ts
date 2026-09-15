import type { ZodNumber } from 'zod';

export interface DeleteAdminFaqRequestDTO {
  faqId: number | ZodNumber;
}
