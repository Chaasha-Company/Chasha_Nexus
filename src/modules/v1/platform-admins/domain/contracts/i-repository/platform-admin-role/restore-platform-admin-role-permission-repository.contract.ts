import type { findPlatformAdminRolePermissionQuery } from '@/modules/v1/platform-admins/application';
import type { TransactionContext } from '@/shared/v1/domain/contracts';

export type RestorePlatformAdminRolePermissionRepositoryContract = (restorePlatformAdminRolePermissionData: findPlatformAdminRolePermissionQuery, ctx?: TransactionContext) => Promise<void>;
