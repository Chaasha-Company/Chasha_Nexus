import type { FindAllBusinessPermissionByRoleIdQuery } from '@/modules/v1/authorizations/application';
import type { BusinessRolePermissionsModel } from '@/shared/v1/database/schema/businesses/childrens';
import type { EntityManager } from 'typeorm';

export type FindAllBusinessPermissionByRoleIdRepositoryContract = (businessPermissionData: FindAllBusinessPermissionByRoleIdQuery, manager?: EntityManager) => Promise<BusinessRolePermissionsModel[]>;
