import type { CreatePlatformAdminRoleCommand } from '@/modules/v1/platform-admins/application';
import type { TransactionContext } from '@/shared/v1/domain/contracts';

export type CreatePlatformAdminRoleRepositoryContract = (createPlatformAdminRoleData: CreatePlatformAdminRoleCommand, ctx?: TransactionContext) => Promise<{ platformAdminRoleId: string }>;
