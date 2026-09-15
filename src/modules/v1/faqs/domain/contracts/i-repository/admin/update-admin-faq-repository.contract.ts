import type { UpdateAdminFaqCommand } from '@/modules/v1/faqs/application';
import type { TransactionContext } from '@/shared/v1/domain/contracts';

export type UpdateAdminFaqRepositoryContract = (faqData: UpdateAdminFaqCommand, ctx?: TransactionContext) => Promise<void>;
