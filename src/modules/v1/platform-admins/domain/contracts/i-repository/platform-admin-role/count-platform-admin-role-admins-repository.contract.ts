import type { findPlatformAdminRoleByIdQuery } from '@/modules/v1/platform-admins/application';
import type { TransactionContext } from '@/shared/v1/domain/contracts';

export type CountPlatformAdminRoleAdminsRepositoryContract = (platformAdminRoleData: findPlatformAdminRoleByIdQuery, ctx?: TransactionContext) => Promise<number>;
