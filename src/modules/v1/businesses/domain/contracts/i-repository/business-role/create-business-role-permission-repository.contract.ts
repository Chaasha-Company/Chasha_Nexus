import type { AssignBusinessRolePermissionCommand } from '@/modules/v1/businesses/application';
import type { TransactionContext } from '@/shared/v1/domain/contracts';

export type CreateBusinessRolePermissionRepositoryContract = (createBusinessRolePermissionData: AssignBusinessRolePermissionCommand, ctx?: TransactionContext) => Promise<{ businessRolePermissionId: string }>;
