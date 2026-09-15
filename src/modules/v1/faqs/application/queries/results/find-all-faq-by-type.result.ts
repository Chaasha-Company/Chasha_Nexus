import type { GetAllGlobalFaqResponseDTO } from '@/modules/v1/faqs/presentation';

export interface FindAllFaqByTypeResult {
  count: number;
  data: GetAllGlobalFaqResponseDTO[];
}

export type FindAllFaqByTypeQueryResult = Promise<FindAllFaqByTypeResult>;
