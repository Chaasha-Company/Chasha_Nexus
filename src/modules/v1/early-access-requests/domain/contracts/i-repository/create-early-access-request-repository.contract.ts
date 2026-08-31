import type { CreateGlobalEarlyAccessRequestCommand } from '@/modules/v1/early-access-requests/application';
import type { TransactionContext } from '@/shared/v1/domain/contracts';

export type CreateEarlyAccessRequestRepositoryContract = (createEarlyAccessRequestData: CreateGlobalEarlyAccessRequestCommand, ctx?: TransactionContext) => Promise<void>;
