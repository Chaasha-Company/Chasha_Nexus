import type { FindPaginatedAdminFaqTypeQuery } from '@/modules/v1/faqs/application';
import type { PaginationResponseRepository } from '@/shared/v1/database/types';
import type { FaqTypesModel } from '@/shared/v1/database/schema/faqs/children';
import type { TransactionContext } from '@/shared/v1/domain/contracts';

export type FindPaginatedAdminFaqTypeRepositoryContract = (faqTypeData: FindPaginatedAdminFaqTypeQuery, ctx?: TransactionContext) => Promise<PaginationResponseRepository<FaqTypesModel>>;
