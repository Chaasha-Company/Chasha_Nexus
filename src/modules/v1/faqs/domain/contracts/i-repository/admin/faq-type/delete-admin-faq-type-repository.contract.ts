import type { DeleteAdminFaqTypeCommand } from '@/modules/v1/faqs/application';
import type { TransactionContext } from '@/shared/v1/domain/contracts';

export type DeleteAdminFaqTypeRepositoryContract = (faqTypeData: DeleteAdminFaqTypeCommand, ctx?: TransactionContext) => Promise<void>;
