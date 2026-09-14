import type { RemoveBusinessRolePermissionCommand } from '@/modules/v1/businesses/application';
import type { TransactionContext } from '@/shared/v1/domain/contracts';

export type DeleteBusinessRolePermissionRepositoryContract = (deleteBusinessRolePermissionData: RemoveBusinessRolePermissionCommand, ctx?: TransactionContext) => Promise<void>;
