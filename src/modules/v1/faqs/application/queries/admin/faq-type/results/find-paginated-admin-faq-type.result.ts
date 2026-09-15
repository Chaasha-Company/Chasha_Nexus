import type { GetAllAdminFaqTypeResponseDTO } from '@/modules/v1/faqs/presentation';

export interface FindPaginatedAdminFaqTypeResult {
  count: number;
  data: GetAllAdminFaqTypeResponseDTO[];
}

export type FindPaginatedAdminFaqTypeQueryResult = Promise<FindPaginatedAdminFaqTypeResult>;
