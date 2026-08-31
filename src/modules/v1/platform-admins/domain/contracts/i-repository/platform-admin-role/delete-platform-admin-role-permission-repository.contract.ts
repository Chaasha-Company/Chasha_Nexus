import type { findPlatformAdminRolePermissionQuery } from '@/modules/v1/platform-admins/application';
import type { TransactionContext } from '@/shared/v1/domain/contracts';

export type DeletePlatformAdminRolePermissionRepositoryContract = (deletePlatformAdminRolePermissionData: findPlatformAdminRolePermissionQuery, ctx?: TransactionContext) => Promise<void>;
