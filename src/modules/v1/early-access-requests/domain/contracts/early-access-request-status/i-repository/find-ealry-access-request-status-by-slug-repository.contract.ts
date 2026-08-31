import type { FindEarlyAccessRequestStatusBySlugQuery } from '@/modules/v1/early-access-requests/application';
import type { EarlyAccessRequestStatusesModel } from '@/shared/v1/database/schema/early_access_requests/childrens';
import type { TransactionContext } from '@/shared/v1/domain/contracts';

export type FindEarlyAccessRequestStatusBySlug = (ealryAccessRequestStatusData: FindEarlyAccessRequestStatusBySlugQuery, ctx?: TransactionContext) => Promise<EarlyAccessRequestStatusesModel | null>;
