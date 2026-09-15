import type { FindAdminFaqByIdQuery } from '@/modules/v1/faqs/application';
import type { FaqsModel } from '@/shared/v1/database/schema/faqs';
import type { TransactionContext } from '@/shared/v1/domain/contracts';

export type FindAdminFaqByIdRepositoryContract = (faqData: FindAdminFaqByIdQuery, ctx?: TransactionContext) => Promise<null | FaqsModel>;
