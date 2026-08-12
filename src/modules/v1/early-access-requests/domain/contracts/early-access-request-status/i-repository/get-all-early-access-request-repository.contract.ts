import type { EarlyAccessRequestStatusesModel } from '@/shared/v1/database/schema/early_access_requests/childrens';
import type { EntityManager } from 'typeorm';

export type GetAllEarlyAccessRequestRepositoryContract = (manager?: EntityManager) => Promise<EarlyAccessRequestStatusesModel[]>;
