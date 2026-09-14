import type { findBusinessRoleByIdQuery } from '@/modules/v1/businesses/application/queries/business-role';
import type { BusinessRolesModel } from '@/shared/v1/database/schema/businesses/children/business-roles';
import type { TransactionContext } from '@/shared/v1/domain/contracts';

export type FindBusinessRoleByIdRepositoryContract = (businessRoleData: findBusinessRoleByIdQuery, ctx?: TransactionContext) => Promise<BusinessRolesModel | null>;
