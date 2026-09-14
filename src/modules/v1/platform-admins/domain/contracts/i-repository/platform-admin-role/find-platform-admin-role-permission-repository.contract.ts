import type { findPlatformAdminRolePermissionQuery } from '@/modules/v1/platform-admins/application';
import type { PlatformAdminRolePermissionsModel } from '@/shared/v1/database/schema/platform_admins/children/platform-admin-roles';
import type { TransactionContext } from '@/shared/v1/domain/contracts';

export type FindPlatformAdminRolePermissionRepositoryContract = (platformAdminRolePermissionData: findPlatformAdminRolePermissionQuery, ctx?: TransactionContext) => Promise<PlatformAdminRolePermissionsModel | null>;
