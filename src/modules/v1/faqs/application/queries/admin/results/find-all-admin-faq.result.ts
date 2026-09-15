import type { GetAllAdminFaqResponseDTO } from '@/modules/v1/faqs/presentation';

export interface FindAllAdminFaqResult {
  count: number;
  data: GetAllAdminFaqResponseDTO[];
}

export type FindAllAdminFaqQueryResult = Promise<FindAllAdminFaqResult>;
