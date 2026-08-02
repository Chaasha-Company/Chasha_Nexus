import type { CreateGlobalEarlyAccessRequestCommand } from '@/modules/v1/early-access-requests/application';

export type CreateEarlyAccessRequestRepositoryContract = (createEarlyAccessRequestData: CreateGlobalEarlyAccessRequestCommand) => Promise<void>;
