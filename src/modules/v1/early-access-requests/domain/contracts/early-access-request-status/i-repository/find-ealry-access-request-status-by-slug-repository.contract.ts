import type { FindEarlyAccessRequestStatusBySlugQuery } from '@/modules/v1/early-access-requests/application';
import type { EarlyAccessRequestStatusesModel } from '@/shared/v1/database/schema/early_access_requests/childrens';

export type FindEarlyAccessRequestStatusBySlug = (ealryAccessRequestStatusData: FindEarlyAccessRequestStatusBySlugQuery) => Promise<EarlyAccessRequestStatusesModel | null>;
