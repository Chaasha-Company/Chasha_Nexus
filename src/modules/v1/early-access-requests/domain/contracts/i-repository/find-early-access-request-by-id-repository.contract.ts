import type { FindEarlyAccessRequestByIdQuery } from '@/modules/v1/early-access-requests/application';
import type { EarlyAccessRequestsModel } from '@/shared/v1/database/schema/early_access_requests';
import type { EntityManager } from 'typeorm';

export type FindEarlyAccessRequestByIdRepositoryContract = (earlyAccessRequestData: FindEarlyAccessRequestByIdQuery, manager?: EntityManager) => Promise<null | EarlyAccessRequestsModel>;
