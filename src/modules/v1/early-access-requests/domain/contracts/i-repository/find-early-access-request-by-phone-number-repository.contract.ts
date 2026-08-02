import type { FindEarlyAccessRequestByPhoneNumberQuery } from '@/modules/v1/early-access-requests/application';
import type { EarlyAccessRequestsModel } from '@/shared/v1/database/schema/early_access_requests';

export type FindEarlyAccessRequestByPhoneNumberRepositoryContract = (earlyAccessRequestData: FindEarlyAccessRequestByPhoneNumberQuery) => Promise<EarlyAccessRequestsModel | null>;
