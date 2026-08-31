import type { UpdatePlatformAdminRoleCommand } from '@/modules/v1/platform-admins/application';
import type { TransactionContext } from '@/shared/v1/domain/contracts';

export type UpdatePlatformAdminRoleRepositoryContract = (updatePlatformAdminRoleData: UpdatePlatformAdminRoleCommand, ctx?: TransactionContext) => Promise<void>;
