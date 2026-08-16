import type { GetAllGlobalFaqResponseDTO } from '@/modules/v1/faqs/presentation';

export type FindAllFaqByTypeQueryResult = Promise<GetAllGlobalFaqResponseDTO[]>;
