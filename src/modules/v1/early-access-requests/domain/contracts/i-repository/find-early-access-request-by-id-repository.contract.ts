import type { FindEarlyAccessRequestByIdQuery } from '@/modules/v1/early-access-requests/application';
import type { EarlyAccessRequestsModel } from '@/shared/v1/database/schema/early_access_requests';
import type { TransactionContext } from '@/shared/v1/domain/contracts';

export type FindEarlyAccessRequestByIdRepositoryContract = (earlyAccessRequestData: FindEarlyAccessRequestByIdQuery, ctx?: TransactionContext) => Promise<null | EarlyAccessRequestsModel>;
