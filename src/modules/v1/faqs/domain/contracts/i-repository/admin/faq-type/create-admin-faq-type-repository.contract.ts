import type { CreateAdminFaqTypeCommand } from '@/modules/v1/faqs/application';
import type { FaqTypesModel } from '@/shared/v1/database/schema/faqs/children';
import type { TransactionContext } from '@/shared/v1/domain/contracts';

export type CreateAdminFaqTypeRepositoryContract = (faqTypeData: CreateAdminFaqTypeCommand, ctx?: TransactionContext) => Promise<FaqTypesModel>;
