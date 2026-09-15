import type { DeleteAdminFaqCommand } from '@/modules/v1/faqs/application';
import type { TransactionContext } from '@/shared/v1/domain/contracts';

export type DeleteAdminFaqRepositoryContract = (faqData: DeleteAdminFaqCommand, ctx?: TransactionContext) => Promise<void>;
