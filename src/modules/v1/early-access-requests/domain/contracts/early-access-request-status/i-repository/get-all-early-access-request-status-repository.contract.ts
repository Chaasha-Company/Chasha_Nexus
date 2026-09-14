import type { EarlyAccessRequestStatusesModel } from '@/shared/v1/database/schema/early_access_requests/children';
import type { TransactionContext } from '@/shared/v1/domain/contracts';

export type GetAllEarlyAccessRequestStatusRepositoryContract = (ctx?: TransactionContext) => Promise<EarlyAccessRequestStatusesModel[]>;
