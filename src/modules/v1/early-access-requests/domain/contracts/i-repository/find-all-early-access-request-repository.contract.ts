import type { FindAllEarlyAccessRequestQuery } from '@/modules/v1/early-access-requests/application';
import type { PaginationResponseRepository } from '@/shared/v1/database/types';
import type { EarlyAccessRequestsModel } from '@/shared/v1/database/schema/early_access_requests';

export type FindAllEarlyAccessRequestRepositoryContract = (earlyAccessData: FindAllEarlyAccessRequestQuery) => Promise<PaginationResponseRepository<EarlyAccessRequestsModel>>;
