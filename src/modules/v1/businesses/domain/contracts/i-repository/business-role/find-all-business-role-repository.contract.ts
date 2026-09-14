import type { FindAllBusinessRoleQuery } from '@/modules/v1/businesses/application';
import type { PaginationResponseRepository } from '@/shared/v1/database/types';
import type { BusinessRolesModel } from '@/shared/v1/database/schema/businesses/children';

export type FindAllBusinessRoleRepositoryContract = (businessRoleData: FindAllBusinessRoleQuery) => Promise<PaginationResponseRepository<BusinessRolesModel>>;
