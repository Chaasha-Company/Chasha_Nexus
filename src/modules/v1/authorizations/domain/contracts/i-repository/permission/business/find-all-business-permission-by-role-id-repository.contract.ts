import type { FindAllBusinessPermissionByRoleIdQuery } from '@/modules/v1/authorizations/application';
import type { BusinessRolePermissionsModel } from '@/shared/v1/database/schema/businesses/children';
import type { TransactionContext } from '@/shared/v1/domain/contracts';

export type FindAllBusinessPermissionByRoleIdRepositoryContract = (businessPermissionData: FindAllBusinessPermissionByRoleIdQuery, ctx?: TransactionContext) => Promise<BusinessRolePermissionsModel[]>;
