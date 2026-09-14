import type { UpdateBusinessRolePermissionCommand } from '@/modules/v1/businesses/application';
import type { TransactionContext } from '@/shared/v1/domain/contracts';

export type RestoreBusinessRolePermissionRepositoryContract = (restoreBusinessRolePermissionData: UpdateBusinessRolePermissionCommand, ctx?: TransactionContext) => Promise<void>;
