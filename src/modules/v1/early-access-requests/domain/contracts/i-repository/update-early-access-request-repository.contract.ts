import type { UpdateEalryAccessRequestCommand } from '@/modules/v1/early-access-requests/application';
import type { EntityManager } from 'typeorm';

export type UpdateEarlyAccessRequestRepositoryContract = (earlyAccessRequestData: UpdateEalryAccessRequestCommand, manager?: EntityManager) => Promise<void>;
