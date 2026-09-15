import type { FindAllAdminFaqQuery } from '@/modules/v1/faqs/application';
import type { PaginationResponseRepository } from '@/shared/v1/database/types';
import type { FaqsModel } from '@/shared/v1/database/schema/faqs';
import type { TransactionContext } from '@/shared/v1/domain/contracts';

export type FindAllAdminFaqRepositoryContract = (faqData: FindAllAdminFaqQuery, ctx?: TransactionContext) => Promise<PaginationResponseRepository<FaqsModel>>;
