import type { FindFaqTypeBySlugQuery } from '@/modules/v1/faqs/application';
import type { FaqTypesModel } from '@/shared/v1/database/schema/faqs';
import type { TransactionContext } from '@/shared/v1/domain/contracts';

export type FindFaqTypeBySlugRepositoryContract = (faqTypeData: FindFaqTypeBySlugQuery, ctx?: TransactionContext) => Promise<null | FaqTypesModel>;
