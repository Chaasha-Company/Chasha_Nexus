import type { findBusinessRoleByIdQuery } from '@/modules/v1/businesses/application/queries/business-role';
import type { BusinessRolesModel } from '@/shared/v1/database/schema/businesses/childrens/business-roles';
import type { EntityManager } from 'typeorm';

export type FindBusisnessRoleByIdRepositoryContract = (businessRoleData: findBusinessRoleByIdQuery, manager?: EntityManager) => Promise<BusinessRolesModel | null>;
