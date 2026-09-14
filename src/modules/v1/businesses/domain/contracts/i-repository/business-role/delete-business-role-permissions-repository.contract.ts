import type { ReplaceBusinessRolePermissionsCommand } from '@/modules/v1/businesses/application';
import type { TransactionContext } from '@/shared/v1/domain/contracts';

export type DeleteBusinessRolePermissionsRepositoryContract = (deleteBusinessRolePermissionsData: ReplaceBusinessRolePermissionsCommand, ctx?: TransactionContext) => Promise<void>;
