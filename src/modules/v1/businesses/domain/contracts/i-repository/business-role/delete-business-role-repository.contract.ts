import type { DeleteBusinessRoleCommand } from '@/modules/v1/businesses/application';
import type { TransactionContext } from '@/shared/v1/domain/contracts';

export type DeleteBusinessRoleRepositoryContract = (deleteBusinessRoleData: DeleteBusinessRoleCommand, ctx?: TransactionContext) => Promise<void>;
