import type { FindEarlyAccessRequestByPhoneNumberQuery } from '@/modules/v1/early-access-requests/application';
import type { EarlyAccessRequestsModel } from '@/shared/v1/database/schema/early_access_requests';
import type { TransactionContext } from '@/shared/v1/domain/contracts';

export type FindEarlyAccessRequestByPhoneNumberRepositoryContract = (earlyAccessRequestData: FindEarlyAccessRequestByPhoneNumberQuery, ctx?: TransactionContext) => Promise<EarlyAccessRequestsModel | null>;
