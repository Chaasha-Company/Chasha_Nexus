import type { DeletePlatformAdminRoleCommand } from '@/modules/v1/platform-admins/application';
import type { TransactionContext } from '@/shared/v1/domain/contracts';

export type DeletePlatformAdminRolePermissionsRepositoryContract = (deletePlatformAdminRolePermissionsData: DeletePlatformAdminRoleCommand, ctx?: TransactionContext) => Promise<void>;
