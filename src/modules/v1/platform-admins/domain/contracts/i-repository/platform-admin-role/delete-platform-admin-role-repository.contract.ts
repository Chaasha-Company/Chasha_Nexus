import type { DeletePlatformAdminRoleCommand } from '@/modules/v1/platform-admins/application';
import type { TransactionContext } from '@/shared/v1/domain/contracts';

export type DeletePlatformAdminRoleRepositoryContract = (deletePlatformAdminRoleData: DeletePlatformAdminRoleCommand, ctx?: TransactionContext) => Promise<void>;
