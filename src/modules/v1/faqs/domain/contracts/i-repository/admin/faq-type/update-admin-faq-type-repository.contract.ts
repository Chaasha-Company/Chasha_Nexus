import type { UpdateAdminFaqTypeCommand } from '@/modules/v1/faqs/application';
import type { TransactionContext } from '@/shared/v1/domain/contracts';

export type UpdateAdminFaqTypeRepositoryContract = (faqTypeData: UpdateAdminFaqTypeCommand, ctx?: TransactionContext) => Promise<void>;
