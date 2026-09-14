import type { FindEarlyAccessRequestStatusByIdQuery } from '@/modules/v1/early-access-requests/application';
import type { EarlyAccessRequestStatusesModel } from '@/shared/v1/database/schema/early_access_requests/children';
import type { TransactionContext } from '@/shared/v1/domain/contracts';

export type FindEarlyAccessRequestStatusByIdRepositoryContract = (earlyAccessRequestStatusData: FindEarlyAccessRequestStatusByIdQuery, ctx?: TransactionContext) => Promise<EarlyAccessRequestStatusesModel | null>;
