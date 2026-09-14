import type { UpdateEarlyAccessRequestCommand } from '@/modules/v1/early-access-requests/application';
import type { TransactionContext } from '@/shared/v1/domain/contracts';

export type UpdateEarlyAccessRequestRepositoryContract = (earlyAccessRequestData: UpdateEarlyAccessRequestCommand, ctx?: TransactionContext) => Promise<void>;
