import type { FindAllPlatformAdminPermissionByRoleIdQuery } from '@/modules/v1/authorizations/application';
import type { PlatformAdminRolePermissionsModel } from '@/shared/v1/database/schema/platform_admins/childrens/platform-admin-roles';
import type { TransactionContext } from '@/shared/v1/domain/contracts';

export type FindAllPlatformAdminPermissionByRoleIdRepositoryContract = (platformAdminPermissionData: FindAllPlatformAdminPermissionByRoleIdQuery, ctx?: TransactionContext) => Promise<PlatformAdminRolePermissionsModel[]>;
