import type { findPlatformAdminRolePermissionQuery } from '@/modules/v1/platform-admins/application';
import type { PlatformAdminRolePermissionsModel } from '@/shared/v1/database/schema/platform_admins/childrens/platform-admin-roles';
import type { EntityManager } from 'typeorm';

export type FindPlatformAdminRolePermissionRepositoryContract = (platformAdminRolePermissionData: findPlatformAdminRolePermissionQuery, manager?: EntityManager) => Promise<PlatformAdminRolePermissionsModel | null>;
