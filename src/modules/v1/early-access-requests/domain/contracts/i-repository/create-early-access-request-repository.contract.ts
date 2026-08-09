import type { CreateGlobalEarlyAccessRequestCommand } from '@/modules/v1/early-access-requests/application';
import type { EntityManager } from 'typeorm';

export type CreateEarlyAccessRequestRepositoryContract = (createEarlyAccessRequestData: CreateGlobalEarlyAccessRequestCommand, manager?: EntityManager) => Promise<void>;
