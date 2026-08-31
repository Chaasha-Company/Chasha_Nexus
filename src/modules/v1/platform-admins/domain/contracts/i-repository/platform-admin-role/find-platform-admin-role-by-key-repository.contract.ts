import type { FindPlatformAdminRoleByKeyQuery } from '@/modules/v1/platform-admins/application';
import type { PlatformAdminRolesModel } from '@/shared/v1/database/schema/platform_admins/childrens';
import type { TransactionContext } from '@/shared/v1/domain/contracts';

export type FindPlatformAdminRoleByKeyRepositoryContract = (platformAdminRoleData: FindPlatformAdminRoleByKeyQuery, ctx?: TransactionContext) => Promise<PlatformAdminRolesModel | null>;
