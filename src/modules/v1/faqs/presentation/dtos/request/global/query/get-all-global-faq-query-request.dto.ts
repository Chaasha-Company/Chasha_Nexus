import type { ZodEnum } from 'zod';

export interface GetAllGlobalFaqQueryRequestDTO {
  faqType: 'landing' | 'business' | ZodEnum<{ landing: 'landing'; business: 'business' }>;
}
