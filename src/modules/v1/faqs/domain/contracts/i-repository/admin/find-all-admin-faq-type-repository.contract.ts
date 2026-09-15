import type { FaqTypesModel } from '@/shared/v1/database/schema/faqs/children';
import type { TransactionContext } from '@/shared/v1/domain/contracts';

export type FindAllAdminFaqTypeRepositoryContract = (ctx?: TransactionContext) => Promise<FaqTypesModel[]>;
