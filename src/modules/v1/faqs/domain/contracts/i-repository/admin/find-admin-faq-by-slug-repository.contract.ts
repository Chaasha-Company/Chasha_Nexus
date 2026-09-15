import type { FindAdminFaqBySlugQuery } from '@/modules/v1/faqs/application';
import type { FaqsModel } from '@/shared/v1/database/schema/faqs';
import type { TransactionContext } from '@/shared/v1/domain/contracts';

export type FindAdminFaqBySlugRepositoryContract = (faqData: FindAdminFaqBySlugQuery, ctx?: TransactionContext) => Promise<null | FaqsModel>;
