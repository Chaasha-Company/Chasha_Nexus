import type { FindBusinessRoleByKeyQuery } from '@/modules/v1/businesses/application';
import type { BusinessRolesModel } from '@/shared/v1/database/schema/businesses/children';
import type { TransactionContext } from '@/shared/v1/domain/contracts';

export type FindBusinessRoleByKeyRepositoryContract = (businessRoleData: FindBusinessRoleByKeyQuery, ctx?: TransactionContext) => Promise<BusinessRolesModel | null>;
