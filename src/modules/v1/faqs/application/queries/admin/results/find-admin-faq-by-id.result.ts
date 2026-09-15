import type { DetailAdminFaqResponseDTO } from '@/modules/v1/faqs/presentation';

export type FindAdminFaqByIdResult = DetailAdminFaqResponseDTO;

export type FindAdminFaqByIdQueryResult = Promise<FindAdminFaqByIdResult>;
