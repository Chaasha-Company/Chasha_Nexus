import type { FindBusinessRolePermissionQuery } from '@/modules/v1/businesses/application';
import type { BusinessRolePermissionsModel } from '@/shared/v1/database/schema/businesses/children';
import type { TransactionContext } from '@/shared/v1/domain/contracts';

export type FindBusinessRolePermissionRepositoryContract = (businessRolePermissionData: FindBusinessRolePermissionQuery, ctx?: TransactionContext) => Promise<BusinessRolePermissionsModel | null>;
