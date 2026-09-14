import type { findPlatformAdminRoleByIdQuery } from '@/modules/v1/platform-admins/application';
import type { PlatformAdminRolesModel } from '@/shared/v1/database/schema/platform_admins/children/platform-admin-roles';
import type { TransactionContext } from '@/shared/v1/domain/contracts';

export type FindPlatformAdminRoleByIdRepositoryContract = (platformAdminRoleData: findPlatformAdminRoleByIdQuery, ctx?: TransactionContext) => Promise<PlatformAdminRolesModel | null>;
