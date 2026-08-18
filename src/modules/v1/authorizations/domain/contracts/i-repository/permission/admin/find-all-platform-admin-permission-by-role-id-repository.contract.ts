import type { FindAllPlatformAdminPermissionByRoleIdQuery } from '@/modules/v1/authorizations/application';
import type { PlatformAdminRolePermissionsModel } from '@/shared/v1/database/schema/platform_admins/childrens/platform-admin-roles';
import type { EntityManager } from 'typeorm';

export type FindAllPlatformAdminPermissionByRoleIdRepositoryContract = (platformAdminPermissionData: FindAllPlatformAdminPermissionByRoleIdQuery, manager?: EntityManager) => Promise<PlatformAdminRolePermissionsModel[]>;
