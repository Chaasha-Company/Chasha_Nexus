import type { DetailAdminFaqTypeResponseDTO } from '@/modules/v1/faqs/presentation';

export type FindAdminFaqTypeByIdResult = DetailAdminFaqTypeResponseDTO;

export type FindAdminFaqTypeByIdQueryResult = Promise<FindAdminFaqTypeByIdResult>;
