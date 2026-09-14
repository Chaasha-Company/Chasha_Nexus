import type { CreateBusinessRoleCommand } from '@/modules/v1/businesses/application';
import type { TransactionContext } from '@/shared/v1/domain/contracts';

export type CreateBusinessRoleRepositoryContract = (createBusinessRoleData: CreateBusinessRoleCommand, ctx?: TransactionContext) => Promise<{ businessRoleId: string }>;
