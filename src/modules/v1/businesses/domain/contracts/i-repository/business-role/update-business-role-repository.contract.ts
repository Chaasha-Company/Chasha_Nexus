import type { UpdateBusinessRoleCommand } from '@/modules/v1/businesses/application';
import type { TransactionContext } from '@/shared/v1/domain/contracts';

export type UpdateBusinessRoleRepositoryContract = (updateBusinessRoleData: UpdateBusinessRoleCommand, ctx?: TransactionContext) => Promise<void>;
